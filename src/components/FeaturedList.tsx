import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { caseStudies } from '../data/caseStudies'
import { canHover, prefersReducedMotion } from '../hooks/motion'
import { useVideo } from './VideoContext'
import VideoPreview from './VideoPreview'

/**
 * Featured projects as a list of large titles. Hovering a title floats a tilted, full-colour card beside it —
 * the project's film playing muted, or its lead still for photo-led projects — that glides from row to row
 * as the cursor moves, as on the Apex Films "All works" page. Touch devices get the plain list.
 */
export default function FeaturedList() {
  const { activePreview, setActivePreview, modal } = useVideo()
  const list = useRef<HTMLUListElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const study = active === null ? null : caseStudies[active]
  const previewId = study?.vimeoId ? 'featured-' + study.slug : null

  // Glide the card to the hovered row; show and hide with a short scale and fade.
  useEffect(() => {
    const el = card.current, ul = list.current
    if (!el || !ul) return
    const reduce = prefersReducedMotion()
    gsap.set(el, { xPercent: 0, yPercent: -50, transformOrigin: '30% 50%' })
    if (active === null) {
      gsap.to(el, { autoAlpha: 0, scale: 0.85, rotate: 2, duration: reduce ? 0 : 0.35, ease: 'power2.out' })
      return
    }
    const row = ul.querySelectorAll<HTMLElement>('[data-title]')[active]
    const ulBox = ul.getBoundingClientRect(), box = row.getBoundingClientRect()
    const x = box.right - ulBox.left + 28
    const y = box.top - ulBox.top + box.height / 2
    const visible = gsap.getProperty(el, 'autoAlpha') as number > 0.05
    if (!visible || reduce) gsap.set(el, { x, y })
    gsap.to(el, { x, y, autoAlpha: 1, scale: 1, rotate: 6, duration: reduce ? 0 : 0.75, ease: 'elastic.out(1, 0.75)', overwrite: 'auto' })
  }, [active])

  useEffect(() => {
    if (previewId && !modal) setActivePreview(previewId)
    return () => { if (previewId) setActivePreview(null) }
  }, [previewId, modal, setActivePreview])

  const enter = (i: number) => canHover() && setActive(i)

  return (
    <div className="relative">
      <ul ref={list} className="relative mt-5 space-y-4 sm:space-y-1" onMouseLeave={() => setActive(null)}>
        {caseStudies.map((c, i) => (
          <li key={c.slug}>
            <Link
              to={`/work/${c.slug}`}
              onMouseEnter={() => enter(i)}
              onFocus={() => enter(i)}
              onBlur={() => setActive(null)}
              className="group inline-flex flex-col items-center gap-1 text-mute sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span data-title className={`display flat text-[clamp(34px,5vw,76px)] transition-colors duration-300 ${active === null || active === i ? 'text-soft group-hover:text-white group-focus-visible:text-white' : 'text-[#4d4d4d]'}`}>{c.title}</span>
              <span className={`meta transition-opacity duration-300 ${active !== null && active !== i ? 'opacity-40' : ''}`}>{c.client}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview card. Positioned from the list's top-left; decorative, so hidden from assistive tech. */}
      <div
        ref={card}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 z-20 hidden w-[clamp(200px,17vw,320px)] opacity-0 md:block"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-card shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {caseStudies.map((c, i) => (
            <img key={c.slug} src={c.hero} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          {study?.vimeoId && previewId && activePreview === previewId && (
            <VideoPreview key={study.vimeoId} vimeoId={study.vimeoId} loopSeconds={0} cover="h-[101%] w-[120%]" />
          )}
        </div>
      </div>
    </div>
  )
}
