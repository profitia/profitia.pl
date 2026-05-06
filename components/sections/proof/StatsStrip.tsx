/**
 * StatsStrip
 * ─────────────────────────────────────────────────────────────────────────
 * Horizontal metrics bar. Editorial spacing. Light or dark variant.
 *
 * USAGE: After hero or proof section. 3-5 key metrics side by side.
 */

import { RevealWrapper } from '@/components/ui'

export interface StripStat {
  value: string   // e.g. "3.2x"
  label: string   // e.g. "average ROI"
}

export interface StatsStripProps {
  stats: StripStat[]
  dark?: boolean
}

export function StatsStrip({ stats, dark = false }: StatsStripProps) {
  const bgCls = dark ? 'bg-gray-900' : 'bg-white border-t border-gray-100'
  const dividerCls = dark ? 'border-white/10' : 'border-gray-100'
  const valueCls = dark ? 'text-white' : 'text-gray-900'
  const labelCls = dark ? 'text-gray-400' : 'text-gray-500'

  return (
    <section className={`py-16 ${bgCls}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <RevealWrapper delay={0}>
          <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} divide-x ${dividerCls}`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="px-8 first:pl-0 last:pr-0 py-4">
                <div className={`text-3xl md:text-4xl font-semibold tracking-tight ${valueCls} mb-1`}>
                  {stat.value}
                </div>
                <div className={`text-xs tracking-wide uppercase ${labelCls}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
