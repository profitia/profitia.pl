import type { Capability, Locale, CapabilitySectionDef } from '@/lib/capabilities'
import { t, getCapabilitiesForSection } from '@/lib/capabilities'
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
}

/**
 * CapabilityLayout
 * ─────────────────────────────────────────────────────────────
 * Full listing page layout: Hero → Sections → CTA.
 * Shared between ServicesPage and EducationPage.
 * Pure Server Component.
 */
export default function CapabilityLayout({ locale, prefix, sections, hero, cta }: Props) {
  return (
    <>
      <CapabilityHero
        locale={locale}
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <div className="container-base">
        {sections.map((section) => {
          const capabilities = getCapabilitiesForSection(section.id)
          return (
            <CapabilitySection
              key={section.id}
              section={section}
              capabilities={capabilities}
              locale={locale}
              prefix={prefix}
            />
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
