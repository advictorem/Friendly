import { wp, vimeoThumb } from './assets'

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

const toma = (n: number) => wp(`2025/11/TOMA_4x5-carousel_0${n}.jpeg`)
const lafc = (name: string) => wp(`2025/10/${name}-1024x683.jpg`)

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nike-toma-el-juego',
    title: 'Toma El Juego',
    client: 'Nike Los Angeles',
    category: 'Sports',
    featuring: 'Travis Scott, Vini Jr., Chucky Lozano, Young Miko',
    summary: 'A youth-led street soccer movement, captured at its Los Angeles kickoff.',
    hero: toma(1),
    gallery: [1, 2, 3, 4, 5, 6, 7].map(toma),
    credits: {
      production: 'Friendly Ent.',
      client: 'Nike Los Angeles',
      // TODO(confirm): director, cinematographer, year — the brief lists Ara Soudjian / Garen Mirzaian / 2025 as template examples only.
    },
    overview: [
      'Nike launched Toma El Juego — a youth-led street soccer movement celebrating creativity, freedom, and community.',
      'For its Los Angeles kickoff, Friendly Filmworks captured the energy of the game and the culture surrounding it, creating visually compelling content that celebrated the intersection of sport, music, and street culture.',
      'Featuring Travis Scott, Vini Jr., Chucky Lozano, and Young Miko, the campaign brought together influential voices and emerging street soccer culture to inspire a new generation of players.',
    ],
    challenge: [
      'The challenge was to capture the authenticity and spontaneity of a youth-driven movement while delivering the premium visual storytelling expected from a global brand like Nike.',
      'Friendly’s approach focused on documenting the energy of the Los Angeles experience through dynamic photography and video production.',
      'From candid moments to high-impact visuals, the team captured the connection between players, artists, and the surrounding community, creating content that felt immediate, expressive, and true to the spirit of street soccer.',
    ],
    result: [
      'The resulting collection of photography and video content supported Nike’s Toma El Juego launch across social and digital platforms.',
      'By blending sport, music, style, and community into one cohesive visual story, Friendly helped communicate the movement’s central message: creativity and self-expression belong at the heart of the game.',
    ],
    originalUrl: 'https://friendlyfilmworks.com/clients/nike/',
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
