import { site } from '../config/site.js'
import { m } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { SectionHead } from './Solutions.jsx'

export default function Process() {
  const { process } = site
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="hairline container-x absolute inset-x-0 top-0 max-w-[900px]" />
      <div className="container-x">
        <SectionHead id="process-title" title={process.heading} sub={process.sub} />
        <ol className="relative mt-20 grid gap-4 [perspective:1200px] md:grid-cols-4">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-crimson/0 via-crimson/50 to-amber/0 md:block" />
          {process.steps.map((s, i) => (
            <m.li
              key={s.name}
              className="relative rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-colors duration-300 hover:bg-raised"
              initial={{ opacity: 0, y: 40, rotateX: -25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ rotateX: 4, rotateY: -4, y: -6, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-bg font-mono text-[13px] text-white/70 ring-1 ring-white/15">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{s.body}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
