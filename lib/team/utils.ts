import type { TeamMember } from './types'

/** Extract uppercase initials from a full name (up to 2 characters) */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/** Localized role label */
export function getRole(member: TeamMember, locale: 'pl' | 'en'): string {
  return locale === 'en' && member.roleEN ? member.roleEN : member.role
}

/** Localized bio */
export function getBio(member: TeamMember, locale: 'pl' | 'en'): string | undefined {
  return locale === 'en' && member.bioEN ? member.bioEN : member.bio
}

/** Localized expertise areas */
export function getAreas(member: TeamMember, locale: 'pl' | 'en'): string[] {
  return (locale === 'en' && member.areasEN ? member.areasEN : member.areas) ?? []
}

/** Sort by order field */
export function sortByOrder(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => a.order - b.order)
}

/** Filter by type */
export function filterByType(
  members: TeamMember[],
  types: Array<TeamMember['type']>,
): TeamMember[] {
  return members.filter((m) => types.includes(m.type))
}
