import type { Metadata } from "next"
import "./globals.css"
import { personalInfo } from "@/lib/data"
import { fontFamily } from "./fonts"
import MotionProvider from "./components/MotionProvider"
import ScrollProgress from "./components/ScrollProgress"

export const metadata: Metadata = {
  title: `${personalInfo.name} — ${personalInfo.titleLine1} ${personalInfo.titleLine2}`,
  description: personalInfo.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontFamily.variable}>
      <body>
        <MotionProvider>
          <ScrollProgress />
          <div className="grain" aria-hidden />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
