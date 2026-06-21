"use client"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { useEffect, useMemo } from "react"
import { personalInfo } from "@/lib/data"
import { heroContainer, heroItem } from "@/lib/motion"
import MagneticButton from "./MagneticButton"
import Counter from "./motion/Counter"
import { Stagger, StaggerItem } from "./motion/Stagger"

const heroMetrics = [
  { value: 5, suffix: "+", label: "Years" },
  { value: 11, suffix: "+", label: "Projects" },
  { value: 6, suffix: "", label: "Tech Stacks" },
  { value: 4, suffix: "", label: "Cloud Platforms" },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 24 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 24 })
  const meshX = useTransform(springX, [-0.5, 0.5], [-40, 40])
  const meshY = useTransform(springY, [-0.5, 0.5], [-30, 30])

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${10 + ((i * 23) % 80)}%`,
        size: 2 + (i % 3),
        delay: i * 0.3,
      })),
    []
  )

  useEffect(() => {
    if (reduce) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY, reduce])

  return (
    <section id="hero" className="hero">
      <div className="hero-ambient" aria-hidden>
        <div className="hero-mesh" />
        {!reduce && (
          <>
            <motion.div className="hero-orb hero-orb--primary" style={{ x: meshX, y: meshY }} />
            <motion.div className="hero-orb hero-orb--secondary" style={{ x: meshY, y: meshX }} />
            <motion.div className="hero-orb hero-orb--accent" style={{ x: meshX, y: meshY }} />
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="hero-particle"
                style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -12, 0] }}
                transition={{ duration: 4 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              />
            ))}
          </>
        )}
      </div>

      <motion.div className="hero-content" variants={reduce ? undefined : heroContainer} initial="hidden" animate="visible">
        <motion.div variants={reduce ? undefined : heroItem} className="hero-eyebrow">
          <span className="hero-status-dot" />
          {personalInfo.availability}
        </motion.div>

        <motion.h1 variants={reduce ? undefined : heroItem} className="hero-headline">
          <span className="hero-headline-line">{personalInfo.titleLine1}</span>
          <span className="hero-headline-line gradient-text">{personalInfo.titleLine2}</span>
        </motion.h1>

        <motion.p variants={reduce ? undefined : heroItem} className="hero-sub">
          {personalInfo.tagline}
        </motion.p>

        <motion.div variants={reduce ? undefined : heroItem} className="hero-cta">
          <MagneticButton href="#contact">Hire Me</MagneticButton>
          <MagneticButton href="#projects" variant="ghost">
            View Projects
          </MagneticButton>
        </motion.div>

        <Stagger className="hero-metrics" fast delay={0.35} immediate>
          {heroMetrics.map((m) => (
            <StaggerItem key={m.label} variant="scaleIn">
              <div className="hero-metric">
                <span className="hero-metric-value">
                  <Counter value={m.value} suffix={m.suffix} />
                </span>
                <span className="hero-metric-label">{m.label}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>

      <div className="hero-scroll-hint" aria-hidden>
        <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
          Scroll
        </motion.span>
      </div>
    </section>
  )
}
