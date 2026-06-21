"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { achievements } from "@/lib/data"
import { ChevronLeft, ChevronRight, Star } from "@/lib/icons"
import SectionHeader from "./SectionHeader"
import AnimatedSection from "./AnimatedSection"

const ACCENTS: Record<string, string> = {
  "#7FFFD4": "#7FFFD4",
  "#FF7E87": "#FF7E87",
  "#FFC857": "#FFC857",
  "#B48EF7": "#B48EF7",
}

function avatarFrom(title: string) {
  return title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 })

  const scroll = useCallback(
    (dir: number) => {
      trackRef.current?.scrollBy({ left: dir * 420, behavior: reduce ? "auto" : "smooth" })
    },
    [reduce]
  )

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" })
      else el.scrollBy({ left: 380, behavior: "smooth" })
    }, 4500)
    return () => clearInterval(id)
  }, [reduce, paused])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onDown = (e: MouseEvent) => {
      dragRef.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
      el.classList.add("is-dragging")
    }
    const onUp = () => {
      dragRef.current.isDown = false
      el.classList.remove("is-dragging")
    }
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX) * 1.2
    }

    el.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    el.addEventListener("mousemove", onMove)
    return () => {
      el.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      el.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <AnimatedSection id="testimonials" className="section">
      <div className="section-inner">
        <SectionHeader label="Impact" title="What I've delivered" subtitle="Standout outcomes from production projects" accent="#FBBF24" />

        <div className="testimonial-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div ref={trackRef} className="testimonial-track">
            {achievements.map((item) => {
              const color = ACCENTS[item.accent] ?? item.accent
              return (
                <motion.article
                  key={item.title}
                  className="testimonial-card"
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="testimonial-top">
                    <div className="testimonial-avatar" style={{ background: `${color}12`, color, boxShadow: `0 0 32px ${color}20` }}>
                      {avatarFrom(item.title)}
                    </div>
                    <div>
                      <h4 className="testimonial-name">{item.title}</h4>
                      <p className="testimonial-role">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="testimonial-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} strokeWidth={2} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="testimonial-quote">&ldquo;{item.description}&rdquo;</blockquote>
                  <p className="testimonial-company" style={{ color }}>{item.subtitle}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="carousel-nav">
            <button type="button" className="carousel-btn" onClick={() => scroll(-1)} aria-label="Previous">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button type="button" className="carousel-btn" onClick={() => scroll(1)} aria-label="Next">
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
