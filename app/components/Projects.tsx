"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { personalInfo, projectGroups, Project, AccentColor } from "@/lib/data"
import { ChevronLeft, ChevronRight, Github, ICON_SIZE, X } from "@/lib/icons"
import { fadeUp, stagger, viewport } from "@/lib/motion"
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
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel"
      >
        <div className="modal-header">
          <div>
            <p className="modal-meta" style={{ color }}>
              {project.category} · {project.year}
            </p>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm" aria-label="Close" data-cursor="hover">
            <X size={ICON_SIZE} strokeWidth={2} />
          </button>
        </div>
        <p className="modal-text">{project.description}</p>
        <div className="tag-row" style={{ marginTop: "1rem" }}>
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
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
              <button
                type="button"
                className="arrow-btn"
                onClick={() => scrollToPage(Math.max(0, page - 1))}
                aria-label="Previous"
                data-cursor="hover"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="arrow-btn"
                onClick={() => scrollToPage(Math.min(pages - 1, page + 1))}
                aria-label="Next"
                data-cursor="hover"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </FadeIn>

        <motion.div
          ref={trackRef}
          className="project-carousel"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {projects.map((p, i) => {
            const color = ACCENTS[p.accent]
            return (
              <motion.article
                key={p.title}
                className="project-slide"
                variants={fadeUp}
                data-cursor="card"
                whileHover={
                  reduce
                    ? undefined
                    : { y: -8, scale: 1.01, borderColor: "rgba(127,255,212,0.28)" }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="project-slide-img"
                  style={{ background: `linear-gradient(135deg, ${color}22, #111118)` }}
                  initial={reduce ? false : { scale: 0.95, filter: "blur(4px)" }}
                  whileInView={{ scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="project-slide-watermark">{p.title}</span>
                </motion.div>
                <div className="project-slide-body">
                  <h3>{p.title}</h3>
                  <p>{p.description.slice(0, 120)}…</p>
                  <div className="tag-row">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-slide-actions">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noreferrer" className="btn btn-mint btn-sm btn-glow" data-cursor="hover">
                        Live Demo
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setSelected(p)}
                      className="btn btn-outline btn-sm btn-arrow-wrap"
                      data-cursor="hover"
                    >
                      Case Study
                      <ChevronRight size={14} strokeWidth={2} className="btn-arrow" />
                    </button>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-gh"
                      aria-label="GitHub"
                      data-cursor="hover"
                    >
                      <Github size={ICON_SIZE} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="carousel-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot${page === i ? " dot--active" : ""}`}
              onClick={() => scrollToPage(i)}
              aria-label={`Page ${i + 1}`}
              data-cursor="hover"
            />
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={closeModal} />}</AnimatePresence>
    </AnimatedSection>
  )
}
