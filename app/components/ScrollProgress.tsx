"use client"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #6EF7D8, #8B5CF6)",
        zIndex: 60,
      }}
    />
  )
}
