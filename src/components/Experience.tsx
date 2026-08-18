import { experiences } from '../data/experiences'
import Section from './Section'

function Experience() {
  return (
    <Section id="experience" eyebrow="Where I've been" title="Professional Experience">
      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-slate-800 pl-5">
            <h3 className="text-base font-bold text-white">{exp.company}</h3>
            <p className="text-indigo-400 text-sm font-medium">{exp.role}</p>
            <p className="text-gray-500 text-xs mb-2">{exp.period}</p>

            {exp.previousRoles && (
              <div className="mb-2 text-xs text-gray-500">
                {exp.previousRoles.map((prev, i) => (
                  <p key={i}>{prev.role} | {prev.period}</p>
                ))}
              </div>
            )}

            <ul className="space-y-1.5 mt-3">
              {exp.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                  <span className="mt-2 w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Experience
