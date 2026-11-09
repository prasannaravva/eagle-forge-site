import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'
import { Accordion } from './ui/accordion.jsx'
import { SectionHead } from './Solutions.jsx'

export default function FAQ() {
  const { faq } = site
  const items = faq.items.map((item) => ({ title: item.q, body: item.a }))
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHead id="faq-title" eyebrow="Questions" title="Frequently asked questions" sub="Straight answers about how we work with your existing systems." center />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-[52rem]">
          <div className="card px-5 pb-5 sm:px-8 sm:pb-6">
            <Accordion items={items} defaultOpen={0} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
