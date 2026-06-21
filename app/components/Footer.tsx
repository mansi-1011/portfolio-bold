"use client"
import { motion, useReducedMotion } from "framer-motion"
import { personalInfo, socialLinks } from "@/lib/data"
import { ArrowUp } from "@/lib/icons"

const footerLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="footer-v2">
      <div className="footer-v2-inner">
        <div className="footer-v2-brand">
          <span className="topnav-logo-mark">MP</span>
          <p>{personalInfo.tagline.slice(0, 80)}…</p>
        </div>
        <div className="footer-v2-col">
          <strong>Quick Links</strong>
          {footerLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>
        <div className="footer-v2-col">
          <strong>Connect</strong>
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
          <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <p className="footer-v2-copy">
        Made with ♥ using Next.js · {personalInfo.name} © {new Date().getFullYear()}
      </p>
      <motion.button
        type="button"
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} strokeWidth={2} />
      </motion.button>
    </footer>
  )
}
