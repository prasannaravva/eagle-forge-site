import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'
import { Accordion } from './ui/accordion.jsx'

export default function FAQ() {
  const { faq } = site
  const items = faq.items.map((item) => ({ title: item.q, body: item.a }))
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-28 sm:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 id="faq-title" className="text-[clamp(2.5rem,1.6rem+3vw,4rem)] font-medium leading-none tracking-head lg:sticky lg:top-28">
            {faq.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="border-y border-white/[0.08]">
            <Accordion items={items} defaultOpen={0} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
