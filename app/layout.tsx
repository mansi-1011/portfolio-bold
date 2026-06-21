import type { Metadata } from "next"
import "./globals.css"
import { personalInfo } from "@/lib/data"
import MotionProvider from "./components/MotionProvider"
import ScrollProgress from "./components/ScrollProgress"
import CursorGlow from "./components/CursorGlow"

export const metadata: Metadata = {
  title: `${personalInfo.name} — ${personalInfo.titleLine1} ${personalInfo.titleLine2}`,
  description: personalInfo.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          <CursorGlow />
          <div className="grain" aria-hidden />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
