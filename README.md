# Friendly Entertainment — website

Portfolio site for Friendly Entertainment, a Los Angeles film and video production company.
React + TypeScript + Vite + Tailwind, with GSAP (ScrollTrigger, Flip), Lenis and the Vimeo Player SDK.

> **Staging build.** `index.html` carries `noindex` and `public/robots.txt` disallows crawling. Remove both when the site is approved for production.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `http://localhost:5173/Friendly/` |
| `npm run build` | Type-check, build into `docs/`, and write `docs/404.html` for deep links |
| `npm run preview` | Serve the built site locally |
| `npm run assets:fetch` | Download all remote stills and logos into `public/images/remote/` |

## Deployment (GitHub Pages)

The built site lives in `docs/`. In the repository settings choose **Pages → Deploy from a branch → `main` / `docs`**.
To publish a change: `npm run build`, commit `docs/`, push.

The site is built for the path `/Friendly/`. For a root domain, build with `VITE_BASE=/ npm run build`.
Deep links (`/work/gibson`, `/about`) work on Pages because `404.html` is a copy of the app shell.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero and the full 42-project portfolio |
| `/work` | Our Work — featured projects, category filter, full grid |
| `/work/:slug` | Featured project case study (`nike-toma-el-juego`, `gibson`, `lafc-metro`) |
| `/about` | About — statement, team, client logos, Creative Visionaries |
| `/contact` | Contact |

## Editing content

All repeated content is data, in `src/data/`:

- `projects.ts` — the portfolio. One row per video: title, client, categories, Vimeo ID, thumbnail.
- `caseStudies.ts` — the featured projects: copy, credits, gallery, films.
- `clients.ts` — client list and logos for the About page.
- `team.ts` — team members.
- `site.ts` — phone, email, social links, footer credits, About-page videos.

**Credits.** Case-study credits render only when a value is set. Leave a field undefined until it is confirmed; the page skips it rather than showing a placeholder.

**Client logos.** Add a white SVG (transparent background) to `public/images/logos/` and set `logo: asset('images/logos/<file>.svg')` in `clients.ts`. Clients without a logo are not shown.

## Assets

- Supplied files (logo, team portraits, contact photo, Creative Visionaries still) are in `public/images/`, converted to WebP.
- Portfolio thumbnails load from the Vimeo CDN at 960px, falling back to the copy on friendlyfilmworks.com.
- Case-study stills and three client logos load from friendlyfilmworks.com.
- Before the old site is retired, run `npm run assets:fetch`. It downloads every remote image and writes `src/data/asset-manifest.json`; `src/data/assets.ts` then serves the local copies automatically.

## Vimeo previews and playback

- **Hover preview** (`VideoPreview.tsx`): a muted, chromeless Vimeo player is mounted only inside the tile being hovered and loops its first five seconds. Leaving the tile, scrolling it out of view, or opening the lightbox unmounts it. No preview files are stored; nothing is scraped.
- **Lightbox** (`VimeoModal.tsx`): the standard Vimeo player. Closing it removes the iframe, which stops playback.
- **Touch devices**: no hover preview. Tapping a tile opens the lightbox.
- Each staging or production domain must be allowed in Vimeo for any video whose embed privacy is set to specific domains (see `CONTENT-AUDIT.md`).

See `CONTENT-AUDIT.md` for what was imported and what is still open.
