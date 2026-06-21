"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { skills } from "@/lib/data"
import { ICON_SIZE, ICON_SIZE_LG, skillCategoryIcons } from "@/lib/icons"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"

export default function Skills() {
  const [active, setActive] = useState<string>("Frontend")
  const reduce = useReducedMotion()
  const categories = Object.keys(skills)
  const items = skills[active as keyof typeof skills] ?? []
  const Icon = skillCategoryIcons[active]

  return (
    <AnimatedSection id="skills" className="section section-alt">
      <div className="section-inner">
        <SectionHeader label="Expertise" title="Technical skills" subtitle="Technologies I use to build and ship products" accent="#8B5CF6" />

        <div className="skills-pills" role="tablist">
          {categories.map((cat) => {
            const CatIcon = skillCategoryIcons[cat]
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`skills-pill${active === cat ? " skills-pill--active" : ""}`}
              >
                {CatIcon ? <CatIcon size={ICON_SIZE} strokeWidth={2} /> : null}
                {cat}
              </button>
            )
          })}
        </div>

        <motion.div
          key={active}
          className="skills-panel"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="skills-panel-head">
            {Icon ? (
              <span className="skills-panel-icon">
                <Icon size={ICON_SIZE_LG} strokeWidth={2} />
              </span>
            ) : null}
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
