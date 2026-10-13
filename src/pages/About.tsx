import { ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Awards from '../components/Awards'
import ClientLogoGrid from '../components/ClientLogoGrid'
import Footer from '../components/Footer'
import InlineVideo from '../components/InlineVideo'
import { Reveal, RevealLines } from '../components/Reveal'
import Slideshow from '../components/Slideshow'
import TeamMember from '../components/TeamMember'
import { asset } from '../data/assets'
import { site } from '../data/site'
import { team } from '../data/team'
import { prefersReducedMotion } from '../hooks/motion'
import { useSeo } from '../hooks/useSeo'

gsap.registerPlugin(ScrollTrigger)

const visionaries = [
  { src: asset('images/visionaries/bts-01.webp'), alt: 'Ara Soudjian smiling with an actor on a blue-lit set' },
  { src: asset('images/visionaries/bts-02.webp'), alt: 'Ara Soudjian operating an ARRI Alexa camera with crew behind him' },
  { src: asset('images/visionaries/bts-03.webp'), alt: 'Ara Soudjian directing on a period interior set' },
  { src: asset('images/visionaries/bts-04.webp'), alt: 'Ara Soudjian pointing towards the camera on set' },
  { src: asset('images/visionaries/bts-05.webp'), alt: 'A clapperboard held up at night before a take' },
  { src: asset('images/visionaries/bts-06.webp'), alt: 'Cast and crew group photo on set' },
  { src: asset('images/visionaries/bts-07.webp'), alt: 'Ara Soudjian on set by a pool, pointing out a shot beside an actor in a leather jacket' },
]

export default function About() {
  useSeo('About', 'Friendly Entertainment crafts premium, story-driven content that connects with your audience — friendly, collaborative, and world-class.')
  const statement = useRef<HTMLHeadingElement>(null)
  const closing = useRef<HTMLElement>(null)
  const [v1, v2] = site.about.videos

  const lines: ReactNode[] = [
    <>We craft <InlineVideo {...v1} /> premium,</>,
    'story-driven content',
    <>that connects <InlineVideo {...v2} /> with</>,
    'your audience.',
  ]

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Each line of the statement brightens as it climbs the viewport.
      gsap.utils.toArray<HTMLElement>('[data-line]', statement.current).forEach((line, i) => {
        gsap.fromTo(line, { opacity: 0.16 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: line, start: i < 3 ? 'top 100%' : 'top 82%', end: i < 3 ? `top ${60 - i * 6}%` : 'top 48%', scrub: 0.4 } })
      })
      // Closing image rises up into the headline.
      gsap.fromTo('[data-rise]', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: closing.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="gutter pt-36 sm:pt-44">
        <h1 ref={statement} className="display flat text-[clamp(38px,7.1vw,138px)] leading-[1.02] text-white">
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
        <RevealLines as="h2" className="display flat mb-14 text-center text-[clamp(40px,6vw,104px)] text-white sm:mb-20" lines={['Trusted by']} />
        <ClientLogoGrid />
      </section>

      <Awards />

      <section ref={closing} className="relative overflow-hidden px-2 pb-24 pt-10 text-center sm:pb-32">
        <RevealLines as="h2" className="display flat relative z-10 text-[clamp(40px,6vw,104px)] text-white" lines={['We are creative', 'visionaries']} />
        <div data-rise className="relative z-0 mx-auto -mt-[0.5em] w-[clamp(240px,31vw,580px)] text-[clamp(40px,6vw,104px)]">
          <Slideshow slides={visionaries} className="rounded-[clamp(14px,2vw,32px)]" />
        </div>
      </section>
      <Footer />
    </>
  )
}
