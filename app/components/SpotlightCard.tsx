"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react"

interface SpotlightCardProps {
  children: ReactNode
  accent: string
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

export default function SpotlightCard({ children, accent, onClick, className = "", style }: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null)
  const [spot, setSpot] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const reduce = useReducedMotion()

  function handleMove(e: MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.article
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={onClick}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      style={{
        border: `1px solid ${active ? `${accent}55` : `${accent}28`}`,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {active && !reduce && (
        <div
          className="spotlight-glow"
          style={{
            background: `radial-gradient(380px circle at ${spot.x}px ${spot.y}px, ${accent}20, transparent 45%)`,
          }}
        />
      )}
      <div className="spotlight-inner">{children}</div>
    </motion.article>
  )
}
