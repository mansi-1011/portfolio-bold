"use client"
import { personalInfo } from "@/lib/data"
import Marquee from "./Marquee"

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="dot-grid"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "7rem 2rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(127,255,212,0.08) 0%, transparent 70%)",
            top: "10%",
            left: "5%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,126,135,0.06) 0%, transparent 70%)",
            bottom: "15%",
            right: "5%",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "0.85rem",
            color: "#7FFFD4",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
            fontFamily: "monospace",
          }}
        >
          {personalInfo.name}
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "#e8e6f0",
          }}
        >
          {personalInfo.titleLine1}
          <br />
          <span className="gradient-text">{personalInfo.titleLine2}</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            color: "#6b6f7e",
            maxWidth: "580px",
            lineHeight: 1.75,
            margin: "1.75rem 0 2.5rem",
          }}
        >
          {personalInfo.tagline}
        </p>

        <a
          href="#about"
          style={{
            padding: "0.85rem 2.25rem",
            background: "#7FFFD4",
            color: "#0A0A0F",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = "translateY(-2px)"
            el.style.boxShadow = "0 8px 24px rgba(127,255,212,0.3)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = "translateY(0)"
            el.style.boxShadow = "none"
          }}
        >
          Discover More
        </a>

        <div
          style={{
            position: "absolute",
            bottom: "5.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#2a2a3e",
            fontSize: "1.5rem",
            animation: "float 2s ease-in-out infinite",
          }}
        >
          ↓
        </div>
      </section>
      <Marquee />
    </>
  )
}
