import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Introduction from './components/Introduction'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Credentials from './components/Credentials'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PokemonDatabase from './components/projects/PokemonDatabase'
import MonsterHunterDatabase from './components/projects/MonsterHunterDatabase'

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Introduction />
      <Skills />
      <Experience />
      <Credentials />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/pokemon-database" element={<PokemonDatabase />} />
      <Route path="/projects/monster-hunter-database" element={<MonsterHunterDatabase />} />
    </Routes>
  )
}

export default App
