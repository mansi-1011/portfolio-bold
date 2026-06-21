"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { projectGroups, Project, AccentColor } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import SpotlightCard from "./SpotlightCard"
import AnimatedSection from "./AnimatedSection"
import { FadeIn, Stagger, StaggerItem } from "./motion/Stagger"

const ACCENT_COLORS: Record<AccentColor, { bg: string; border: string; text: string }> = {
  mint: { bg: "#7FFFD415", border: "#7FFFD4", text: "#7FFFD4" },
  coral: { bg: "#FF7E8715", border: "#FF7E87", text: "#FF7E87" },
  amber: { bg: "#FFC85715", border: "#FFC857", text: "#FFC857" },
  purple: { bg: "#B48EF715", border: "#B48EF7", text: "#B48EF7" },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(8px)", y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const TABS = ["Overview", "Stack", "Features"] as const
type Tab = (typeof TABS)[number]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("Overview")
  const c = ACCENT_COLORS[project.accent]
  const reduce = useReducedMotion()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay modal-overlay--light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        variants={reduce ? undefined : modalVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel"
        style={{ borderColor: `${c.border}40` }}
      >
        <div className="modal-header">
          <div>
            <div className="modal-meta" style={{ color: c.text }}>
              {project.category} · {project.year}
            </div>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="btn btn-ghost modal-close">
            ×
          </button>
        </div>

        <div className="modal-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="modal-tab"
              style={{ color: tab === t ? c.text : "#6b6f7e", borderBottomColor: tab === t ? c.border : "transparent" }}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {tab === "Overview" && <p className="modal-text">{project.description}</p>}
            {tab === "Stack" && (
              <div className="tag-row">
                {project.tech.map((t) => (
                  <span key={t} className="tag" style={{ color: c.text, background: c.bg, borderColor: `${c.border}40` }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {tab === "Features" && (
              <ul className="modal-list">
                {project.features.map((f) => (
                  <li key={f} className="modal-list-item">
                    <span style={{ color: c.text }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const closeModal = useCallback(() => setSelected(null), [])

  return (
    <AnimatedSection id="projects" className="section">
      <div className="section-inner">
        <SectionHeader label="// Projects" title="Projects" subtitle="Click any card to explore overview, stack, and features" accent="#7FFFD4" />

        {projectGroups.map((group, gi) => (
          <div key={group.title} className="project-group">
            <FadeIn delay={gi * 0.04}>
              <h3 className="group-title">{group.title}</h3>
              <p className="group-subtitle">{group.subtitle}</p>
            </FadeIn>

            <Stagger className="card-grid">
              {group.projects.map((p) => {
                const c = ACCENT_COLORS[p.accent]
                return (
                  <StaggerItem key={p.title}>
                    <SpotlightCard accent={c.border} onClick={() => setSelected(p)} className="project-card">
                      <div className="card-accent-bar" style={{ background: `linear-gradient(90deg, ${c.border}, transparent)` }} />
                      <div className="project-meta">
                        <span className="project-cat" style={{ color: c.text, background: c.bg }}>
                          {p.category}
                        </span>
                        <span className="project-year">{p.year}</span>
                      </div>
                      <h4 className="card-title-sm">{p.title}</h4>
                      <p className="card-body">{p.description.slice(0, 120)}…</p>
                      <div className="tag-row">
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} className="tag tag-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="card-link" style={{ color: c.text }}>
                        View Project →
                      </span>
                    </SpotlightCard>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        ))}
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={closeModal} />}</AnimatePresence>
    </AnimatedSection>
  )
}
