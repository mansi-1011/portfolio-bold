import { NextResponse } from "next/server"
import { getAdminDb, isFirebaseConfigured } from "@/lib/firebase-admin"

export const runtime = "nodejs"

type ContactPayload = {
  name?: string
  email?: string
  type?: string
  message?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  if (!isFirebaseConfigured()) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 },
    )
  }

  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const name = body.name?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const type = body.type?.trim() ?? ""
  const message = body.message?.trim() ?? ""

  if (!name || !email || !type || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 })
  }

  if (name.length > 120 || email.length > 254 || type.length > 120 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 })
  }

  try {
    await getAdminDb().collection("contacts").add({
      name,
      email,
      type,
      message,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to save your message." }, { status: 500 })
  }
}
