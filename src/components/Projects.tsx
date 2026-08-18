import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Section from './Section'

const BASE_URL = import.meta.env.BASE_URL

function Projects() {
  return (
    <Section id="projects" eyebrow="On the side" title="Personal Projects" wide>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => {
          const cardClass = `p-6 rounded-xl border text-center transition-colors ${
            project.disabled
              ? "border-slate-800/60 text-gray-600 cursor-not-allowed"
              : "border-slate-800 hover:border-slate-600 text-white cursor-pointer"
          }`

          const cardContent = (
            <>
              {project.icon ? (
                <img
                  src={BASE_URL + project.icon}
                  alt={project.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-lg object-contain opacity-90"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center">
                  <span className="text-2xl text-slate-600">?</span>
                </div>
              )}
              <h3 className="text-sm sm:text-base font-bold">{project.title}</h3>
              <span className="text-xs sm:text-sm text-gray-500">{project.desc}</span>
            </>
          )

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
    </Section>
  )
}

export default Projects
