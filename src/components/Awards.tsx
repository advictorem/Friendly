import { awards } from '../data/awards'
import { Reveal, RevealLines } from './Reveal'

/** Award marks, each with the project it was won for and the year. */
export default function Awards() {
  return (
    <section className="gutter pb-40 sm:pb-56">
      <RevealLines as="h2" className="display flat mb-14 text-center text-[clamp(40px,6vw,104px)] text-white sm:mb-20" lines={['Recognized by']} />
      <ul className="grid gap-x-2 gap-y-10 sm:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.project} delay={i * 2}>
            <a href={a.href} target="_blank" rel="noreferrer" aria-label={`${a.name}, ${a.project}, ${a.year}`} className="flex aspect-[3/2] items-center justify-center rounded-[14px] bg-card">
              <img src={a.logo} alt="" loading="lazy" style={{ width: `${Math.round(Math.min(62, 26 * Math.sqrt(a.ratio)))}%` }} className="h-auto max-h-[56%] object-contain" />
            </a>
            <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-2 text-center">
              <span className="label text-2xl text-white">{a.project}</span>
              <span className="meta">{a.name} <span aria-hidden="true">/</span> {a.year}</span>
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
