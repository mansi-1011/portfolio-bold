"use client"
import { motion, useReducedMotion } from "framer-motion"
import { viewport, lineGrow } from "@/lib/motion"

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  accent?: string
}

export default function SectionHeader({ label, title, subtitle, accent = "#6EF7D8" }: SectionHeaderProps) {
  const reduce = useReducedMotion()

  return (
    <motion.header
      className="section-header"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="section-label" style={{ color: accent }}>{label}</p>
      <h2 className="section-title">{title}</h2>
      <motion.div
        className="section-line"
        variants={reduce ? undefined : lineGrow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.header>
  )
}
