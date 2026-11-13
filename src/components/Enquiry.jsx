import { useId, useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, Check, CheckCircle2, Loader2, Mail, MapPin, Sparkles } from 'lucide-react'
import { site } from '../config/site.js'
import Reveal, { Item, Stagger } from './Reveal.jsx'

/**
 * Contact: office details on the left; on the right the visitor ticks the tools they run, sees
 * the connections we would set up, and sends an enquiry email with their answers filled in.
 */
export default function Enquiry() {
  const { enquiry } = site
  const [picked, setPicked] = useState(['tally', 'whatsapp'])
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [website, setWebsite] = useState('') // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const ids = { name: useId(), mobile: useId(), email: useId(), message: useId(), flows: useId() }

  const flows = useMemo(() => enquiry.flows.filter((f) => f.needs.every((n) => picked.includes(n))), [picked, enquiry.flows])
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const mailto = useMemo(() => {
    const tools = enquiry.tools.filter((t) => picked.includes(t.id)).map((t) => t.label)
    const body = [
      `Name: ${name || '(not given)'}`,
      `Mobile: ${mobile || '(not given)'}`,
      `Email: ${email || '(not given)'}`,
      '',
      `Tools we use: ${tools.length ? tools.join(', ') : '(none ticked)'}`,
      '',
      'Connections we are interested in:',
      ...flows.map((f) => `- ${f.text}`),
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry from ${name || 'the website'}`)}&body=${encodeURIComponent(body)}`
  }, [name, mobile, email, picked, flows, enquiry.tools])

  const validate = () => {
    const err = {}
    if (!name.trim()) err.name = 'Please enter your name.'
    if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(mobile.replace(/[\s\-().]/g, ''))) err.mobile = 'Enter a 10-digit mobile number, e.g. 98765 43210.'
    if (email.trim() && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim())) err.email = 'This email address does not look right.'
    return err
  }

  const submit = async (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) {
      document.getElementById(ids[Object.keys(err)[0]])?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          mobile,
          email,
          message,
          website,
          tools: enquiry.tools.filter((t) => picked.includes(t.id)).map((t) => t.label),
          flows: flows.map((f) => f.text),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 400 && data.errors) {
        setErrors(data.errors)
        setStatus('idle')
        return
      }
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('sent')
    } catch (err2) {
      setErrorMsg(err2.message === 'Failed to fetch' ? 'We could not reach the server.' : err2.message)
      setStatus('error')
    }
  }

  const reset = () => {
    setName('')
    setMobile('')
    setEmail('')
    setMessage('')
    setErrors({})
    setStatus('idle')
  }

  const field =
    'h-11 w-full rounded-md border border-line bg-card px-3.5 text-[15px] text-white placeholder:text-muted/80 transition-[border-color,box-shadow] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20'

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal y={48}>
          <div className="card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left: who and where */}
            <Stagger className="flex flex-col gap-8 border-b border-line bg-panel p-7 sm:p-10 lg:border-b-0 lg:border-r" gap={0.12} delay={0.2}>
              <Item>
                <p className="eyebrow">Get in touch</p>
                <h2 id="contact-title" className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
                  {enquiry.heading[0]} <span className="text-crimson">{enquiry.heading[1]}</span>
                </h2>
                <p className="mt-4 max-w-[30rem] text-[16.5px] leading-relaxed text-muted">{enquiry.sub}</p>
              </Item>
              <Item as="ul" x={-16} y={0} className="space-y-5 text-[15px]">
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
              </Item>
              <Item className="mt-auto rounded-md border border-line bg-card p-4 text-[14px] text-muted">
                <span className="font-display font-semibold text-white">On-site setup</span> across Vijayawada, Guntur and the Krishna district. Remote setup anywhere.
              </Item>
            </Stagger>

            {/* Right: the form */}
            <div className="p-7 sm:p-10">
              {status === 'sent' ? (
                <m.div role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-ok/10 text-ok">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.6rem] font-bold tracking-[-0.02em] text-white">Thank you, {name.trim().split(/\s+/)[0]}.</h3>
                  <p className="mt-2 max-w-[24rem] text-[15.5px] leading-relaxed text-muted">
                    We have your enquiry and will call you on <span className="text-white">{mobile.trim()}</span>
                    {email.trim() && (
                      <>
                        {' '}
                        or write to <span className="text-white [overflow-wrap:anywhere]">{email.trim()}</span>
                      </>
                    )}{' '}
                    within one working day.
                  </p>
                  <button type="button" onClick={reset} className="mt-6 text-[14px] text-muted underline decoration-line underline-offset-4 hover:text-white hover:decoration-crimson">
                    Send another enquiry
                  </button>
                </m.div>
              ) : (
              <form
                noValidate
                className="grid gap-5"
                onSubmit={submit}
                aria-describedby={ids.flows}
              >
                <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.1} delay={0.3}>
                  <Item x={20} y={0} className="sm:col-span-2">
                    <Field id={ids.name} label="Your name" error={errors.name}>
                      <input id={ids.name} autoComplete="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ramesh Varma" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${ids.name}-err` : undefined} className={`${field} ${errors.name ? '!border-crimson' : ''}`} />
                    </Field>
                  </Item>
                  <Item x={20} y={0}>
                    <Field id={ids.mobile} label="Mobile number" error={errors.mobile}>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-muted">+91</span>
                        <input id={ids.mobile} type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="98765 43210" aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? `${ids.mobile}-err` : undefined} className={`${field} pl-12 ${errors.mobile ? '!border-crimson' : ''}`} />
                      </div>
                    </Field>
                  </Item>
                  <Item x={20} y={0}>
                    <Field id={ids.email} label={<>Email <span className="font-normal text-muted">(optional)</span></>} error={errors.email}>
                      <input id={ids.email} type="email" inputMode="email" autoComplete="email" maxLength={120} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.in" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${ids.email}-err` : undefined} className={`${field} ${errors.email ? '!border-crimson' : ''}`} />
                    </Field>
                  </Item>
                </Stagger>

                <fieldset>
                  <legend className="font-display text-[13.5px] font-medium text-white">What does your business run on today?</legend>
                  <Stagger className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3" gap={0.05} delay={0.45}>
                    {enquiry.tools.map((t) => {
                      const on = picked.includes(t.id)
                      return (
                        <Item
                          as="button"
                          key={t.id}
                          y={10}
                          scale={0.9}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(t.id)}
                          whileTap={{ scale: 0.96 }}
                          className={`flex h-11 items-center gap-2.5 rounded-md border px-3 text-left text-[14px] transition-colors duration-200 ${
                            on ? 'border-crimson bg-crimson/[0.06] text-white' : 'border-line bg-card text-muted hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border ${on ? 'border-crimson bg-crimson text-[#fff]' : 'border-line'}`}>
                            <AnimatePresence initial={false}>
                              {on && (
                                <m.span key="tick" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
                                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                                </m.span>
                              )}
                            </AnimatePresence>
                          </span>
                          {t.label}
                        </Item>
                      )
                    })}
                  </Stagger>
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

                <Field id={ids.message} label={<>Anything we should know? <span className="font-normal text-muted">(optional)</span></>}>
                  <textarea id={ids.message} rows={3} maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. We run Tally Prime with 40 dealers across Krishna district." className={`${field} !h-auto resize-y py-2.5`} />
                </Field>

                <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                <button type="submit" disabled={status === 'sending'} className="btn-primary h-12 w-full text-[15.5px] disabled:opacity-70">
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p role="status" aria-live="polite" className="-mt-2 text-center text-[13px] text-muted">
                                    {status === 'error' && (
                    <>
                      {errorMsg} Please{' '}
                      <a href={mailto} className="text-white underline underline-offset-4">
                        email us instead
                      </a>
                      .
                    </>
                  )}
                  {status !== 'error' && 'We usually reply within one working day.'}
                </p>
              </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-[13.5px] font-medium text-white">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-crimson">
          {error}
        </p>
      )}
    </div>
  )
}
