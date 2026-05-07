/**
 * TeamMemberCard
 * ─────────────────────────────────────────────────────────────
 * Compact vertical card for team grid layouts.
 * No shadow. No border radius on card container. Editorial.
 *
 * USAGE: Expert grid, advisory board, broader team section.
 * For leadership (featured), use TeamMemberRow instead.
 */

import type { TeamMember } from '@/lib/team/types'
import { getRole, getBio, getAreas } from '@/lib/team/utils'
import { TeamProfileImage } from './TeamProfileImage'
import { TeamMeta } from './TeamMeta'

interface TeamMemberCardProps {
  member: TeamMember
  locale?: 'pl' | 'en'
  showBio?: boolean
  showAreas?: boolean
}

export function TeamMemberCard({
  member,
  locale = 'pl',
  showBio = true,
  showAreas = true,
}: TeamMemberCardProps) {
  const role = getRole(member, locale)
  const bio = getBio(member, locale)
  const areas = getAreas(member, locale)

  return (
    <article className="group">
      {/* Portrait */}
      <div className="mb-5">
        <TeamProfileImage
          name={member.name}
          imageUrl={member.imageUrl}
          size="lg"
        />
      </div>

      {/* Meta */}
      <TeamMeta
        name={member.name}
        role={role}
        credentials={member.credentials}
        yearsExperience={member.yearsExperience}
        areas={showAreas ? areas : []}
        showAreas={showAreas}
        size="sm"
      />

      {/* Bio */}
      {showBio && bio && (
        <p className="mt-3.5 text-sm text-gray-500 leading-[1.75]">
          {bio}
        </p>
      )}
    </article>
  )
}
