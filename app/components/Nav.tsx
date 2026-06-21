"use client"
import { useState, useEffect } from "react"
import { personalInfo } from "@/lib/data"

const links = ["About", "Projects", "Skills", "Experience", "Education", "Contact"]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s",
          background: scrolled || menuOpen ? "rgba(10,10,15,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid #1e1e2e" : "1px solid transparent",
        }}
      >
        <a
          href="#hero"
          style={{
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#7FFFD4",
            letterSpacing: "0.05em",
            fontFamily: "monospace",
            textDecoration: "none",
          }}
        >
          {personalInfo.name.split(" ")[0].toLowerCase()}.dev
        </a>

        <div className="nav-desktop" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                color: "#6b6f7e",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7FFFD4")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b6f7e")}
            >
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="#contact"
            className="nav-cta"
            style={{
              background: "transparent",
              border: "1px solid #7FFFD4",
              color: "#7FFFD4",
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              fontSize: "0.78rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}
          >
            Hire Me
          </a>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              background: "none",
              border: "1px solid #2a2a3e",
              color: "#e8e6f0",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="nav-mobile"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(10,10,15,0.96)",
            backdropFilter: "blur(12px)",
            padding: "5.5rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#e8e6f0",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
