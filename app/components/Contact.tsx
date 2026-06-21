"use client"
import { FormEvent, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import AnimatedSection from "./AnimatedSection"
import { FadeIn } from "./motion/Stagger"

function FloatField({
  name,
  label,
  type = "text",
  required,
  rows,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  rows?: number
}) {
  const Tag = rows ? "textarea" : "input"
  return (
    <label className="float-field">
      <Tag
        name={name}
        type={rows ? undefined : type}
        required={required}
        rows={rows}
        placeholder=" "
        className={`float-input${rows ? " float-input--area" : ""}`}
      />
      <span className="float-label">{label}</span>
    </label>
  )
}

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
    <AnimatedSection id="contact" className="section section-contact">
      <div className="section-inner">
        <div className="contact-split">
          <FadeIn y={32}>
            <div className="contact-left">
              <p className="contact-eyebrow">Get in touch</p>
              <h2 className="contact-headline">
                Let&apos;s build something <span className="gradient-text">amazing</span>
              </h2>
              <p className="contact-desc">{personalInfo.availability}</p>

              <div className="contact-links">
                <a href={`mailto:${personalInfo.email}`} className="contact-link">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">{personalInfo.email}</span>
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-value">linkedin.com/in/mansipatoliya</span>
                </a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-value">github.com/mansipatoliya</span>
                </a>
                <div className="contact-link contact-link--static">
                  <span className="contact-link-label">Location</span>
                  <span className="contact-link-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn y={32} delay={0.1}>
            <form onSubmit={handleSubmit} className="contact-form">
              <FloatField name="name" label="Your name" required />
              <FloatField name="email" label="Email address" type="email" required />
              <FloatField name="message" label="Project details" rows={5} required />
              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                whileHover={reduce ? undefined : { scale: 1.02, boxShadow: "0 12px 40px rgba(110,247,216,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send message
              </motion.button>
              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="form-success">
                    Opening your email client…
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  )
}
