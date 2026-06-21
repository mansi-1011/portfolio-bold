"use client"
import { motion, useReducedMotion } from "framer-motion"
import { skills } from "@/lib/data"
import AnimatedSection from "./AnimatedSection"
import Counter from "./motion/Counter"
import { Stagger, StaggerItem } from "./motion/Stagger"

const techCount = Object.values(skills).reduce((sum, arr) => sum + arr.length, 0)

const metrics = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 11, suffix: "+", label: "Projects Delivered" },
  { value: techCount, suffix: "+", label: "Technologies" },
  { value: 4, suffix: "", label: "Cloud Platforms" },
]

export default function TrustMetrics() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="trust" className="section section-trust">
      <div className="section-inner">
        <Stagger className="trust-grid">
          {metrics.map((m) => (
            <StaggerItem key={m.label} variant="scaleIn">
              <motion.div
                className="trust-card"
                whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="trust-value">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <div className="trust-label">{m.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
