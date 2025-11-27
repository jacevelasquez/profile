function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! (Add your backend logic here)')
  }

  return (
    <section id="contact" className="min-h-screen p-8 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-400 mb-8">Contact Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={5}
                  required
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-slate-400 resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full p-3 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">My Details</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-2xl">📧</span>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:jace.velasquez@yahoo.com" className="text-gray-200 hover:text-slate-400">
                    jace.velasquez@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-2xl">📞</span>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+639774405218" className="text-gray-200 hover:text-slate-400">
                    +63 (977) 440-5218
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-2xl">💼</span>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <a href="https://linkedin.com/in/jc-velasquez" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-slate-400">
                    linkedin.com/in/jc-velasquez
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-2xl">🐙</span>
                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <a href="https://github.com/jacevelasquez" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-slate-400">
                    github.com/jacevelasquez
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-2xl">📍</span>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-gray-200 hover:text-slate-400">Calamba, Laguna, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
