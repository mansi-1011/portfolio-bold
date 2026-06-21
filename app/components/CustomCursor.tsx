"use client"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

type CursorState = "default" | "hover" | "card"

export default function CustomCursor() {
  const reduce = useReducedMotion()
  const [state, setState] = useState<CursorState>("default")
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.4 })

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return

    document.body.classList.add("has-custom-cursor")
    setVisible(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const resolve = (target: EventTarget | null): CursorState => {
      const el = target as HTMLElement | null
      if (!el) return "default"
      if (el.closest("[data-cursor='card']")) return "card"
      if (el.closest("a, button, input, select, textarea, [data-cursor='hover']")) return "hover"
      return "default"
    }

    const onOver = (e: MouseEvent) => setState(resolve(e.target))
    const onUp = (e: MouseEvent) => setState(resolve(e.target))

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseup", onUp)

    return () => {
      document.body.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseup", onUp)
    }
  }, [reduce, x, y])

  if (reduce || !visible) return null

  const size = state === "card" ? 48 : state === "hover" ? 36 : 8

  return (
    <>
      <motion.div
        className={`custom-cursor custom-cursor--${state}`}
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
        aria-hidden
      />
      <motion.div className="custom-cursor-dot" style={{ x: sx, y: sy }} aria-hidden />
    </>
  )
}
