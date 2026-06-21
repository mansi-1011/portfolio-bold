"use client"
import { aboutCards, personalInfo } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import SpotlightCard from "./SpotlightCard"
import AnimatedSection from "./AnimatedSection"
import { FadeIn, Stagger, StaggerItem } from "./motion/Stagger"

export default function About() {
  return (
    <AnimatedSection id="about" className="section section-alt">
      <div className="section-inner">
        <SectionHeader label="// About Me" title={`Hi! I'm ${personalInfo.name.split(" ")[0]}`} accent="#B48EF7" />

        <FadeIn y={24}>
          <p className="section-lead">{personalInfo.about}</p>
        </FadeIn>

        <Stagger className="card-grid">
          {aboutCards.map((card) => (
            <StaggerItem key={card.title}>
              <SpotlightCard accent={card.accent} className="about-card">
                <span className="card-eyebrow" style={{ color: card.accent }}>
                  {card.eyebrow}
                </span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-body">{card.body}</p>
                <a href={card.href} className="card-link" style={{ color: card.accent }}>
                  {card.cta} →
                </a>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
