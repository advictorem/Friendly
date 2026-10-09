import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/motion'

/**
 * Horizontally drifting strip of stills. Drag or swipe to scrub; release carries momentum
 * that eases back to the resting drift. The list is doubled so the loop is seamless.
 */
export default function MediaCarousel({ images, label }: { images: string[]; label: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current, tr = track.current
    if (!el || !tr) return
    const drift = prefersReducedMotion() ? 0 : -0.6
    let x = 0, v = drift, half = 0, dragging = false, lastX = 0, visible = true, raf = 0

    const measure = () => { half = tr.scrollWidth / 2 }
    const ro = new ResizeObserver(measure)
    ro.observe(tr)
    tr.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure, { once: true }))
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible || half === 0) return
      if (!dragging) { v += (drift - v) * 0.05; x += v }
      if (x <= -half) x += half
      if (x > 0) x -= half
      tr.style.transform = `translate3d(${x}px,0,0)`
    }
    raf = requestAnimationFrame(frame)

    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; v = 0; el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing' }
    const move = (e: PointerEvent) => { if (!dragging) return; const d = e.clientX - lastX; lastX = e.clientX; x += d; v = d }
    const up = () => { dragging = false; el.style.cursor = '' }
    const key = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') v = -28; if (e.key === 'ArrowLeft') v = 28 }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('keydown', key)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('keydown', key)
    }
  }, [images])

  return (
    <div className="overflow-hidden py-[3vw]">
      <div
        ref={wrap}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${label} — stills. Drag, swipe or use the arrow keys to move.`}
        tabIndex={0}
        className="-rotate-2 cursor-grab touch-pan-y select-none"
      >
        <div ref={track} className="flex w-max gap-2 will-change-transform">
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={i < images.length ? `${label}, still ${i + 1}` : ''}
              aria-hidden={i >= images.length}
              draggable={false}
              loading={i < 4 ? 'eager' : 'lazy'}
              className="h-[clamp(240px,40vw,600px)] w-auto shrink-0 rounded-[14px] bg-card object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
