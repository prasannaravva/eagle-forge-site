import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Check, Compass, Cpu, MessageCircle, ShoppingBag } from 'lucide-react'
import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

const ease = [0.16, 1, 0.3, 1]

/** Section heading: a small label, the title, one line under it. */
export function SectionHead({ id, eyebrow, title, sub, center = false }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-[44rem] text-center' : 'max-w-[44rem]'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
        {Array.isArray(title) ? (
          <>
            {title[0]} <span className="text-muted">{title[1]}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {sub && <p className="mt-4 text-[17px] leading-relaxed text-muted">{sub}</p>}
    </Reveal>
  )
}

const icons = { tally: BookOpenCheck, whatsapp: MessageCircle, store: ShoppingBag, devices: Cpu, consult: Compass }

/* One small working detail per solution, in the product's own voice (example data). */
const details = {
  tally: { label: 'Ask', text: 'Sales in Guntur this week?', result: '₹3.9 L · 87% of target' },
  whatsapp: { label: 'Mon 10:00', text: 'Reminder sent to Sai Agencies', result: 'Read 10:04' },
  store: { label: 'Order 1042', text: 'Invoice raised in Tally, stock updated', result: '4 seconds' },
  devices: { label: 'Cold room 2', text: 'Reading every 5 minutes', result: '4.1 °C · OK' },
  consult: { label: 'Plan', text: 'Keep Tally · connect the store · replace paper registers', result: '3 steps' },
}

function Card({ row, big, i }) {
  const reduce = useReducedMotion()
  const Icon = icons[row.id]
  const d = details[row.id]
  return (
    <m.article
      className={`card group flex min-w-0 flex-col p-6 transition-[border-color,box-shadow] duration-300 hover:border-crimson/40 hover:shadow-[0_16px_40px_-24px_rgb(15_23_42/0.35)] sm:p-7 ${big ? 'lg:col-span-3' : 'lg:col-span-2'}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease, delay: (i % 3) * 0.06 }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-crimson/[0.08] text-crimson">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="tag">{row.badge}</span>
      </div>
      <h3 className="mt-5 text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-semibold tracking-[-0.02em]">{row.title}</h3>
      <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{row.body}</p>

      <div data-ui className="mt-5 flex items-center justify-between gap-3 rounded-md border border-line bg-raised px-3 py-2.5 font-mono text-[12.5px]">
        <span className="min-w-0 truncate text-muted">
          <span className="text-white">{d.label}:</span> {d.text}
        </span>
        <span className="shrink-0 font-medium text-crimson">{d.result}</span>
      </div>

      <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-[14px]">
        {row.chips.map((c) => (
          <li key={c} className="flex items-center gap-1.5 text-white">
            <Check className="h-4 w-4 text-ok" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </m.article>
  )
}

export default function Solutions() {
  const { solutions } = site
  const rows = solutions.rows
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="solutions-title" eyebrow="What we build" title={solutions.heading} sub={solutions.sub} />
          <Reveal>
            <a href="#contact" className="link-arrow">
              Not sure where to start? Ask us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {rows.map((row, i) => (
            <Card key={row.id} row={row} big={i < 2} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
