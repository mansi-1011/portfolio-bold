"use client"
import { motion, useReducedMotion } from "framer-motion"
import { wordReveal } from "@/lib/motion"

interface WordRevealProps {
  text: string
  className?: string
  as?: "span" | "h1"
  startIndex?: number
}

export default function WordReveal({ text, className, as: Tag = "span", startIndex = 0 }: WordRevealProps) {
  const reduce = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={startIndex + i}
          variants={wordReveal}
          initial="hidden"
          animate="visible"
          className="word-reveal"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  )
}
