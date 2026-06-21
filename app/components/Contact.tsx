"use client"
import { FormEvent, useState, type CSSProperties } from "react"
import { personalInfo, socialLinks } from "@/lib/data"
import SectionHeader from "./SectionHeader"

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" style={{ padding: "6rem 2rem", background: "#0D0D14" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <SectionHeader
          label="// Contact"
          title="Let's build something amazing together"
          subtitle="Reach out for freelance work, collaborations, or full-time opportunities"
          accent="#7FFFD4"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            style={{
              padding: "1.25rem",
              background: "#111118",
              border: "1px solid #1e1e2e",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "#6b6f7e", fontFamily: "monospace", marginBottom: "0.35rem" }}>Mail me at</div>
            <div style={{ color: "#7FFFD4", fontWeight: 700, fontSize: "0.92rem", wordBreak: "break-all" }}>{personalInfo.email}</div>
          </a>
          <a
            href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
            style={{
              padding: "1.25rem",
              background: "#111118",
              border: "1px solid #1e1e2e",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "#6b6f7e", fontFamily: "monospace", marginBottom: "0.35rem" }}>Call me at</div>
            <div style={{ color: "#FF7E87", fontWeight: 700, fontSize: "0.92rem" }}>{personalInfo.phone}</div>
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "0.55rem 1.1rem",
                border: "1px solid #2a2a3e",
                borderRadius: "99px",
                color: "#6b6f7e",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "monospace",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#111118",
            border: "1px solid #1e1e2e",
            borderRadius: "14px",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p style={{ margin: 0, color: "#e8e6f0", fontWeight: 700 }}>Leave me a brief message</p>

          <input
            name="name"
            required
            placeholder="Your name"
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            style={inputStyle}
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Briefly describe your project idea..."
            style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
          />

          <button
            type="submit"
            style={{
              padding: "0.85rem 1.5rem",
              background: "#7FFFD4",
              color: "#0A0A0F",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>

          {sent && (
            <p style={{ margin: 0, color: "#7FFFD4", fontSize: "0.85rem", fontFamily: "monospace" }}>
              Opening your email client…
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "#0A0A0F",
  border: "1px solid #1e1e2e",
  borderRadius: "8px",
  color: "#e8e6f0",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
}
