"use client"
import { useState } from "react"
import { skills } from "@/lib/data"
import SectionHeader from "./SectionHeader"

const CAT_COLORS: Record<string, string> = {
  Frontend: "#7FFFD4",
  Backend: "#FF7E87",
  Database: "#FFC857",
  Languages: "#B48EF7",
  "Cloud & DevOps": "#7FFFD4",
  "Testing & Tools": "#FF7E87",
}

export default function Skills() {
  const [open, setOpen] = useState<string | null>("Frontend")

  return (
    <section id="skills" style={{ padding: "6rem 2rem", background: "#0D0D14" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <SectionHeader label="// Skills" title="My Skills" subtitle="Technologies I use to build and ship products" accent="#FF7E87" />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {Object.entries(skills).map(([cat, items]) => {
            const color = CAT_COLORS[cat] ?? "#7FFFD4"
            const isOpen = open === cat

            return (
              <div
                key={cat}
                style={{
                  background: "#111118",
                  border: `1px solid ${isOpen ? `${color}60` : "#1e1e2e"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : cat)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    color: "#e8e6f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{cat}</span>
                    <span style={{ fontSize: "0.75rem", color, fontFamily: "monospace" }}>{items.length} skills</span>
                    {!isOpen && (
                      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                        {items.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            style={{
                              fontSize: "0.68rem",
                              color: "#6b6f7e",
                              fontFamily: "monospace",
                              background: "#0A0A0F",
                              border: "1px solid #1e1e2e",
                              padding: "0.15rem 0.45rem",
                              borderRadius: "4px",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span style={{ color, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "0.4rem 1rem",
                          background: `${color}12`,
                          border: `1px solid ${color}40`,
                          borderRadius: "8px",
                          color,
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          fontFamily: "monospace",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
