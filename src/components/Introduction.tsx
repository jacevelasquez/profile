function Introduction() {
  return (
    <section 
      id="intro" 
      className="min-h-screen p-8 flex items-center relative overflow-hidden"
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-intro.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-900/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="glass-card p-10 rounded-2xl animate-slide-up">
          <p className="text-indigo-400 font-medium tracking-wider uppercase text-sm mb-3">
            Hi, I'm
          </p>
          <h1 className="text-6xl font-bold mb-4 gradient-text">
            JC Velasquez
          </h1>
          <p className="text-2xl text-white/90 mb-6 font-light">
            Full Stack Developer
          </p>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            8+ years building web, mobile & cloud solutions. AWS Certified. 
            React, Node.js, Python. I architect, ship, and automate.
          </p>
          <a 
            href="/cv.pdf" 
            download
            className="btn-glow inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full animate-pulse-glow" />
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-full border-2 border-indigo-500/30 animate-float" />
            <div className="absolute -inset-8 rounded-full border border-purple-500/20" style={{ animationDelay: '1s' }} />
            <img 
              src="/avatar.png" 
              alt="JC Velasquez" 
              className="w-80 h-80 rounded-full object-cover relative z-10 border-4 border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduction
