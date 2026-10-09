import { useLayoutEffect, useRef } from 'react'

/** Scales a single line of display type to exactly fill its container's width. */
export default function FitText({ children, className = '' }: { children: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current, t = text.current
      if (!b || !t) return
      // Tracking is not proportional to font size, so one measurement is not enough: refine a few times.
      let size = 100
      for (let i = 0; i < 4; i++) {
        t.style.fontSize = `${size}px`
        const w = t.getBoundingClientRect().width
        if (w <= 0) return
        size = size * (b.clientWidth / w)
      }
      t.style.fontSize = `${Math.floor(size * 100) / 100}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (box.current) ro.observe(box.current)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [children])

  return (
    <div ref={box} className={`w-full overflow-hidden ${className}`}>
      <span ref={text} className="display inline-block whitespace-nowrap pt-[0.09em] leading-[0.82] [letter-spacing:var(--display-track)] [padding-right:calc(-1*var(--display-track))]">{children}</span>
    </div>
  )
}
