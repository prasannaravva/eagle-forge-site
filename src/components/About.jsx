import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'

export default function About() {
  const { about, address, mapUrl } = site
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal>
          <h2 id="about-title" className="max-w-[16ch] text-[clamp(2.25rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-[1.04] tracking-head">
            {about.heading}
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/60">{about.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Who we work with">
            {about.audiences.map((a) => (
              <li key={a} className="chip">
                {a}
              </li>
            ))}
          </ul>
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.values.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[15px] font-semibold">{k}</dt>
                <dd className="mt-1 text-[14px] leading-relaxed text-white/50">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div aria-hidden="true" className="glow-crimson pointer-events-none absolute -inset-10 -z-10 blur-2xl" />
          <div className="rounded-3xl bg-card p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/15 text-crimson-soft ring-1 ring-crimson/30">
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                  <path d="M10 18s6-5.6 6-10A6 6 0 0 0 4 8c0 4.4 6 10 6 10zm0-7.5A2.5 2.5 0 1 0 10 5.5a2.5 2.5 0 0 0 0 5z" fill="currentColor" />
                </svg>
              </span>
              <p className="text-[15px] font-semibold">Visit the office</p>
            </div>
            <address className="mt-6 text-[17px] not-italic leading-relaxed text-white/80">
              {address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="hairline my-7" aria-hidden="true" />
            <div className="flex flex-wrap gap-3">
              <a href={mapUrl} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                Open in Maps
              </a>
              <a href="#contact" className="btn-primary">
                Talk to us <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
