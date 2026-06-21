"use client"
import { useState } from "react"
import { education } from "@/lib/data"
import SectionHeader from "./SectionHeader"

export default function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="education" style={{ padding: "6rem 2rem", background: "#0D0D14" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <SectionHeader
          label="// Education"
          title="Education"
          subtitle="Degrees, institutions, and academic milestones"
          accent="#7FFFD4"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {education.map((entry, index) => {
            const isOpen = openIndex === index

            return (
              <article
                key={entry.title}
                style={{
                  background: "#111118",
                  border: `1px solid ${isOpen ? `${entry.accent}60` : "#1e1e2e"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "border-color 0.25s",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "1.25rem 1.5rem",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem", fontWeight: 800, color: "#e8e6f0" }}>
                      {entry.title}
                    </h3>
                    <p style={{ margin: 0, color: "#6b6f7e", fontSize: "0.85rem" }}>
                      {entry.institution} · {entry.period}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                    {entry.highlight && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: entry.accent,
                          background: `${entry.accent}15`,
                          border: `1px solid ${entry.accent}40`,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "99px",
                        }}
                      >
                        {entry.highlight}
                      </span>
                    )}
                    <span
                      style={{
                        color: entry.accent,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.25rem",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "0.75rem",
                      borderTop: "1px solid #1e1e2e",
                      margin: "0 1.5rem",
                      paddingTop: "1rem",
                      paddingBottom: "1.25rem",
                    }}
                  >
                    {entry.details.map((detail) => (
                      <div key={detail.label}>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#6b6f7e",
                            fontFamily: "monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {detail.label}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#e8e6f0", fontWeight: 600 }}>{detail.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
