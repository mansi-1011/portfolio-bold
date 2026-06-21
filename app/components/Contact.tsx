"use client"
import { FormEvent, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { personalInfo, socialLinks } from "@/lib/data"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"
import { FadeIn, Stagger, StaggerItem } from "./motion/Stagger"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const reduce = useReducedMotion()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <AnimatedSection id="contact" className="section section-alt">
      <div className="section-inner-narrow">
        <SectionHeader
          label="// Contact"
          title="Let's build something amazing together"
          subtitle="Reach out for freelance work, collaborations, or full-time opportunities"
          accent="#7FFFD4"
        />

        <Stagger className="contact-cards">
          {[
            { label: "Mail me at", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "#7FFFD4" },
            { label: "Call me at", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}`, color: "#FF7E87" },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <a href={item.href} className="contact-card">
                <div className="contact-card-label">{item.label}</div>
                <div className="contact-card-value" style={{ color: item.color }}>
                  {item.value}
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.08}>
          <div className="social-row">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="social-pill">
                {link.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <form onSubmit={handleSubmit} className="contact-form">
            <p className="form-title">Leave me a brief message</p>
            <input name="name" required placeholder="Your name" className="field" />
            <input name="email" type="email" required placeholder="Email" className="field" />
            <textarea name="message" required rows={4} placeholder="Briefly describe your project idea..." className="field field-textarea" />
            <motion.button
              type="submit"
              className="btn btn-primary form-submit"
              whileHover={reduce ? undefined : { scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
            <AnimatePresence>
              {sent && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="form-success">
                  Opening your email client…
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </AnimatedSection>
  )
}
