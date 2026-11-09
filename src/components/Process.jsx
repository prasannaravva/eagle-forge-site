import { m, useReducedMotion } from 'framer-motion'
import { Bot, Cable, Search, Workflow } from 'lucide-react'
import { site } from '../config/site.js'
import { SectionHead } from './Solutions.jsx'

const ease = [0.16, 1, 0.3, 1]
const icons = [Search, Cable, Workflow, Bot]

export default function Process() {
  const { process } = site
  const reduce = useReducedMotion()
  return (
    <section id="process" aria-labelledby="process-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHead id="process-title" eyebrow="How we work" title={process.heading} sub={process.sub} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => {
            const Icon = icons[i]
            const last = i === process.steps.length - 1
            return (
              <m.li
                key={s.name}
                className={`card relative p-6 ${last ? 'border-crimson/40' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-display text-[28px] font-bold tracking-[-0.03em] ${last ? 'text-crimson' : 'text-crimson/35'}`}>0{i + 1}</span>
                  <Icon className={`h-5 w-5 ${last ? 'text-crimson' : 'text-muted'}`} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.015em]">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </m.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
