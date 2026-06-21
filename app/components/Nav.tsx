"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import { personalInfo } from "@/lib/data"

const links = [
  { id: "trust", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Impact" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("trust")
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.2, 0.5] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`nav${scrolled || menuOpen ? " nav--solid" : ""}`}
      >
        <a href="#hero" className="nav-brand">{personalInfo.name.split(" ")[0].toLowerCase()}.dev</a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link${active === l.id ? " nav-link--active" : ""}`}>
              {l.label}
              {active === l.id && !reduce && (
                <motion.span layoutId="nav-pill" className="nav-active" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
            </a>
          ))}
        </nav>

        <div className="nav-end">
          <a href="#contact" className="btn btn-primary btn-sm nav-hire">Hire Me</a>
          <button type="button" className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nav-drawer" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.04 }}
                className={`nav-drawer-link${active === l.id ? " nav-link--active" : ""}`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
