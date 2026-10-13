import { useEffect, useState } from 'react'
import FitText from '../components/FitText'
import Footer from '../components/Footer'
import LensFrame, { FrameGuide, PacificClock } from '../components/LensFrame'
import PortfolioGrid from '../components/PortfolioGrid'
import { projects } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo('Friendly Entertainment', 'Friendly Entertainment is a video production company based in Los Angeles, making story-driven content for products and brands.')
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id) }, [])

  return (
    <>
      <section className={`relative bg-black pb-[clamp(28px,4vw,56px)] pt-[clamp(110px,12vw,170px)] ${ready ? 'is-in' : ''}`}>
        <LensFrame />
        <h1 className="sr-only">Friendly Entertainment</h1>
        {/* Wordmark with a lens-focus falloff: a blurred copy underneath, and a sharp copy masked so it fades out towards the edges. */}
        <div aria-hidden="true" className="gutter relative">
          <FrameGuide />
          <div className="overflow-hidden">
            <div className="translate-y-full transition-transform duration-[1300ms] ease-cine [.is-in_&]:translate-y-0">
              <div className="relative">
                <FitText className="text-[#e6e6e6] blur-[6px] opacity-90">FRIENDLY</FitText>
                <FitText className="absolute inset-0 text-[#e6e6e6] [mask-image:linear-gradient(90deg,transparent_0%,#000_26%,#000_74%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_26%,#000_74%,transparent_100%)]">FRIENDLY</FitText>
              </div>
            </div>
          </div>
        </div>
        <div className="gutter relative grid grid-cols-1 gap-4 pt-[clamp(44px,4.4vw,68px)] sm:grid-cols-2 sm:gap-6 text-center text-[11px] uppercase leading-relaxed tracking-[0.06em] text-soft sm:text-[13px]">
          <p className="fade-up mx-auto" style={{ ['--i' as string]: 6 }}>video production company<span className="block">based in Los Angeles</span></p>
          <p className="fade-up mx-auto" style={{ ['--i' as string]: 8 }}>Story-driven content<span className="block">for products &amp; brands</span></p>
          <div className="fade-up absolute right-[var(--gutter)] top-[clamp(30px,3.2vw,50px)] hidden text-[12px] normal-case tracking-[0.08em] text-white sm:text-[13px] md:block" style={{ ['--i' as string]: 9 }}>
            <PacificClock />
          </div>
        </div>
      </section>

      <section id="work" aria-label="Portfolio" className="px-2">
        <PortfolioGrid projects={projects} />
      </section>
      <Footer />
    </>
  )
}
