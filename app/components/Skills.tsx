"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { skills } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

const CAT_META: Record<string, { color: string; icon: string }> = {
  Frontend: { color: "#7FFFD4", icon: "⬡" },
  Backend: { color: "#FF7E87", icon: "⚙" },
  Database: { color: "#FFC857", icon: "🗄" },
  Languages: { color: "#B48EF7", icon: "{ }" },
  "Cloud & DevOps": { color: "#7FFFD4", icon: "☁" },
  "Testing & Tools": { color: "#FF7E87", icon: "⚗" },
}

export default function Skills() {
  const [open, setOpen] = useState<string | null>("Frontend")
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="skills" className="section section-alt">
      <div className="section-inner-narrow">
        <SectionHeader label="// Skills" title="My Skills" subtitle="Technologies I use to build and ship products" accent="#FF7E87" />

        <Stagger style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {Object.entries(skills).map(([cat, items]) => {
            const meta = CAT_META[cat] ?? { color: "#7FFFD4", icon: "◆" }
            const { color, icon } = meta
            const isOpen = open === cat

            return (
              <StaggerItem key={cat}>
                <div className={`skill-panel${isOpen ? " skill-panel--open" : ""}`} style={{ borderColor: isOpen ? `${color}55` : undefined }}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : cat)} className="skill-trigger">
                    <div className="skill-trigger-left">
                      <span className="skill-icon" style={{ color }}>
                        {icon}
                      </span>
                      <span className="skill-cat">{cat}</span>
                      <span className="skill-count" style={{ color }}>
                        {items.length} skills
                      </span>
                      {!isOpen && (
                        <div className="tag-row">
                          {items.slice(0, 4).map((skill) => (
                            <span key={skill} className="tag tag-muted">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} style={{ color }}>
                      ▾
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="skill-tags">
                          {items.map((skill, index) =>
                            reduce ? (
                              <span key={skill} className="tag" style={{ color, background: `${color}12`, borderColor: `${color}40` }}>
                                {skill}
                              </span>
                            ) : (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className="tag"
                                style={{ color, background: `${color}12`, borderColor: `${color}40` }}
                              >
                                {skill}
                              </motion.span>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
