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
        height: "3px",
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #7FFFD4, #FF7E87, #FFC857, #B48EF7)",
        zIndex: 60,
      }}
    />
  )
}
