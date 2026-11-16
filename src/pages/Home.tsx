import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import LensFrame, { CameraHud } from '../components/LensFrame'
import FitText from '../components/FitText'
import PortfolioGrid from '../components/PortfolioGrid'
import { projects } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

/** The homepage shows the first dozen projects; the full portfolio lives on /work. */
const HOME_TILES = 12

export default function Home() {
  useSeo('Friendly Entertainment', 'Friendly Entertainment is a video production company based in Los Angeles, making story-driven content for products and brands.')
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id) }, [])

  return (
    <>
      <section className={`relative bg-black pb-[clamp(28px,4vw,56px)] pt-[clamp(150px,15vw,214px)] [--hud-inset:clamp(10px,1.2vw,22px)] [--hud-top:clamp(84px,8.2vw,124px)] ${ready ? 'is-in' : ''}`}>
        <LensFrame />
        <CameraHud />
        <h1 className="sr-only">Friendly Entertainment</h1>
        <div aria-hidden="true" className="gutter relative z-10">
          <div className="overflow-hidden">
            <div className="translate-y-full transition-transform duration-[1300ms] ease-cine [.is-in_&]:translate-y-0">
              <FitText className="text-[#e6e6e6]">FRIENDLY</FitText>
            </div>
          </div>
        </div>
        <div className="gutter relative z-10 grid grid-cols-1 gap-4 pt-[clamp(44px,4.4vw,68px)] sm:grid-cols-2 sm:gap-6 text-center text-[11px] uppercase leading-relaxed tracking-[0.06em] text-soft sm:text-[13px]">
          <p className="fade-up mx-auto" style={{ ['--i' as string]: 6 }}>video production company<span className="block">based in Los Angeles</span></p>
          <p className="fade-up mx-auto" style={{ ['--i' as string]: 8 }}>Story-driven content<span className="block">for products &amp; brands</span></p>
        </div>
      </section>

      <section id="work" aria-label="Portfolio" className="px-2">
        <PortfolioGrid projects={projects.slice(0, HOME_TILES)} />
        <div className="flex justify-center pb-8 pt-16 sm:pt-24">
          <Link to="/work" className="pill">See More Work <span className="pill-icon" aria-hidden="true">→</span></Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
