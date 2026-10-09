import { useEffect, useState } from 'react'
import FitText from '../components/FitText'
import Footer from '../components/Footer'
import PortfolioGrid from '../components/PortfolioGrid'
import { projects } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo('Friendly Entertainment', 'Friendly Entertainment is a video production studio based in Los Angeles, creating story-driven content for brands.')
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id) }, [])

  return (
    <>
      <section className={`gutter pt-[104px] sm:pt-[120px] ${ready ? 'is-in' : ''}`}>
        <h1 className="sr-only">Friendly Entertainment</h1>
        <div aria-hidden="true" className="overflow-hidden">
          <div className="translate-y-full transition-transform duration-[1300ms] ease-cine [.is-in_&]:translate-y-0">
            <FitText className="text-[#e6e6e6]">FRIENDLY</FitText>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 py-8 text-center text-[11px] uppercase leading-relaxed tracking-[0.06em] text-soft sm:py-12 sm:text-[13px]">
          <p className="fade-up mx-auto max-w-[26ch]" style={{ ['--i' as string]: 6 }}>video production studio based in Los Angeles</p>
          <p className="fade-up mx-auto max-w-[26ch]" style={{ ['--i' as string]: 8 }}>creating story-driven content for brands</p>
        </div>
      </section>

      <section id="work" aria-label="Portfolio" className="px-2">
        <PortfolioGrid projects={projects} />
      </section>
      <Footer />
    </>
  )
}
