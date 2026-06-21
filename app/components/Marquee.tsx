"use client"
import { motion } from "framer-motion"
import { marqueeItems } from "@/lib/data"

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <motion.div
      className="marquee-wrap"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      style={{
        borderTop: "1px solid #1e1e2e",
        borderBottom: "1px solid #1e1e2e",
        background: "#0D0D14",
        overflow: "hidden",
        padding: "0.85rem 0",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
            <span className="marquee-dot">•</span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
