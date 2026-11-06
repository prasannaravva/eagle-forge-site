import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'
import { SectionHead } from './Solutions.jsx'

export default function Process() {
  const { process } = site
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="hairline container-x absolute inset-x-0 top-0 max-w-[900px]" />
      <div className="container-x">
        <SectionHead id="process-title" title={process.heading} sub={process.sub} />
        <ol className="relative mt-20 grid gap-4 md:grid-cols-4">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-crimson/0 via-crimson/50 to-amber/0 md:block" />
          {process.steps.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="relative rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-bg font-mono text-[13px] text-white/70 ring-1 ring-white/15">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
