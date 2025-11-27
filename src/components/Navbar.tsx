function Navbar() {
  const links = [
    { name: "Home", href: "#intro" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 p-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#intro" className="text-xl font-bold text-slate-400">
          JC
        </a>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-slate-400 transition-colors ml-5"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

