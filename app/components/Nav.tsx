"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import { personalInfo } from "@/lib/data"
import { ArrowRight, Menu, Sun, X } from "@/lib/icons"

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "services", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("hero")
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    const ids = ["hero", "trust", "services", "projects", "experience", "workflow", "achievements", "contact"]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`topnav${scrolled ? " topnav--scrolled" : ""}`}
      >
        <a href="#hero" className="topnav-logo" aria-label="Home">
          <span className="topnav-logo-mark">MP</span>
        </a>

        <nav className="topnav-links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`topnav-link${active === l.id ? " topnav-link--active" : ""}`}>
              {l.label}
              {active === l.id && !reduce && (
                <motion.span layoutId="nav-underline" className="topnav-underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </a>
          ))}
        </nav>

        <div className="topnav-actions">
          <a href="#contact" className="btn btn-mint btn-sm">
            Hire Me
            <ArrowRight size={16} strokeWidth={2} />
          </a>
          <button type="button" className="topnav-theme" aria-label="Theme">
            <Sun size={18} strokeWidth={2} />
          </button>
          <button type="button" className="topnav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="topnav-drawer" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} className="topnav-drawer-link">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
