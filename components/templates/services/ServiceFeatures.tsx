/**
 * ServiceFeatures
 * ─────────────────────────────────────────────────────────────────────────
 * Feature breakdown for a service. PremiumCard grid or FeatureSplit list.
 * "What you get" section.
 *
 * COMPOSITION:
 *   mode='grid'  → PremiumCard 3-col grid
 *   mode='list'  → numbered steps / detailed breakdown
 */

import { RevealWrapper, SectionHeader, PremiumCard } from '@/components/ui'

export interface ServiceFeatureItem {
  icon?: string
  title: string
  body: string
}

export interface ServiceFeaturesProps {
  label?: string
  headline: string
  body?: string
  features: ServiceFeatureItem[]
  mode?: 'grid' | 'list'
  background?: 'white' | 'gray-50'
}

export function ServiceFeatures({
  label,
  headline,
  body,
  features,
  mode = 'grid',
  background = 'white',
}: ServiceFeaturesProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">

        <RevealWrapper delay={0}>
          <SectionHeader
            label={label}
            headline={headline}
            body={body}
            align="left"
          />
        </RevealWrapper>

        {mode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 lg:mt-16">
            {features.map((f, i) => (
              <RevealWrapper key={f.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <PremiumCard icon={f.icon} title={f.title} description={f.body} />
              </RevealWrapper>
            ))}
          </div>
        ) : (
          <div className="mt-12 lg:mt-16 space-y-0 divide-y divide-gray-100">
            {features.map((f, i) => (
              <RevealWrapper key={f.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <div className="grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-6 py-10">
                  <div className="text-3xl font-semibold text-gray-200 tracking-tight leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    {f.icon && <span className="text-2xl mb-3 block">{f.icon}</span>}
                    <h3 className="text-base font-semibold text-gray-900 mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
