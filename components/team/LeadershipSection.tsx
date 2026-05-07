/**
 * LeadershipSection
 * ─────────────────────────────────────────────────────────────
 * Renders featured team members (type: leadership | director)
 * as editorial horizontal rows. No grid - each person deserves space.
 *
 * USAGE: About page, contact page leadership callout.
 */

import type { TeamMember } from '@/lib/team/types'
import { TeamMemberRow } from './TeamMemberRow'

interface LeadershipSectionProps {
  members: TeamMember[]
  locale?: 'pl' | 'en'
  showAreas?: boolean
}

export function LeadershipSection({
  members,
  locale = 'pl',
  showAreas = true,
}: LeadershipSectionProps) {
  if (members.length === 0) return null

  return (
    <div>
      {members.map((member) => (
        <TeamMemberRow
          key={member.id}
          member={member}
          locale={locale}
          showAreas={showAreas}
        />
      ))}
    </div>
  )
}
