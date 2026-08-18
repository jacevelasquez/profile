function Footer() {
  return (
    <footer className="p-6 border-t border-slate-800/60 text-center">
      <p className="text-gray-400 text-xs sm:text-sm flex flex-col sm:flex-row sm:justify-center sm:gap-5 gap-1">
        <span>© {new Date().getFullYear()} John Carlo Velasquez. All rights reserved.</span>
        <span className="text-gray-500">Built with React & Tailwind CSS</span>
      </p>
    </footer>
  )
}

export default Footer

