import { cert, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

type ServiceAccountConfig = {
  projectId: string
  clientEmail: string
  privateKey: string
}

function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return undefined

  let key = raw.trim()
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }

  return key.replace(/\\n/g, "\n")
}

function parseServiceAccountJson(raw?: string): ServiceAccountConfig | null {
  if (!raw?.trim()) return null

  try {
    const parsed = JSON.parse(raw) as {
      project_id?: string
      client_email?: string
      private_key?: string
    }

    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      return null
    }

    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key,
    }
  } catch {
    return null
  }
}

function getServiceAccountConfig(): ServiceAccountConfig {
  const fromJson = parseServiceAccountJson(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  if (fromJson) return fromJson

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKeyFromBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64
    ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64").toString("utf8")
    : undefined
  const privateKey = privateKeyFromBase64 ?? normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY)

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase environment variables are not configured")
  }

  return { projectId, clientEmail, privateKey }
}

function getFirebaseAdminApp(): App {
  const existing = getApps()[0]
  if (existing) return existing

  const { projectId, clientEmail, privateKey } = getServiceAccountConfig()

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

export function getAdminDb(): Firestore {
  return getFirestore(getFirebaseAdminApp())
}

export function isFirebaseConfigured(): boolean {
  if (parseServiceAccountJson(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)) return true

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY_BASE64 ??
    normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY)

  return Boolean(projectId && clientEmail && privateKey)
}
