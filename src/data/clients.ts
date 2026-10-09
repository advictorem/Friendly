import { wp } from './assets'

export interface Client { name: string; logo?: string }

/**
 * Every client represented in the portfolio. Only entries with a verified white logo are shown
 * in the About-page grid; the rest are waiting on an asset (see CONTENT-AUDIT.md).
 * To add one: drop a white SVG in public/images/logos/ and set `logo: asset('images/logos/<file>.svg')`.
 */
export const clients: Client[] = [
  { name: 'Nike', logo: wp('2025/10/Logo_NIKE-1.svg') },
  { name: 'Gibson', logo: wp('2025/10/Gibson_Guitar_logo.svg') },
  { name: 'LAFC', logo: wp('2025/10/LAFC.svg') },
  { name: 'Metro' },
  { name: 'AT&T' },
  { name: 'Glowforge' },
  { name: 'Motiv' },
  { name: 'Kevani' },
  { name: 'Sauro' },
  { name: 'Madani' },
  { name: 'Kennedy Center Honors' },
  { name: 'Beyond Belief' },
  { name: 'Serj Tankian' },
  { name: 'System of a Down' },
]
