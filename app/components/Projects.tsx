"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { personalInfo, projectGroups, Project, AccentColor } from "@/lib/data"
import { ChevronLeft, ChevronRight, Github, ICON_SIZE, X } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

const ACCENTS: Record<AccentColor, string> = {
  mint: "#7FFFD4",
  coral: "#FF7E87",
  amber: "#FFC857",
  purple: "#B48EF7",
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion()
  const color = ACCENTS[project.accent]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel"
      >
        <div className="modal-header">
          <div>
            <p className="modal-meta" style={{ color }}>{project.category} · {project.year}</p>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm" aria-label="Close">
            <X size={ICON_SIZE} strokeWidth={2} />
          </button>
        </div>
        <p className="modal-text">{project.description}</p>
        <div className="tag-row" style={{ marginTop: "1rem" }}>
          {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [page, setPage] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const closeModal = useCallback(() => setSelected(null), [])

  const projects: Project[] = projectGroups.flatMap((g) => g.projects)
  const pages = Math.ceil(projects.length / 3)

  function scrollToPage(p: number) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(".project-slide")
    const w = card ? card.offsetWidth + 24 : 380
    el.scrollTo({ left: p * w * 3, behavior: reduce ? "auto" : "smooth" })
    setPage(p)
  }

  return (
    <AnimatedSection id="projects" className="section section-alt">
      <div className="section-inner">
        <FadeIn>
          <div className="section-head-row">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="section-h2">Selected Work That Makes an Impact</h2>
            </div>
            <div className="carousel-arrows">
              <button type="button" className="arrow-btn" onClick={() => scrollToPage(Math.max(0, page - 1))} aria-label="Previous">
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button type="button" className="arrow-btn" onClick={() => scrollToPage(Math.min(pages - 1, page + 1))} aria-label="Next">
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </FadeIn>

        <div ref={trackRef} className="project-carousel">
          {projects.map((p) => {
            const color = ACCENTS[p.accent]
            return (
              <article key={p.title} className="project-slide">
                <div className="project-slide-img" style={{ background: `linear-gradient(135deg, ${color}22, #111118)` }}>
                  <span className="project-slide-watermark">{p.title}</span>
                </div>
                <div className="project-slide-body">
                  <h3>{p.title}</h3>
                  <p>{p.description.slice(0, 120)}…</p>
                  <div className="tag-row">
                    {p.tech.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="project-slide-actions">
                    {p.href ? <a href={p.href} target="_blank" rel="noreferrer" className="btn btn-mint btn-sm">Live Demo</a> : null}
                    <button type="button" onClick={() => setSelected(p)} className="btn btn-outline btn-sm">Case Study</button>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="project-gh" aria-label="GitHub">
                      <Github size={ICON_SIZE} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="carousel-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} type="button" className={`dot${page === i ? " dot--active" : ""}`} onClick={() => scrollToPage(i)} aria-label={`Page ${i + 1}`} />
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={closeModal} />}</AnimatePresence>
    </AnimatedSection>
  )
}
