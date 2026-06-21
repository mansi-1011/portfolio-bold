"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { personalInfo, projectGroups, Project, AccentColor } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

const ACCENTS: Record<AccentColor, { color: string; glow: string }> = {
  mint: { color: "#6EF7D8", glow: "rgba(110,247,216,0.15)" },
  coral: { color: "#F472B6", glow: "rgba(244,114,182,0.15)" },
  amber: { color: "#FBBF24", glow: "rgba(251,191,36,0.15)" },
  purple: { color: "#8B5CF6", glow: "rgba(139,92,246,0.15)" },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"Overview" | "Stack" | "Features">("Overview")
  const a = ACCENTS[project.accent]
  const reduce = useReducedMotion()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        variants={reduce ? undefined : modalVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel modal-panel--lg"
      >
        <div className="modal-header">
          <div>
            <p className="modal-meta" style={{ color: a.color }}>{project.category} · {project.year}</p>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm modal-close" aria-label="Close">×</button>
        </div>
        <div className="modal-tabs">
          {(["Overview", "Stack", "Features"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`modal-tab${tab === t ? " modal-tab--active" : ""}`} style={tab === t ? { color: a.color } : undefined}>
              {t}
            </button>
          ))}
        </div>
        {tab === "Overview" && <p className="modal-text">{project.description}</p>}
        {tab === "Stack" && (
          <div className="tag-row">{project.tech.map((t) => <span key={t} className="pill">{t}</span>)}</div>
        )}
        {tab === "Features" && (
          <ul className="modal-list">{project.features.map((f) => <li key={f} className="modal-list-item"><span style={{ color: a.color }}>→</span>{f}</li>)}</ul>
        )}
      </motion.div>
    </motion.div>
  )
}

function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const a = ACCENTS[project.accent]
  const reverse = index % 2 === 1
  const reduce = useReducedMotion()

  return (
    <FadeIn y={48} delay={index * 0.05}>
      <article className={`featured${reverse ? " featured--reverse" : ""}`}>
        <motion.div
          className="featured-media"
          style={{ background: `radial-gradient(ellipse at 30% 20%, ${a.glow}, transparent 60%), linear-gradient(160deg, #0F172A, #050816)` }}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <div className="featured-media-inner">
            <span className="featured-watermark" style={{ color: a.color }}>{project.title.slice(0, 2)}</span>
            <span className="featured-badge" style={{ color: a.color, borderColor: `${a.color}40`, background: `${a.color}10` }}>{project.category}</span>
          </div>
          <div className="featured-media-glow" style={{ background: a.glow }} />
        </motion.div>

        <div className="featured-body">
          <div className="featured-meta">
            <span>{project.year}</span>
            <span style={{ color: a.color }}>{project.role}</span>
          </div>
          <h3 className="featured-title">{project.title}</h3>
          <p className="featured-desc">{project.description}</p>

          <div className="featured-blocks">
            <div className="featured-block">
              <span className="featured-block-label">Problem</span>
              <p>{project.features[0]}</p>
            </div>
            <div className="featured-block">
              <span className="featured-block-label">Solution</span>
              <p>{project.description}</p>
            </div>
            <div className="featured-block">
              <span className="featured-block-label">Results</span>
              <p>{project.features.slice(1, 3).join(" · ")}</p>
            </div>
          </div>

          <div className="tag-row featured-tags">
            {project.tech.map((t) => <span key={t} className="pill pill--muted">{t}</span>)}
          </div>

          <div className="featured-actions">
            {project.href ? (
              <a href={project.href} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">View Live</a>
            ) : null}
            <button type="button" onClick={onOpen} className="btn btn-ghost btn-sm">Case Study</button>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const closeModal = useCallback(() => setSelected(null), [])

  return (
    <AnimatedSection id="projects" className="section section-projects">
      <div className="section-inner">
        <SectionHeader
          label="Selected Work"
          title="Featured projects"
          subtitle="Enterprise-grade systems — architecture, delivery, and production ownership"
          accent="#6EF7D8"
        />

        {projectGroups.map((group, gi) => (
          <div key={group.title} className="project-group">
            {gi > 0 && (
              <FadeIn>
                <h3 className="group-heading">{group.title}</h3>
                <p className="group-desc">{group.subtitle}</p>
              </FadeIn>
            )}
            <div className="featured-list">
              {group.projects.map((p, i) => (
                <FeaturedProject key={p.title} project={p} index={gi * 10 + i} onOpen={() => setSelected(p)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={closeModal} />}</AnimatePresence>
    </AnimatedSection>
  )
}
