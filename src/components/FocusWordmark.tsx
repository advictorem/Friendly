import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { canHover, prefersReducedMotion } from '../hooks/motion'
import FitText from './FitText'

const SHARP_MASK =
  'linear-gradient(90deg, transparent calc(var(--fx) - var(--fw)), #000 calc(var(--fx) - var(--fw) * 0.55), #000 calc(var(--fx) + var(--fw) * 0.55), transparent calc(var(--fx) + var(--fw)))'

/**
 * The homepage wordmark, out of focus until you hover it. A vertical focus band, framed by small
 * autofocus brackets, follows a smoothed copy of the cursor and pulls the letters under it sharp.
 * A soft circular cursor dot trails the pointer with the same easing.
 * Touch screens and reduced-motion visitors get a still version that is sharp in the middle.
 */
export default function FocusWordmark({ text }: { text: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const interactive = useRef(false)

  useEffect(() => {
    const el = wrap.current, d = dot.current
    if (!el || !d) return
    interactive.current = canHover() && !prefersReducedMotion()
    el.dataset.mode = interactive.current ? 'hover' : 'static'
    if (!interactive.current) return

    let raf = 0, inside = false
    const target = { x: 0, y: 0, fx: 0 }
    const cur = { x: 0, y: 0, fx: 0, focus: 0, dot: 0 }

    const tick = () => {
      // Dot follows quickly, the focus band a little slower: both ease rather than snap.
      cur.x += (target.x - cur.x) * 0.2
      cur.y += (target.y - cur.y) * 0.2
      cur.fx += (target.fx - cur.fx) * 0.12
      cur.focus += ((inside ? 1 : 0) - cur.focus) * 0.08
      cur.dot += ((inside ? 1 : 0) - cur.dot) * 0.18
      el.style.setProperty('--fx', `${cur.fx}px`)
      el.style.setProperty('--focus', cur.focus.toFixed(3))
      d.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%) scale(${0.4 + cur.dot * 0.6})`
      d.style.opacity = cur.dot.toFixed(3)
      const settling = Math.abs(target.x - cur.x) + Math.abs(target.fx - cur.fx) > 0.3 || Math.abs((inside ? 1 : 0) - cur.focus) > 0.002
      raf = settling ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = e.clientX
      target.y = e.clientY
      target.fx = e.clientX - r.left
      kick()
    }
    const enter = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      // Start the band where the pointer came in rather than sliding from the left edge.
      if (cur.focus < 0.05) { cur.fx = e.clientX - r.left; cur.x = e.clientX; cur.y = e.clientY }
      inside = true
      move(e)
    }
    const leave = () => { inside = false; kick() }

    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={wrap} className="focus-wordmark relative" style={{ ['--fx' as string]: '-999px', ['--focus' as string]: 0 }}>
      {/* Out of focus */}
      <FitText className="focus-soft text-[#e6e6e6]">{text}</FitText>
      {/* In focus: revealed only inside the band (hover) or in the middle (static) */}
      <FitText className="focus-sharp absolute inset-0 text-[#e6e6e6]">{text}</FitText>
      {/* Autofocus brackets riding on the band */}
      <div className="focus-af pointer-events-none absolute inset-y-[0.04em] left-0 w-[calc(var(--fw)*1.1)]" aria-hidden="true">
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c) => (
          <span key={c} className={`absolute h-[clamp(12px,1.4vw,22px)] w-[clamp(12px,1.4vw,22px)] border-white/80 ${c}`} />
        ))}
      </div>
      {/* Rendered into <body>: the wordmark sits inside a transformed reveal wrapper, which would otherwise offset a fixed element. */}
      {createPortal(<div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] h-5 w-5 rounded-full bg-white/50 opacity-0 mix-blend-difference" aria-hidden="true" />, document.body)}
      <style>{`
        .focus-wordmark { --fw: clamp(110px, 13vw, 260px); }
        .focus-wordmark[data-mode="hover"] { cursor: none; }
        .focus-wordmark .focus-soft { filter: blur(clamp(5px, 0.6vw, 10px)); opacity: 0.85; }
        .focus-wordmark[data-mode="hover"] .focus-sharp { -webkit-mask-image: ${SHARP_MASK}; mask-image: ${SHARP_MASK}; opacity: var(--focus); }
        .focus-wordmark[data-mode="hover"] .focus-af { transform: translateX(calc(var(--fx) - var(--fw) * 0.55)); opacity: calc(var(--focus) * 0.9); }
        .focus-wordmark:not([data-mode="hover"]) .focus-af { display: none; }
        .focus-wordmark:not([data-mode="hover"]) .focus-sharp {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
        }
      `}</style>
    </div>
  )
}
