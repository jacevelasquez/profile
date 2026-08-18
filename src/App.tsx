import Navbar from './components/Navbar'
import Introduction from './components/Introduction'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Credentials from './components/Credentials'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
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

export default App
