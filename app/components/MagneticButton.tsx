"use client"
import { motion, useReducedMotion, useSpring } from "framer-motion"
import { useRef, type MouseEvent, type ReactNode } from "react"

interface MagneticButtonProps {
  href: string
  children: ReactNode
  variant?: "primary" | "ghost"
  className?: string
  "data-cursor"?: string
}

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  "data-cursor": dataCursor = "hover",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })

  function onMove(e: MouseEvent) {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const isPrimary = variant === "primary"

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`${isPrimary ? "btn btn-mint btn-glow" : "btn btn-outline"} ${className}`.trim()}
      data-cursor={dataCursor}
    >
      <span className="btn-shine" aria-hidden />
      {children}
    </motion.a>
  )
}
