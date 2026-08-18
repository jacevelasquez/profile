import { certifications, education } from '../data/credentials'
import Section from './Section'

function Credentials() {
  return (
    <Section id="credentials" eyebrow="Qualifications" title="Certifications & Education">
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Certifications</h3>
          <ul className="space-y-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-indigo-400">✓</span>
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Education</h3>
          <ul className="space-y-3">
            {education.map((edu, i) => (
              <li key={i}>
                <p className="text-gray-200 text-sm font-medium">{edu.degree}</p>
                <p className="text-gray-500 text-xs">{edu.school}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Credentials
