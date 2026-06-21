"use client"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { experience } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export default function Experience() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] })
  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  return (
    <AnimatedSection id="experience" className="section">
      <div className="section-inner-narrow">
        <SectionHeader
          label="Career"
          title="Experience"
          subtitle="Leading teams and shipping production software at scale"
          accent="#6EF7D8"
        />

        <div ref={wrapRef} className="exp-timeline">
          {!reduce && (
            <div className="exp-line-track" aria-hidden>
              <motion.div className="exp-line-fill" style={{ scaleY: lineScale }} />
            </div>
          )}

          <Stagger style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {experience.map((exp, i) => (
              <StaggerItem key={`${exp.company}-${exp.period}`} variant={i % 2 === 0 ? "slideLeft" : "slideRight"}>
                <article className="exp-card">
                  <div className="exp-logo">{initials(exp.company)}</div>
                  <div className="exp-card-header">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <span className="exp-duration">{exp.period}</span>
                  </div>
                  <ul className="exp-points">
                    {exp.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {exp.tech.map((t) => (
                      <span key={t} className="pill pill--muted">{t}</span>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </AnimatedSection>
  )
}
