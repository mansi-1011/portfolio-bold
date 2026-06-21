"use client"
import { motion, useReducedMotion } from "framer-motion"
import { aboutCards, experience } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

const steps = [
  { num: "01", label: "Discover", title: aboutCards[0].title, body: aboutCards[0].body, accent: "#6EF7D8" },
  { num: "02", label: "Plan", title: aboutCards[1].title, body: aboutCards[1].body, accent: "#8B5CF6" },
  { num: "03", label: "Build", title: aboutCards[2].title, body: aboutCards[2].body, accent: "#F472B6" },
  { num: "04", label: "Launch", title: experience[0].role, body: experience[0].points[2], accent: "#FBBF24" },
]

export default function Process() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="process" className="section section-alt">
      <div className="section-inner">
        <SectionHeader
          label="How I Work"
          title="From idea to production"
          subtitle="A proven process for shipping scalable, maintainable software"
          accent="#8B5CF6"
        />

        <div className="process-rail" aria-hidden />

        <Stagger className="process-grid">
          {steps.map((step, i) => (
            <StaggerItem key={step.label} variant={i % 2 === 0 ? "slideLeft" : "slideRight"}>
              <motion.article
                className="process-card"
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="process-num" style={{ color: step.accent }}>
                  {step.num}
                </div>
                <div className="process-label" style={{ color: step.accent }}>
                  {step.label}
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-body">{step.body}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
