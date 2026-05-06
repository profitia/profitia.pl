/**
 * ServicePageTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for service subpages.
 * Accepts typed content data → renders with correct section order,
 * spacing rhythm, and tonal transitions.
 *
 * SECTION ORDER:
 *   Hero → Overview → Features → Stats → Process → Proof → Related → CTA
 *
 * TONAL RHYTHM:
 *   white → gray-50 → white → gray-900 (dark) → gray-50 → gray-900 (dark) → gray-50 → black
 *
 * USAGE:
 *   const content: ServicePageContent = { ... }
 *   <ServicePageTemplate content={content} />
 */

import {
  ServiceHero,
  ServiceOverview,
  ServiceFeatures,
  ServiceStats,
  ServiceProcess,
  ServiceProof,
  RelatedServices,
  ServiceCTA,
} from '@/components/templates/services'

import type {
  ServiceHeroProps,
  ServiceOverviewProps,
  ServiceFeaturesProps,
  ServiceStatsProps,
  ServiceProcessProps,
  ServiceProofProps,
  RelatedServicesProps,
  ServiceCTAProps,
} from '@/components/templates/services'

export interface ServicePageContent {
  hero: ServiceHeroProps
  overview?: Omit<ServiceOverviewProps, never>
  features?: ServiceFeaturesProps
  stats?: ServiceStatsProps
  process?: ServiceProcessProps
  proof?: ServiceProofProps
  related?: RelatedServicesProps
  cta?: ServiceCTAProps
}

export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  return (
    <>
      <ServiceHero {...content.hero} />
      {content.overview && <ServiceOverview {...content.overview} />}
      {content.features && <ServiceFeatures {...content.features} />}
      {content.stats && <ServiceStats {...content.stats} />}
      {content.process && <ServiceProcess {...content.process} />}
      {content.proof && <ServiceProof {...content.proof} />}
      {content.related && <RelatedServices {...content.related} />}
      <ServiceCTA {...(content.cta ?? {})} />
    </>
  )
}
