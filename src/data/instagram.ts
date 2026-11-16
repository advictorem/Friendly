import { asset } from './assets'

export interface InstaPost { image: string; href: string; label: string; kind: 'Reel' | 'Post'; alt: string }

/**
 * Optional live feed. Paste a Behold JSON feed URL here (behold.so → connect @friendlyfilmworks → JSON feed)
 * and the strip will show the account's latest posts, refreshed by Behold. Leave empty to use the snapshot below.
 */
export const INSTAGRAM_FEED_URL = ''

const ig = (n: number) => asset(`images/instagram/ig-${String(n).padStart(2, '0')}.webp`)

/** Snapshot of the latest posts on instagram.com/friendlyfilmworks, taken 2026-11-10 (pinned posts skipped). */
export const instagramSnapshot: InstaPost[] = [
  { image: ig(1), href: 'https://www.instagram.com/reel/DZcu2Q5tYCD/', label: 'LA vs Hate', kind: 'Reel', alt: 'A player in an LAFC jersey with arms crossed, LA vs Hate campaign' },
  { image: ig(2), href: 'https://www.instagram.com/reel/DZIWb-dBVuQ/', label: 'The Visitor', kind: 'Reel', alt: 'The Visitor: a traveller stepping off a Metro bus with a suitcase' },
  { image: ig(3), href: 'https://www.instagram.com/reel/DY7eM07PON3/', label: 'The Coach', kind: 'Reel', alt: 'The Coach: women playing soccer on an evening pitch, framed through leaves' },
  { image: ig(4), href: 'https://www.instagram.com/reel/DYjHfvfOI8x/', label: 'The Athlete', kind: 'Reel', alt: 'The Athlete: a power soccer player in front of a gym mural' },
  { image: ig(5), href: 'https://www.instagram.com/reel/DYSE47-JZ77/', label: 'The Icon', kind: 'Reel', alt: 'The Icon: a woman walking past a Metro bike hub' },
  { image: ig(6), href: 'https://www.instagram.com/reel/DYN5WKzPiqs/', label: 'LA in Motion', kind: 'Reel', alt: 'This Is How LA Shows Up: a freestyler juggling a ball beside a moving train' },
  { image: ig(7), href: 'https://www.instagram.com/reel/DRTh9XKEU-l/', label: 'Gibson', kind: 'Reel', alt: 'A bassist playing an orange bass in a sunlit warehouse' },
  { image: ig(8), href: 'https://www.instagram.com/p/DQpXBxJkuRd/', label: 'Nike Rivalries', kind: 'Post', alt: 'Two men in a classic car for Nike and the NFL, In The Field mural behind' },
  { image: ig(9), href: 'https://www.instagram.com/p/DN3UktuYo87/', label: 'Mamba League', kind: 'Post', alt: 'Mamba League Invitational 2025 poster with two basketball players' },
  { image: ig(10), href: 'https://www.instagram.com/p/DS6RroyES-s/', label: 'Year in Review', kind: 'Post', alt: 'Friendly Entertainment 2025 Year in Review card' },
]

interface BeholdPost { permalink: string; mediaType: string; isReel?: boolean; prunedCaption?: string; caption?: string; altText?: string; sizes?: { medium?: { mediaUrl: string } }; thumbnailUrl?: string; mediaUrl?: string }

/** Loads the live feed when one is configured; otherwise (or on any failure) resolves to the snapshot. */
export async function loadInstagram(): Promise<InstaPost[]> {
  if (!INSTAGRAM_FEED_URL) return instagramSnapshot
  try {
    const res = await fetch(INSTAGRAM_FEED_URL)
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as { posts?: BeholdPost[] }
    const posts = (data.posts ?? []).map((p) => {
      const text = (p.prunedCaption || p.caption || '').trim()
      const label = (text.split(/[\n.!—–-]/)[0] || 'Instagram').replace(/[^\p{L}\p{N}&' ]/gu, '').trim().split(/\s+/).slice(0, 3).join(' ') || 'Instagram'
      return {
        image: p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.mediaUrl || '',
        href: p.permalink,
        label,
        kind: (p.mediaType === 'VIDEO' ? 'Reel' : 'Post') as 'Reel' | 'Post',
        alt: p.altText || text.slice(0, 120) || 'Instagram post by Friendly Entertainment',
      }
    }).filter((p) => p.image)
    return posts.length ? posts : instagramSnapshot
  } catch {
    return instagramSnapshot
  }
}
