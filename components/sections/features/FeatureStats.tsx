/**
 * FeatureStats
 * ─────────────────────────────────────────────────────────────────────────
 * Stats + explanatory content. Strategic intelligence feel.
 * Left: label + H2 + body + optional CTA | Right: stat grid
 *
 * USAGE: ROI metrics, market facts, product impact numbers.
 */

import { Button, RevealWrapper, SectionHeader, StatCard } from '@/components/ui'

export interface StatItem {
  value: string      // e.g. "3.2x"
  label: string      // e.g. "average ROI improvement"
  note?: string      // small sub-note
}

export interface FeatureStatsProps {
  label?: string
  headline: string
  body: string
  stats: StatItem[]
  cta?: { label: string; href: string }
  background?: 'white' | 'gray-50'
  statsDark?: boolean   // dark background variant for stats column
}

export function FeatureStats({
  label,
  headline,
  body,
  stats,
  cta,
  background = 'white',
  statsDark = false,
}: FeatureStatsProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Content */}
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
                  <Button href={cta.href}>
                    {cta.label}
                  </Button>
                </div>
              </RevealWrapper>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <RevealWrapper key={stat.label} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  dark={statsDark}
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
