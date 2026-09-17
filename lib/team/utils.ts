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

/** Localized credentials and qualification line */
export function getCredentials(member: TeamMember, locale: 'pl' | 'en'): string | undefined {
  return locale === 'en' && member.credentialsEN ? member.credentialsEN : member.credentials
}

/** Localized bio */
export function getBio(member: TeamMember, locale: 'pl' | 'en'): string | undefined {
  return locale === 'en' && member.bioEN ? member.bioEN : member.bio
}

/** Localized expertise areas */
export function getAreas(member: TeamMember, locale: 'pl' | 'en'): string[] {
  return (locale === 'en' && member.areasEN ? member.areasEN : member.areas) ?? []
}

/** Localized selected project experience */
export function getSelectedExperience(member: TeamMember, locale: 'pl' | 'en'): string[] {
  return (
    locale === 'en' && member.selectedExperienceEN
      ? member.selectedExperienceEN
      : member.selectedExperience
  ) ?? []
}

/** Localized professional background when project achievements are not supplied */
export function getProfessionalBackground(member: TeamMember, locale: 'pl' | 'en'): string[] {
  return (
    locale === 'en' && member.professionalBackgroundEN
      ? member.professionalBackgroundEN
      : member.professionalBackground
  ) ?? []
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
