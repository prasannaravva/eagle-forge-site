import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'
import { TallyWindow, WhatsAppWindow, StoreWindow, DevicesWindow } from './Windows.jsx'

const windows = { tally: TallyWindow, whatsapp: WhatsAppWindow, store: StoreWindow, devices: DevicesWindow }
const tones = {
  crimson: 'text-crimson-soft ring-crimson/30 bg-crimson/10',
  green: 'text-ok ring-ok/30 bg-ok/10',
  amber: 'text-amber-soft ring-amber/30 bg-amber/10',
}
const dots = { crimson: 'bg-crimson-soft', green: 'bg-ok', amber: 'bg-amber' }

export function SectionHead({ id, title, sub }) {
  return (
    <Reveal className="mx-auto max-w-[720px] text-center">
      <h2 id={id} className="text-[clamp(2.5rem,1.6rem+3vw,4rem)] font-medium leading-[1] tracking-head">
        <span className="block">{title[0]}</span>
        <span className="block text-white/45">{title[1]}</span>
      </h2>
      {sub && <p className="mx-auto mt-6 max-w-[520px] text-[17px] text-white/55">{sub}</p>}
    </Reveal>
  )
}

export default function Solutions() {
  const { solutions } = site
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="overflow-x-clip py-28 sm:py-36">
      <div className="container-x">
        <SectionHead id="solutions-title" title={solutions.heading} sub={solutions.sub} />

        <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
          {solutions.rows.map((row, i) => {
            const Win = windows[row.id]
            const flip = i % 2 === 1
            return (
              <article key={row.id} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <p className={`badge ${tones[row.tone]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dots[row.tone]}`} aria-hidden="true" />
                    {row.badge}
                  </p>
                  <h3 className="mt-6 text-[clamp(2.25rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-head">{row.title}</h3>
                  <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-white/60">{row.body}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {row.chips.map((c) => (
                      <li key={c} className="chip">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn-primary mt-9">
                    Talk to us <span className={`h-1.5 w-1.5 rounded-full ${dots[row.tone]}`} aria-hidden="true" />
                  </a>
                </Reveal>
                <Reveal delay={0.1} y={32} className={`${flip ? 'lg:order-1' : ''}`}>
                  <div className={i % 2 ? 'lg:animate-[float_7s_ease-in-out_infinite]' : 'lg:animate-float'}>
                    <Win />
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
