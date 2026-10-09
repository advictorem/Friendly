import manifest from './asset-manifest.json'

const local = manifest as Record<string, string>

/** Path to a file in /public, respecting the deploy base. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')

/** Uses the local copy when `npm run assets:fetch` has downloaded one, otherwise the original URL. */
const resolve = (url: string) => (local[url] ? asset(local[url]) : url)

/** An upload on the existing Friendly site, e.g. wp('2025/09/475629936.jpg'). */
export const wp = (path: string) => resolve('https://friendlyfilmworks.com/wp-content/uploads/' + path)

/** A Vimeo poster frame by its CDN key. Local copies are stored at 1280 wide. */
export const vimeoThumb = (key: string, width = 960) => {
  const full = `https://i.vimeocdn.com/video/${key}-d_1280`
  return local[full] ? asset(local[full]) : `https://i.vimeocdn.com/video/${key}-d_${width}`
}
