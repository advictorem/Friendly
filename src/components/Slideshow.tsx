import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/motion'

/**
 * Crossfading photo gallery that holds each frame for `interval` ms inside a fixed portrait frame.
 * It runs only while on screen and stays on the first photo for visitors who prefer reduced motion.
 */
export default function Slideshow({ slides, interval = 3000, className = '' }: { slides: { src: string; alt: string }[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0)
  const [onScreen, setOnScreen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const maxSeen = useRef(1)
  maxSeen.current = Math.max(maxSeen.current, index + 1)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!onScreen || prefersReducedMotion() || slides.length < 2) return
    const t = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => window.clearInterval(t)
  }, [onScreen, interval, slides.length])

  return (
    <div ref={ref} role="group" aria-roledescription="slideshow" aria-label="Behind the scenes with Friendly Entertainment" className={`relative aspect-[1100/1333] overflow-hidden bg-card ${className}`}>
      {slides.map((s, i) => {
        // Load the current and next photos up front and keep each one once loaded, so a fading-out frame never blanks.
        const near = i <= Math.max(index + 1, maxSeen.current)
        return (
          <img
            key={s.src}
            src={near ? s.src : undefined}
            alt={s.alt}
            aria-hidden={i !== index}
            width={1100}
            height={1333}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-cine ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        )
      })}
    </div>
  )
}
