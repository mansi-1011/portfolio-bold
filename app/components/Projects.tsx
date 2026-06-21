"use client"
import { useState } from "react"
import { projectGroups, Project, AccentColor } from "@/lib/data"
import SectionHeader from "./SectionHeader"

const ACCENT_COLORS: Record<AccentColor, { bg: string; border: string; text: string }> = {
  mint: { bg: "#7FFFD415", border: "#7FFFD4", text: "#7FFFD4" },
  coral: { bg: "#FF7E8715", border: "#FF7E87", text: "#FF7E87" },
  amber: { bg: "#FFC85715", border: "#FFC857", text: "#FFC857" },
  purple: { bg: "#B48EF715", border: "#B48EF7", text: "#B48EF7" },
}

const TABS = ["Overview", "Stack", "Features"] as const
type Tab = (typeof TABS)[number]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("Overview")
  const c = ACCENT_COLORS[project.accent]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111118",
          border: `1px solid ${c.border}40`,
          borderRadius: "16px",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: c.text, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
              {project.category} · {project.year}
            </div>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#e8e6f0" }}>{project.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            style={{
              background: "none",
              border: "1px solid #2a2a3e",
              color: "#6b6f7e",
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid #1e1e2e" }}>
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: tab === t ? 700 : 400,
                color: tab === t ? c.text : "#6b6f7e",
                borderBottom: tab === t ? `2px solid ${c.border}` : "2px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" && <p style={{ color: "#a0a4b0", lineHeight: 1.8, margin: 0 }}>{project.description}</p>}
        {tab === "Stack" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: "0.4rem 0.9rem",
                  background: c.bg,
                  border: `1px solid ${c.border}40`,
                  borderRadius: "6px",
                  color: c.text,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {tab === "Features" && (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {project.features.map((f) => (
              <li
                key={f}
                style={{
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #1e1e2e",
                  color: "#a0a4b0",
                  fontSize: "0.9rem",
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: c.text, fontWeight: 700 }}>→</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader
          label="// Projects"
          title="Projects"
          subtitle="Click any card to see overview, stack, and features"
          accent="#7FFFD4"
        />

        {projectGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: "4rem" }}>
            <div style={{ marginBottom: "1.75rem" }}>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.35rem", fontWeight: 800, color: "#e8e6f0" }}>{group.title}</h3>
              <p style={{ margin: 0, color: "#6b6f7e", fontSize: "0.92rem" }}>{group.subtitle}</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {group.projects.map((p) => {
                const c = ACCENT_COLORS[p.accent]
                return (
                  <article
                    key={p.title}
                    onClick={() => setSelected(p)}
                    style={{
                      background: "#111118",
                      border: `1px solid ${c.border}30`,
                      borderRadius: "12px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = c.border
                      el.style.transform = "translateY(-4px)"
                      el.style.boxShadow = `0 12px 32px ${c.border}20`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${c.border}30`
                      el.style.transform = "translateY(0)"
                      el.style.boxShadow = "none"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: `linear-gradient(90deg, ${c.border}, transparent)`,
                      }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "monospace",
                          color: c.text,
                          background: c.bg,
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.category}
                      </span>
                      <span style={{ color: "#6b6f7e", fontSize: "0.78rem", fontFamily: "monospace" }}>{p.year}</span>
                    </div>

                    <h4 style={{ margin: "0 0 0.75rem", fontSize: "1.15rem", fontWeight: 800, color: "#e8e6f0" }}>{p.title}</h4>
                    <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "#6b6f7e", lineHeight: 1.65 }}>
                      {p.description.slice(0, 120)}…
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "monospace",
                            color: "#6b6f7e",
                            background: "#0A0A0F",
                            border: "1px solid #1e1e2e",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span style={{ color: c.text, fontSize: "0.82rem", fontWeight: 700, fontFamily: "monospace" }}>
                      View Project →
                    </span>
                  </article>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
