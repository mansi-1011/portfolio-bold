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
        <Stagger className="workflow-head">
          <StaggerItem>
            <p className="eyebrow">Highlights</p>
            <h2 className="section-h2">Achievements & Values</h2>
          </StaggerItem>
        </Stagger>

        <Stagger className="achieve-grid">
          {items.map((item, i) => {
            const Icon = achievementIcons[i]
            return (
              <StaggerItem key={item.title} variant="scaleIn">
                <motion.article
                  className="achieve-card"
                  data-cursor="hover"
                  whileHover={reduce ? undefined : { y: -6, scale: 1.02, borderColor: "rgba(127,255,212,0.3)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className="achieve-icon"
                    style={{ color: item.accent, background: `${item.accent}15` }}
                    whileHover={reduce ? undefined : { rotate: -6, scale: 1.08 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Icon size={ICON_SIZE_LG} strokeWidth={2} />
                  </motion.span>
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
