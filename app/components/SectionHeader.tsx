"use client"
import { motion, useReducedMotion } from "framer-motion"
import { viewport, lineGrow } from "@/lib/motion"

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  accent?: string
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  accent = "#7FFFD4",
}: SectionHeaderProps) {
  const reduce = useReducedMotion()

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: "center", marginBottom: "4rem" }}
    >
      <motion.p
        initial={reduce ? false : { opacity: 0, letterSpacing: "0.4em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.05 }}
        style={{
          fontFamily: "var(--font-mono)",
          color: accent,
          fontSize: "0.8rem",
          marginBottom: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        {label}
      </motion.p>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 900,
          margin: 0,
          color: "#e8e6f0",
        }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="section-line"
        variants={reduce ? undefined : lineGrow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {subtitle && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            color: "#6b6f7e",
            marginTop: "1rem",
            maxWidth: "520px",
            margin: "1rem auto 0",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  )
}
