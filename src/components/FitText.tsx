import { useLayoutEffect, useRef } from 'react'

/** Scales a single line of display type to exactly fill its container's width. */
export default function FitText({ children, className = '' }: { children: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current, t = text.current
      if (!b || !t) return
      t.style.fontSize = '100px'
      const w = t.getBoundingClientRect().width
      if (w > 0) t.style.fontSize = `${(b.clientWidth / w) * 100}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (box.current) ro.observe(box.current)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [children])

  return (
    <div ref={box} className={`w-full overflow-hidden ${className}`}>
      <span ref={text} className="display inline-block whitespace-nowrap leading-[0.82]">{children}</span>
    </div>
  )
}
