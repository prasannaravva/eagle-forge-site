import { useEffect, useRef } from 'react'

/**
 * A 3D wave terrain drawn as crimson lines, seen from a low camera.
 * Rows are projected with perspective (far rows small and close together, near rows wide),
 * so the field reads as a surface receding into the distance. Pauses off screen and
 * draws a single still frame for visitors who prefer reduced motion.
 */
export default function MeshCanvas({ className = '', color = [200, 30, 58], rows = 56, speed = 0.35 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let frame = 0
    let visible = true
    let t = 0
    let last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Smooth pseudo-noise from a few summed sine waves.
    const wave = (x, z, time) =>
      Math.sin(x * 1.7 + time * 0.9 + z * 0.6) * 0.55 +
      Math.sin(x * 3.1 - time * 0.6 + z * 1.3) * 0.25 +
      Math.sin(x * 0.7 + z * 2.1 + time * 0.4) * 0.35

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const horizon = h * 0.42
      const camH = 1.6
      const focal = h * 0.9
      const cols = Math.max(60, Math.round(w / 14))
      for (let r = 0; r < rows; r++) {
        const z = 1.1 + (rows - r) * 0.22 // far (large z) to near (small z)
        const depth = 1 - r / rows
        const alpha = 0.18 + (1 - depth) * 0.7
        ctx.beginPath()
        for (let c = 0; c <= cols; c++) {
          const u = c / cols - 0.5 // -0.5 .. 0.5 across
          const worldX = u * 9
          const y = wave(worldX * 0.45, z, t) * 0.6
          const sx = w / 2 + (worldX / z) * focal * 0.62
          const sy = horizon + ((camH - y) / z) * focal * 0.32
          if (c === 0) ctx.moveTo(sx, sy)
          else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.8 + (1 - depth) * 1.4
        ctx.stroke()
      }
    }

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt * speed * 2
      draw()
      if (visible) frame = requestAnimationFrame(loop)
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
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
  }, [color, rows, speed])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
