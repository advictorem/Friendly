import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../hooks/motion'
import Header from './Header'
import VimeoModal from './VimeoModal'
import Home from '../pages/Home'
import Work from '../pages/Work'
import About from '../pages/About'
import Contact from '../pages/Contact'
import ProjectDetail from '../pages/ProjectDetail'
import NotFound from '../pages/NotFound'

gsap.registerPlugin(ScrollTrigger)

const EXIT_MS = 320

/** App shell: smooth scrolling, the fade-through page transition, the header and the video lightbox. */
export default function Layout() {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const l = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.current = l
    l.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? l.stop() : l.start())
    window.addEventListener('scroll-lock', onLock)
    return () => { window.removeEventListener('scroll-lock', onLock); gsap.ticker.remove(tick); l.destroy(); lenis.current = null }
  }, [])

  // Fade the current page out, swap routes at the top of the document, fade the next one in.
  useEffect(() => {
    if (location.pathname === shown.pathname) return
    setPhase('out')
    const t = setTimeout(() => {
      setShown(location)
      if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo(0, 0)
      setPhase('in')
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, prefersReducedMotion() ? 0 : EXIT_MS)
    return () => clearTimeout(t)
  }, [location, shown.pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <Header />
      <main id="main" key={shown.pathname} className={`transition-opacity ease-cine ${phase === 'in' ? 'opacity-100 duration-700' : 'opacity-0 duration-300'}`}>
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <VimeoModal />
    </>
  )
}
