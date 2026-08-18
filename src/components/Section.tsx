import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  wide?: boolean
}

function Section({ id, eyebrow, title, children, wide }: SectionProps) {
  return (
    <section id={id} className="py-16 sm:py-24 px-4 sm:px-8 border-t border-slate-800/60">
      <div className={wide ? 'max-w-5xl mx-auto' : 'max-w-3xl mx-auto'}>
        <div className="mb-10 sm:mb-12">
          <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-2">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export default Section
