export type TeamMemberType =
  | 'leadership'
  | 'director'
  | 'expert'
  | 'advisor'
  | 'trainer'
  | 'author'

export interface TeamMember {
  id: string
  slug: string
  name: string
  role: string           // PL, e.g. "Partner Zarządzający"
  roleEN?: string        // EN override
  credentials?: string   // e.g. "MCIPS"
  yearsExperience?: string // e.g. "20+"
  imageUrl?: string
  bio?: string           // PL prose paragraph
  bioEN?: string         // EN override
  areas?: string[]       // expertise tags (PL)
  areasEN?: string[]     // expertise tags (EN)
  email?: string
  linkedin?: string
  type: TeamMemberType
  featured?: boolean     // show in leadership/featured section
  order: number
}
