"use client"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { experience, skills } from "@/lib/data"
import { ICON_SIZE, ICON_SIZE_SM, skillCategoryIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

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
          <div className="exp-col">
            <Stagger>
              <StaggerItem>
                <p className="eyebrow">Career</p>
                <h2 className="section-h2">Experience</h2>
              </StaggerItem>
            </Stagger>
            <div className="exp-timeline-v2">
              {!reduce && (
                <div className="exp-line-bg" aria-hidden>
                  <motion.div className="exp-line-fill-v2" style={{ scaleY: lineScale }} />
                </div>
              )}
              <Stagger>
                {experience.map((exp, i) => (
                  <StaggerItem key={exp.period} variant={i % 2 === 0 ? "slideLeft" : "slideRight"}>
                    <div className="exp-node">
                      <motion.span
                        className={`exp-dot${i === 0 ? " exp-dot--current" : ""}`}
                        animate={reduce || i !== 0 ? undefined : { scale: [1, 1.2, 1], opacity: [1, 0.85, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
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
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          <div className="skills-col">
            <Stagger delay={0.08}>
              <StaggerItem>
                <p className="eyebrow">Stack</p>
                <h2 className="section-h2">Technical Skills</h2>
              </StaggerItem>
              <StaggerItem>
                <div className="skills-cats">
                  {Object.keys(skills).map((cat) => {
                    const Icon = skillCategoryIcons[cat]
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCat(cat)}
                        className={`skills-cat-btn${activeCat === cat ? " skills-cat-btn--active" : ""}`}
                        data-cursor="hover"
                      >
                        {Icon ? <Icon size={ICON_SIZE_SM} strokeWidth={2} /> : null}
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  key={activeCat}
                  className="skills-list-card"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {skillList.map((s, i) => (
                    <motion.span
                      key={s}
                      className="skills-list-item"
                      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.35 }}
                      whileHover={reduce ? undefined : { scale: 1.05, borderColor: "rgba(127,255,212,0.45)" }}
                      data-cursor="hover"
                    >
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
