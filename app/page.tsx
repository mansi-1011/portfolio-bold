import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Achievements from "./components/Achievements"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Contact from "./components/Contact"
import { personalInfo } from "@/lib/data"

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
      <footer
        style={{
          background: "#0A0A0F",
          borderTop: "1px solid #1e1e2e",
          padding: "2rem",
          textAlign: "center",
          color: "#6b6f7e",
          fontSize: "0.8rem",
          fontFamily: "monospace",
        }}
      >
        Built with Next.js · {personalInfo.name} © {new Date().getFullYear()}
      </footer>
    </main>
  )
}
