import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import type { Project } from '../data/projects'
import { prefersReducedMotion } from '../hooks/motion'
import PortfolioCard from './PortfolioCard'

gsap.registerPlugin(Flip)

/**
 * Three-up card grid. All projects stay mounted; `filter` hides the ones that don't match,
 * and GSAP Flip animates the survivors to their new positions so the reflow never snaps.
 */
export default function PortfolioGrid({ projects, filter = 'all' }: { projects: Project[]; filter?: string }) {
  const grid = useRef<HTMLDivElement>(null)
  const applied = useRef<string | null>(null)

  useLayoutEffect(() => {
    const el = grid.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    const matches = (item: HTMLElement) => filter === 'all' || (item.dataset.cats ?? '').split(' ').includes(filter)
    const first = applied.current === null
    applied.current = filter

    if (first || prefersReducedMotion()) {
      items.forEach((item) => { item.style.display = matches(item) ? '' : 'none' })
      if (first && !prefersReducedMotion()) {
        // Progressive scroll-in for the initial load.
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e, i) => {
            if (!e.isIntersecting) return
            io.unobserve(e.target)
            gsap.to(e.target, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.08, clearProps: 'transform' })
          })
        }, { rootMargin: '0px 0px -6% 0px' })
        items.forEach((item) => { gsap.set(item, { opacity: 0, y: 40 }); io.observe(item) })
        return () => io.disconnect()
      }
      return
    }

    const state = Flip.getState(items)
    items.forEach((item) => { item.style.display = matches(item) ? '' : 'none' })
    const tl = Flip.from(state, {
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true,
      scale: false,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.15, clearProps: 'transform' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3, ease: 'power2.in' }),
      onComplete: () => items.forEach((item) => matches(item) && gsap.set(item, { clearProps: 'all' })),
    })
    return () => { tl.kill(); items.forEach((item) => gsap.set(item, { clearProps: 'all' })); items.forEach((item) => { item.style.display = matches(item) ? '' : 'none' }) }
  }, [filter])

  return (
    <div ref={grid} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <div key={p.id} data-cats={p.category.join(' ')}>
          <PortfolioCard project={p} eager={i < 3} />
        </div>
      ))}
    </div>
  )
}
