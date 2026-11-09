import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { site } from '../config/site.js'
import mark from '../assets/eagle-forge-symbol-on-dark.svg'
import Wordmark from './Wordmark.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Floating header. At the top of the page it sits open over the hero; once scrolled it
 * condenses into one glass capsule with a crimson-to-amber progress line along its base.
 * The centre menu is a glass pill whose highlight slides to the hovered link, and rests on
 * the section currently in view (scrollspy).
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [pill, setPill] = useState({ x: 0, w: 0, show: false })
  const menuId = useId()
  const progressRef = useRef(null)
  const linkRefs = useRef({})

  // Scroll state + progress line (written straight to the DOM, no re-render per frame).
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scrollspy: the section crossing the middle band of the viewport is "current".
  // Sections are looked up on every check, not once at mount: everything after Solutions is
  // code-split and appears later, so a one-time lookup would only ever find Solutions.
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = null
      for (const item of site.nav) {
        const el = document.querySelector(item.href)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= line) current = r.bottom > line ? item.href : null
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Sliding highlight follows the hovered link, else the current section.
  const target = hovered ?? active
  const measure = useCallback(() => {
    const el = target && linkRefs.current[target]
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth, show: true })
    else setPill((p) => ({ ...p, show: false }))
  }, [target])
  useLayoutEffect(() => {
    measure()
  }, [measure])
  useEffect(() => {
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // Mobile sheet: close on Escape, lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div
        className={`relative mx-auto flex h-14 items-center justify-between rounded-2xl pl-3 pr-2 transition-[max-width,background-color,box-shadow,backdrop-filter] duration-500 ease-out sm:h-[60px] sm:pl-4 ${
          scrolled || open
            ? 'max-w-[1120px] bg-bg/70 shadow-[0_0_0_1px_rgb(var(--c-fg)/0.08),0_18px_40px_-16px_rgb(30_20_40/0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl backdrop-saturate-150'
            : 'max-w-[1240px] bg-transparent shadow-[0_0_0_1px_rgb(var(--c-fg)/0)]'
        }`}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="Eagle Nexa, home">
          <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-gradient-to-b from-white/[0.09] to-white/[0.02] ring-1 ring-inset ring-white/10 transition-transform duration-500 ease-out group-hover:-rotate-6">
            <img src={mark} alt="" width="24" height="24" className="h-6 w-6" />
          </span>
          <Wordmark size="text-[21px]" underline />
        </a>

        {/* Centre menu: glass pill with a sliding highlight. */}
        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul
            className={`relative flex items-center gap-0.5 rounded-xl p-1 ring-1 ring-inset backdrop-blur-md transition-colors duration-500 ${
              scrolled ? 'bg-white/[0.03] ring-white/[0.07]' : 'bg-white/[0.06] ring-white/[0.12]'
            }`}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 left-0 rounded-lg bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,width,opacity] duration-[450ms] ease-out"
              style={{ width: pill.w, transform: `translateX(${pill.x}px)`, opacity: pill.show ? 1 : 0 }}
            />
            {site.nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    ref={(el) => (linkRefs.current[item.href] = el)}
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    className={`relative flex h-9 items-center gap-2 rounded-lg px-3.5 font-nav text-[14.5px] font-medium tracking-[-0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                      isActive || hovered === item.href ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e] transition-all duration-300 ${
                        isActive ? 'scale-100 opacity-100' : '-ml-3.5 scale-0 opacity-0'
                      }`}
                    />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="#products"
            className="hidden h-10 items-center rounded-xl px-3.5 font-nav text-[14.5px] font-medium tracking-[-0.01em] text-white/70 transition-colors duration-300 hover:text-white xl:inline-flex"
          >
            See products
          </a>
          <a
            href="#contact"
            className="group hidden h-10 items-center gap-2 rounded-xl bg-white pl-4 pr-3 font-nav text-[14.5px] font-semibold tracking-[-0.01em] text-bg shadow-[0_8px_24px_-8px_rgba(244,63,94,0.55)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#f4f4f5] hover:shadow-[0_10px_30px_-8px_rgba(244,63,94,0.75)] active:translate-y-0 active:scale-[0.98] sm:inline-flex"
          >
            Talk to us
            <span className="grid h-6 w-6 place-items-center rounded-md bg-bg text-white">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${open ? 'top-[5px] w-full -rotate-45' : 'top-[10px] w-2/3'}`} />
            </span>
          </button>
        </div>

        {/* Scroll progress along the base of the capsule. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden transition-opacity duration-500 ${scrolled && !open ? 'opacity-100' : 'opacity-0'}`}
        >
          <span ref={progressRef} className="block h-full origin-left bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-[#f5b301]" style={{ transform: 'scaleX(0)' }} />
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id={menuId}
            aria-label="Main"
            className="mx-auto mt-2 max-w-[1120px] lg:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="overflow-hidden rounded-2xl bg-bg/90 p-2 shadow-[0_0_0_1px_rgb(var(--c-fg)/0.08),0_30px_60px_-24px_rgb(30_20_40/0.25)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <ul>
                {site.nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.href ? 'location' : undefined}
                      className="flex items-center gap-4 rounded-xl px-4 py-3.5 font-nav text-[20px] font-medium tracking-[-0.02em] text-white/85 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
                      {item.label}
                      {active === item.href && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />}
                    </a>
                  </m.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-nav text-[15px] font-semibold text-bg"
              >
                Talk to us
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  )
}
