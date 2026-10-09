import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'

const PREVIEW_SECONDS = 5

/**
 * Muted, chromeless Vimeo preview that loops its first five seconds.
 * Mounted only for the tile being hovered, so at most one player exists at a time;
 * unmounting destroys the player and releases its network and decoder resources.
 */
/** `loopSeconds` of 0 loops the whole film. `cover` sizes the 16:9 player so it fills its container; the default suits the 11:10 portfolio tile. */
export default function VideoPreview({ vimeoId, onUnavailable, cover = 'h-[101%] w-[164%]', loopSeconds = PREVIEW_SECONDS }: { vimeoId: string; onUnavailable?: () => void; cover?: string; loopSeconds?: number }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!frame.current) return
    const player = new Player(frame.current)
    let alive = true
    player.on('timeupdate', ({ seconds }: { seconds: number }) => {
      if (!alive) return
      if (seconds > 0.15) setPlaying(true)
      if (loopSeconds > 0 && seconds >= loopSeconds) player.setCurrentTime(0).catch(() => {})
    })
    player.on('ended', () => player.setCurrentTime(0).then(() => player.play()).catch(() => {}))
    player.on('error', () => alive && onUnavailable?.())
    player.setMuted(true).catch(() => {})
    return () => { alive = false; player.destroy().catch(() => {}) }
  }, [vimeoId, onUnavailable, loopSeconds])

  return (
    <iframe
      ref={frame}
      src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&quality=540p`}
      title=""
      aria-hidden="true"
      tabIndex={-1}
      allow="autoplay; fullscreen; picture-in-picture"
      className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-500 ${cover} ${playing ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
