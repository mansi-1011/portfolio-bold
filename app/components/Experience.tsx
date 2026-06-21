"use client"
import { motion, useReducedMotion } from "framer-motion"
import { experience } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"
import { viewport } from "@/lib/motion"

export default function Experience() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="experience" className="section">
      <div className="section-inner-narrow">
        <SectionHeader label="// Experience" title="Experience" subtitle="Roles where I've shipped real-world software" accent="#FFC857" />

        <div className="timeline-wrap">
          {!reduce && (
            <motion.div
              className="timeline-rail"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <Stagger style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experience.map((exp, i) => (
              <StaggerItem key={`${exp.company}-${exp.role}`}>
                <div className="timeline-item">
                  {!reduce && (
                    <>
                      {i === 0 && (
                        <motion.div
                          className="timeline-dot-pulse"
                          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <motion.div
                        className="timeline-dot"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={viewport}
                        transition={{ type: "spring", stiffness: 260, delay: 0.1 + i * 0.1 }}
                      />
                    </>
                  )}

                  <article className="card-base timeline-card">
                    <div className="exp-header">
                      <div>
                        <h3 className="card-title-sm">{exp.role}</h3>
                        <span className="exp-company">{exp.company}</span>
                      </div>
                      <span className="exp-period">{exp.period}</span>
                    </div>

                    <ul className="exp-list">
                      {exp.points.map((p) => (
                        <li key={p} className="exp-list-item">
                          <span className="exp-bullet">▸</span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="tag-row">
                      {exp.tech.map((t) => (
                        <span key={t} className="tag tag-amber">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </AnimatedSection>
  )
}
