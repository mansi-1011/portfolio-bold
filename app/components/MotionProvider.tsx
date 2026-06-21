"use client"
import { AnimatePresence, MotionConfig } from "framer-motion"
import { createContext, useContext, useState, type ReactNode } from "react"
import CustomCursor from "./CustomCursor"
import PageLoader from "./PageLoader"
import SmoothScroll from "./motion/SmoothScroll"

const PageReadyContext = createContext(false)

export function usePageReady() {
  return useContext(PageReadyContext)
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <PageReadyContext.Provider value={ready}>
        <AnimatePresence mode="wait">{!ready && <PageLoader onComplete={() => setReady(true)} />}</AnimatePresence>
        <SmoothScroll>
          <div className={ready ? "site-ready" : "site-loading"}>{children}</div>
        </SmoothScroll>
        {ready && <CustomCursor />}
      </PageReadyContext.Provider>
    </MotionConfig>
  )
}
