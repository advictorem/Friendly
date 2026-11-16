import { useEffect, useRef, useState } from 'react'
import { instagramSnapshot, loadInstagram, type InstaPost } from '../data/instagram'
import { site } from '../data/site'
import { prefersReducedMotion } from '../hooks/motion'

const sprockets =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='22'%3E%3Crect x='10' y='5' width='14' height='12' rx='2.5' fill='%23a29c94'/%3E%3C/svg%3E\")"

/**
 * Instagram posts shown as a strip of 35mm film. It drifts slowly to the right on its own; visitors can drag,
 * swipe or scroll it sideways (trackpad, shift + wheel, or arrow keys when focused). Each frame opens the post.
 */
export default function InstagramReel() {
  const [posts, setPosts] = useState<InstaPost[]>(instagramSnapshot)
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => { loadInstagram().then(setPosts) }, [])

  useEffect(() => {
    const el = wrap.current, tr = track.current
    if (!el || !tr) return
    const drift = prefersReducedMotion() ? 0 : 0.45 // px per frame, rightwards
    let half = 0, x = 0, v = drift, dragging = false, moved = 0, lastX = 0, visible = true, hover = false, raf = 0

    const measure = () => { const h = tr.scrollWidth / 2; if (h && !half) x = -h; half = h }
    const ro = new ResizeObserver(measure); ro.observe(tr)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(el)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible || !half) return
      const rest = hover ? drift * 0.35 : drift
      if (!dragging) { v += (rest - v) * 0.04; x += v }
      while (x >= 0) x -= half
      while (x < -half) x += half
      tr.style.transform = `translate3d(${x}px,0,0)`
    }
    raf = requestAnimationFrame(frame)

    const down = (e: PointerEvent) => { if (e.button !== 0) return; dragging = true; moved = 0; lastX = e.clientX; v = 0; el.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => { if (!dragging) return; const d = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(d); x += d; v = d; if (moved > 6) el.classList.add('is-dragging') }
    const up = () => { dragging = false; window.setTimeout(() => el.classList.remove('is-dragging'), 0) }
    // Block the click that ends a drag, so dragging never opens a post.
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation() } }
    // Horizontal wheel / trackpad swipes scrub the strip; plain vertical scrolling still scrolls the page.
    const wheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx) return
      e.preventDefault(); x -= dx; v = -dx * 0.15
    }
    const key = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') v = -24; if (e.key === 'ArrowRight') v = 24 }
    const enter = () => { hover = true }, leave = () => { hover = false }

    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)
    el.addEventListener('click', click, true); el.addEventListener('wheel', wheel, { passive: false })
    el.addEventListener('keydown', key); el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up)
      el.removeEventListener('click', click, true); el.removeEventListener('wheel', wheel)
      el.removeEventListener('keydown', key); el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave)
    }
  }, [posts])

  const frames = [...posts, ...posts]
  return (
    <section aria-label="Latest from Instagram" className="mt-16 sm:mt-24">
      <div className="mb-5 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 sm:text-[12px]">
        <p>Latest on Instagram</p>
        <a href={site.instagram} target="_blank" rel="noreferrer" className="line-link text-white/80 hover:text-white">@friendlyfilmworks ↗</a>
      </div>
      <div
        ref={wrap}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Instagram posts. Drag, swipe or use the arrow keys to move."
        className="ig-reel -mx-[var(--gutter)] cursor-grab touch-pan-y select-none overflow-hidden bg-[#13100e] py-[clamp(10px,1.1vw,16px)] [&.is-dragging]:cursor-grabbing"
      >
        <div ref={track} className="flex w-max will-change-transform">
          {frames.map((p, i) => {
            const n = (i % posts.length) + 1
            return (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                draggable={false}
                aria-hidden={i >= posts.length}
                tabIndex={i >= posts.length ? -1 : 0}
                aria-label={`${p.label}, ${p.kind.toLowerCase()} on Instagram`}
                className="group relative block shrink-0 border-l border-black/60 px-[clamp(8px,0.9vw,14px)]"
              >
                <span aria-hidden="true" className="block h-[22px]" style={{ backgroundImage: sprockets, backgroundRepeat: 'repeat-x', backgroundPosition: 'left center' }} />
                <span className="block h-[clamp(240px,26vw,380px)] w-[calc(clamp(240px,26vw,380px)*0.8)] overflow-hidden bg-black">
                  <img
                    src={p.image}
                    alt={i < posts.length ? p.alt : ''}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-cine group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                </span>
                <span aria-hidden="true" className="block h-[22px]" style={{ backgroundImage: sprockets, backgroundRepeat: 'repeat-x', backgroundPosition: 'left center' }} />
                <span className="mt-3 flex items-baseline justify-between gap-3 pb-1 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <span className="truncate text-[#a29c94]">{String(n).padStart(2, '0')}A ▸ {p.label}</span>
                  <span className="shrink-0 text-[#d79a5c]">{p.kind}</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
