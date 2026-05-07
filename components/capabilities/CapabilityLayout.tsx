import { Fragment } from 'react'
import type { Locale, CapabilitySectionDef } from '@/lib/capabilities'
import { getCapabilitiesForSection } from '@/lib/capabilities'
import CapabilityHero from './CapabilityHero'
import CapabilitySection from './CapabilitySection'
import CapabilityCTA from './CapabilityCTA'

interface Props {
  locale: Locale
  prefix: 'services' | 'education'
  sections: CapabilitySectionDef[]
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  cta: {
    note: string
    label: string
    href: string
  }
  /**
   * Controls CapabilityHero variant (pacing + subtitle width differentiation).
   */
  heroVariant?: 'services' | 'education'
  /**
   * Optional institutional statement rendered between the hero and sections.
   * Used for Education's learning philosophy block.
   */
  philosophyStatement?: { pl: string; en: string }
  /**
   * Optional editorial breaks between sections — short manifesto statements
   * that interrupt the listing rhythm and signal strategic transitions.
   * afterIndex: render after sections[afterIndex].
   */
  editorialBreaks?: Array<{ afterIndex: number; pl: string; en: string }>
}

/**
 * CapabilityLayout
 * ─────────────────────────────────────────────────────────────
 * Full listing page layout: Hero → (Philosophy) → Sections → CTA.
 * Shared between ServicesPage and EducationPage.
 *
 * Editorial rhythm is controlled via:
 * - philosophyStatement: appears once, between hero and first section
 * - editorialBreaks: manifesto pauses between specific sections
 *
 * Pure Server Component.
 */
export default function CapabilityLayout({
  locale,
  prefix,
  sections,
  hero,
  cta,
  heroVariant,
  philosophyStatement,
  editorialBreaks,
}: Props) {
  return (
    <>
      <CapabilityHero
        locale={locale}
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        variant={heroVariant}
      />

      <div className="container-base">

        {/* Learning philosophy — Education only */}
        {philosophyStatement && (
          <div className="py-14 border-b border-gray-100">
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-[44rem]">
              {philosophyStatement[locale]}
            </p>
          </div>
        )}

        {sections.map((section, index) => {
          const capabilities = getCapabilitiesForSection(section.id)
          const editorialBreak = editorialBreaks?.find((b) => b.afterIndex === index)

          return (
            <Fragment key={section.id}>
              <CapabilitySection
                section={section}
                capabilities={capabilities}
                locale={locale}
                prefix={prefix}
              />
              {editorialBreak && (
                <div className="py-14">
                  <p className="text-[13.5px] text-gray-400 leading-relaxed max-w-[38rem]">
                    {editorialBreak[locale]}
                  </p>
                </div>
              )}
            </Fragment>
          )
        })}

        <CapabilityCTA
          locale={locale}
          note={cta.note}
          label={cta.label}
          href={cta.href}
        />

      </div>
    </>
  )
}
