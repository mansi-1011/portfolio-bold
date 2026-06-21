"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { skills } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"

const CAT_META: Record<string, { icon: string; color: string }> = {
  Frontend: { icon: "⬡", color: "#6EF7D8" },
  Backend: { icon: "⚙", color: "#F472B6" },
  Database: { icon: "◈", color: "#FBBF24" },
  Languages: { icon: "{ }", color: "#8B5CF6" },
  "Cloud & DevOps": { icon: "☁", color: "#6EF7D8" },
  "Testing & Tools": { icon: "⚗", color: "#F472B6" },
}

export default function Skills() {
  const [active, setActive] = useState<string>("Frontend")
  const reduce = useReducedMotion()
  const categories = Object.keys(skills)
  const items = skills[active as keyof typeof skills] ?? []
  const meta = CAT_META[active] ?? { icon: "◆", color: "#6EF7D8" }

  return (
    <AnimatedSection id="skills" className="section section-alt">
      <div className="section-inner">
        <SectionHeader
          label="Expertise"
          title="Technical skills"
          subtitle="Deep experience across the full stack — from UI to cloud infrastructure"
          accent="#8B5CF6"
        />

        <div className="skills-pills" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`skills-pill${active === cat ? " skills-pill--active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className="skills-panel"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="skills-panel-head">
            <span className="skills-panel-icon" style={{ color: meta.color }}>{meta.icon}</span>
            <div>
              <h3 className="skills-panel-title">{active}</h3>
              <p className="skills-panel-count">{items.length} technologies</p>
            </div>
          </div>
          <div className="skills-items">
            {items.map((skill, i) => (
              <motion.span
                key={skill}
                className="pill pill--glass"
                style={{ borderColor: `${meta.color}30`, color: meta.color }}
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
