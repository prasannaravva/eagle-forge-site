import { useId, useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Sparkles } from 'lucide-react'
import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

/**
 * Contact: office details on the left; on the right the visitor ticks the tools they run, sees
 * the connections we would set up, and sends an enquiry email with their answers filled in.
 */
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

  const field =
    'h-11 w-full rounded-md border border-line bg-card px-3.5 text-[15px] text-white placeholder:text-muted/80 transition-[border-color,box-shadow] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20'

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left: who and where */}
            <div className="flex flex-col gap-8 border-b border-line bg-panel p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div>
                <p className="eyebrow">Get in touch</p>
                <h2 id="contact-title" className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
                  {enquiry.heading[0]} <span className="text-crimson">{enquiry.heading[1]}</span>
                </h2>
                <p className="mt-4 max-w-[30rem] text-[16.5px] leading-relaxed text-muted">{enquiry.sub}</p>
              </div>
              <ul className="space-y-5 text-[15px]">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-crimson" aria-hidden="true" />
                  <span>
                    <span className="block font-display font-semibold text-white">Eagle Nexa</span>
                    <span className="text-muted">{site.address.join(', ')}</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-crimson" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="text-white underline decoration-line underline-offset-4 hover:decoration-crimson [overflow-wrap:anywhere]">
                    {site.email}
                  </a>
                </li>
              </ul>
              <div className="mt-auto rounded-md border border-line bg-card p-4 text-[14px] text-muted">
                <span className="font-display font-semibold text-white">On-site setup</span> across Vijayawada, Guntur and the Krishna district. Remote setup anywhere.
              </div>
            </div>

            {/* Right: the form */}
            <div className="p-7 sm:p-10">
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  window.location.href = mailto
                }}
                aria-describedby={ids.flows}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={ids.name} className="font-display text-[13.5px] font-medium text-white">
                      Your name
                    </label>
                    <input id={ids.name} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ramesh Varma" className={`${field} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor={ids.reach} className="font-display text-[13.5px] font-medium text-white">
                      Phone or email
                    </label>
                    <input id={ids.reach} autoComplete="email" value={reach} onChange={(e) => setReach(e.target.value)} placeholder="+91 or you@business.in" className={`${field} mt-1.5`} />
                  </div>
                </div>

                <fieldset>
                  <legend className="font-display text-[13.5px] font-medium text-white">What does your business run on today?</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {enquiry.tools.map((t) => {
                      const on = picked.includes(t.id)
                      return (
                        <button
                          key={t.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(t.id)}
                          className={`flex h-11 items-center gap-2.5 rounded-md border px-3 text-left text-[14px] transition-colors duration-200 ${
                            on ? 'border-crimson bg-crimson/[0.06] text-white' : 'border-line bg-card text-muted hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border ${on ? 'border-crimson bg-crimson text-[#fff]' : 'border-line'}`}>
                            {on && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
                          </span>
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div id={ids.flows} aria-live="polite" className="rounded-md border border-line bg-raised p-4">
                  <p className="flex items-center gap-2 font-display text-[14px] font-semibold text-white">
                    <Sparkles className="h-4 w-4 text-crimson" aria-hidden="true" />
                    {flows.length === 0 ? 'Tick a tool to see what we would connect.' : `${flows.length} connection${flows.length > 1 ? 's' : ''} we would set up`}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    <AnimatePresence initial={false}>
                      {flows.map((f) => (
                        <m.li
                          key={f.text}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex gap-2 text-[14px] leading-snug text-muted"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok" aria-hidden="true" />
                          {f.text}
                        </m.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                <button type="submit" className="btn-primary h-12 w-full text-[15.5px]">
                  Send enquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="-mt-2 text-center text-[13px] text-muted">Opens your email app with your answers filled in.</p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
