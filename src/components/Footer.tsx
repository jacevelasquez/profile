function Footer() {
  return (
    <footer className="p-6 border-t border-slate-800 text-center">
      <p className="text-gray-400">
        © {new Date().getFullYear()} John Carlo Velasquez. All rights reserved.
        <span className="text-gray-500 text-sm ml-5">Built with React & Tailwind CSS</span>
      </p>
    </footer>
  )
}

export default Footer

