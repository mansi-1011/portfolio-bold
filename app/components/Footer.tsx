"use client"
import { motion, useReducedMotion } from "framer-motion"
import { personalInfo, socialLinks } from "@/lib/data"
import { viewport } from "@/lib/motion"

export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <motion.footer
      className="site-footer"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-inner">
        <a href="#hero" className="footer-logo">
          {personalInfo.name.split(" ")[0].toLowerCase()}.dev
        </a>
        <div className="footer-links">
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="social-pill">
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="footer-top"
        >
          ↑ Back to top
        </button>
        <p className="footer-copy">
          Built with Next.js · {personalInfo.name} © {new Date().getFullYear()}
        </p>
      </div>
    </motion.footer>
  )
}
