"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduce) {
      onComplete()
      return
    }

    const duration = 1400
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 280)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete, reduce])

  if (reduce) return null

  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={progress >= 100}
    >
      <div className="page-loader-inner">
        <motion.span
          className="page-loader-logo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          MP
        </motion.span>
        <div className="page-loader-bar">
          <motion.div
            className="page-loader-fill"
            style={{ scaleX: progress / 100 }}
            initial={{ scaleX: 0 }}
          />
        </div>
        <span className="page-loader-pct">{progress}%</span>
      </div>
    </motion.div>
  )
}
