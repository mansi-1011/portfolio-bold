"use client"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import { personalInfo } from "@/lib/data"
import { Box, Code2, Github, ICON_SIZE, ICON_SIZE_LG, Linkedin, Mail, Sparkles } from "@/lib/icons"
import { heroContainer, heroItem, imageReveal } from "@/lib/motion"
import { usePageReady } from "./MotionProvider"
import MagneticButton from "./MagneticButton"
import HeroBackground from "./motion/HeroBackground"
import WordReveal from "./motion/WordReveal"

export default function Hero() {
  const reduce = useReducedMotion()
  const ready = usePageReady()
  const firstName = personalInfo.name.split(" ")[0]
  const visualRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 })
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 })
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 18 })
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 18 })

  function onVisualMove(e: React.MouseEvent) {
    if (reduce) return
    const rect = visualRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onVisualLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section id="hero" className="hero-v2">
      <HeroBackground />

      <motion.div
        className="hero-v2-grid"
        variants={reduce ? undefined : heroContainer}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        <div className="hero-v2-copy">
          <motion.p variants={reduce ? undefined : heroItem} className="hero-v2-greet">
            Hi, I&apos;m {personalInfo.name}
          </motion.p>

          <motion.div variants={reduce ? undefined : heroItem}>
            <h1 className="hero-v2-title">
              <WordReveal text={personalInfo.titleLine1} startIndex={0} />
              <WordReveal text={personalInfo.titleLine2} className="hero-v2-gradient" startIndex={4} />
            </h1>
          </motion.div>

          <motion.p variants={reduce ? undefined : heroItem} className="hero-v2-desc">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={reduce ? undefined : heroItem} className="hero-v2-actions">
            <MagneticButton href="#contact">Hire Me</MagneticButton>
            <MagneticButton href="#projects" variant="ghost">View Projects</MagneticButton>
          </motion.div>

          <motion.div variants={reduce ? undefined : heroItem} className="hero-v2-social">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="hover">
              <Github size={ICON_SIZE} strokeWidth={2} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="hover">
              <Linkedin size={ICON_SIZE} strokeWidth={2} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" data-cursor="hover">
              <Mail size={ICON_SIZE} strokeWidth={2} />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={reduce ? undefined : heroItem}
          className="hero-v2-visual"
          ref={visualRef}
          onMouseMove={onVisualMove}
          onMouseLeave={onVisualLeave}
        >
          <motion.div
            className="hero-v2-photo-wrap"
            style={reduce ? undefined : { x: px, y: py }}
            variants={reduce ? undefined : imageReveal}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
          >
            {!reduce && (
              <motion.div
                className="hero-v2-photo-glow"
                style={{ x: glowX, y: glowY }}
                aria-hidden
              />
            )}
            <motion.div
              className="hero-v2-photo"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="hero-v2-photo-inner">
                <span className="hero-v2-initials">{firstName[0]}P</span>
              </div>
            </motion.div>
            {!reduce && (
              <>
                <motion.div
                  className="hero-v2-float hero-v2-float--code"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 size={ICON_SIZE_LG} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="hero-v2-float hero-v2-float--cube"
                  animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box size={ICON_SIZE_LG} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="hero-v2-float hero-v2-float--badge"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={ICON_SIZE} strokeWidth={2} className="hero-v2-badge-icon" />
                  <div>
                    <strong>5+ Years</strong>
                    <small>Experience</small>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
