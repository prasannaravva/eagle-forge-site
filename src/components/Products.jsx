import { m } from 'framer-motion'
import { site } from '../config/site.js'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'
import { SectionHead } from './Solutions.jsx'

const ease = [0.16, 1, 0.3, 1]

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="mt-[5px] h-3 w-3 shrink-0 text-ok" aria-hidden="true">
      <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Small previews of each product, with example figures. */
function KeryoPreview() {
  const stats = [
    ['1,240', 'Sent'],
    ['1,198', 'Delivered'],
    ['864', 'Read'],
    ['92', 'Replied'],
  ]
  return (
    <div data-ui className="rounded-xl bg-bg p-4 ring-1 ring-inset ring-white/[0.06]">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-white/85">Festival offer campaign</p>
        <span className="rounded-full bg-ok/10 px-2 py-0.5 text-[11px] text-ok ring-1 ring-inset ring-ok/25">Finished</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {stats.map(([v, l], i) => (
          <m.div
            key={l}
            className="rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-inset ring-white/[0.06]"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
          >
            <p className="font-mono text-[15px]">{v}</p>
            <p className="text-[11px] text-white/40">{l}</p>
          </m.div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-white/35">Example data</p>
    </div>
  )
}

function InsightsPreview() {
  const rows = [
    ['Krishna', 110],
    ['Guntur', 87],
    ['NTR', 104],
    ['Eluru', 96],
  ]
  return (
    <div data-ui className="rounded-xl bg-bg p-4 ring-1 ring-inset ring-white/[0.06]">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-white/85">Target vs actual, by district</p>
        <span className="font-mono text-[11px] text-white/45">this week</span>
      </div>
      <div className="mt-3 space-y-2.5">
        {rows.map(([n, p], i) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-[12px] text-white/65">{n}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <m.div
                className={`h-full origin-left rounded-full ${p < 100 ? 'bg-amber' : 'bg-gradient-to-r from-crimson to-crimson-soft'}`}
                style={{ width: `${Math.min(p, 100)}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.1 }}
              />
            </div>
            <span className={`w-10 text-right font-mono text-[12px] ${p < 100 ? 'text-amber' : 'text-white/80'}`}>{p}%</span>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-white/35">Example data</p>
    </div>
  )
}

const previews = { keryo: KeryoPreview, insights: InsightsPreview }
const statusTone = {
  'Early access': 'text-ok bg-ok/10 ring-ok/30',
  Pilot: 'text-amber-soft bg-amber/10 ring-amber/30',
}

export default function Products() {
  const { products } = site
  return (
    <section id="products" aria-labelledby="products-title" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="hairline container-x absolute inset-x-0 top-0 max-w-[900px]" />
      <div className="container-x">
        <SectionHead id="products-title" title={products.heading} sub={products.sub} />

        <div className="mt-20 grid gap-6 [perspective:1400px] lg:grid-cols-2">
          {products.items.map((p, i) => {
            const Preview = previews[p.id]
            return (
              <m.article
                key={p.id}
                initial={{ opacity: 0, y: 40, rotateX: -18 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease, delay: i * 0.12 }}
              >
                <Tilt max={4} className="h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl bg-card p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.07)] sm:p-9">
                    <div aria-hidden="true" className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${p.id === 'keryo' ? 'bg-ok/15' : 'bg-crimson/20'}`} />
                    <div className="relative flex flex-wrap items-center gap-3">
                      <h3 className="text-[32px] font-semibold tracking-[-0.03em]">{p.name}</h3>
                      <span className={`badge ${statusTone[p.status]}`}>
                        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-current" aria-hidden="true" />
                        {p.status}
                      </span>
                    </div>
                    <p className="relative mt-2 text-[15px] font-medium text-white/80">{p.tagline}</p>
                    <p className="relative mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/60">{p.body}</p>
                    <div className="relative mt-7">
                      <Preview />
                    </div>
                    <ul className="relative mt-7 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-[15px] text-white/70">
                          <Check />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-primary relative mt-8">
                      Ask for a demo <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
                    </a>
                  </div>
                </Tilt>
              </m.article>
            )
          })}
        </div>

        <div id="pipeline" className="mt-24 scroll-mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-medium tracking-head">{products.pipeline.heading}</h3>
            <p className="text-[15px] text-white/50">Being built now. Ask us if one of these would help your business.</p>
          </Reveal>
          <ul className="mt-10 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
            {products.pipeline.items.map((it, i) => (
              <m.li
                key={it.name}
                className="rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-colors duration-300 hover:bg-raised"
                initial={{ opacity: 0, y: 30, rotateX: -22 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease, delay: i * 0.08 }}
                whileHover={{ y: -6, rotateX: 4, rotateY: -4, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
              >
                <span className="inline-flex rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/50 ring-1 ring-inset ring-white/10">Coming soon</span>
                <h4 className="mt-6 text-[19px] font-semibold tracking-[-0.02em]">{it.name}</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">{it.body}</p>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
