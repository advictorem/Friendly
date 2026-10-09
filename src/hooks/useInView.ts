import { useEffect, useRef, useState } from 'react'

/** Adds an `is-in` flag once the element scrolls into view. Used for one-shot reveals. */
export function useInView<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, inView }
}
