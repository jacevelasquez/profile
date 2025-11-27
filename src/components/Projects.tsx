import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-400 mb-8">Personal Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.disabled ? undefined : project.link}
              className={`p-6 rounded-xl text-center transition-all ${
                project.disabled
                  ? "bg-slate-800/50 text-gray-500 cursor-not-allowed"
                  : "bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
              }`}
            >
              {project.icon ? (
                <img 
                  src={project.icon} 
                  alt={project.title} 
                  className="w-64 h-100 mx-auto mb-4 rounded-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center">
                  <span className="text-4xl">?</span>
                </div>
              )}
              <h3 className="text-xl font-bold">{project.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
