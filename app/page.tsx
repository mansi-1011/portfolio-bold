import Nav from "./components/Nav"
import Hero from "./components/Hero"
import TrustMetrics from "./components/TrustMetrics"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Testimonials from "./components/Testimonials"
import Process from "./components/Process"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="site-main">
      <Nav />
      <Hero />
      <TrustMetrics />
      <Projects />
      <Experience />
      <Skills />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}
