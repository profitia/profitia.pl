/**
 * ServiceStats
 * ─────────────────────────────────────────────────────────────────────────
 * Metrics section for a service. Dark bg tonal break.
 * "The numbers" — impact proof integrated in service flow.
 *
 * COMPOSITION: StatsStrip dark variant.
 */

import { RevealWrapper } from '@/components/ui'

export interface ServiceStatItem {
  value: string
  label: string
  note?: string
}

export interface ServiceStatsProps {
  label?: string
  headline?: string
  stats: ServiceStatItem[]
}

export function ServiceStats({ label, headline, stats }: ServiceStatsProps) {
  return (
    <section className="py-28 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-6">

        {(label || headline) && (
          <RevealWrapper delay={0}>
            {label && <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-5">{label}</p>}
            {headline && (
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight mb-16 max-w-xl">
                {headline}
              </h2>
            )}
          </RevealWrapper>
        )}

        <RevealWrapper delay={1}>
          <div
            className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} divide-x divide-white/10`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 first:pl-0 last:pr-0 py-4">
                <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2 leading-none">
                  {stat.value}
                </div>
                <div className="text-xs tracking-wide uppercase text-gray-500 leading-relaxed">
                  {stat.label}
                </div>
                {stat.note && (
                  <div className="mt-2 text-xs text-gray-600">{stat.note}</div>
                )}
              </div>
            ))}
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
