import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { categoryLabel } from '../data/projects'
import { canHover } from '../hooks/motion'
import { useVideo } from './VideoContext'
import VideoPreview from './VideoPreview'

const HOVER_INTENT_MS = 140

function PortfolioCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { activePreview, setActivePreview, openModal, modal } = useVideo()
  const [src, setSrc] = useState(project.thumbnail)
  const [hovered, setHovered] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const media = useRef<HTMLButtonElement>(null)
  const timer = useRef<number>()
  const isActive = activePreview === project.id && !modal && !previewFailed

  const start = () => {
    if (!canHover()) return // touch: tap opens the player, tiles stay still
    setHovered(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setActivePreview(project.id), HOVER_INTENT_MS)
  }
  const stop = useCallback(() => {
    setHovered(false)
    window.clearTimeout(timer.current)
    setActivePreview(null)
  }, [setActivePreview])

  // A tile scrolled out of view under a stationary cursor must stop playing.
  useEffect(() => {
    if (!isActive || !media.current) return
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) stop() }, { threshold: 0.1 })
    io.observe(media.current)
    return () => io.disconnect()
  }, [isActive, stop])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onUnavailable = useCallback(() => setPreviewFailed(true), [])
  const colour = hovered || isActive

  return (
    <article className="roll-host group relative flex flex-col rounded-[14px] bg-card p-1" onMouseEnter={start} onMouseLeave={stop}>
      <button
        ref={media}
        type="button"
        onClick={() => openModal({ vimeoId: project.vimeoId, title: `${project.client} — ${project.title}` })}
        onFocus={() => canHover() && setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Play ${project.title}, ${project.client}`}
        className="relative block aspect-[11/10] w-full overflow-hidden rounded-[11px] bg-neutral-900"
      >
        <img
          src={src}
          onError={() => src !== project.fallbackThumbnail && setSrc(project.fallbackThumbnail)}
          alt={`Still from ${project.title} for ${project.client}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ease-cine ${colour ? 'scale-[1.03] grayscale-0' : 'grayscale'}`}
        />
        {isActive && <VideoPreview vimeoId={project.vimeoId} onUnavailable={onUnavailable} />}
        <span aria-hidden="true" className="label pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[11px] text-white backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          Play
        </span>
      </button>
      <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5">
        <div className="min-w-0">
          <h3 className="label truncate text-[17px] leading-tight text-white sm:text-lg">
            <span className="roll"><span>{project.title}</span><span aria-hidden="true">{project.title}</span></span>
          </h3>
          <p className="meta mt-1 truncate">{project.client} <span aria-hidden="true">/</span> {project.category.map(categoryLabel).join(', ')}</p>
        </div>
        {project.caseStudy && (
          <Link to={`/work/${project.caseStudy}`} className="line-link label shrink-0 text-[13px] text-soft hover:text-white" aria-label={`View the ${project.client} case study`}>
            View project
          </Link>
        )}
      </div>
    </article>
  )
}

export default memo(PortfolioCard)
