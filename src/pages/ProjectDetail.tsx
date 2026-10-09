import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import MediaCarousel from '../components/MediaCarousel'
import PortfolioCard from '../components/PortfolioCard'
import { Reveal, RevealLines } from '../components/Reveal'
import { caseStudies, caseStudyBySlug } from '../data/caseStudies'
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

export default function ProjectDetail() {
  const { slug } = useParams()
  const study = caseStudyBySlug(slug)
  useSeo(study ? `${study.title} — ${study.client}` : 'Project', study?.summary ?? '')
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

      <Reveal as="section" className="gutter py-20 sm:py-28">
        <dl className="mx-auto grid w-fit grid-cols-[auto_auto] gap-x-4 gap-y-2 text-left">
          {credits.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="label text-right text-base text-white">{k}</dt>
              <dd className="max-w-[46ch] text-base text-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {study.vimeoId && (
        <Reveal as="section" className="gutter">
          <Film vimeoId={study.vimeoId} title={main ? `${main.client} — ${main.title}` : study.title} poster={study.hero} />
        </Reveal>
      )}

      <section className="gutter mx-auto max-w-[680px] space-y-14 py-24 text-center sm:py-32">
        {sections.map(([heading, paras]) => (
          <Reveal key={heading}>
            <h2 className="label text-2xl text-white">{heading}</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-soft">{paras.map((p) => <p key={p}>{p}</p>)}</div>
          </Reveal>
        ))}
      </section>

      {films.length > 0 && (
        <section aria-label="More films from this campaign" className="px-2 pb-24">
          <h2 className="display mb-10 text-center text-[clamp(36px,5vw,80px)] text-white">More from the campaign</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{films.map((p) => <PortfolioCard key={p.id} project={{ ...p, caseStudy: undefined }} />)}</div>
        </section>
      )}

      <section className="gutter py-24 text-center">
        <h2 className="display text-[clamp(44px,6.4vw,110px)] text-white">Other projects</h2>
        <ul className="mx-auto mt-12 grid max-w-[900px] gap-2 sm:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/work/${c.slug}`} className="roll-host group block rounded-[14px] bg-card p-1 text-left">
                <div className="aspect-[11/10] overflow-hidden rounded-[11px]">
                  <img src={c.hero} alt={`${c.client}, ${c.title}`} loading="lazy" className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-cine group-hover:scale-[1.03] group-hover:grayscale-0" />
                </div>
                <div className="px-4 pb-4 pt-5">
                  <h3 className="label text-lg text-white"><span className="roll"><span>{c.title}</span><span aria-hidden="true">{c.title}</span></span></h3>
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
