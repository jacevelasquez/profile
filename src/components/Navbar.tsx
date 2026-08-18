import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: "Home", href: "#intro" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Credentials", href: "#credentials" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 p-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#intro" className="text-lg font-bold text-slate-400">
          JC
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-300 hover:text-slate-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-gray-300 hover:text-slate-400 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden max-w-6xl mx-auto flex flex-col gap-1 pt-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-gray-300 hover:text-slate-400 transition-colors py-2 px-1"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
