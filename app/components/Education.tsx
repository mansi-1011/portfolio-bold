"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { education } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

export default function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <AnimatedSection id="education" className="section section-alt">
      <div className="section-inner-narrow">
        <SectionHeader label="// Education" title="Education" subtitle="Degrees, institutions, and academic milestones" accent="#7FFFD4" />

        <Stagger style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {education.map((entry, index) => {
            const isOpen = openIndex === index

            return (
              <StaggerItem key={entry.title}>
                <article className="edu-panel" style={{ borderColor: isOpen ? `${entry.accent}55` : "#1e1e2e" }}>
                  <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} className="edu-trigger">
                    <div>
                      <h3 className="card-title-sm">{entry.title}</h3>
                      <p className="edu-meta">
                        {entry.institution} · {entry.period}
                      </p>
                    </div>
                    <div className="edu-trigger-right">
                      {entry.highlight && (
                        <span className="edu-badge" style={{ color: entry.accent, background: `${entry.accent}15`, borderColor: `${entry.accent}40` }}>
                          {entry.highlight}
                        </span>
                      )}
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: entry.accent }}>
                        ▾
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="edu-details">
                          {entry.details.map((detail) => (
                            <div key={detail.label} className="edu-detail">
                              <div className="edu-detail-label">{detail.label}</div>
                              <div className="edu-detail-value">{detail.value}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
