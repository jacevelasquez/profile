import { Link } from 'react-router-dom'

const BASE_URL = import.meta.env.BASE_URL

function MonsterHunterDatabase() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <Link 
          to="/#projects" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">
          <div className="mb-8 flex justify-center">
            <img 
              src={BASE_URL + "/mh.webp"} 
              alt="Monster Hunter Database"
              className="w-64 h-64 object-contain rounded-xl"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-200 mb-4">Monster Hunter Database</h1>
          <p className="text-lg text-gray-400 mb-8">
            Your ultimate companion for Monster Hunter Wilds — monsters, weapons, armor & more
          </p>
          
          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-2xl font-semibold text-slate-300 mb-4">About This Project</h2>
            <p className="text-gray-400 mb-4">
              A detailed database application for Monster Hunter Wilds, providing hunters with 
              all the information they need to prepare for their hunts.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-300 mb-3 mt-6">Features</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Complete monster bestiary with weaknesses and drops</li>
              <li>Weapon trees and upgrade paths</li>
              <li>Armor set builder with skill calculations</li>
              <li>Item and material database</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-300 mb-3 mt-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400">React</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400">TypeScript</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400">Tailwind CSS</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400">Vite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonsterHunterDatabase

