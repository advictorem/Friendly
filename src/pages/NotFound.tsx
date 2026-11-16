import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo('Page not found', 'This page does not exist.')
  return (
    <section className="gutter flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="display text-[clamp(64px,12vw,200px)]">Page not found</h1>
      <p className="mt-6 text-soft">That address doesn’t match anything on this site.</p>
      <Link to="/work" className="pill mt-10">See our work <span className="pill-icon" aria-hidden="true">→</span></Link>
    </section>
  )
}
