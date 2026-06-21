"use client"
import { motion, useReducedMotion } from "framer-motion"
import { sectionReveal, viewport } from "@/lib/motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  id: string
  className?: string
  children: ReactNode
}

export default function AnimatedSection({ id, className = "section", children }: AnimatedSectionProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={sectionReveal}
    >
      {children}
    </motion.section>
  )
}
