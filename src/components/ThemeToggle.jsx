import { useEffect, useState } from 'react'

const COLORS = { dark: '#09090B', light: '#FAF9F6' }

function apply(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {}
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

/** Current theme, kept in step with the class on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && !document.documentElement.classList.contains('dark') ? 'light' : 'dark',
  )
  useEffect(() => {
    const on = (e) => setTheme(e.detail)
    window.addEventListener('themechange', on)
    return () => window.removeEventListener('themechange', on)
  }, [])
  return theme
}

/**
 * Sun/moon button. Where the browser supports View Transitions the new theme grows out of
 * the button as a circle; otherwise (or with reduced motion) it switches straight away.
 */
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  const onClick = (e) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply(next)
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(() => apply(next)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl text-white/75 ring-1 ring-inset ring-white/15 transition-colors duration-300 hover:bg-white/5 hover:text-white ${className}`}
    >
      {/* Sun (shown on dark: "go light") */}
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"
        className={`absolute transition-all duration-500 ease-out ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
      {/* Moon (shown on light: "go dark") */}
      <svg
        width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className={`absolute transition-all duration-500 ease-out ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  )
}
