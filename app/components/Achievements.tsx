"use client"
import { motion, useReducedMotion } from "framer-motion"
import { achievements } from "@/lib/data"
import { achievementIcons, ICON_SIZE_LG } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

export default function Achievements() {
  const reduce = useReducedMotion()
  const items = achievements.slice(0, 4)

  return (
    <AnimatedSection id="achievements" className="section">
      <div className="section-inner">
        <div className="workflow-head">
          <p className="eyebrow">Highlights</p>
          <h2 className="section-h2">Achievements & Values</h2>
        </div>

        <Stagger className="achieve-grid">
          {items.map((item, i) => {
            const Icon = achievementIcons[i]
            return (
              <StaggerItem key={item.title} variant="scaleIn">
                <motion.article
                  className="achieve-card"
                  whileHover={reduce ? undefined : { y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="achieve-icon" style={{ color: item.accent, background: `${item.accent}15` }}>
                    <Icon size={ICON_SIZE_LG} strokeWidth={2} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 100)}…</p>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
