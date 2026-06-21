"use client"
import { FormEvent, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { Clock, ICON_SIZE_LG } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const reduce = useReducedMotion()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const type = String(data.get("type") ?? "")
    const message = String(data.get("message") ?? "")
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\n${message}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <AnimatedSection id="contact" className="section section-contact-v2">
      <div className="section-inner">
        <div className="contact-v2-grid">
          <FadeIn y={28}>
            <div className="contact-v2-info">
              <p className="eyebrow">Contact</p>
              <h2 className="section-h2">Have a Project in Mind?</h2>
              <div className="contact-v2-items">
                <div className="contact-v2-item">
                  <span>Email</span>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
                <div className="contact-v2-item">
                  <span>Location</span>
                  <p>{personalInfo.location}</p>
                </div>
                <div className="contact-v2-item">
                  <span>Availability</span>
                  <p>{personalInfo.availability}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.06}>
            <form onSubmit={handleSubmit} className="contact-v2-form">
              <label className="field-v2">
                <span>Name</span>
                <input name="name" required placeholder="Your name" />
              </label>
              <label className="field-v2">
                <span>Email</span>
                <input name="email" type="email" required placeholder="you@email.com" />
              </label>
              <label className="field-v2">
                <span>Project Type</span>
                <select name="type" required defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option value="Full-Stack Web App">Full-Stack Web App</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend / API">Backend / API</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </label>
              <label className="field-v2">
                <span>Message</span>
                <textarea name="message" required rows={4} placeholder="Tell me about your project…" />
              </label>
              <motion.button
                type="submit"
                className="btn btn-mint btn-full"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
              {sent && <p className="form-ok">Opening your email client…</p>}
            </form>
          </FadeIn>

          <FadeIn y={28} delay={0.1}>
            <div className="contact-v2-aside">
              <div className="response-card">
                <span className="response-icon">
                  <Clock size={ICON_SIZE_LG} strokeWidth={2} />
                </span>
                <div>
                  <strong>Response Time</strong>
                  <p>I usually reply within 24 hours</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  )
}
