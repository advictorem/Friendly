import { useEffect, useState } from 'react'
import FitText from '../components/FitText'
import Footer from '../components/Footer'
import LensFrame from '../components/LensFrame'
import PortfolioGrid from '../components/PortfolioGrid'
import { projects } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo('Friendly Entertainment', 'Friendly Entertainment is a video production company based in Los Angeles, making story-driven content for products and brands.')
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id) }, [])

  return (
    <>
      <section className={`relative flex min-h-[100svh] flex-col justify-center bg-black pb-[clamp(72px,10vh,120px)] pt-[104px] md:pt-[136px] ${ready ? 'is-in' : ''}`}>
        <LensFrame />
        <h1 className="sr-only">Friendly Entertainment</h1>
        {/* Wordmark with a lens-focus falloff: a blurred copy underneath, and a sharp copy masked so it fades out towards the edges. */}
        <div aria-hidden="true" className="gutter relative overflow-hidden">
          <div className="translate-y-full transition-transform duration-[1300ms] ease-cine [.is-in_&]:translate-y-0">
            <div className="relative">
              <FitText className="text-[#e6e6e6] blur-[6px] opacity-90">FRIENDLY</FitText>
              <FitText className="absolute inset-0 text-[#e6e6e6] [mask-image:linear-gradient(90deg,transparent_0%,#000_26%,#000_74%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_26%,#000_74%,transparent_100%)]">FRIENDLY</FitText>
            </div>
          </div>
        </div>
        <div className="gutter grid grid-cols-2 gap-6 py-8 text-center text-[11px] uppercase leading-relaxed tracking-[0.06em] text-soft sm:py-12 sm:text-[13px]">
          <p className="fade-up mx-auto max-w-[26ch]" style={{ ['--i' as string]: 6 }}>video production company based in Los Angeles</p>
          <p className="fade-up mx-auto max-w-[26ch]" style={{ ['--i' as string]: 8 }}>Story-driven content for products &amp; brands</p>
        </div>
      </section>

      <section id="work" aria-label="Portfolio" className="px-2">
        <PortfolioGrid projects={projects} />
      </section>
      <Footer />
    </>
  )
}
