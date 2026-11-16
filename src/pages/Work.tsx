import { useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import FeaturedList from '../components/FeaturedList'
import Footer from '../components/Footer'
import PortfolioGrid from '../components/PortfolioGrid'
import { Reveal, RevealLines } from '../components/Reveal'
import { CATEGORIES, projects } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

export default function Work() {
  useSeo('Our Work', 'Commercials, fashion, film and TV, music videos, sports and tech — the full Friendly Entertainment portfolio.')
  const [filter, setFilter] = useState('all')
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, c.id === 'all' ? projects.length : projects.filter((p) => p.category.includes(c.id as never)).length])), [])

  return (
    <>
      <section className="gutter pb-16 pt-40 text-center sm:pt-52">
        <RevealLines as="h1" immediate className="display text-[clamp(64px,11vw,190px)] text-white" lines={['Our Work']} />

        <Reveal className="mt-16 sm:mt-24">
          <h2 className="meta">Featured projects</h2>
          <FeaturedList />
        </Reveal>
      </section>

      <section aria-label="All projects" className="px-2">
        <div className="gutter sticky top-0 z-30 -mx-2 bg-gradient-to-b from-black via-black/95 to-transparent pb-8 pt-[92px] md:pt-[100px]">
          <CategoryFilter value={filter} onChange={setFilter} counts={counts} />
        </div>
        <p className="sr-only" aria-live="polite">{counts[filter]} projects shown</p>
        <div className="min-h-[60vh]">
          <PortfolioGrid projects={projects} filter={filter} />
        </div>
      </section>
      <Footer />
    </>
  )
}
