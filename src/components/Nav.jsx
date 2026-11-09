import { useEffect, useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { site } from '../config/site.js'
import mark from '../assets/eagle-forge-symbol-on-dark.svg'
import Wordmark from './Wordmark.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Header: logo with a location tag, the section links (the one in view is marked), the theme
 * switch and one crimson action. A hairline appears under the bar once the page scrolls.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const menuId = useId()

  // Sections are looked up on every check: everything after Solutions is code-split.
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      setScrolled(window.scrollY > 8)
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent bg-bg/0'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Eagle Nexa, home">
            <img src={mark} alt="" width="30" height="30" className="h-[30px] w-[30px]" />
            <Wordmark size="text-[20px]" underline />
          </a>
          <span className="tag hidden md:inline-flex">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Vijayawada, IN
          </span>
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const on = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={on ? 'location' : undefined}
                    className={`relative flex h-9 items-center rounded-md px-3 font-display text-[14.5px] font-medium transition-colors duration-200 ${
                      on ? 'text-crimson' : 'text-muted hover:bg-panel hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-crimson transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden h-10 px-4 text-[14px] sm:inline-flex">
            Talk to us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-card text-white transition-colors hover:bg-raised lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-[16px]" aria-hidden="true">
              <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-[transform,top] duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[1.5px] bg-current transition-[transform,top,width] duration-300 ${open ? 'top-[5px] w-full -rotate-45' : 'top-[10px] w-2/3'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id={menuId}
            aria-label="Main"
            className="border-t border-line bg-bg lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ul className="container-x py-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.href ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-md px-3 py-3 font-display text-[17px] font-medium ${active === item.href ? 'text-crimson' : 'text-white'} hover:bg-panel`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="px-3 pb-2 pt-3">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Talk to us
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
