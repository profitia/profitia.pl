/**
 * PROFITIA - Service Page System
 * Modular components for composing service subpages.
 *
 * Every service page = composition of these components.
 * NO custom layouts per service. Only data differs.
 *
 * Import pattern:
 *   import { ServiceHero, ServiceFeatures, ServiceCTA } from '@/components/templates/services'
 *
 * CANONICAL SERVICE PAGE COMPOSITION ORDER:
 *   1. ServiceHero         - entry, editorial or split layout
 *   2. ServiceOverview     - key metrics + "what it delivers" text
 *   3. ServiceFeatures     - grid or list breakdown of capabilities
 *   4. ServiceStats        - dark tonal break, impact numbers
 *   5. ServiceProcess      - step-by-step methodology
 *   6. ServiceProof        - testimonial + logo cloud (dark)
 *   7. RelatedServices     - cross-linking to other services
 *   8. ServiceCTA          - black CTA, always last
 *
 * Visual reference: docs/design-system/VISUAL_CONTEXT_PROFITIA.md
 */

export { ServiceHero } from './ServiceHero'
export { ServiceOverview } from './ServiceOverview'
export { ServiceFeatures } from './ServiceFeatures'
export { ServiceStats } from './ServiceStats'
export { ServiceProcess } from './ServiceProcess'
export { ServiceProof } from './ServiceProof'
export { ServiceCTA } from './ServiceCTA'
export { RelatedServices } from './RelatedServices'

export type { ServiceHeroProps } from './ServiceHero'
export type { ServiceOverviewProps, ServiceOverviewStat } from './ServiceOverview'
export type { ServiceFeaturesProps, ServiceFeatureItem } from './ServiceFeatures'
export type { ServiceStatsProps, ServiceStatItem } from './ServiceStats'
export type { ServiceProcessProps, ProcessStep } from './ServiceProcess'
export type { ServiceProofProps, ProofLogo } from './ServiceProof'
export type { ServiceCTAProps } from './ServiceCTA'
export type { RelatedServicesProps, RelatedServiceItem } from './RelatedServices'
