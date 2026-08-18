import { projects } from '../data/projects'
import Section from './Section'

const BASE_URL = import.meta.env.BASE_URL

function Projects() {
  return (
    <Section id="projects" eyebrow="On the side" title="Personal Projects" wide>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => {
          const clickable = !project.disabled && !!project.link
          const Wrapper = clickable ? 'a' : 'div'
          return (
            <Wrapper
              key={index}
              {...(clickable ? { href: project.link! } : {})}
              className={`p-6 rounded-xl border text-center transition-colors ${
                project.disabled
                  ? "border-slate-800/60 text-gray-600 cursor-not-allowed"
                  : clickable
                  ? "border-slate-800 hover:border-slate-600 text-white cursor-pointer"
                  : "border-slate-800 text-white"
              }`}
            >
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
              {!project.disabled && !project.link && (
                <p className="text-xs text-gray-600 mt-1">Link coming soon</p>
              )}
            </Wrapper>
          )
        })}
      </div>
    </Section>
  )
}

export default Projects
