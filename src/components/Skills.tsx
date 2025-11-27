import { skills } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-400 mb-8">Technical Skills</h2>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="border-l-2 border-slate-600 pl-6">
              <h3 className="text-xl font-bold text-white mb-3">{skill.category}</h3>
              <div className="flex flex-wrap gap-4">
                {skill.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 px-3 py-2 bg-slate-800 rounded-lg text-gray-200 hover:bg-slate-700 transition-colors"
                  >
                    {item.logo && (
                      <img 
                        src={item.logo} 
                        alt={`${item.name} logo`}
                        className="w-7 h-7 object-contain"
                      />
                    )}
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
