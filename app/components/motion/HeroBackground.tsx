"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"

export default function HeroBackground() {
  const reduce = useReducedMotion()

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 19) % 88)}%`,
        top: `${8 + ((i * 27) % 84)}%`,
        size: 2 + (i % 2),
        delay: i * 0.35,
      })),
    []
  )

  if (reduce) {
    return (
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-grid" />
        <div className="hero-bg-mesh" />
      </div>
    )
  }

  return (
    <div className="hero-bg" aria-hidden>
      <div className="hero-bg-grid" />
      <motion.div
        className="hero-bg-mesh"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-bg-aurora hero-bg-aurora--a"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-bg-aurora hero-bg-aurora--b"
        animate={{ x: [0, -25, 0], y: [0, 15, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="hero-bg-particle"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -14, 0] }}
          transition={{ duration: 5 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  )
}
