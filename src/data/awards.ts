import { asset } from './assets'

export interface Award { name: string; logo: string; href: string; ratio: number }

/**
 * Awards shown on the About page. Webby and Communicator logos come from each organisation's own site; the Hermes logo was supplied by the client.
 * Category and year are not shown because they have not been supplied — add `detail` fields here when they are.
 */
export const awards: Award[] = [
  { name: 'The Webby Awards', logo: asset('images/awards/webby-awards.svg'), href: 'https://www.webbyawards.com/', ratio: 1.73 },
  { name: 'Hermes Creative Awards', logo: asset('images/awards/hermes-creative-awards.webp'), href: 'https://hermesawards.com/', ratio: 3.38 },
  { name: 'The Communicator Awards', logo: asset('images/awards/communicator-awards.svg'), href: 'https://www.communicatorawards.com/', ratio: 3.78 },
]
