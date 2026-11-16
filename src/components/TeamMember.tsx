import type { TeamMember as Member } from '../data/team'
import { Reveal } from './Reveal'

export default function TeamMember({ member, index }: { member: Member; index: number }) {
  return (
    <Reveal as="li" delay={index * 2} className="group">
      <div className="overflow-hidden rounded-[14px] bg-card p-1">
        <div className="aspect-[4/5] overflow-hidden rounded-[11px]">
          <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" style={{ objectPosition: member.position }} className="h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-cine group-hover:scale-[1.04]" />
        </div>
      </div>
      <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-2 text-center">
        <span className="label text-2xl text-white">{member.name}</span>
        <span className="meta">{member.role}</span>
      </p>
    </Reveal>
  )
}
