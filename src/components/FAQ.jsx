import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

export default function FAQ() {
  const { faq } = site
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-28 sm:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 id="faq-title" className="text-[clamp(2.5rem,1.6rem+3vw,4rem)] font-medium leading-none tracking-head lg:sticky lg:top-28">
            {faq.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faq.items.map((item, i) => (
              <details key={item.q} name="faq" open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-medium transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="relative h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true">
                    <span className="absolute left-0 top-[6px] h-[2px] w-3.5 rounded bg-current" />
                    <span className="absolute left-[6px] top-0 h-3.5 w-[2px] rounded bg-current transition-transform duration-300 group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-7 pr-10 text-[16px] leading-relaxed text-white/60">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
