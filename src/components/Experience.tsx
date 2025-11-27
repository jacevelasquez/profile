import { experiences } from '../data/experiences'

function Experience() {
  return (
    <section id="experience" className="min-h-screen p-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-400 mb-8">Professional Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-slate-600 pl-6">
              <h3 className="text-xl font-bold text-white">{exp.company}</h3>
              <p className="text-slate-400 font-medium">{exp.role}</p>
              <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
              
              {exp.previousRoles && (
                <div className="mb-2 text-sm text-gray-400">
                  {exp.previousRoles.map((prev, i) => (
                    <p key={i}>{prev.role} | {prev.period}</p>
                  ))}
                </div>
              )}
              
              <ul className="space-y-2 mt-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-slate-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
