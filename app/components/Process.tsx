"use client"
import { motion, useReducedMotion } from "framer-motion"
import { aboutCards, experience, projectGroups } from "@/lib/data"
import { ICON_SIZE, workflowIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

const steps = [
  { num: "01", label: "Discover", body: aboutCards[0].body, Icon: workflowIcons[0] },
  { num: "02", label: "Plan", body: aboutCards[1].body, Icon: workflowIcons[1] },
  { num: "03", label: "Build", body: aboutCards[2].body, Icon: workflowIcons[2] },
  { num: "04", label: "Test", body: projectGroups[1].projects[1].features[2], Icon: workflowIcons[3] },
  { num: "05", label: "Deploy", body: experience[0].points[2], Icon: workflowIcons[4] },
  { num: "06", label: "Support", body: aboutCards[1].body.split("—")[1]?.trim() ?? aboutCards[1].body, Icon: workflowIcons[5] },
]

export default function Process() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="workflow" className="section section-alt">
      <div className="section-inner">
        <div className="workflow-head">
          <p className="eyebrow">Process</p>
          <h2 className="section-h2">My Approach to Building Great Products</h2>
        </div>

        <div className="workflow-track" aria-hidden />
        <Stagger className="workflow-steps">
          {steps.map((s) => (
            <StaggerItem key={s.label} variant="scaleIn">
              <motion.div className="workflow-step" whileHover={reduce ? undefined : { y: -6 }} transition={{ duration: 0.25 }}>
                <div className="workflow-circle">
                  <span className="workflow-num">{s.num}</span>
                  <span className="workflow-icon">
                    <s.Icon size={ICON_SIZE} strokeWidth={2} />
                  </span>
                </div>
                <h3>{s.label}</h3>
                <p>{s.body.slice(0, 90)}…</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
