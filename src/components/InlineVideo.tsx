import { useEffect, useRef, useState } from 'react'
import { vimeoThumb } from '../data/assets'
import { prefersReducedMotion } from '../hooks/motion'
import { useVideo } from './VideoContext'
import VideoPreview from './VideoPreview'

/**
 * A wide film frame set inline with display type. It plays muted on a loop as soon as it is on screen
 * (never with sound), pauses when scrolled away or while the lightbox is open, and opens the full video on click.
 */
export default function InlineVideo({ vimeoId, title, thumbKey }: { vimeoId: string; title: string; thumbKey: string }) {
  const { openModal, modal } = useVideo()
  const ref = useRef<HTMLButtonElement>(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Play ${title}`}
      onClick={() => openModal({ vimeoId, title })}
      className="relative mx-[0.12em] inline-block h-[0.74em] w-[1.8em] translate-y-[0.02em] overflow-hidden rounded-[0.09em] bg-card align-baseline"
    >
      <img src={vimeoThumb(thumbKey, 960)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {onScreen && !modal && <VideoPreview vimeoId={vimeoId} loopSeconds={0} cover="h-[140%] w-[102%]" />}
    </button>
  )
}
