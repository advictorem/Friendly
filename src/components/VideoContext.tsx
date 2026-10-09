import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react'

interface ModalVideo { vimeoId: string; title: string }
interface Ctx {
  /** ID of the single tile allowed to play a hover preview, or null. */
  activePreview: string | null
  setActivePreview: (id: string | null) => void
  modal: ModalVideo | null
  openModal: (video: ModalVideo) => void
  closeModal: () => void
}

const VideoContext = createContext<Ctx | null>(null)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalVideo | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const openModal = useCallback((video: ModalVideo) => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setActivePreview(null) // opening the player always stops any preview
    setModal(video)
  }, [])
  const closeModal = useCallback(() => {
    setModal(null)
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }))
  }, [])

  const value = useMemo(() => ({ activePreview, setActivePreview, modal, openModal, closeModal }), [activePreview, modal, openModal, closeModal])
  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

export const useVideo = () => {
  const ctx = useContext(VideoContext)
  if (!ctx) throw new Error('useVideo must be used inside VideoProvider')
  return ctx
}
