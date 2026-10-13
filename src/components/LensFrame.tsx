import { useEffect, useState } from 'react'

const clock = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
const zone = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' })

/** Live 24-hour clock in Los Angeles time, with the zone (PST or PDT) it is currently on. */
function PacificClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const time = clock.format(now).replace(/^24/, '00')
  const tz = zone.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? 'PT'
  return (
    <time dateTime={now.toISOString()} className="tabular-nums" aria-label={`Current time in Los Angeles, ${time} ${tz}`}>
      {time} <span className="text-mute">{tz}</span>
    </time>
  )
}

/**
 * Viewfinder overlay for the hero: corner brackets and side ticks like a camera's frame guide,
 * a faint burnt-orange light leak on each edge, film grain, and the Los Angeles clock.
 * It is positioned inside the hero, so it leaves the screen with the hero as the page scrolls.
 */
export default function LensFrame() {
  const line = 'absolute bg-white/70'
  const c = 'clamp(56px, 9vw, 150px)' // bracket arm length
  const m = 'clamp(14px, 1.6vw, 24px)' // inset from the viewport edge
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Light leaks */}
      <div className="absolute inset-y-0 left-0 w-[14vw] max-w-[220px]" style={{ background: 'linear-gradient(90deg, rgba(87,36,22,0) 0%, rgba(87,36,22,0.85) 45%, rgba(87,36,22,0) 100%)', filter: 'blur(14px)' }} />
      <div className="absolute inset-y-0 right-0 w-[14vw] max-w-[220px]" style={{ background: 'linear-gradient(90deg, rgba(87,36,22,0) 0%, rgba(87,36,22,0.85) 55%, rgba(87,36,22,0) 100%)', filter: 'blur(14px)' }} />

      {/* Film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <filter id="lens-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" /></filter>
        <rect width="100%" height="100%" filter="url(#lens-grain)" />
      </svg>

      {/* Corner brackets */}
      <span className={line} style={{ top: m, left: m, width: c, height: 1 }} /><span className={line} style={{ top: m, left: m, width: 1, height: c }} />
      <span className={line} style={{ top: m, right: m, width: c, height: 1 }} /><span className={line} style={{ top: m, right: m, width: 1, height: c }} />
      <span className={line} style={{ bottom: m, left: m, width: c, height: 1 }} /><span className={line} style={{ bottom: m, left: m, width: 1, height: c }} />
      <span className={line} style={{ bottom: m, right: m, width: c, height: 1 }} /><span className={line} style={{ bottom: m, right: m, width: 1, height: c }} />
      {/* Side ticks */}
      <span className={line} style={{ top: '50%', left: m, width: `calc(${c} / 2)`, height: 1 }} />
      <span className={line} style={{ top: '50%', right: m, width: `calc(${c} / 2)`, height: 1 }} />

      {/* Clock */}
      <div className="pointer-events-auto absolute bottom-[clamp(26px,3.4vw,46px)] right-[clamp(26px,3.6vw,52px)] text-[12px] tracking-[0.08em] text-white sm:text-[13px]">
        <PacificClock />
      </div>
    </div>
  )
}
