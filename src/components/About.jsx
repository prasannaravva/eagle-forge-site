import { ArrowUpRight, MapPin } from 'lucide-react'
import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

export default function About() {
  const { about, address, mapUrl } = site
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-panel py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">About us</p>
          <h2 id="about-title" className="mt-4 max-w-[20ch] text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            {about.heading}
          </h2>
          <p className="mt-5 max-w-[36rem] text-[17px] leading-relaxed text-muted">{about.body}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Who we work with">
            {about.audiences.map((a) => (
              <li key={a} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] text-white">
                {a}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {about.values.map(([k, v]) => (
              <div key={k} className="border-l-2 border-crimson pl-4">
                <dt className="font-display text-[16px] font-semibold">{k}</dt>
                <dd className="mt-1 text-[14.5px] leading-relaxed text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card p-7">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-crimson/[0.08] text-crimson">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}
