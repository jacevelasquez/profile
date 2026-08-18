import { useState } from 'react'
import Section from './Section'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error('Missing VITE_WEB3FORMS_ACCESS_KEY — contact form cannot send.')
      setStatus('error')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', `New message from ${formData.get('name')} via portfolio site`)

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const details = [
    { label: 'Email', value: 'jace.velasquez@yahoo.com', href: 'mailto:jace.velasquez@yahoo.com' },
    { label: 'Phone', value: '+63 (977) 440-5218', href: 'tel:+639774405218' },
    { label: 'LinkedIn', value: 'linkedin.com/in/jc-velasquez', href: 'https://linkedin.com/in/jc-velasquez', external: true },
    { label: 'GitHub', value: 'github.com/jacevelasquez', href: 'https://github.com/jacevelasquez', external: true },
    { label: 'Location', value: 'Calamba, Laguna, Philippines' },
  ]

  return (
    <Section id="contact" eyebrow="Let's talk" title="Contact Me" wide>
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-gray-400 mb-1.5 text-xs">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-gray-400 mb-1.5 text-xs">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-gray-400 mb-1.5 text-xs">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-glow w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-sm font-semibold"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="text-green-400 text-sm">Message sent — thanks! I'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">
              Something went wrong sending your message. Please email me directly at{' '}
              <a href="mailto:jace.velasquez@yahoo.com" className="underline">jace.velasquez@yahoo.com</a> instead.
            </p>
          )}
        </form>

        <div className="space-y-5">
          {details.map((d) => (
            <div key={d.label}>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{d.label}</p>
              {d.href ? (
                <a
                  href={d.href}
                  {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-gray-200 text-sm hover:text-indigo-400 transition-colors"
                >
                  {d.value}
                </a>
              ) : (
                <p className="text-gray-200 text-sm">{d.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Contact
