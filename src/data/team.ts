import { asset } from './assets'

export interface TeamMember { name: string; role: string; photo: string; position?: string }

export const team: TeamMember[] = [
  { name: 'Ara Soudjian', role: 'Director / Producer', photo: asset('images/team-ara-soudjian.webp'), position: '50% 30%' },
  { name: 'Garen Mirzaian', role: 'Production Lead', photo: asset('images/team-garen-mirzaian.webp'), position: '50% 25%' },
  // Placeholder: final name and portrait to be supplied.
  { name: 'Girls Name Placeholder', role: 'Producer', photo: asset('images/team-placeholder.webp'), position: '50% 30%' },
]
