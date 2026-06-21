"use client"
import { motion, useReducedMotion } from "framer-motion"
import { easeOut } from "@/lib/motion"
import type { CSSProperties, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}

export default function Reveal({ children, delay = 0, y = 32, className, style }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
