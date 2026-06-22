"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { aboutCards, experience, projectGroups } from "@/lib/data"
import { ICON_SIZE, workflowIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { scaleX: 0, opacity: 0.35 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 0.55,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <AnimatedSection id="workflow" className="section section-alt">
      <div className="section-inner" ref={sectionRef}>
        <Stagger className="workflow-head">
          <StaggerItem>
            <p className="eyebrow">Process</p>
            <h2 className="section-h2">My Approach to Building Great Products</h2>
          </StaggerItem>
        </Stagger>

        <div className="workflow-flow">
          <div className="workflow-track" aria-hidden>
            <div ref={trackRef} className="workflow-track-fill" />
          </div>
          <Stagger className="workflow-steps">
            {steps.map((s) => (
              <StaggerItem key={s.label} variant="scaleIn">
                <motion.div
                  className="workflow-step"
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="hover"
                >
                  <motion.div className="workflow-circle workflow-circle--pulse">
                    <span className="workflow-num">{s.num}</span>
                    <motion.span
                      className="workflow-icon"
                      animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <s.Icon size={ICON_SIZE} strokeWidth={2} />
                    </motion.span>
                  </motion.div>
                  <h3>{s.label}</h3>
                  <p>{s.body.slice(0, 90)}…</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </AnimatedSection>
  )
}
