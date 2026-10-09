// Downloads every remote image referenced in src/data into public/images/remote/
// so the site no longer depends on friendlyfilmworks.com or the Vimeo CDN for stills.
// Run: npm run assets:fetch — src/data/assets.ts picks the local copies up from the manifest automatically.
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

const src = ['src/data/projects.ts', 'src/data/caseStudies.ts', 'src/data/clients.ts']
  .map((f) => readFileSync(f, 'utf8')).join('\n')
const wp = [...src.matchAll(/'((?:20\d\d)\/\d\d\/[^']+\.(?:jpe?g|png|webp|svg))'/g)].map((m) => 'https://friendlyfilmworks.com/wp-content/uploads/' + m[1])
const vimeo = [...src.matchAll(/'(\d{6,}-[0-9a-f]{40,})'/g)].map((m) => `https://i.vimeocdn.com/video/${m[1]}-d_1280`)
const urls = [...new Set([...wp, ...vimeo])]
mkdirSync('public/images/remote', { recursive: true })
const manifest = {}
for (const url of urls) {
  const ext = (url.match(/\.(jpe?g|png|webp|svg)$/) || [, 'jpg'])[1]
  const name = createHash('sha1').update(url).digest('hex').slice(0, 16) + '.' + ext
  manifest[url] = 'images/remote/' + name
  if (existsSync('public/images/remote/' + name)) continue
  const res = await fetch(url)
  if (!res.ok) { console.warn('MISSING', res.status, url); continue }
  writeFileSync('public/images/remote/' + name, Buffer.from(await res.arrayBuffer()))
  console.log('saved', name)
}
writeFileSync('src/data/asset-manifest.json', JSON.stringify(manifest, null, 2))
console.log(`done: ${urls.length} assets, manifest at src/data/asset-manifest.json`)
