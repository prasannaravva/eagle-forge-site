import { m } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/** Fades and lifts its content once as it scrolls into view. */
export default function Reveal({ children, delay = 0, y = 20, className = '', as = 'div' }) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  )
}
