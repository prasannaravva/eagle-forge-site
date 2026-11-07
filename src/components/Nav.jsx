import { useEffect, useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { site } from '../config/site.js'
import mark from '../assets/eagle-forge-symbol-on-dark.svg'
import Wordmark from './Wordmark.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-bg/80 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl' : 'bg-bg/75 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Eagle Nexa, home">
          <img src={mark} alt="" width="32" height="32" className="h-8 w-8" />
          <Wordmark size="text-[22px]" />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[14px] text-white/60">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors duration-300 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden h-9 px-4 text-[14px] sm:inline-flex">
            Talk to us
          </a>
          <button
            type="button"
            className="btn-ghost h-9 px-4 text-[14px] md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id={menuId}
            aria-label="Main"
            className="container-x pb-4 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="overflow-hidden rounded-2xl bg-raised/95 p-2 ring-1 ring-white/10 backdrop-blur-xl">
              {[...site.nav, { label: 'Talk to us', href: '#contact' }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[16px] hover:bg-white/5">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
