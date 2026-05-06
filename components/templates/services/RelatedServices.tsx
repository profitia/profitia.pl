/**
 * RelatedServices
 * ─────────────────────────────────────────────────────────────────────────
 * Related service cards grid. PremiumCard-based.
 * End-of-page cross-linking. Before or after CTA.
 *
 * COMPOSITION: PremiumCard with href (full card link).
 */

import { RevealWrapper, SectionHeader, PremiumCard } from '@/components/ui'

export interface RelatedServiceItem {
  icon?: string
  title: string
  body: string
  href: string
}

export interface RelatedServicesProps {
  label?: string
  headline?: string
  services: RelatedServiceItem[]
  background?: 'white' | 'gray-50'
}

export function RelatedServices({
  label = 'Powiązane usługi',
  headline = 'Inne obszary współpracy',
  services,
  background = 'gray-50',
}: RelatedServicesProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">

        <RevealWrapper delay={0}>
          <SectionHeader
            label={label}
            headline={headline}
            align="left"
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 lg:mt-16">
          {services.map((service, i) => (
            <RevealWrapper key={service.title} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <PremiumCard
                icon={service.icon}
                title={service.title}
                description={service.body}
                href={service.href}
              />
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}
