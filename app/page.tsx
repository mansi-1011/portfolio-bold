import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Achievements from "./components/Achievements"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Achievements />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
