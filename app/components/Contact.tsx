"use client"
import { FormEvent, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { Check, Clock, ICON_SIZE_LG } from "@/lib/icons"
import AnimatedSection from "./AnimatedSection"
import { Stagger, StaggerItem } from "./motion/Stagger"

function MagneticSubmit({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })

  function onMove(e: React.MouseEvent) {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="submit"
      className="btn btn-mint btn-full btn-glow"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-cursor="hover"
    >
      <span className="btn-shine" aria-hidden />
      {children}
    </motion.button>
  )
}

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
          <Stagger>
            <StaggerItem>
              <div className="contact-v2-info">
                <p className="eyebrow">Contact</p>
                <h2 className="section-h2">Have a Project in Mind?</h2>
                <div className="contact-v2-items">
                  <div className="contact-v2-item">
                    <span>Email</span>
                    <a href={`mailto:${personalInfo.email}`} data-cursor="hover">
                      {personalInfo.email}
                    </a>
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
            </StaggerItem>
          </Stagger>

          <Stagger delay={0.06}>
            <StaggerItem>
              <form onSubmit={handleSubmit} className="contact-v2-form">
                <label className="field-float">
                  <input name="name" required placeholder=" " autoComplete="name" />
                  <span>Name</span>
                </label>
                <label className="field-float">
                  <input name="email" type="email" required placeholder=" " autoComplete="email" />
                  <span>Email</span>
                </label>
                <label className="field-float field-float--select">
                  <select name="type" required defaultValue="">
                    <option value="" disabled />
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend / API">Backend / API</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                  <span>Project Type</span>
                </label>
                <label className="field-float">
                  <textarea name="message" required rows={4} placeholder=" " />
                  <span>Message</span>
                </label>
                <MagneticSubmit>Send Message</MagneticSubmit>
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      className="form-success"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.45 }}
                    >
                      <motion.span
                        className="form-success-icon"
                        initial={reduce ? false : { scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      >
                        <Check size={18} strokeWidth={2.5} />
                      </motion.span>
                      <span>Opening your email client…</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </StaggerItem>
          </Stagger>

          <Stagger delay={0.1}>
            <StaggerItem>
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
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </AnimatedSection>
  )
}
