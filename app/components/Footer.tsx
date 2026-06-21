"use client"
import { motion, useReducedMotion } from "framer-motion"
import { personalInfo, socialLinks } from "@/lib/data"
import { viewport } from "@/lib/motion"

export default function Footer() {
  const reduce = useReducedMotion()
  const links = [...socialLinks, { label: "GitHub", href: personalInfo.github }]

  return (
    <motion.footer
      className="footer"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-inner">
        <a href="#hero" className="footer-brand">{personalInfo.name.split(" ")[0].toLowerCase()}.dev</a>
        <div className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pill pill--muted">{l.label}</a>
          ))}
        </div>
        <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}>
          Back to top ↑
        </button>
        <p className="footer-copy">Built with Next.js · {personalInfo.name} © {new Date().getFullYear()}</p>
      </div>
    </motion.footer>
  )
}
