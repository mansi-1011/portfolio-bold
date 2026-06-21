"use client"
import { motion, useReducedMotion } from "framer-motion"
import { fadeUp, scaleIn, slideFromLeft, slideFromRight, stagger, staggerFast, viewport, viewportEager } from "@/lib/motion"
import type { CSSProperties, ReactNode } from "react"

type Variant = "fadeUp" | "scaleIn" | "slideLeft" | "slideRight"

const variantMap = {
  fadeUp,
  scaleIn,
  slideLeft: slideFromLeft,
  slideRight: slideFromRight,
}

interface StaggerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  fast?: boolean
  eager?: boolean
  immediate?: boolean
}

export function Stagger({ children, className, style, delay = 0, fast, eager, immediate }: StaggerProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  const staggerVariant = {
    hidden: {},
    visible: {
      transition: {
        ...(fast ? staggerFast.visible.transition : stagger.visible.transition),
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: eager ? viewportEager : viewport })}
      variants={staggerVariant}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variant?: Variant
}

export function StaggerItem({ children, className = "stagger-item", style, variant = "fadeUp" }: StaggerItemProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div className={className} style={style} variants={variantMap[variant]}>
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  y?: number
}

export function FadeIn({ children, className, style, delay = 0, y = 28 }: FadeInProps) {
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
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
