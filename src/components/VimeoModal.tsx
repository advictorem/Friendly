import { useEffect, useRef, useState } from 'react'
import { useVideo } from './VideoContext'

/** Lightbox player. The iframe exists only while open, so closing always stops and unloads playback. */
export default function VimeoModal() {
  const { modal, closeModal } = useVideo()
  const [shown, setShown] = useState<typeof modal>(null)
  const [visible, setVisible] = useState(false)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDivElement>(null)

  // Mount, then animate in; animate out, then unmount.
  useEffect(() => {
    if (modal) {
      setShown(modal)
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      return () => cancelAnimationFrame(id)
    }
    setVisible(false)
    const t = setTimeout(() => setShown(null), 380)
    return () => clearTimeout(t)
  }, [modal])

  useEffect(() => {
    if (!shown) return
    document.body.classList.add('is-locked')
    window.dispatchEvent(new CustomEvent('scroll-lock', { detail: true }))
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'Tab') {
        // Two focus stops: the close button and the player.
        const stops = [closeBtn.current, dialog.current?.querySelector('iframe')].filter(Boolean) as HTMLElement[]
        const i = stops.indexOf(document.activeElement as HTMLElement)
        e.preventDefault()
        stops[(i + (e.shiftKey ? stops.length - 1 : 1)) % stops.length]?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
      window.dispatchEvent(new CustomEvent('scroll-lock', { detail: false }))
    }
  }, [shown, closeModal])

  if (!shown) return null
  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${shown.title} — video`}
      data-lenis-prevent
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 transition-opacity duration-300 ease-cine sm:p-8 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <button type="button" aria-label="Close video" tabIndex={-1} onClick={closeModal} className="absolute inset-0 cursor-default bg-black/90" />
      <button
        ref={closeBtn}
        type="button"
        onClick={closeModal}
        className="label absolute right-4 top-4 z-10 flex h-11 items-center gap-3 rounded-full border border-white/30 bg-black/60 px-5 text-sm text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black sm:right-6 sm:top-6"
      >
        Close <span aria-hidden="true" className="text-lg leading-none">×</span>
      </button>
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-card shadow-2xl transition-transform duration-500 ease-cine ${visible ? 'scale-100' : 'scale-[0.94]'}`}
        style={{ maxWidth: 'min(1400px, calc((100vh - 120px) * 16 / 9))', aspectRatio: '16 / 9' }}
      >
        <iframe
          key={shown.vimeoId}
          src={`https://player.vimeo.com/video/${shown.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title={shown.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  )
}
