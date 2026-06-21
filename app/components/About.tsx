"use client"
import { aboutCards, personalInfo } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

const ACCENT_MAP: Record<string, string> = {
  "#7FFFD4": "#6EF7D8",
  "#FF7E87": "#F472B6",
  "#B48EF7": "#8B5CF6",
}

export default function About() {
  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <AnimatedSection id="about" className="section section-alt">
      <div className="section-inner">
        <SectionHeader
          label="About Me"
          title={`Hi, I'm ${personalInfo.name.split(" ")[0]}`}
          subtitle="Lead developer focused on scalable architecture and production-ready delivery"
          accent="#8B5CF6"
        />

        <div className="about-split">
          <FadeIn y={24}>
            <div className="about-visual">
              <div className="about-image-glow" />
              <div className="about-image-wrap">
                <div className="about-image-inner">{initials}</div>
              </div>
              <div className="about-stats-row">
                <div className="about-stat-chip">
                  <strong>5+</strong>
                  <span>Years Exp.</span>
                </div>
                <div className="about-stat-chip">
                  <strong>11+</strong>
                  <span>Projects</span>
                </div>
                <div className="about-stat-chip">
                  <strong>4</strong>
                  <span>Cloud Platforms</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn y={24} delay={0.08}>
            <div className="about-content">
              <h3>Building products that scale</h3>
              <p className="section-lead" style={{ textAlign: "left", maxWidth: "none" }}>
                {personalInfo.about}
              </p>

              <div className="about-highlights">
                {aboutCards.map((card) => {
                  const accent = ACCENT_MAP[card.accent] ?? card.accent
                  return (
                    <a key={card.title} href={card.href} className="about-highlight">
                      <div className="about-highlight-eyebrow" style={{ color: accent }}>
                        {card.eyebrow}
                      </div>
                      <p className="about-highlight-title">{card.title}</p>
                      <p className="about-highlight-body">{card.body}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  )
}
