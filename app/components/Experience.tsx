import { experience } from "@/lib/data"
import SectionHeader from "./SectionHeader"

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <SectionHeader label="// Experience" title="Experience" subtitle="Roles where I've shipped real-world software" accent="#FFC857" />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {experience.map((exp) => (
            <article
              key={`${exp.company}-${exp.role}`}
              style={{
                background: "#111118",
                border: "1px solid #1e1e2e",
                borderRadius: "12px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "3px",
                  background: "linear-gradient(180deg, #FFC857, transparent)",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem", fontWeight: 800, color: "#e8e6f0" }}>{exp.role}</h3>
                  <span style={{ color: "#FFC857", fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 600 }}>
                    {exp.company}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b6f7e",
                    fontFamily: "monospace",
                    background: "#0A0A0F",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "99px",
                    border: "1px solid #1e1e2e",
                    height: "fit-content",
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <ul style={{ margin: "0 0 1.25rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {exp.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", color: "#a0a4b0", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    <span style={{ color: "#FFC857", flexShrink: 0 }}>▸</span>
                    {p}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: "monospace",
                      color: "#FFC857",
                      background: "#FFC85712",
                      border: "1px solid #FFC85735",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
