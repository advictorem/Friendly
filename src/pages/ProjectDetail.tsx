import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import MediaCarousel from '../components/MediaCarousel'
import PortfolioCard from '../components/PortfolioCard'
import { Reveal, RevealLines } from '../components/Reveal'
import VideoPreview from '../components/VideoPreview'
import { caseStudies, caseStudyBySlug, type MediaItem } from '../data/caseStudies'
import { prefersReducedMotion } from '../hooks/motion'
import { projectByVimeoId, type Project } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import NotFound from './NotFound'

function Film({ vimeoId, title, poster }: { vimeoId: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative mx-auto aspect-video w-full max-w-[1180px] overflow-hidden rounded-[14px] bg-card">
      {playing ? (
        <iframe src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`} className="group absolute inset-0">
          <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-[opacity,transform] duration-700 ease-cine group-hover:scale-[1.02] group-hover:opacity-100" />
          <span className="label absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/40 text-lg text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black">Play</span>
        </button>
      )}
    </div>
  )
}

/** True while the element is on (or near) screen. */
function useOnScreen<T extends HTMLElement>(margin = '200px 0px') {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [margin])
  return { ref, on }
}

/** Short film that plays muted on a loop while on screen. No controls: it reads as a moving still. */
function LoopFilm({ vimeoId, poster, title }: { vimeoId: string; poster: string; title: string }) {
  const { ref, on } = useOnScreen<HTMLDivElement>()
  return (
    <div ref={ref} role="img" aria-label={title} className="relative aspect-video w-full overflow-hidden bg-card">
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {on && !prefersReducedMotion() && <VideoPreview vimeoId={vimeoId} loopSeconds={0} cover="h-[102%] w-[102%]" />}
    </div>
  )
}

/** One tile of the photo wall: a still, or a silent looping clip that only plays while visible. */
function MediaTile({ item, eager = false }: { item: MediaItem; eager?: boolean }) {
  const { ref, on } = useOnScreen<HTMLDivElement>('100px 0px')
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (on && !prefersReducedMotion()) v.play().catch(() => {})
    else v.pause()
  }, [on])
  return (
    <div ref={ref} className="overflow-hidden bg-card" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
      {item.video ? (
        <video ref={video} src={on || eager ? item.video : undefined} poster={item.src} muted loop playsInline preload="none" aria-label={item.alt} className="h-full w-full object-cover" />
      ) : (
        <img src={item.src} alt={item.alt} width={item.w} height={item.h} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" />
      )}
    </div>
  )
}

/** Wider side padding for case-study copy and gallery rows, so content sits well inside the browser edge. */
const PAD = 'px-[clamp(22px,6vw,128px)]'

export default function ProjectDetail() {
  const { slug } = useParams()
  const study = caseStudyBySlug(slug)
  useSeo(study ? `${study.title} | ${study.client}` : 'Project', study?.summary ?? '')
  if (!study) return <NotFound />

  const credits = ([
    ['Production', study.credits.production],
    ['Director', study.credits.director],
    ['Cinematographer', study.credits.cinematographer],
    ['Client', study.credits.client],
    ['Featuring', study.featuring],
    ['Year', study.credits.year],
  ] as const).filter(([, v]) => v)
  const films = (study.films ?? []).map(projectByVimeoId).filter(Boolean) as Project[]
  const main = study.vimeoId ? projectByVimeoId(study.vimeoId) : undefined
  const others = caseStudies.filter((c) => c.slug !== study.slug)
  const sections = [['Overview', study.overview], ['Challenges & Approach', study.challenge], ['The Result', study.result]] as const

  return (
    <>
      <section className="pt-36 text-center sm:pt-44">
        <div className="gutter">
          <RevealLines as="h1" immediate className={`display text-white ${study.title.length > 12 ? 'text-[clamp(52px,11.5vw,210px)]' : 'text-[clamp(72px,19vw,340px)]'}`} lines={[study.title]} />
          <p className="meta mt-5">{study.client} <span aria-hidden="true">/</span> {study.category}</p>
        </div>
        <div className="mt-10 sm:mt-16"><MediaCarousel images={study.gallery} label={`${study.client}, ${study.title}`} /></div>
      </section>

      {/* Facts (secondary, centred), then the three copy sections side by side */}
      <section className={`${PAD} pb-20 pt-20 sm:pb-28 sm:pt-28`}>
        <Reveal>
          {study.deliverables ? (
            <dl className="mx-auto flex max-w-[760px] flex-col items-center gap-8 text-center">
              <div>
                <dt className="meta">Client</dt>
                <dd className="label mt-2 text-lg text-white">{study.credits.client ?? study.client}</dd>
              </div>
              <div>
                <dt className="meta">Deliverables</dt>
                <dd className="mt-2">
                  <ul className="label flex flex-wrap min-[360px]:flex-nowrap items-baseline justify-center gap-x-[0.6em] gap-y-1 min-[360px]:whitespace-nowrap text-[clamp(12px,3.1vw,18px)] text-white">
                    {study.deliverables.map((d, i) => (
                      <li key={d} className="flex items-baseline gap-x-[0.6em]">
                        {i > 0 && <span aria-hidden="true" className="text-mute">•</span>}
                        {d}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          ) : (
            <dl className="mx-auto flex max-w-[560px] flex-col items-center gap-6 text-center">
              {credits.map(([k, v]) => (
                <div key={k}>
                  <dt className="meta">{k}</dt>
                  <dd className="mt-2 text-[15px] text-soft">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <div className="mt-20 grid gap-x-[clamp(28px,4vw,72px)] gap-y-12 border-t border-line pt-10 sm:mt-28 md:grid-cols-3">
          {sections.map(([heading, paras], i) => (
            <Reveal key={heading} delay={i * 2}>
              <h2 className="label text-2xl text-white">{heading}</h2>
              <div className="mt-4 max-w-[46ch] space-y-4 text-[17px] leading-relaxed text-soft">{paras.map((p) => <p key={p}>{p}</p>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {study.vimeoId && (
        <Reveal as="section" className="px-2">
          {study.loop
            ? <LoopFilm vimeoId={study.vimeoId} poster={study.filmPoster ?? study.hero} title={`${study.client}, ${study.title} film`} />
            : <Film vimeoId={study.vimeoId} title={main ? `${main.client}: ${main.title}` : study.title} poster={study.hero} />}
        </Reveal>
      )}

      {/* Gallery: edge-to-edge images alternating with loosely composed rows that leave columns empty */}
      {study.media && (
        <section aria-label={`${study.title} photography and clips`} className="space-y-[clamp(48px,9vw,168px)] pt-[clamp(48px,9vw,168px)]">
          {study.media.map((block, i) => 'full' in block ? (
            <Reveal key={i} className="px-2"><MediaTile item={block.full} /></Reveal>
          ) : (
            <div key={i} className={`${PAD} grid grid-cols-6 gap-x-[clamp(12px,2.4vw,40px)] gap-y-6 md:grid-cols-12 ${block.align === 'end' ? 'md:items-end' : block.align === 'center' ? 'md:items-center' : 'md:items-start'}`}>
              {block.row.map((item, n) => {
                const tall = item.h > item.w
                // Phones: wide shots fill the row; tall ones take two-thirds, alternating sides.
                const mobile = tall ? `col-span-4 ${(i + n) % 2 ? 'col-start-3' : 'col-start-1'}` : 'col-span-6'
                return (
                  <Reveal key={item.src} delay={n * 2} className={`${mobile} md:[grid-column:var(--col)]`} style={{ ['--col' as string]: `${item.start} / span ${item.span}` }}>
                    <MediaTile item={item} />
                  </Reveal>
                )
              })}
            </div>
          ))}
        </section>
      )}

      {study.press && (
        <section className="px-2 pt-28 sm:pt-40">
          <RevealLines as="h2" className="display flat mb-10 text-center text-[clamp(40px,6vw,104px)] text-white sm:mb-14" lines={['Featured in']} />
          <ul className="grid gap-2 md:grid-cols-3">
            {study.press.map((p, i) => (
              <Reveal as="li" key={p.href} delay={i * 2}>
                <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.outlet}: ${p.title} (opens in a new tab)`} className="group flex h-full flex-col rounded-[14px] bg-card p-1">
                  <div className="relative aspect-[171/100] overflow-hidden rounded-[11px] bg-black">
                    <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-cine group-hover:scale-[1.04]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-black/20" />
                    <img src={p.logo} alt={p.outlet} style={{ width: p.logoWidth }} className="absolute left-1/2 top-1/2 h-auto max-h-[34%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]" />
                  </div>
                  <div className="px-4 pb-5 pt-5 sm:px-5">
                    <h3 className="label text-[22px] leading-[1.15] text-white">{p.title}</h3>
                    <p className="meta mt-2">{p.outlet}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {films.length > 0 && (
        <section aria-label="More films from this campaign" className="px-2 pb-24 pt-24 sm:pt-32">
          <h2 className="display mb-10 text-center text-[clamp(36px,5vw,80px)] text-white">More from the campaign</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{films.map((p) => <PortfolioCard key={p.id} project={{ ...p, caseStudy: undefined }} />)}</div>
        </section>
      )}

      {/* More work: tiles overlap the lower part of an oversized, dimmed heading */}
      <section className="gutter pb-24 pt-28 text-center sm:pt-40">
        <h2 className="display flat text-[clamp(72px,12.5vw,300px)] leading-[0.9] text-[#333]">More work</h2>
        <ul className="relative z-10 mx-auto -mt-[clamp(14px,2.4vw,58px)] grid max-w-[1125px] gap-2 sm:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/work/${c.slug}`} className="roll-host group block rounded-[14px] bg-card p-1 text-left">
                <div className="aspect-[11/10] overflow-hidden rounded-[11px]">
                  <img src={c.hero} alt={`${c.client}, ${c.title}`} loading="lazy" className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-cine group-hover:scale-[1.03] group-hover:grayscale-0" />
                </div>
                <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
                  <h3 className="label text-xl text-white"><span className="roll"><span>{c.title}</span><span aria-hidden="true">{c.title}</span></span></h3>
                  <p className="meta mt-1">{c.client}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  )
}
