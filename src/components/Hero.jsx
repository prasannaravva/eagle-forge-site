import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { site } from '../config/site.js'
import { OverviewWindow } from './Windows.jsx'
import MeshCanvas from './MeshCanvas.jsx'

const ease = [0.16, 1, 0.3, 1]

function Words({ text, className = '', wordClassName = '', delay = 0 }) {
  // Each word rises and un-blurs in turn; the words stay one heading line for screen readers.
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <m.span
          key={i}
          className={`inline-block ${wordClassName}`}
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.08 }}
        >
          {w}
          {i < text.split(' ').length - 1 ? '\u00a0' : ''}
        </m.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { hero, worksWith } = site
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // The product window starts tilted back in 3D and straightens over the first 500px of scroll.
  const rotateX = useTransform(scrollY, [0, 500], reduce ? [0, 0] : [16, 0])
  const scale = useTransform(scrollY, [0, 500], reduce ? [1, 1] : [0.94, 1])
  const y = useTransform(scrollY, [0, 500], [0, -40])
  return (
    <section id="top" aria-labelledby="hero-title" className="noise-bg relative overflow-hidden pt-32 sm:pt-40">
      <MeshCanvas className="pointer-events-none absolute inset-x-0 top-0 h-[900px] w-full opacity-90 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_45%,transparent_85%)]" />
      <div className="container-x relative text-center">
        <m.p
          className="badge mx-auto text-white/60 ring-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-crimson-soft" aria-hidden="true" />
          {hero.badge}
        </m.p>

        <h1 id="hero-title" className="mx-auto mt-7 max-w-[14ch] text-[clamp(3rem,1.2rem+7.4vw,7.5rem)] font-bold leading-[0.92] tracking-display">
          <Words text={hero.title[0]} className="block" delay={0.1} />{' '}
          <Words text={hero.title[1]} className="block pb-[0.08em]" wordClassName="text-gradient" delay={0.26} />
        </h1>

        <m.p
          className="mx-auto mt-7 max-w-[600px] text-[17px] leading-relaxed text-white/60 sm:text-[19px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
        >
          {hero.sub}
        </m.p>

        <m.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.26 }}
        >
          <a href="#contact" className="btn-primary">
            Talk to us <span className="h-1.5 w-1.5 rounded-full bg-crimson" aria-hidden="true" />
          </a>
          <a href="#solutions" className="btn-ghost">
            See what we connect
          </a>
        </m.div>
      </div>

      <m.div
        className="container-x mt-20 max-w-[1100px] sm:mt-24"
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.35 }}
      >
        <div className="[perspective:1800px]">
          <m.div className="origin-top" style={{ rotateX, scale, y }}>
            <OverviewWindow />
          </m.div>
        </div>
      </m.div>

      {/* Fade the window into the page. */}
      <div aria-hidden="true" className="pointer-events-none relative -mt-10 h-10 bg-gradient-to-b from-transparent to-bg" />

      <div className="container-x relative pb-8 pt-10">
        <p className="text-center text-[13px] text-white/40">Works with the tools you already use</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[15px] font-semibold tracking-[-0.01em] text-white/45">
          {worksWith.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
