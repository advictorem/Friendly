import { clients } from '../data/clients'
import { Reveal } from './Reveal'

/** Width as a share of the cell, chosen so wide wordmarks and tall crests carry similar weight. */
const widthFor = (ratio = 2) => `${Math.round(Math.min(74, Math.max(26, 30 * Math.sqrt(ratio))))}%`

/** Five-across wall of client marks, static and full white. Clients without a logo file are left out rather than set in text. */
export default function ClientLogoGrid() {
  const withLogos = clients.filter((c) => c.logo)
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {withLogos.map((c, i) => (
        <Reveal as="li" key={c.name} delay={i % 5} className="flex aspect-[3/2] w-[calc(50%-4px)] items-center justify-center rounded-[14px] bg-card sm:w-[calc(33.333%-5.34px)] lg:w-[calc(20%-6.4px)]">
          <img src={c.logo} alt={c.name} loading="lazy" style={{ width: widthFor(c.ratio) }} className="h-auto max-h-[62%] object-contain" />
        </Reveal>
      ))}
    </ul>
  )
}
