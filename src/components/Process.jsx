import { m, useReducedMotion } from 'framer-motion'
import { Bot, Cable, Search, Workflow } from 'lucide-react'
import { site } from '../config/site.js'
import { SectionHead } from './Solutions.jsx'
import { ease } from './Reveal.jsx'

const icons = [Search, Cable, Workflow, Bot]
const STEP = 0.35 // seconds between steps; the line reaches each step as its card lands

/**
 * Four steps joined by a line that draws from left to right as the section comes into view;
 * each step's dot lights up when the line reaches it and its card rises at the same moment.
 */
export default function Process() {
  const { process } = site
  const reduce = useReducedMotion()
  const n = process.steps.length
  const inView = { once: true, amount: 0.3 }

  return (
    <section id="process" aria-labelledby="process-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHead id="process-title" eyebrow="How we work" title={process.heading} sub={process.sub} />

        <div className="relative mt-12">
          {/* The connecting line (wide screens): a track, and a crimson fill that draws across */}
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[-22px] hidden h-[2px] rounded-full bg-line lg:block">
            <m.div
              className="h-full origin-left rounded-full bg-crimson"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: STEP * (n - 1), ease: 'linear', delay: 0.2 }}
            />
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s, i) => {
              const Icon = icons[i]
              const last = i === n - 1
              const at = 0.2 + STEP * i
              return (
                <m.li
                  key={s.name}
                  className={`card group relative p-6 transition-[border-color,box-shadow] duration-300 hover:border-crimson/40 hover:shadow-[0_18px_40px_-26px_rgb(15_23_42/0.4)] ${last ? 'border-crimson/40' : ''}`}
                  initial={reduce ? false : { opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.7, ease, delay: at }}
                  whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}
                >
                  {/* The step's dot on the line */}
                  <m.span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[-27px] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-crimson ring-4 ring-bg lg:block"
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.35, ease, delay: at }}
                  />
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-[28px] font-bold tracking-[-0.03em] ${last ? 'text-crimson' : 'text-crimson/35'}`}>0{i + 1}</span>
                    <m.span
                      className={`grid h-9 w-9 place-items-center rounded-md transition-colors duration-300 ${last ? 'bg-crimson/10 text-crimson' : 'bg-panel text-muted group-hover:text-crimson'}`}
                      initial={reduce ? false : { scale: 0.4, rotate: -20, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      viewport={inView}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: at + 0.15 }}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </m.span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.015em]">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </m.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
