"use client"
import { motion, useReducedMotion } from "framer-motion"
import { skills } from "@/lib/data"
import { ICON_SIZE_LG, statIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import Counter from "./motion/Counter"
import { Stagger, StaggerItem } from "./motion/Stagger"

const techCount = Object.values(skills).reduce((n, arr) => n + arr.length, 0)

const stats = [
  { value: 5, suffix: "+", label: "Years Experience", Icon: statIcons[0], color: "#7FFFD4" },
  { value: 11, suffix: "+", label: "Projects Delivered", Icon: statIcons[1], color: "#B48EF7" },
  { value: techCount, suffix: "+", label: "Technologies", Icon: statIcons[2], color: "#FFC857" },
  { value: 4, suffix: "", label: "Cloud Platforms", Icon: statIcons[3], color: "#FF7E87" },
]

export default function TrustMetrics() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="trust" className="section section-compact">
      <div className="section-inner">
        <Stagger className="stats-row">
          {stats.map((s) => (
            <StaggerItem key={s.label} variant="scaleIn">
              <motion.div className="stat-card" whileHover={reduce ? undefined : { y: -4 }} transition={{ duration: 0.25 }}>
                <span className="stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
                  <s.Icon size={ICON_SIZE_LG} strokeWidth={2} />
                </span>
                <span className="stat-value"><Counter value={s.value} suffix={s.suffix} /></span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
