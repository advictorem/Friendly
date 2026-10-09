import { useEffect } from 'react'

const set = (selector: string, attr: string, value: string) => document.querySelector(selector)?.setAttribute(attr, value)

/** Page-specific title, description and Open Graph tags. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const full = title === 'Friendly Entertainment' ? title : `${title} — Friendly Entertainment`
    document.title = full
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', full)
    set('meta[property="og:description"]', 'content', description)
  }, [title, description])
}
