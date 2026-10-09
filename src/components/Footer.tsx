import { CSSProperties } from 'react'
import { site } from '../data/site'
import { useInView } from '../hooks/useInView'
import FitText from './FitText'
import { RevealLines } from './Reveal'

export function Credits({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 text-xs text-mute sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <p>{site.copyright} <a href={site.founder.href} target="_blank" rel="noreferrer" className="line-link text-soft hover:text-white">{site.founder.label}</a></p>
      <p>Site by <a href={site.credit.href} target="_blank" rel="noreferrer" className="line-link text-soft hover:text-white">{site.credit.label}</a></p>
    </div>
  )
}

/** Oversized closing footer: invitation, two actions, socials, and a wordmark the width of the viewport. */
export default function Footer() {
  const { ref, inView } = useInView<HTMLDivElement>('0px 0px -8% 0px')
  return (
    <footer className="gutter relative bg-black pb-4 pt-24 sm:pt-36">
      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <RevealLines as="h2" className="display text-[clamp(44px,7.2vw,124px)] text-white" lines={['Let’s make', 'something great.']} />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="pill">Book a call <span className="pill-icon" aria-hidden="true">→</span></a>
            <a href={site.emailHref} className="pill">Drop a line <span className="pill-icon" aria-hidden="true">@</span></a>
          </div>
        </div>
        <ul className="flex gap-6 text-lg text-white md:flex-col md:gap-1 md:pb-1 md:pr-[8vw] md:text-2xl">
          {[['Instagram', site.instagram], ['Vimeo', site.vimeo], ['LinkedIn', site.linkedin]].map(([label, href]) => (
            <li key={label}><a href={href} target="_blank" rel="noreferrer" className="line-link">{label}</a></li>
          ))}
        </ul>
      </div>

      <div ref={ref} aria-hidden="true" className={`mt-20 overflow-hidden sm:mt-28 ${inView ? 'is-in' : ''}`}>
        <div className="translate-y-[35%] opacity-0 transition-[transform,opacity] duration-[1400ms] ease-cine [.is-in>&]:translate-y-0 [.is-in>&]:opacity-100" style={{ '--i': 0 } as CSSProperties}>
          <FitText className="text-white">FRIENDLY</FitText>
        </div>
      </div>
      <Credits className="mt-5" />
    </footer>
  )
}
