import { useRef } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D hover tilt: the card leans toward the pointer (up to `max` degrees) with a spring,
 * inside its own perspective. Touch and reduced-motion visitors see no tilt.
 */
export default function Tilt({ children, max = 6, className = '', lift = 0 }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 260, damping: 30 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const y = useSpring(0, spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
    y.set(-lift)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    y.set(0)
  }

  return (
    <div className="[perspective:1400px]">
      <m.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX, rotateY, y }} className={className}>
        {children}
      </m.div>
    </div>
  )
}
