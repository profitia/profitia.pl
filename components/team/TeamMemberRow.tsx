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
import {
  getRole,
  getCredentials,
  getBio,
  getAreas,
  getSelectedExperience,
  getProfessionalBackground,
} from '@/lib/team/utils'
import { TeamProfileImage } from './TeamProfileImage'
import { TeamMeta } from './TeamMeta'

interface TeamMemberRowProps {
  member: TeamMember
  locale?: 'pl' | 'en'
  showAreas?: boolean
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function TeamMemberRow({
  member,
  locale = 'pl',
  showAreas = true,
}: TeamMemberRowProps) {
  const role = getRole(member, locale)
  const credentials = getCredentials(member, locale)
  const bio = getBio(member, locale)
  const areas = getAreas(member, locale)
  const selectedExperience = getSelectedExperience(member, locale)
  const professionalBackground = getProfessionalBackground(member, locale)
  const experienceItems = selectedExperience.length > 0
    ? selectedExperience
    : professionalBackground
  const areasLabel = locale === 'pl' ? 'Obszary specjalizacji' : 'Areas of expertise'
  const experienceLabel = selectedExperience.length > 0
    ? locale === 'pl' ? 'Wybrane doświadczenie' : 'Selected experience'
    : locale === 'pl' ? 'Doświadczenie zawodowe' : 'Professional background'

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
            imagePosition={member.imagePosition}
            className=""
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-start">
          <TeamMeta
            name={member.name}
            role={role}
            credentials={credentials}
            yearsExperience={member.yearsExperience}
            areas={showAreas ? areas : []}
            showAreas={false}
            size="lg"
            locale={locale}
          />

          {bio && (
            <p className="mt-7 text-[15px] text-[rgb(59,56,56)] leading-[1.88] max-w-3xl">
              {bio}
            </p>
          )}

          {areas.length > 0 && (
            <section className="mt-8 max-w-3xl" aria-labelledby={`${member.id}-areas`}>
              <h3
                id={`${member.id}-areas`}
                className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgb(72,94,136)]"
              >
                {areasLabel}
              </h3>
              <ul className="mt-4 grid gap-x-8 gap-y-2 text-[14px] leading-relaxed text-[rgb(59,56,56)] md:grid-cols-2">
                {areas.map((area) => (
                  <li key={area} className="relative pl-4 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-[rgba(72,94,136,0.65)]">
                    {area}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {experienceItems.length > 0 && (
            <section className="mt-8 max-w-3xl" aria-labelledby={`${member.id}-experience`}>
              <h3
                id={`${member.id}-experience`}
                className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgb(72,94,136)]"
              >
                {experienceLabel}
              </h3>
              <ul className="mt-4 space-y-3 text-[14px] leading-[1.75] text-[rgb(59,56,56)]">
                {experienceItems.map((item) => (
                  <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.82em] before:h-px before:w-2.5 before:bg-[rgba(72,94,136,0.65)]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn - ${member.name}`}
              className="mt-8 inline-flex w-fit items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[rgb(72,94,136)] transition-colors duration-[250ms] hover-safe-text-brand"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
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
