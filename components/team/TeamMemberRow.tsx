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
    <article className="hover-safe-row group relative py-16 lg:py-20 border-b border-[rgba(149,166,199,0.3)] last:border-b-0 first:pt-0 px-4 -mx-4 transition-colors duration-[250ms] hover-safe-surface-15">
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr] gap-8 lg:gap-14 lg:items-start">
        {/* Portrait */}
        <div className="relative sm:max-w-[240px] w-full max-w-[220px]">
          <div className="hover-safe-row-bar absolute -left-4 top-0 bottom-0 w-[3px] bg-[rgb(0,109,158)] opacity-0 transition-opacity duration-[250ms]" />
          <TeamProfileImage
            name={member.name}
            imageUrl={member.imageUrl}
            size="lg"
            className=""
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
            <p className="mt-7 text-[15px] text-[rgb(59,56,56)] leading-[1.88] max-w-[58ch]">
              {bio}
            </p>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="
                mt-5 inline-flex text-[11px] font-medium tracking-[0.1em] uppercase
                text-[rgb(72,94,136)] hover-safe-text-brand
                transition-colors duration-[250ms] ease-out
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
