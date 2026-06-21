"use client"
import { achievements } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import SpotlightCard from "./SpotlightCard"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

export default function Achievements() {
  return (
    <AnimatedSection id="achievements" className="section">
      <div className="section-inner">
        <SectionHeader
          label="// Highlights"
          title="Career Highlights"
          subtitle="Production experience, leadership, and standout technical work"
          accent="#FFC857"
        />

        <Stagger className="card-grid card-grid-sm">
          {achievements.map((item, i) => (
            <StaggerItem key={item.title}>
              <SpotlightCard accent={item.accent} className="highlight-card">
                <div className="card-accent-bar" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
                <div className="highlight-num" style={{ color: item.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="card-title-sm">{item.title}</h3>
                <p className="card-subtitle" style={{ color: item.accent }}>
                  {item.subtitle}
                </p>
                <p className="card-body">{item.description}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </AnimatedSection>
  )
}
