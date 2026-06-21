"use client"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { useEffect, useMemo } from "react"
import { personalInfo } from "@/lib/data"
import { heroContainer, heroItem, letterPop } from "@/lib/motion"
import MagneticButton from "./MagneticButton"
import Marquee from "./Marquee"
import { Stagger, StaggerItem } from "./motion/Stagger"

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "11+", label: "Projects Delivered" },
  { value: "6", label: "Tech Stacks" },
  { value: "4", label: "Cloud Platforms" },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const blob1X = useTransform(springX, [-0.5, 0.5], [-40, 40])
  const blob1Y = useTransform(springY, [-0.5, 0.5], [-30, 30])
  const blob2X = useTransform(springX, [-0.5, 0.5], [30, -30])
  const blob2Y = useTransform(springY, [-0.5, 0.5], [25, -25])

  const titleChars = useMemo(() => {
    const lines = [personalInfo.titleLine1, personalInfo.titleLine2]
    let index = 0
    return lines.map((line, lineIndex) =>
      line.split("").map((char) => {
        const i = index++
        return { char, lineIndex, i }
      })
    )
  }, [])

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
    <>
      <section id="hero" className="dot-grid hero-section">
        {!reduce && (
          <>
            <motion.div
              className="hero-aurora"
              style={{
                width: 480,
                height: 480,
                background: "radial-gradient(circle, rgba(127,255,212,0.14) 0%, transparent 70%)",
                top: "8%",
                left: "4%",
                x: blob1X,
                y: blob1Y,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-aurora"
              style={{
                width: 400,
                height: 400,
                background: "radial-gradient(circle, rgba(255,126,135,0.1) 0%, transparent 70%)",
                bottom: "12%",
                right: "4%",
                x: blob2X,
                y: blob2Y,
              }}
              animate={{ scale: [1.05, 0.95, 1.05] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-aurora hero-aurora-center"
              style={{
                width: 700,
                height: 300,
                background: "radial-gradient(ellipse, rgba(180,142,247,0.07) 0%, transparent 70%)",
                top: "35%",
                left: "50%",
                x: blob2X,
                y: blob2Y,
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.div className="hero-content" variants={reduce ? undefined : heroContainer} initial="hidden" animate="visible">
          <motion.p variants={reduce ? undefined : heroItem} className="hero-eyebrow">
            {personalInfo.name}
          </motion.p>

          <h1 className="hero-title">
            {titleChars.map((line, li) => (
              <span key={li} className="hero-title-line">
                {line.map(({ char, lineIndex, i }) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={reduce ? undefined : letterPop}
                    initial={reduce ? false : "hidden"}
                    animate="visible"
                    className={lineIndex === 1 ? "gradient-text hero-char" : "hero-char"}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p variants={reduce ? undefined : heroItem} className="hero-tagline">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={reduce ? undefined : heroItem} className="hero-actions">
            <MagneticButton href="#about">Discover More</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Hire Me
            </MagneticButton>
          </motion.div>

          <Stagger className="hero-stats" fast delay={0.25} immediate>
            {stats.map((s) => (
              <StaggerItem key={s.label} variant="scaleIn">
                <div className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>

        <div className="hero-scroll-wrap" aria-hidden>
          <motion.span
            className="hero-scroll"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </section>
      <Marquee />
    </>
  )
}
