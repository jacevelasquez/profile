import { skills } from '../data/skills'
import Section from './Section'

function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Technical Skills" wide>
      <div className="space-y-8">
        {skills.map((skill, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-gray-300 hover:border-slate-600 transition-colors"
                >
                  {item.logo && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/90 shrink-0">
                      <img
                        src={item.logo}
                        alt=""
                        className="w-3 h-3 object-contain"
                      />
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
