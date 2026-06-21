import Nav from "./components/Nav"
import Hero from "./components/Hero"
import TrustMetrics from "./components/TrustMetrics"
import WhatIDo from "./components/WhatIDo"
import Projects from "./components/Projects"
import ExperienceSkills from "./components/ExperienceSkills"
import Process from "./components/Process"
import Achievements from "./components/Achievements"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="site-main">
      <Nav />
      <Hero />
      <TrustMetrics />
      <WhatIDo />
      <Projects />
      <ExperienceSkills />
      <Process />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  )
}
