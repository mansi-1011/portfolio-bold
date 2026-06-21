import { aboutCards, personalInfo } from "@/lib/data"
import SectionHeader from "./SectionHeader"

export default function About() {
  return (
    <section id="about" style={{ padding: "6rem 2rem", background: "#0D0D14" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader label="// About Me" title={`Hi! I'm ${personalInfo.name.split(" ")[0]}`} accent="#B48EF7" />

        <p
          style={{
            color: "#a0a4b0",
            lineHeight: 1.9,
            fontSize: "1.05rem",
            margin: "0 auto 3.5rem",
            maxWidth: "760px",
            textAlign: "center",
          }}
        >
          {personalInfo.about}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {aboutCards.map((card) => (
            <article
              key={card.title}
              style={{
                background: "#111118",
                border: `1px solid ${card.accent}30`,
                borderRadius: "14px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: card.accent,
                  fontWeight: 700,
                }}
              >
                {card.eyebrow}
              </span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#e8e6f0" }}>{card.title}</h3>
              <p style={{ margin: 0, color: "#6b6f7e", lineHeight: 1.7, fontSize: "0.92rem", flex: 1 }}>{card.body}</p>
              <a
                href={card.href}
                style={{
                  marginTop: "0.5rem",
                  color: card.accent,
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {card.cta} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
