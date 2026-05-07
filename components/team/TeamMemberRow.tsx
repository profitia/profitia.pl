/**
 * TeamMemberRow
 * ─────────────────────────────────────────────────────────────
 * Editorial horizontal layout for leadership / featured experts.
 * Portrait on left, full bio + meta on right.
 * Used in LeadershipSection, not in the compact grid.
 *
 * GRID: [portrait_col] [content_col]
 *   portrait: fixed 220px on desktop, full-width on mobile
 *   content: flexible, with generous vertical breathing room
 *
 * VISUAL RHYTHM:
 *   Separated from sibling rows by a single border-b border-gray-100
 */

import type { TeamMember } from '@/lib/team/types'
import { getRole, getBio, getAreas } from '@/lib/team/utils'
import { TeamProfileImage } from './TeamProfileImage'
import { TeamMeta } from './TeamMeta'

interface TeamMemberRowProps {
  member: TeamMember
  locale?: 'pl' | 'en'
  showAreas?: boolean
}

export function TeamMemberRow({
  member,
  locale = 'pl',
  showAreas = true,
}: TeamMemberRowProps) {
  const role = getRole(member, locale)
  const bio = getBio(member, locale)
  const areas = getAreas(member, locale)

  return (
    <article className="py-16 lg:py-20 border-b border-gray-100 last:border-b-0 first:pt-0">
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr] gap-8 lg:gap-14 lg:items-start">
        {/* Portrait */}
        <div className="sm:max-w-[240px] w-full max-w-[220px]">
          <TeamProfileImage
            name={member.name}
            imageUrl={member.imageUrl}
            size="lg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-start">
          <TeamMeta
            name={member.name}
            role={role}
            credentials={member.credentials}
            yearsExperience={member.yearsExperience}
            areas={showAreas ? areas : []}
            showAreas={showAreas}
            size="lg"
          />

          {bio && (
            <p className="mt-7 text-[15px] text-gray-600 leading-[1.88] max-w-[58ch]">
              {bio}
            </p>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="
                mt-5 inline-flex text-[11px] font-medium tracking-[0.1em] uppercase
                text-gray-400 hover:text-gray-700
                transition-colors duration-200 ease-out
              "
            >
              {member.email}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
