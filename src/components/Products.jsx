import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Clock } from 'lucide-react'
import { site } from '../config/site.js'
import { SectionHead } from './Solutions.jsx'
import { CountUp, Item, Stagger } from './Reveal.jsx'

const ease = [0.16, 1, 0.3, 1]

const status = {
  'Early access': 'border-ok/30 bg-ok/10 text-ok',
  Pilot: 'border-amber-soft/40 bg-amber-soft/10 text-amber',
}
const label = { keryo: 'WhatsApp platform', insights: 'Sales intelligence' }

/* A small look at each product, with example figures. */
function KeryoPeek() {
  const stats = [
    [1240, 'Sent'],
    [1198, 'Delivered'],
    [864, 'Read'],
    [92, 'Replied'],
  ]
  return (
    <div data-ui className="rounded-md border border-line bg-raised p-4">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-medium text-white">Festival offer campaign</span>
        <span className="text-ok">Finished</span>
      </div>
      <div className="num mt-3 grid grid-cols-4 gap-2">
        {stats.map(([v, l]) => (
          <div key={l} className="rounded border border-line bg-card px-2.5 py-2">
            <CountUp value={v} className="block font-display text-[16px] font-semibold" />
            <p className="text-[12px] text-muted">{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsPeek() {
  const rows = [
    ['Krishna', 110],
    ['NTR', 104],
    ['Guntur', 87],
  ]
  return (
    <div data-ui className="rounded-md border border-line bg-raised p-4">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-medium text-white">Target vs actual, by district</span>
        <span className="text-muted">This week</span>
      </div>
      <div className="num mt-3 space-y-2.5">
        {rows.map(([n, p], i) => (
          <div key={n} className="flex items-center gap-3 text-[13px]">
            <span className="w-16 text-white">{n}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <m.div
                className={`h-full origin-left rounded-full ${p < 100 ? 'bg-amber-soft' : 'bg-crimson'}`}
                style={{ width: `${Math.min(p, 100)}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
              />
            </div>
            <CountUp value={p} suffix="%" className={`w-10 text-right ${p < 100 ? 'text-amber' : 'text-white'}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

const peeks = { keryo: KeryoPeek, insights: InsightsPeek }

export default function Products() {
  const { products } = site
  const reduce = useReducedMotion()
  return (
    <section id="products" aria-labelledby="products-title" className="border-y border-line bg-panel py-24 sm:py-32">
      <div className="container-x">
        <SectionHead id="products-title" eyebrow="Our products" title={products.heading} sub={products.sub} center />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {products.items.map((p, i) => {
            const Peek = peeks[p.id]
            return (
              <m.article
                key={p.id}
                className="card flex flex-col p-6 transition-[border-color,box-shadow] duration-300 hover:border-crimson/40 hover:shadow-[0_20px_50px_-28px_rgb(15_23_42/0.4)] sm:p-8"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-[12px] font-semibold uppercase tracking-[0.06em] text-crimson">{label[p.id]}</p>
                    <h3 className="mt-1.5 text-[28px] font-bold tracking-[-0.03em]">{p.name}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-display text-[12px] font-semibold ${status[p.status]}`}>
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                    {p.status}
                  </span>
                </div>
                <p className="mt-4 font-display text-[16px] font-medium text-white">{p.tagline}</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
                <div className="mt-6">
                  <Peek />
                </div>
                <Stagger as="ul" className="mt-6 space-y-2.5" gap={0.06} delay={0.3}>
                  {p.points.map((pt) => (
                    <Item as="li" key={pt} x={-12} y={0} className="flex gap-2.5 text-[15px] text-white">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden="true" />
                      {pt}
                    </Item>
                  ))}
                </Stagger>
                <div className="flex-1" aria-hidden="true" />
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <span className="text-[13.5px] text-muted">Built by Eagle Nexa in Vijayawada</span>
                  <a href="#contact" className="link-arrow">
                    Ask for a demo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </m.article>
            )
          })}
        </div>

        <div id="pipeline" className="mt-16 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[24px] font-bold tracking-[-0.025em]">{products.pipeline.heading}</h3>
            <p className="max-w-[46ch] text-[15px] text-muted">{products.pipeline.sub}</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.pipeline.items.map((it, i) => (
              <m.li
                key={it.name}
                className="card p-5 transition-[border-color] duration-300 hover:border-crimson/40"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease, delay: i * 0.09 }}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}
              >
                <span className="tag">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  Coming soon
                </span>
                <h4 className="mt-4 text-[18px] font-semibold tracking-[-0.015em]">{it.name}</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{it.body}</p>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
