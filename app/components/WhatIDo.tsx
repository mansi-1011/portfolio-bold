"use client"
import { motion, useReducedMotion } from "framer-motion"
import { aboutCards, achievements } from "@/lib/data"
import { ArrowRight, ICON_SIZE_LG, serviceIcons } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

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
          <Stagger className="services-intro">
            <StaggerItem>
              <h2 className="services-heading">
                Turning <span className="text-mint">Ideas</span> Into Powerful{" "}
                <span className="text-purple">Digital Solutions</span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="services-lead">
                End-to-end development — from architecture and UI to deployment and long-term support.
              </p>
            </StaggerItem>
            <StaggerItem>
              <a href="#projects" className="btn btn-mint btn-glow btn-arrow-wrap" data-cursor="hover">
                Explore My Work
                <ArrowRight size={16} strokeWidth={2} className="btn-arrow" />
              </a>
            </StaggerItem>
          </Stagger>

          <Stagger className="services-grid" fast>
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <motion.article
                  className="service-card"
                  data-cursor="hover"
                  whileHover={
                    reduce
                      ? undefined
                      : { y: -6, borderColor: "rgba(127,255,212,0.25)" }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className="service-icon"
                    style={{ background: `${s.accent}15`, color: s.accent }}
                    whileHover={reduce ? undefined : { rotate: 8, scale: 1.06 }}
                    animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                    transition={{
                      rotate: { duration: 0.35 },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <s.Icon size={ICON_SIZE_LG} strokeWidth={2} />
                  </motion.span>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-body">{s.body}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </AnimatedSection>
  )
}
