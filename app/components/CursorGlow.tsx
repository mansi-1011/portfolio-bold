"use client"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect } from "react"

export default function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 120, damping: 28 })
  const sy = useSpring(y, { stiffness: 120, damping: 28 })

  useEffect(() => {
    if (reduce) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [x, y, reduce])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="cursor-glow"
      style={{ x: sx, y: sy }}
    />
  )
}
