import { useEffect, useRef } from 'react'

/**
 * Slow drifting points of light in Eagle Forge red, with soft glow and depth:
 * nearer particles are bigger, brighter and faster. Pauses off screen; still frame
 * for reduced motion.
 */
export default function ParticleCanvas({ className = '', count = 140 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let frame = 0
    let visible = true
    let last = performance.now()
    let parts = []

    const seed = () => {
      parts = Array.from({ length: count }, () => {
        const z = Math.random() // 0 far .. 1 near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.6 + z * 2.2,
          vy: -(6 + z * 22),
          vx: (Math.random() - 0.5) * 6,
          tw: Math.random() * Math.PI * 2,
        }
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of parts) {
        p.y += p.vy * dt
        p.x += p.vx * dt
        p.tw += dt * 2
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        const a = (0.25 + p.z * 0.6) * (0.75 + Math.sin(p.tw) * 0.25)
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(251, 113, 133, ${a})`)
        g.addColorStop(0.4, `rgba(200, 30, 58, ${a * 0.5})`)
        g.addColorStop(1, 'rgba(200, 30, 58, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      if (visible) frame = requestAnimationFrame(loop)
    }

    resize()
    draw(0)
    const ro = new ResizeObserver(() => {
      resize()
      draw(0)
    })
    ro.observe(canvas)
    let io
    if (!reduce) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(frame)
        if (visible) {
          last = performance.now()
          frame = requestAnimationFrame(loop)
        }
      })
      io.observe(canvas)
    }
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io?.disconnect()
    }
  }, [count])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
