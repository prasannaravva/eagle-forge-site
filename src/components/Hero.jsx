import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Check, Cpu, Globe, MessageCircle, ShoppingBag, ShoppingCart } from 'lucide-react'
import { site } from '../config/site.js'
import Assistant from './Assistant.jsx'

const ease = [0.16, 1, 0.3, 1]

const integrations = [
  { name: 'Tally Prime', role: 'Accounting', icon: BookOpenCheck },
  { name: 'Shopify', role: 'Online store', icon: ShoppingBag },
  { name: 'WooCommerce', role: 'Online store', icon: ShoppingCart },
  { name: 'WhatsApp Business', role: 'Messaging', icon: MessageCircle },
  { name: 'IoT sensors', role: 'Devices', icon: Cpu },
  { name: 'Your website', role: 'Enquiries', icon: Globe },
]

export default function Hero() {
  const { hero } = site
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  })

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* A faint dot grid behind the first screen, fading out downwards */}
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[720px] [mask-image:linear-gradient(180deg,black,transparent)]" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0">
          <m.p className="eyebrow" {...rise(0)}>
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
            {hero.badge}
          </m.p>
          <m.h1 id="hero-title" className="mt-6 text-[clamp(2.75rem,1.6rem+4.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em]" {...rise(0.06)}>
            <span className="block">{hero.title[0]}</span>
            <span className="block text-crimson">{hero.title[1]}</span>
          </m.h1>
          <m.p className="mt-6 max-w-[34rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-muted" {...rise(0.12)}>
            {hero.sub}
          </m.p>
          <m.div className="mt-8 flex flex-wrap items-center gap-3" {...rise(0.18)}>
            <a href="#contact" className="btn-primary h-12 px-6">
              Talk to us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#solutions" className="btn-ghost h-12 px-6">
              See what we connect
            </a>
          </m.div>
          <m.ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted" {...rise(0.24)}>
            {hero.points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-crimson" aria-hidden="true" />
                {p}
              </li>
            ))}
          </m.ul>
        </div>

        <m.div
          className="min-w-0"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          <Assistant />
        </m.div>
      </div>

      {/* What it connects to */}
      <div className="container-x relative mt-20 sm:mt-24">
        <p className="text-center font-display text-[13px] font-medium uppercase tracking-[0.08em] text-muted">Works with the tools you already use</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map(({ name, role, icon: Icon }, i) => (
            <m.li
              key={name}
              className="card flex flex-col items-center gap-2 px-3 py-5 text-center transition-colors duration-200 hover:border-crimson/40"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            >
              <Icon className="h-5 w-5 text-crimson" aria-hidden="true" />
              <span className="font-display text-[15px] font-semibold">{name}</span>
              <span className="text-[12.5px] text-muted">{role}</span>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
