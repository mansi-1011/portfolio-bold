"use client"
import { motion, useReducedMotion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { Box, Code2, Github, ICON_SIZE, ICON_SIZE_LG, Linkedin, Mail, Sparkles } from "@/lib/icons"
import { heroContainer, heroItem } from "@/lib/motion"
import MagneticButton from "./MagneticButton"

export default function Hero() {
  const reduce = useReducedMotion()
  const firstName = personalInfo.name.split(" ")[0]

  return (
    <section id="hero" className="hero-v2">
      <div className="hero-v2-glow hero-v2-glow--left" aria-hidden />
      <div className="hero-v2-glow hero-v2-glow--right" aria-hidden />

      <motion.div className="hero-v2-grid" variants={reduce ? undefined : heroContainer} initial="hidden" animate="visible">
        <div className="hero-v2-copy">
          <motion.p variants={reduce ? undefined : heroItem} className="hero-v2-greet">
            Hi, I&apos;m {personalInfo.name}
          </motion.p>

          <motion.h1 variants={reduce ? undefined : heroItem} className="hero-v2-title">
            {personalInfo.titleLine1}{" "}
            <span className="hero-v2-gradient">{personalInfo.titleLine2}</span>
          </motion.h1>

          <motion.p variants={reduce ? undefined : heroItem} className="hero-v2-desc">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={reduce ? undefined : heroItem} className="hero-v2-actions">
            <MagneticButton href="#contact">Hire Me</MagneticButton>
            <MagneticButton href="#projects" variant="ghost">View Projects</MagneticButton>
          </motion.div>

          <motion.div variants={reduce ? undefined : heroItem} className="hero-v2-social">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={ICON_SIZE} strokeWidth={2} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={ICON_SIZE} strokeWidth={2} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail size={ICON_SIZE} strokeWidth={2} />
            </a>
          </motion.div>
        </div>

        <motion.div variants={reduce ? undefined : heroItem} className="hero-v2-visual">
          <div className="hero-v2-photo-wrap">
            <div className="hero-v2-photo">
              <div className="hero-v2-photo-inner">
                <span className="hero-v2-initials">{firstName[0]}P</span>
              </div>
            </div>
            {!reduce && (
              <>
                <motion.div className="hero-v2-float hero-v2-float--code" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <Code2 size={ICON_SIZE_LG} strokeWidth={2} />
                </motion.div>
                <motion.div className="hero-v2-float hero-v2-float--cube" animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                  <Box size={ICON_SIZE_LG} strokeWidth={2} />
                </motion.div>
                <motion.div className="hero-v2-float hero-v2-float--badge" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
                  <Sparkles size={ICON_SIZE} strokeWidth={2} className="hero-v2-badge-icon" />
                  <div>
                    <strong>5+ Years</strong>
                    <small>Experience</small>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
