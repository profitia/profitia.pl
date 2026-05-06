/**
 * ServiceOverview
 * ─────────────────────────────────────────────────────────────────────────
 * 3-4 key metrics + explanatory text. Strategic intelligence feel.
 * The "what this service delivers" section.
 *
 * COMPOSITION: FeatureStats pattern, gray-50 background.
 */

import { RevealWrapper, SectionHeader, StatCard } from '@/components/ui'
import Link from 'next/link'

export interface ServiceOverviewStat {
  value: string
  label: string
  note?: string
}

export interface ServiceOverviewProps {
  label?: string
  headline: string
  body: string
  stats: ServiceOverviewStat[]
  cta?: { label: string; href: string }
}

export function ServiceOverview({
  label,
  headline,
  body,
  stats,
  cta,
}: ServiceOverviewProps) {
  return (
    <section className="py-28 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <div>
            <RevealWrapper delay={0}>
              <SectionHeader
                label={label}
                headline={headline}
                body={body}
                align="left"
              />
            </RevealWrapper>
            {cta && (
              <RevealWrapper delay={1}>
                <div className="mt-10">
                  <Link href={cta.href} className="btn-primary">{cta.label}</Link>
                </div>
              </RevealWrapper>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <RevealWrapper key={stat.label} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  separator={i > 0}
                />
              </RevealWrapper>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
