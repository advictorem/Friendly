import { clients } from '../data/clients'
import { Reveal } from './Reveal'

/** Five-across wall of client marks. Clients without a verified logo file are left out rather than set in text. */
export default function ClientLogoGrid() {
  const withLogos = clients.filter((c) => c.logo)
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {withLogos.map((c, i) => (
        <Reveal as="li" key={c.name} delay={i % 5} className="group flex aspect-[3/2] items-center justify-center rounded-[14px] bg-card p-8 sm:p-10">
          <img src={c.logo} alt={c.name} loading="lazy" className="max-h-16 w-auto max-w-[70%] object-contain opacity-70 transition-[opacity,transform] duration-500 ease-cine group-hover:scale-105 group-hover:opacity-100" />
        </Reveal>
      ))}
    </ul>
  )
}
