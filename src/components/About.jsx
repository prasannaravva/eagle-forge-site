import { m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { site } from '../config/site.js'
import Reveal, { Item, Stagger, ease } from './Reveal.jsx'

export default function About() {
  const { about, address, mapUrl } = site
  const reduce = useReducedMotion()
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-panel py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Stagger gap={0.09}>
            <Item>
              <p className="eyebrow">About us</p>
            </Item>
            <Item>
              <h2 id="about-title" className="mt-4 max-w-[20ch] text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
                {about.heading}
              </h2>
            </Item>
            <Item>
              <p className="mt-5 max-w-[36rem] text-[17px] leading-relaxed text-muted">{about.body}</p>
            </Item>
          </Stagger>

          {/* Who we work with: tags pop in one after another */}
          <Stagger as="ul" className="mt-7 flex flex-wrap gap-2" aria-label="Who we work with" gap={0.06} delay={0.25}>
            {about.audiences.map((a) => (
              <Item
                as="li"
                key={a}
                y={10}
                scale={0.85}
                className="cursor-default rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] text-white transition-colors duration-200 hover:border-crimson/50 hover:text-crimson"
              >
                {a}
              </Item>
            ))}
          </Stagger>

          {/* Values: the crimson bar grows down beside each as it arrives */}
          <Stagger as="dl" className="mt-10 grid gap-6 sm:grid-cols-3" gap={0.14} delay={0.35}>
            {about.values.map(([k, v]) => (
              <Item key={k} className="relative pl-4">
                <m.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px] origin-top rounded-full bg-crimson"
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.7, ease } } }}
                />
                <dt className="font-display text-[16px] font-semibold">{k}</dt>
                <dd className="mt-1 text-[14.5px] leading-relaxed text-muted">{v}</dd>
              </Item>
            ))}
          </Stagger>
        </div>

        <Reveal x={40} y={0} delay={0.15}>
          <m.div className="card p-7" whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}>
            <m.span
              className="grid h-10 w-10 place-items-center rounded-md bg-crimson/[0.08] text-crimson"
              initial={reduce ? false : { y: -14, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 380, damping: 12, delay: 0.5 }}
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </m.span>
            <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.015em]">Visit the office</h3>
            <address className="mt-3 text-[16px] not-italic leading-relaxed text-muted">
              {address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
              <a href={mapUrl} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                Open in Maps
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contact" className="btn-primary">
                Talk to us
              </a>
            </div>
          </m.div>
        </Reveal>
      </div>
    </section>
  )
}
