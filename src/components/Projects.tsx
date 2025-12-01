import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const BASE_URL = import.meta.env.BASE_URL

function Projects() {
  return (
    <section id="projects" className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-400 mb-8">Personal Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const cardContent = (
              <>
                <div className="flex-1 flex items-center justify-center mb-4">
                  {project.icon ? (
                    <img 
                      src={BASE_URL + project.icon} 
                      alt={project.title} 
                      className="w-full h-48 rounded-lg object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center">
                      <span className="text-4xl">?</span>
                    </div>
                  )}
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 text-wrap text-left">{project.desc}</p>
                </div>
              </>
            )

            const cardClass = `p-6 rounded-xl text-center transition-all flex flex-col ${
              project.disabled
                ? "bg-slate-800/50 text-gray-500 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
            }`

            if (project.disabled) {
              return (
                <div key={index} className={cardClass}>
                  {cardContent}
                </div>
              )
            }

            return (
              <Link key={index} to={`/projects/${project.slug}`} className={cardClass}>
                {cardContent}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
