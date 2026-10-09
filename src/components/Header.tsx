import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { asset } from '../data/assets'
import { site } from '../data/site'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Our Work' },
  { to: '/contact', label: 'Contact' },
]

export const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    window.dispatchEvent(new CustomEvent('scroll-lock', { detail: open }))
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="gutter pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[84px] items-center md:h-[116px] justify-between bg-gradient-to-b from-black/70 to-transparent">
        <Link to="/" aria-label="Friendly Entertainment — home" className="pointer-events-auto block transition-opacity duration-300 hover:opacity-70">
          <img src={asset('images/ff-logo.svg')} alt="Friendly Entertainment" width={102} height={88} className="h-[60px] w-auto md:h-[88px]" />
        </Link>

        <nav aria-label="Primary" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `line-link text-[13px] uppercase tracking-[0.08em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-soft hover:text-white'}`}>
              <span className="roll"><span>{l.label}</span><span aria-hidden="true">{l.label}</span></span>
            </NavLink>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-5">
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Friendly Entertainment on Instagram" className="text-white transition-opacity duration-300 hover:opacity-60">
            <InstagramIcon />
          </a>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" className="label relative z-[60] text-sm tracking-[0.08em] text-white md:hidden">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        data-lenis-prevent
        className={`gutter fixed inset-0 z-40 flex flex-col justify-between bg-black pb-8 pt-28 transition-[clip-path,visibility] duration-700 ease-cine md:hidden ${open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'}`}
      >
        <nav aria-label="Mobile" className={open ? 'is-in' : ''}>
          {links.map((l, i) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} tabIndex={open ? 0 : -1} className={({ isActive }) => `display mask-line text-[17vw] leading-[1] ${isActive ? 'text-white' : 'text-mute'}`} style={{ ['--i' as string]: i + 2 }}>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex items-end justify-between text-sm text-soft">
          <div className="flex flex-col gap-1">
            <a href={site.phoneHref} tabIndex={open ? 0 : -1}>{site.phoneDisplay}</a>
            <a href={site.emailHref} tabIndex={open ? 0 : -1}>{site.email}</a>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="line-link">Instagram</a>
        </div>
      </div>
    </>
  )
}
