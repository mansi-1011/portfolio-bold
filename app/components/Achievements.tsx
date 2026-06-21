import { achievements } from "@/lib/data"
import SectionHeader from "./SectionHeader"

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader
          label="// Achievements"
          title="Achievements & Highlights"
          subtitle="Academic excellence and events that shaped my engineering journey"
          accent="#FFC857"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {achievements.map((item) => (
            <article
              key={item.title}
              style={{
                background: "#111118",
                border: `1px solid ${item.accent}30`,
                borderRadius: "14px",
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                }}
              />
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 800, color: "#e8e6f0" }}>
                {item.title}
              </h3>
              <p
                style={{
                  margin: "0 0 0.75rem",
                  color: item.accent,
                  fontFamily: "monospace",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {item.subtitle}
              </p>
              <p style={{ margin: 0, color: "#6b6f7e", fontSize: "0.88rem", lineHeight: 1.65 }}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
