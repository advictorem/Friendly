import { awards } from '../data/awards'
import { Reveal, RevealLines } from './Reveal'

/** "Proudly awarded with" — three award marks, each linking to the awarding body. */
export default function Awards() {
  return (
    <section className="gutter pb-40 text-center sm:pb-56">
      <RevealLines as="h2" className="display text-[clamp(52px,9.5vw,180px)] text-white" lines={['Proudly', 'awarded', 'with']} />
      <ul className="mt-14 grid gap-2 sm:mt-20 sm:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.name} delay={i * 2}>
            <a href={a.href} target="_blank" rel="noreferrer" className="group flex aspect-[3/2] items-center justify-center rounded-[14px] bg-card">
              <img src={a.logo} alt={a.name} loading="lazy" style={{ width: `${Math.round(Math.min(62, 26 * Math.sqrt(a.ratio)))}%` }} className="h-auto max-h-[56%] object-contain opacity-80 grayscale transition-[opacity,transform] duration-500 ease-cine group-hover:scale-105 group-hover:opacity-100" />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
