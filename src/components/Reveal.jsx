import { useEffect, useRef, useState } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1]
const viewport = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' }

/** Fades and lifts its content once as it scrolls into view. */
export default function Reveal({ children, delay = 0, y = 20, x = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  if (reduce) return <Tag className={className}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  )
}

/**
 * A group whose children (each an <Item>) enter one after another as the group scrolls in.
 * `gap` is the delay between children, `delay` before the first.
 */
export function Stagger({ children, className = '', as = 'div', gap = 0.07, delay = 0, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  if (reduce) return <Tag className={className} {...rest}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** One child of a <Stagger>. Rises (y), slides (x) or grows (scale) into place. */
export function Item({ children, className = '', as = 'div', y = 22, x = 0, scale = 1, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y, x, scale },
        show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.65, ease } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** A number that counts up from zero the first time it scrolls into view. */
export function CountUp({ value, duration = 1.2, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, duration])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
