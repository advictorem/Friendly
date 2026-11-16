import { asset, wp, vimeoThumb } from './assets'

/** One tile in a case study's photo wall. `w`/`h` are the file's pixel size, used to reserve space before it loads. */
export interface MediaItem { src: string; alt: string; w: number; h: number; video?: string }
/** The photo wall alternates full-width feature images with masonry blocks. */
export type MediaBlock = { feature: MediaItem } | { masonry: MediaItem[] }
export interface PressItem { outlet: string; title: string; href: string; image: string; logo: string; logoWidth: string }

export interface CaseStudy {
  slug: string
  title: string
  client: string
  category: string
  featuring?: string
  summary: string
  hero: string
  /** Main embedded film. Omit for photo-led projects. */
  vimeoId?: string
  /** Short looping film: plays muted on a loop when on screen instead of behind a play button. */
  loop?: boolean
  /** Poster for the film block; defaults to the hero image. */
  filmPoster?: string
  /** When set, the info block shows Client + Deliverables instead of the credit rows. */
  deliverables?: string[]
  /** Photo wall shown after the copy. */
  media?: MediaBlock[]
  /** "Featured in" press tiles at the end of the case study. */
  press?: PressItem[]
  /** Further films from the same campaign; each opens in the video modal. */
  films?: string[]
  gallery: string[]
  /**
   * Only verified credits are rendered. Leave a field undefined until it is confirmed —
   * the public page skips empty rows rather than showing a placeholder.
   */
  credits: { production?: string; director?: string; cinematographer?: string; client?: string; year?: string }
  overview: string[]
  challenge: string[]
  result: string[]
  originalUrl: string
}

const toma = (name: string) => asset(`images/toma/${name}`)
const photo = (name: string, alt: string, w = 1200, h = 800): MediaItem => ({ src: toma(`${name}.webp`), alt, w, h })
const clip = (name: string, alt: string): MediaItem => ({ src: toma(`${name}-poster.webp`), video: toma(`${name}.mp4`), alt, w: 540, h: 960 })
const press = (file: string) => asset(`images/press/${file}`)
const lafc = (name: string) => wp(`2025/10/${name}-1024x683.jpg`)

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nike-toma-el-juego',
    title: 'Toma El Juego',
    client: 'Nike LA',
    category: 'Sports',
    summary: 'A youth-led street soccer movement, captured at its Los Angeles kickoff.',
    hero: toma('carousel-1.webp'),
    gallery: ['carousel-1', 'take', 'the', 'game', 'carousel-5', 'carousel-6', 'carousel-7'].map((n) => toma(`${n}.webp`)),
    vimeoId: '1126520412',
    loop: true,
    filmPoster: toma('film-poster.webp'),
    credits: { client: 'Nike LA' },
    deliverables: ['Photography', 'Video production', 'Graphic Design', 'Social content'],
    overview: [
      'Nike launched Toma El Juego, a youth-led street soccer movement built on creativity, freedom and community. For the Los Angeles kickoff, Friendly captured the game and the culture around it, with Travis Scott, Vini Jr., Chucky Lozano and Young Miko.',
    ],
    challenge: [
      'Keep a youth-driven movement raw and spontaneous while delivering the polish Nike expects. We shot photo and video side by side, from candid moments to high-impact portraits, staying close to the players, artists and crowd.',
    ],
    result: [
      'A library of photography, video, graphics and social content that carried the launch across Nike’s social and digital channels, with one message: creativity and self-expression belong at the heart of the game.',
    ],
    media: [
      { feature: photo('travis-scott-mic', 'Travis Scott with a microphone, laughing in the middle of the Toma crowd', 2000, 1400) },
      { masonry: [
        photo('vini-jr', 'Vini Jr. in a blue Nike 90 jersey', 1200, 1500),
        photo('trio', 'Three players posing between green shipping containers', 1200, 1501),
        clip('dance', 'Dancers in Toma jerseys performing in front of a poster wall'),
        photo('booth', 'Two guests posing at the Toma customisation booth'),
        photo('hand-sign', 'Hands making an LA sign over a Toma jersey'),
        photo('vini-jr-travis-scott', 'Vini Jr. and Travis Scott side by side', 1200, 1500),
        clip('freestyle', 'A freestyler balancing a ball in front of a poster wall'),
        photo('street-motion', 'Players sprinting across a volt-yellow street court, blurred by motion', 1200, 801),
        photo('travis-scott', 'Travis Scott cheering among fans', 1200, 840),
        photo('luchador', 'A masked luchador holding up a 626 flag', 1200, 798),
      ] },
      { feature: photo('night-ring', 'Teams lined up around the lit court at night, seen from the stands', 2000, 1327) },
      { masonry: [
        clip('portrait-loop', 'Black-and-white portrait of a player with the Toma logo'),
        photo('ronaldinho-10', 'Black-and-white shot of a fan in a Ronaldinho 10 jersey', 1200, 1501),
        photo('portrait-bw', 'Black-and-white portrait of a player in a Toma jersey', 1200, 1500),
        photo('team-celebration', 'A youth team celebrating together after a match'),
        photo('jersey', 'Black-and-white detail of the back of a Toma jersey'),
        clip('team-loop', 'A team dancing together in matching jerseys'),
        photo('fence-bw', 'Black-and-white action shot through the cage fence'),
        photo('breakdance', 'A breakdancer mid-freeze against a wall of Toma posters', 1200, 1500),
        photo('match', 'A player on the ball during a match on the yellow court'),
      ] },
      { feature: photo('flag', 'A red flag waving over the crowd at night', 2000, 1297) },
    ],
    press: [
      { outlet: 'Hypebeast', title: 'Nike’s Toma LA Soccer Tournament Heads to the Finals', href: 'https://hypebeast.com/2025/7/nike-toma-la-street-soccer-tournament-championship-game-los-angeles-events-el-juego', image: press('hypebeast.webp'), logo: press('hypebeast-logo.svg'), logoWidth: '70%' },
      { outlet: 'Highsnobiety', title: 'There’s Football, Then There’s Street Football. Nike Knows the Difference.', href: 'https://www.highsnobiety.com/p/nike-toma-el-juego/', image: press('highsnobiety.webp'), logo: press('highsnobiety-logo.svg'), logoWidth: '68%' },
      { outlet: 'SoccerBible', title: 'From the Cage to the Culture: How Toma El Juego Rekindles Nike’s Street Football Legacy.', href: 'https://www.soccerbible.com/features/2025/07/from-the-cage-to-the-culture-how-toma-el-juego-rekindles-nike-s-street-football-legacy/', image: press('soccerbible.webp'), logo: press('soccerbible-logo.svg'), logoWidth: '60%' },
    ],
    originalUrl: 'https://friendlyentertainment.la/work/toma-el-juego/',
  },
  {
    slug: 'gibson',
    title: 'Gibson',
    client: 'Gibson',
    category: 'Music Videos',
    featuring: 'Gene Simmons, Kirk Hammett, Noel Gallagher, Mike Dirnt, Sergio Vallín, Serj Tankian',
    summary: 'A global content campaign bringing Gibson’s rock icons to life — from stage to screen.',
    hero: vimeoThumb('1994581812-0834a2b091a8d9743324d23c9eff4f161b606493af024c2c094f7c7a77810caa', 1280),
    vimeoId: '1066793787',
    films: ['701453381', '740470654', '1139181925', '698939201', '938058327', '1018850935'],
    // The original page has no stills, so the carousel uses poster frames from the campaign films.
    gallery: [
      '1994581812-0834a2b091a8d9743324d23c9eff4f161b606493af024c2c094f7c7a77810caa',
      '1417532962-46572d97a2c801463d321bb3fe90da8a85c927a872f16edd4b32373a01fb5f85',
      '1490010813-03e0baf2ec75d54a0f769e9444a6631fe5c12c4ce1da35825e89e4b8be1f533e',
      '2158111125-c1e72faf7bd7f04bf35b343f8ecd00302a4c8ddd644d8b2234b1eb1202c558a7',
      '1413230913-26e69c33386e1f483c8d54302a336ac2ef094cdfcc5f7f3728fe06829a2a5f95',
      '1839536115-ff8fa053a5f3febcb223005e0f6310f30420ea741b92c8659771243035b1c9c1',
      '1937127802-a74533e79daee1a2f8878b9ec3dbcd6d88def35130f087f7006391be0659c312',
    ].map((k) => vimeoThumb(k, 1280)),
    credits: { production: 'Friendly Ent.', client: 'Gibson' },
    overview: [
      'When Gibson called, we turned up the volume. Friendly Entertainment produced a campaign of commercials, short films, and music videos spotlighting the brand’s rock icons: Gene Simmons of Kiss, Kirk Hammett of Metallica, Noel Gallagher of Oasis, Mike Dirnt of Green Day, Sergio Vallín of Maná, and Serj Tankian of System of a Down.',
    ],
    challenge: [
      'Each film had to honour Gibson’s legacy while speaking to a modern audience. The approach was cinematic storytelling and bold visuals, built around the artist and the instrument in their hands.',
      'Every piece was shaped for a social-first release, so the work moved as easily through a feed as it did on a larger screen.',
    ],
    result: [
      'A body of work that carries Gibson’s icons from stage to screen — commercials, short films, and music videos that share one visual language and connect the brand to the people who play it.',
    ],
    originalUrl: 'https://friendlyfilmworks.com/clients/gibson/',
  },
  {
    slug: 'lafc-metro',
    title: 'We Are Los Angeles',
    client: 'LAFC × Metro LA',
    category: 'Sports',
    featuring: 'Soccerhead, Ollie, Jason the Falconer',
    summary: 'A campaign that celebrates Los Angeles — its energy, its community, and the fans who keep it moving.',
    hero: lafc('KEVANI_TheTrio_LAMetro_20250717_04'),
    vimeoId: '1100755384',
    films: ['355368364', '777504476', '265108700'],
    gallery: [
      'KEVANI_TheTrio_LAMetro_20250717_04', 'KEVANI_TheTrio_LAMetro_20250717_02', 'KEVANI_TheTrio_LAMetro_20250717_01',
      'KEVANI_FigSpectacular_LAMetro_20250714_04', 'IMG_4218', 'IMG_4216', 'IMG_4214', 'IMG_4213', 'IMG_4209', 'IMG_4208',
    ].map(lafc),
    credits: { production: 'Friendly Ent.', client: 'LAFC × Metro LA' },
    overview: [
      'When LAFC and LA Metro joined forces to make game days smoother and greener, Friendly brought their story to life — turning a city partnership into a cultural moment.',
    ],
    challenge: [
      'The story belonged to the fans, so the films follow real supporters on the move — from the train ride to the roar of BMO Stadium.',
      'Friendly created a cinematic series of short films and social spots featuring LAFC’s most beloved figures — Soccerhead, Ollie, and Jason the Falconer — embodying the passion and pride that define the city.',
    ],
    result: [
      'The campaign ran across film, social, and outdoor media, carrying the same picture of the city to screens, stations, and streets.',
      'Each moment captured the heartbeat of LA: the 3252, music, pride, and black and gold energy everywhere.',
    ],
    originalUrl: 'https://friendlyfilmworks.com/clients/lafc/',
  },
]

export const caseStudyBySlug = (slug?: string) => caseStudies.find((c) => c.slug === slug)
