import { useState } from 'react'

const BASE_URL = import.meta.env.BASE_URL

function Introduction() {
  const [downloadError, setDownloadError] = useState(false)

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setDownloadError(false)
    try {
      const res = await fetch(`${BASE_URL}cv.pdf`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'JohnCarlo_Velasquez_CV.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('CV download failed:', err)
      setDownloadError(true)
      // Fall back to a plain navigation so the browser's own PDF viewer can still open it.
      window.open(`${BASE_URL}cv.pdf`, '_blank', 'noopener')
    }
  }

  return (
    <section
      id="intro"
      className="hero-glow min-h-[90vh] flex items-center p-4 sm:p-8"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[3fr_2fr] gap-10 sm:gap-16 items-center">
        <div className="animate-slide-up order-2 md:order-1">
          <p className="text-indigo-400 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3">
            Hi, I'm
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text">
            JC Velasquez
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-6 font-light">
            Full-Stack Engineering Lead & Scrum Master
          </p>
          <p className="text-gray-400 leading-relaxed mb-8 text-sm sm:text-base max-w-lg">
            10+ years building web, mobile & cloud solutions. AWS Certified.
            React, Next.js, Node.js, Python. I architect, lead, ship, and automate.
          </p>
          <a
            href={`${BASE_URL}cv.pdf`}
            onClick={handleDownload}
            className="btn-glow inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-semibold rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
          {downloadError && (
            <p className="text-red-400 text-xs mt-3">
              Direct download failed — opened the CV in a new tab instead. You can save it from there.
            </p>
          )}
        </div>

        <div className="flex justify-center md:justify-end animate-fade-in order-1 md:order-2" style={{ animationDelay: '0.15s' }}>
          <img
            src={`${BASE_URL}avatar.png`}
            alt="JC Velasquez"
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover ring-1 ring-white/10 shadow-2xl shadow-indigo-950/50"
          />
        </div>
      </div>
    </section>
  )
}

export default Introduction
