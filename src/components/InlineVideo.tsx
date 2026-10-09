import { useState } from 'react'
import { vimeoThumb } from '../data/assets'
import { canHover } from '../hooks/motion'
import { useVideo } from './VideoContext'
import VideoPreview from './VideoPreview'

/** A small film frame set inline with display type. Hover previews it, click opens the full video. */
export default function InlineVideo({ vimeoId, title, thumbKey }: { vimeoId: string; title: string; thumbKey: string }) {
  const { activePreview, setActivePreview, openModal, modal } = useVideo()
  const [hovered, setHovered] = useState(false)
  const id = 'inline-' + vimeoId
  const active = activePreview === id && !modal
  return (
    <button
      type="button"
      aria-label={`Play ${title}`}
      onClick={() => openModal({ vimeoId, title })}
      onMouseEnter={() => { if (canHover()) { setHovered(true); setActivePreview(id) } }}
      onMouseLeave={() => { setHovered(false); setActivePreview(null) }}
      className="relative mx-[0.12em] inline-block h-[0.74em] w-[1.32em] translate-y-[0.02em] overflow-hidden rounded-[0.09em] bg-card align-baseline"
    >
      <img src={vimeoThumb(thumbKey, 640)} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-cine ${hovered ? 'grayscale-0' : 'grayscale'}`} />
      {active && <VideoPreview vimeoId={vimeoId} cover="h-[102%] w-[102%]" />}
    </button>
  )
}
