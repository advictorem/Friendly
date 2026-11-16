import { asset, wp } from './assets'

export interface Client {
  name: string
  logo?: string
  /** Width ÷ height of the trimmed logo, used to give every mark similar visual weight. */
  ratio?: number
}

const local = (file: string) => asset(`images/logos/${file}.webp`)

/**
 * Clients shown in the About-page logo wall. Only entries with a logo file are rendered.
 * To add one: drop a white, transparent logo in public/images/logos/ and add a row with its width ÷ height.
 */
export const clients: Client[] = [
  { name: 'Nike', logo: local('nike'), ratio: 1.92 },
  { name: 'Metro', logo: local('metro'), ratio: 2.23 },
  { name: 'Gibson', logo: wp('2025/10/Gibson_Guitar_logo.svg'), ratio: 1.6 },
  { name: 'LAFC', logo: local('lafc'), ratio: 0.73 },
  { name: 'AT&T', logo: local('att'), ratio: 2.43 },
  { name: 'Sony Music', logo: local('sony'), ratio: 0.92 },
  { name: 'Warner Bros. Records', logo: local('wbrecords'), ratio: 0.73 },
  { name: 'Live Nation', logo: local('livenation'), ratio: 1 },
  { name: 'The Kennedy Center', logo: local('kennedy-center'), ratio: 2.33 },
  { name: 'California Lottery', logo: local('lottery'), ratio: 0.8 },
  { name: 'Glowforge', logo: local('glowforge'), ratio: 4.74 },
  { name: 'XYZ Films', logo: local('xyz'), ratio: 1.43 },
  { name: 'Beyond Belief: Fact or Fiction', logo: local('beyond-belief'), ratio: 1.55 },
  { name: 'System of a Down', logo: local('systemofadown'), ratio: 6.4 },
  { name: 'Kevani', logo: local('kevani'), ratio: 5.2 },
  { name: 'VTA', logo: local('vta'), ratio: 2.21 },
  { name: 'Motiv', logo: local('motiv'), ratio: 7.1 },
  { name: 'Sauro', logo: local('sauro'), ratio: 3.89 },
  { name: 'Madani', logo: local('madani'), ratio: 9.55 },
  { name: 'SCAG', logo: local('scag'), ratio: 2.18 },
  // In the portfolio, no logo supplied:
  { name: 'Serj Tankian' },
]
