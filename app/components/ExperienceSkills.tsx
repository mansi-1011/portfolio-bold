"use client"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { experience, skills } from "@/lib/data"
import { ICON_SIZE, ICON_SIZE_SM, skillCategoryIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

export default function ExperienceSkills() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1])
  const [activeCat, setActiveCat] = useState("Frontend")
  const skillList = skills[activeCat as keyof typeof skills] ?? []

  return (
    <AnimatedSection id="experience" className="section">
      <div className="section-inner" ref={ref}>
        <div className="exp-skills-grid">
          <FadeIn y={32}>
            <div className="exp-col">
              <p className="eyebrow">Career</p>
              <h2 className="section-h2">Experience</h2>
              <div className="exp-timeline-v2">
                {!reduce && (
                  <div className="exp-line-bg" aria-hidden>
                    <motion.div className="exp-line-fill-v2" style={{ scaleY: lineScale }} />
                  </div>
                )}
                {experience.map((exp) => (
                  <div key={exp.period} className="exp-node">
                    <span className="exp-dot" />
                    <div className="exp-node-card">
                      <div className="exp-node-head">
                        <h3>{exp.role}</h3>
                        <span>{exp.period}</span>
                      </div>
                      <p className="exp-company-name">{exp.company}</p>
                      <ul>
                        {exp.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn y={32} delay={0.08}>
            <div className="skills-col">
              <p className="eyebrow">Stack</p>
              <h2 className="section-h2">Technical Skills</h2>
              <div className="skills-cats">
                {Object.keys(skills).map((cat) => {
                  const Icon = skillCategoryIcons[cat]
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCat(cat)}
                      className={`skills-cat-btn${activeCat === cat ? " skills-cat-btn--active" : ""}`}
                    >
                      {Icon ? <Icon size={ICON_SIZE_SM} strokeWidth={2} /> : null}
                      {cat}
                    </button>
                  )
                })}
              </div>
              <motion.div
                key={activeCat}
                className="skills-list-card"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {skillList.map((s) => (
                  <span key={s} className="skills-list-item">{s}</span>
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  )
}
