import { asset } from './assets'

export interface Award { name: string; logo: string; href: string; ratio: number }

/**
 * Awards shown on the About page. Logos come from each organisation's own site.
 * Category and year are not shown because they have not been supplied — add `detail` fields here when they are.
 */
export const awards: Award[] = [
  { name: 'The Webby Awards', logo: asset('images/awards/webby-awards.svg'), href: 'https://www.webbyawards.com/', ratio: 1.73 },
  // Loaded from hermesawards.com until a local copy is added to public/images/awards/.
  { name: 'Hermes Creative Awards', logo: 'https://hermesawards.com/wp-content/uploads/2018/01/logo-small.png', href: 'https://hermesawards.com/', ratio: 3.1 },
  { name: 'The Communicator Awards', logo: asset('images/awards/communicator-awards.svg'), href: 'https://www.communicatorawards.com/', ratio: 3.78 },
]
