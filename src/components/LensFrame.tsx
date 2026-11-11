import { useEffect, useRef, useState } from 'react'

const laTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
const laZone = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' })
const FPS = 24

/** Running timecode: current Los Angeles time plus a 24 fps frame count (HH:MM:SS:FF). */
function Timecode() {
  const tc = useRef<HTMLSpanElement>(null)
  const [tz, setTz] = useState('PT')
  useEffect(() => {
    setTz(laZone.formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value ?? 'PT')
    let raf = 0, last = ''
    const tick = () => {
      const now = new Date()
      const frame = String(Math.floor((now.getMilliseconds() / 1000) * FPS)).padStart(2, '0')
      const text = `${laTime.format(now).replace(/^24/, '00')}:${frame}`
      if (text !== last && tc.current) { tc.current.textContent = text; last = text }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <span className="tabular-nums">
      <span ref={tc}>00:00:00:00</span> <span className="text-white/45">{tz}</span>
    </span>
  )
}

/**
 * Camera viewfinder readout across the top of the hero: corner marks, a blinking REC light with a live
 * Los Angeles timecode on the left, and camera settings on the right. Top corners only, by design.
 */
export function CameraHud() {
  const arm = 'clamp(22px, 2.2vw, 34px)'
  return (
    <div className="hud pointer-events-none absolute inset-x-0 z-20 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ece6dc] sm:text-[12px]" style={{ top: 'var(--hud-top)' }}>
      <span aria-hidden="true" className="absolute bg-white/70" style={{ left: 'var(--hud-inset)', top: 0, width: arm, height: 1 }} />
      <span aria-hidden="true" className="absolute bg-white/70" style={{ left: 'var(--hud-inset)', top: 0, width: 1, height: arm }} />
      <span aria-hidden="true" className="absolute bg-white/70" style={{ right: 'var(--hud-inset)', top: 0, width: arm, height: 1 }} />
      <span aria-hidden="true" className="absolute bg-white/70" style={{ right: 'var(--hud-inset)', top: 0, width: 1, height: arm }} />
      <div className="flex items-center justify-between pt-[clamp(18px,1.9vw,28px)]" style={{ paddingLeft: 'calc(var(--hud-inset) + clamp(16px, 1.8vw, 28px))', paddingRight: 'calc(var(--hud-inset) + clamp(16px, 1.8vw, 28px))' }}>
        <p className="flex items-center gap-2.5">
          <span aria-hidden="true" className="rec-light inline-block h-[9px] w-[9px] rounded-full bg-[#e0162b]" />
          <span>Rec</span> <Timecode />
        </p>
        <p className="hidden text-white/70 md:block">A-Cam · 24 fps · 2.39:1 · ISO 800 · 5600K</p>
      </div>
    </div>
  )
}

/**
 * Hero atmosphere: a faint burnt-orange light leak on each edge, film grain, and the Los Angeles clock.
 * It is positioned inside the hero, so it leaves the screen with the hero as the page scrolls.
 */
export default function LensFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Light leaks */}
      <div className="absolute inset-y-0 left-0 w-[14vw] max-w-[220px]" style={{ background: 'linear-gradient(90deg, rgba(87,36,22,0) 0%, rgba(87,36,22,0.85) 45%, rgba(87,36,22,0) 100%)', filter: 'blur(14px)' }} />
      <div className="absolute inset-y-0 right-0 w-[14vw] max-w-[220px]" style={{ background: 'linear-gradient(90deg, rgba(87,36,22,0) 0%, rgba(87,36,22,0.85) 55%, rgba(87,36,22,0) 100%)', filter: 'blur(14px)' }} />

      {/* Film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <filter id="lens-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" /></filter>
        <rect width="100%" height="100%" filter="url(#lens-grain)" />
      </svg>
    </div>
  )
}

