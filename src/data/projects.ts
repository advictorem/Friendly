import { wp, vimeoThumb } from './assets'

export type Category = 'commercials' | 'fashion' | 'film-tv' | 'music-videos' | 'sports' | 'tech'

export const CATEGORIES: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'commercials', label: 'Commercials' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'film-tv', label: 'Film & TV' },
  { id: 'music-videos', label: 'Music Videos' },
  { id: 'sports', label: 'Sports' },
  { id: 'tech', label: 'Tech' },
]

export interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: Category[]
  /** Slug of the case study this video belongs to, if any (see caseStudies.ts). */
  caseStudy?: string
  thumbnail: string
  /** Lower-resolution copy from the original site, used if the main thumbnail fails. */
  fallbackThumbnail: string
  vimeoId: string
  originalUrl: string
}

const CLIENTS: Record<string, string> = {
  metro: 'Metro', nike: 'Nike', gibson: 'Gibson', lafc: 'LAFC', 'serj-tankian': 'Serj Tankian',
  'system-of-a-down': 'System of a Down', kevani: 'Kevani', sauro: 'Sauro', madani: 'Madani',
  att: 'AT&T', motiv: 'Motiv', glowforge: 'Glowforge', 'kennedy-center-honors': 'Kennedy Center Honors',
  'beyond-belief': 'Beyond Belief',
}

const C = { com: 'commercials', fas: 'fashion', ftv: 'film-tv', mv: 'music-videos', spo: 'sports', tech: 'tech' } as const

/**
 * Imported from friendlyfilmworks.com/#work on 2026-10-09, in the original order.
 * Each row: title, client slug(s), categories, Vimeo ID, thumbnail on the original site,
 * Vimeo poster key ('' where Vimeo exposes none), and whether the original site's custom still is preferred.
 * Vimeo IDs, clients and categories were read from each tile's own markup — none are inferred.
 */
type Row = [string, string, (keyof typeof C)[], string, string, string, boolean?]
const rows: Row[] = [
  ['The Icon', 'metro', ['com'], '1191404307', '2026/05/JSS_9677-Editz.jpg', '2156405492-120abc04dbb042ad8dcf94c7da539a2bd8358eb748ff3a0a64fc27426994cd56', true],
  ['This Is How LA Shows Up', 'metro', ['com'], '1185671904', '2026/05/METROCAMPAIGN13277z.jpg', '2149167339-57c62eddbdec5e4e90a0b84db919f69f3a603e10138af240a6326498e0a123df', true],
  ['Epiphone', 'gibson', ['com'], '1139181925', '2025/12/WebP-Image.jpeg', '2158111125-c1e72faf7bd7f04bf35b343f8ecd00302a4c8ddd644d8b2234b1eb1202c558a7', true],
  ['JDI Day', 'nike', ['spo'], '1094864223', '2025/12/2028526639-65523b00d93c331878ef7f9d645d2137dbb634d903ad917691674d2045df0713-d_640_regionus.jpeg', '2028526639-65523b00d93c331878ef7f9d645d2137dbb634d903ad917691674d2045df0713'],
  ['AF Day', 'serj-tankian', ['mv'], '938058327', '2025/12/1839536115-ff8fa053a5f3febcb223005e0f6310f30420ea741b92c8659771243035b1c9c1-d_640_regionus.jpeg', '1839536115-ff8fa053a5f3febcb223005e0f6310f30420ea741b92c8659771243035b1c9c1'],
  ['Appropriations', 'serj-tankian', ['mv'], '1018850935', '2025/12/1937127802-a74533e79daee1a2f8878b9ec3dbcd6d88def35130f087f7006391be0659c312-d_640_regionus.jpeg', '1937127802-a74533e79daee1a2f8878b9ec3dbcd6d88def35130f087f7006391be0659c312'],
  ['Go Metro To The Rosebowl', 'metro', ['com', 'spo'], '1090721590', '2025/09/vumbnail-1.jpg', '2023392431-53caa5b3824226d2db1f0ff60e95570c0bccb17e93ea096a5e15e44f3a52ecca'],
  ['Kobe', 'metro', ['spo'], '1089824517', '2025/12/2022311018-d96817e8d0397efdc471db9e3d2ecea1407b35221ea74f26200b22e83f2d831b-d_640_regionus.jpeg', '2022311018-d96817e8d0397efdc471db9e3d2ecea1407b35221ea74f26200b22e83f2d831b'],
  ['Icon', 'nike', ['spo'], '1132947866', '2025/12/2082487611-12d7e4bd1c78149919fc442f9bde34b7c7ec5c8e2c83bb4dbf252dbe5e14045a-d_640_regionus.jpeg', '2082487611-12d7e4bd1c78149919fc442f9bde34b7c7ec5c8e2c83bb4dbf252dbe5e14045a'],
  ['Fact or Fiction – Season 5', 'beyond-belief', ['ftv'], '970072569', '2023/12/beyond-belief-frakes.jpg', '1883564407-e4f0bfa443b4eaf522342331cebba6f15c443b45473b430b4216a412a7da2ff1', true],
  ['Kirk Hammett The Collection', 'gibson', ['mv'], '1066793787', '2025/09/vumbnail.jpg', '1994581812-0834a2b091a8d9743324d23c9eff4f161b606493af024c2c094f7c7a77810caa'],
  ['Protect The Land', 'system-of-a-down', ['mv'], '475629936', '2025/09/475629936.jpg', '988541010-fc2f9ce98cd7a69ee2267523735624c4fc0b03b1544cbda88be16b415a27dab4'],
  ['Main Spot', 'glowforge', ['tech'], '594883198', '2025/09/594883198.jpg', '1228563278-90203fa0dfa1e6b0ce60fc08263f9390d7603857c83b06fc0ae4e46b4860fdb9'],
  ['Human Spark Divine', 'kennedy-center-honors', ['ftv', 'mv'], '560634897', '2025/09/560634897.jpg', '1159031498-8494ac193e63480bee1b0e5d25d4596fb8da36d1e66568e2e76dccbc4353978a'],
  ['Por La Cultura', 'lafc,metro', ['com', 'spo'], '1100755384', '2025/09/vumbnail-2.jpg', '2036046013-5d7f94b3f2962ffba6c82bb59aaf678b1704ab43e4a58850d57991f79140ca31'],
  ['Cartoon Buyer', 'serj-tankian', ['mv'], '1076253218', '2025/12/2006007594-71e7d38df418b5afc57c608bc6007c2e89abc82a46949f606d3c4e04a6e35e9f-d_640_regionus.jpeg', '2006007594-71e7d38df418b5afc57c608bc6007c2e89abc82a46949f606d3c4e04a6e35e9f'],
  ['2025 Brand Anthem', 'kevani', ['com'], '1124063937', '2025/12/2065820214-2a8eb1b9f1d60b825a22b214b6c4edce665b66b9edc641a061d7dd3d5b8f1ca0-d_640_regionus.jpeg', '2065820214-2a8eb1b9f1d60b825a22b214b6c4edce665b66b9edc641a061d7dd3d5b8f1ca0'],
  ['Let Us Tell Your Story', 'kevani', ['com'], '887471155', '2025/09/887471155.jpg', '1758004174-4ecf2f879266f08e580ad18e3eb4ded8803d07f04b215961ad98fa103d03b287'],
  ['Rules Are Meant to be Broken', 'madani', ['fas'], '169473719', '2025/09/169473719.jpg', ''],
  ['We Stand Apart™ Spot 2', 'sauro', ['fas'], '240095077', '2025/09/240095077.jpg', '663273422-b7479805022bab8313ffe4fb2d25a5e1845a15403395399cce7f658ca4e392f4'],
  ['We Stand Apart™', 'sauro', ['fas'], '240095251', '2025/09/240095251.jpg', '663273734-405a46e317616c17594b769d9e1c0a55c36abf2db5df7d886f07477d3fc4d029'],
  ['We Stand Apart™ – Craftsman', 'sauro', ['fas'], '240560721', '2025/09/240560721.jpg', '663897436-afef18cceec5e8c17ac1ab2a244769ad5681dc089005a13204f82b2fc4fffb27'],
  ['We Are Los Angeles', 'lafc', ['spo'], '355368364', '2025/09/355368364.jpg', '808135404-3a2390230b1eebe6b3a70ef27d139c4e6802eb182f2aa1e71c1c609c9637d828'],
  ['Latif Blessing', 'lafc', ['spo'], '265108700', '2025/09/265108700.jpg', '696561176-6919402130d2c76fe6b7d8ea709af156d77586ddd281d8f845a8eb4e15011f4c'],
  ['Metro Cup', 'lafc', ['spo'], '777504476', '2025/09/777504476.jpg', '1560163510-dea65c30e875d123862ce1fd1601546152114e022c11e6617f93cb17c7b1197d'],
  ['Tony Brown', 'att', ['spo'], '644868425', '2025/09/644868425.jpg', ''],
  ['Jonathan Dos Santos', 'att', ['spo'], '644866433', '2025/09/644866433.jpg', ''],
  ['Always With You', 'motiv', ['tech'], '197827160', '2025/09/197827160.jpg', '640712589-a73a54c9d9b488251c4fd1eba05311f7165f05945e3c7907c1e1a1d224803cdf'],
  ['Ring + App', 'motiv', ['tech'], '197827379', '2025/09/197827379.jpg', '640712316-0ccbfe1a73be7c86ecc6cd7aba95653a6be8110db92387f8f8829356eb21c680'],
  ['Marble Run', 'glowforge', ['tech'], '696763081', '2025/09/696763081.jpg', ''],
  ['Shakespeare', 'glowforge', ['tech'], '696764569', '2025/09/696764569.jpg', ''],
  ['Dino', 'glowforge', ['tech'], '696761511', '2025/09/696761511.jpg', ''],
  ['Robot', 'glowforge', ['tech'], '594885959', '2025/09/594885959.jpg', '1228564321-2df8ac4e97c31462751a5a2255943f6e86fe73bd3f4fdf7755590312c564cb5d'],
  ['BTS', 'kennedy-center-honors', ['ftv', 'mv'], '599838815', '2025/09/599838815.jpg', '1235478571-40818257975c7e92cea795094f69c11dea7897b84823e58fba030801b5ec9176'],
  ['Debbie Allen Tribute', 'kennedy-center-honors', ['ftv', 'mv'], '596309835', '2025/09/596309835.jpg', '1230681933-fd2e798993d8de95948c329940dd1c15eff6a9ded58780371f6067ef9ff58c1c'],
  ['Carlos Jones', 'nike', ['spo'], '365166164', '2025/09/365166164.jpg', '820834716-04ac8eebfe56f408a96519960f2719868203057c3dbd071879161283bddeed2c'],
  ['Until We All Win', 'nike', ['spo'], '394077928', '2025/09/394077928.jpg', '859827045-d9d7f9c6a4d234107225d44c8a7e311085540afa6a06b6a8dbec15db051b4fdc'],
  ['Summer Anthem', 'metro', ['com'], '947188888', '2023/12/1853650900-8a8f17722c7036477a4af1df9a7f9685f6d1e94b9c2f8acb7f7846c5f78c208a-d_640_regionus.jpeg', '1853650900-8a8f17722c7036477a4af1df9a7f9685f6d1e94b9c2f8acb7f7846c5f78c208a'],
  ['BTS', 'gibson', ['mv'], '701468848', '2025/09/701468848.jpg', '1417552264-d64813b1b19de15b54e45e31ffa69c291316777e09da84d771cde1950e04b98a'],
  ['Noel Gallagher', 'gibson', ['mv'], '740470654', '2025/09/740470654.jpg', '1490010813-03e0baf2ec75d54a0f769e9444a6631fe5c12c4ce1da35825e89e4b8be1f533e'],
  ['Sergio Vallín 1955 Les Paul Goldtop', 'gibson', ['mv'], '698939201', '2025/09/698939201.jpg', '1413230913-26e69c33386e1f483c8d54302a336ac2ef094cdfcc5f7f3728fe06829a2a5f95'],
  ['Gene Simmons', 'gibson', ['mv'], '701453381', '2023/12/gibson-gene-simmons.webp', '1417532962-46572d97a2c801463d321bb3fe90da8a85c927a872f16edd4b32373a01fb5f85', true],
]

/** Videos that appear on a featured-project page of the original site. */
const CASE_STUDY_VIDEOS: Record<string, string> = {
  '1066793787': 'gibson', '701453381': 'gibson', '740470654': 'gibson', '1139181925': 'gibson',
  '698939201': 'gibson', '938058327': 'gibson', '1018850935': 'gibson',
  '1100755384': 'lafc-metro', '355368364': 'lafc-metro', '777504476': 'lafc-metro', '265108700': 'lafc-metro',
}

const slugify = (s: string) => s.toLowerCase().replace(/™/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const projects: Project[] = rows.map(([title, clientSlugs, cats, vimeoId, siteThumb, key, preferSite]) => {
  const client = clientSlugs.split(',').map((c) => CLIENTS[c]).join(' × ')
  const site = wp(siteThumb)
  return {
    id: vimeoId,
    slug: `${slugify(client)}-${slugify(title)}`,
    title,
    client,
    category: cats.map((c) => C[c]),
    caseStudy: CASE_STUDY_VIDEOS[vimeoId],
    thumbnail: key && !preferSite ? vimeoThumb(key) : site,
    fallbackThumbnail: site,
    vimeoId,
    originalUrl: 'https://vimeo.com/' + vimeoId,
  }
})

export const projectByVimeoId = (id: string) => projects.find((p) => p.vimeoId === id)
export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id
