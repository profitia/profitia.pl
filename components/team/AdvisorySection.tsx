/**
 * AdvisorySection
 * ─────────────────────────────────────────────────────────────
 * Two-column grid for advisors, external experts, and contributors.
 * Compact cards without bio - role + credentials only.
 *
 * USAGE: Advisory board, academic partners, program experts.
 * Currently reserved - add members when advisory roster grows.
 */

import type { TeamMember } from '@/lib/team/types'
import { TeamGrid } from './TeamGrid'

interface AdvisorySectionProps {
  members: TeamMember[]
  locale?: 'pl' | 'en'
  eyebrow?: string
  heading?: string
}

export function AdvisorySection({
  members,
  locale = 'pl',
  eyebrow,
  heading,
}: AdvisorySectionProps) {
  if (members.length === 0) return null

  return (
    <div>
      {(eyebrow || heading) && (
        <div className="mb-10">
          {eyebrow && (
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">
              {heading}
            </h3>
          )}
        </div>
      )}
      <TeamGrid
        members={members}
        locale={locale}
        cols={2}
        showBio={false}
        showAreas={false}
      />
    </div>
  )
}
