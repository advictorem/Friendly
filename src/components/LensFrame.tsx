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

/** Frame guide drawn around the wordmark: corner brackets plus a tick at mid-height on each side. */
export function FrameGuide() {
  const line = 'absolute bg-white/75'
  const arm = 'clamp(72px, 10vw, 200px)'   // horizontal bracket arm
  const drop = 'clamp(30px, 4.2vw, 78px)'  // vertical bracket arm
  const tick = 'clamp(36px, 4.6vw, 90px)'
  const y = 'clamp(-34px, -2.6vw, -14px)'  // how far above and below the letters the frame sits
  const x = 'clamp(-14px, -0.9vw, -6px)'  // measured from the wordmark's edge, inside the page gutter
  return (
    <div aria-hidden="true" className="pointer-events-none absolute z-10" style={{ top: y, bottom: y, left: `calc(var(--gutter) + ${x})`, right: `calc(var(--gutter) + ${x})` }}>
      <span className={line} style={{ top: 0, left: 0, width: arm, height: 1 }} /><span className={line} style={{ top: 0, left: 0, width: 1, height: drop }} />
      <span className={line} style={{ top: 0, right: 0, width: arm, height: 1 }} /><span className={line} style={{ top: 0, right: 0, width: 1, height: drop }} />
      <span className={line} style={{ bottom: 0, left: 0, width: arm, height: 1 }} /><span className={line} style={{ bottom: 0, left: 0, width: 1, height: drop }} />
      <span className={line} style={{ bottom: 0, right: 0, width: arm, height: 1 }} /><span className={line} style={{ bottom: 0, right: 0, width: 1, height: drop }} />
      <span className={line} style={{ top: '50%', left: 0, width: tick, height: 1 }} />
      <span className={line} style={{ top: '50%', right: 0, width: tick, height: 1 }} />
    </div>
  )
}

/**
 * Hero atmosphere: a faint burnt-orange light leak on each edge, film grain, and the Los Angeles clock.
 * It is positioned inside the hero, so it leaves the screen with the hero as the page scrolls.
 */
export default function LensFrame() {
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
    </div>
  )
}

/** The clock, placed by the hero at the right edge under the frame. */
export { PacificClock }
