"use client"
import { motion, useReducedMotion } from "framer-motion"
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
