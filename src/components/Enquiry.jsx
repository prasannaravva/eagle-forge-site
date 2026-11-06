import { useId, useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

export default function Enquiry() {
  const { enquiry } = site
  const [picked, setPicked] = useState(['tally', 'whatsapp'])
  const [name, setName] = useState('')
  const [reach, setReach] = useState('')
  const ids = { name: useId(), reach: useId(), flows: useId() }

  const flows = useMemo(() => enquiry.flows.filter((f) => f.needs.every((n) => picked.includes(n))), [picked, enquiry.flows])
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const mailto = useMemo(() => {
    const tools = enquiry.tools.filter((t) => picked.includes(t.id)).map((t) => t.label)
    const body = [
      `Name: ${name || '(not given)'}`,
      `Phone or email: ${reach || '(not given)'}`,
      '',
      `Tools we use: ${tools.length ? tools.join(', ') : '(none ticked)'}`,
      '',
      'Connections we are interested in:',
      ...flows.map((f) => `- ${f.text}`),
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry from ${name || 'the website'}`)}&body=${encodeURIComponent(body)}`
  }, [name, reach, picked, flows, enquiry.tools])

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="glow-crimson pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[900px] -translate-x-1/2 blur-3xl" />
      <div className="container-x">
        <Reveal className="text-center">
          <h2 id="contact-title" className="text-[clamp(2.75rem,1.4rem+5vw,5.5rem)] font-bold leading-[0.95] tracking-display">
            <span className="block">{enquiry.heading[0]}</span>
            <span className="text-gradient block pb-[0.08em]">{enquiry.heading[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[17px] text-white/55">{enquiry.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-[920px]">
          <div className="rounded-3xl bg-panel/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-8">
            <fieldset>
              <legend className="text-[14px] text-white/50">What does your business run on today?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {enquiry.tools.map((t) => {
                  const on = picked.includes(t.id)
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(t.id)}
                      className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-medium ring-1 ring-inset transition-all duration-300 active:scale-[0.97] ${
                        on ? 'bg-white text-bg ring-white' : 'bg-white/[0.03] text-white/70 ring-white/10 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-crimson' : 'bg-white/25'}`} aria-hidden="true" />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div id={ids.flows} aria-live="polite" className="mt-6 rounded-2xl bg-white/[0.025] p-5 ring-1 ring-inset ring-white/[0.06]">
              <p className="text-[14px] font-medium text-white/80">
                {flows.length === 0 ? 'Tick a tool to see what we would connect.' : `${flows.length} connection${flows.length > 1 ? 's' : ''} we would set up`}
              </p>
              <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                <AnimatePresence initial={false}>
                  {flows.map((f) => (
                    <m.li
                      key={f.text}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2.5 text-[14px] leading-snug text-white/65"
                    >
                      <svg viewBox="0 0 12 12" className="mt-[3px] h-3 w-3 shrink-0 text-ok" aria-hidden="true">
                        <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f.text}
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <form
              className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = mailto
              }}
              aria-describedby={ids.flows}
            >
              <div>
                <label htmlFor={ids.name} className="sr-only">
                  Your name
                </label>
                <input
                  id={ids.name}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 w-full rounded-full bg-white/[0.04] px-5 text-[15px] text-white ring-1 ring-inset ring-white/10 transition placeholder:text-white/35 focus:bg-white/[0.07] focus:outline-none focus:ring-white/30"
                />
              </div>
              <div>
                <label htmlFor={ids.reach} className="sr-only">
                  Phone or email
                </label>
                <input
                  id={ids.reach}
                  autoComplete="email"
                  value={reach}
                  onChange={(e) => setReach(e.target.value)}
                  placeholder="Phone or email"
                  className="h-12 w-full rounded-full bg-white/[0.04] px-5 text-[15px] text-white ring-1 ring-inset ring-white/10 transition placeholder:text-white/35 focus:bg-white/[0.07] focus:outline-none focus:ring-white/30"
                />
              </div>
              <button type="submit" className="btn-primary h-12 justify-center px-7">
                Send enquiry <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-4 text-center text-[13px] text-white/35">Opens your email app with your answers filled in.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
