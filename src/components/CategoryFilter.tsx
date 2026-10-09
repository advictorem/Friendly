import { CATEGORIES } from '../data/projects'

export default function CategoryFilter({ value, onChange, counts }: { value: string; onChange: (id: string) => void; counts: Record<string, number> }) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-3 sm:gap-x-9">
      {CATEGORIES.map((c) => {
        const active = value === c.id
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c.id)}
            className={`line-link label text-xl transition-colors duration-300 sm:text-2xl lg:text-[28px] ${active ? 'text-white' : 'text-mute hover:text-white'}`}
          >
            {c.label}
            <sup className="ml-1 font-sans text-[10px] tracking-normal text-mute">{counts[c.id] ?? 0}</sup>
          </button>
        )
      })}
    </div>
  )
}
