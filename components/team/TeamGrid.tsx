/**
 * TeamGrid
 * ─────────────────────────────────────────────────────────────
 * Responsive grid for TeamMemberCard.
 * 1 col mobile → 2 col tablet → 3 col desktop (default).
 * Pass cols="2" for a two-column advisory layout.
 */

import type { TeamMember } from '@/lib/team/types'
import { TeamMemberCard } from './TeamMemberCard'

interface TeamGridProps {
  members: TeamMember[]
  locale?: 'pl' | 'en'
  cols?: 2 | 3
  showBio?: boolean
  showAreas?: boolean
}

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

export function TeamGrid({
  members,
  locale = 'pl',
  cols = 3,
  showBio = true,
  showAreas = true,
}: TeamGridProps) {
  if (members.length === 0) return null

  return (
    <div className={`grid ${GRID_COLS[cols]} gap-10 lg:gap-12`}>
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          locale={locale}
          showBio={showBio}
          showAreas={showAreas}
        />
      ))}
    </div>
  )
}
