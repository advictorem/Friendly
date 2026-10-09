import { ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ClientLogoGrid from '../components/ClientLogoGrid'
import Footer from '../components/Footer'
import InlineVideo from '../components/InlineVideo'
import { Reveal, RevealLines } from '../components/Reveal'
import TeamMember from '../components/TeamMember'
import { asset } from '../data/assets'
import { site } from '../data/site'
import { team } from '../data/team'
import { prefersReducedMotion } from '../hooks/motion'
import { useSeo } from '../hooks/useSeo'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useSeo('About', 'From creative direction to production, Friendly Entertainment crafts premium, story-driven content — friendly, collaborative, and world-class.')
  const statement = useRef<HTMLHeadingElement>(null)
  const closing = useRef<HTMLElement>(null)
  const [v1, v2] = site.about.videos

  const lines: ReactNode[] = [
    'From creative direction',
    <>to <InlineVideo {...v1} /> production, we craft</>,
    'premium, story-driven',
    'content that connects,',
    <>is memorable <InlineVideo {...v2} /> and most</>,
    'importantly authentically you.',
  ]

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Each line of the statement brightens as it climbs the viewport.
      gsap.utils.toArray<HTMLElement>('[data-line]', statement.current).forEach((line, i) => {
        gsap.fromTo(line, { opacity: 0.16 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: line, start: i < 3 ? 'top 100%' : 'top 82%', end: i < 3 ? `top ${60 - i * 6}%` : 'top 48%', scrub: 0.4 } })
      })
      // Closing image rises up into the headline.
      gsap.fromTo('[data-rise]', { yPercent: 18 }, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: closing.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="gutter pt-36 sm:pt-44">
        <h1 ref={statement} className="display text-[clamp(38px,7.1vw,138px)] leading-[1.02] text-white">
          {lines.map((line, i) => <span key={i} data-line className="md:block">{line}{" "}</span>)}
        </h1>
        <Reveal className="ml-auto mt-24 max-w-[440px] pb-32 text-lg leading-relaxed text-soft sm:mt-40 sm:pb-48 sm:text-xl">
          <p>At Friendly Entertainment, we believe great partnerships make great stories. Our approach with clients is just like our name – friendly, collaborative, and full of good energy — but what we deliver is world-class.</p>
        </Reveal>
      </section>

      <section aria-label="Team" className="px-2">
        <ul className="grid gap-x-2 gap-y-10 sm:grid-cols-3">
          {team.map((m, i) => <TeamMember key={m.name} member={m} index={i} />)}
        </ul>
      </section>

      <section className="gutter py-40 sm:py-56">
        <RevealLines as="h2" className="display mb-14 text-center text-[clamp(40px,6vw,104px)] text-white sm:mb-20" lines={['Trusted by']} />
        <ClientLogoGrid />
      </section>

      <section ref={closing} className="relative overflow-hidden px-2 pb-10 pt-10 text-center">
        <RevealLines as="h2" className="display relative z-0 text-[clamp(64px,13.5vw,250px)] text-white" lines={['Creative', 'Visionaries']} />
        <div data-rise className="relative z-10 mx-auto -mt-[5vw] w-[min(92%,1100px)] overflow-hidden rounded-[14px] bg-card p-1">
          <img src={asset('images/creative-visionaries.webp')} alt="Director Ara Soudjian on set beside a pool, pointing out a shot with an actor in a leather jacket" loading="lazy" width={1800} height={1203} className="h-auto w-full rounded-[11px] grayscale" />
        </div>
      </section>
      <Footer />
    </>
  )
}
