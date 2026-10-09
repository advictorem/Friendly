import { asset } from './assets'

export interface Award { name: string; project: string; year: string; logo: string; href: string; ratio: number }

const webby = { name: 'The Webby Awards', logo: asset('images/awards/webby-awards.svg'), href: 'https://www.webbyawards.com/', ratio: 1.73 }
const hermes = { name: 'Hermes Creative Awards', logo: asset('images/awards/hermes-creative-awards.webp'), href: 'https://hermesawards.com/', ratio: 3.38 }

/** Awards on the About page, as supplied by the client. The Communicator Awards logo is kept in public/images/awards/ for later use. */
export const awards: Award[] = [
  { ...webby, project: 'Motiv Ring', year: '2018' },
  { ...webby, project: 'Glowforge', year: '2021' },
  { ...hermes, project: 'Sauro', year: '2018' },
]
