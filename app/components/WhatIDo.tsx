"use client"
import { motion, useReducedMotion } from "framer-motion"
import { aboutCards, achievements } from "@/lib/data"
import { ArrowRight, ICON_SIZE_LG, serviceIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

const services = [
  ...aboutCards.map((c, i) => ({
    title: c.eyebrow,
    body: c.body,
    accent: c.accent,
    Icon: serviceIcons[i],
  })),
  ...achievements.slice(0, 3).map((a, i) => ({
    title: a.subtitle,
    body: a.description.slice(0, 100) + (a.description.length > 100 ? "…" : ""),
    accent: a.accent,
    Icon: serviceIcons[i + 3],
  })),
]

export default function WhatIDo() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection id="services" className="section">
      <div className="section-inner">
        <div className="services-split">
          <FadeIn y={32}>
            <div className="services-intro">
              <h2 className="services-heading">
                Turning <span className="text-mint">Ideas</span> Into Powerful{" "}
                <span className="text-purple">Digital Solutions</span>
              </h2>
              <p className="services-lead">
                End-to-end development — from architecture and UI to deployment and long-term support.
              </p>
              <a href="#projects" className="btn btn-mint">
                Explore My Work
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </FadeIn>

          <div className="services-grid">
            {services.map((s, i) => (
              <FadeIn key={s.title} y={24} delay={i * 0.05}>
                <motion.article
                  className="service-card"
                  whileHover={reduce ? undefined : { y: -6, borderColor: "rgba(127,255,212,0.25)" }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="service-icon" style={{ background: `${s.accent}15`, color: s.accent }}>
                    <s.Icon size={ICON_SIZE_LG} strokeWidth={2} />
                  </span>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-body">{s.body}</p>
                </motion.article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
