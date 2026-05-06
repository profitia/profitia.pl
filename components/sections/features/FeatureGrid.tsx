/**
 * FeatureGrid
 * ─────────────────────────────────────────────────────────────────────────
 * PremiumCard-based grid. 2 / 3 / 4 column support.
 * Uses hover:bg-gray-900 card inversion from PremiumCard.
 *
 * VISUAL RHYTHM:
 *   Follows white or gray-50 hero → standard separator
 */

import Link from 'next/link'
import { RevealWrapper, SectionHeader, PremiumCard } from '@/components/ui'

export interface FeatureItem {
  title: string
  body: string
  icon?: string        // emoji or short text
  href?: string
}

export interface FeatureGridProps {
  label?: string
  headline: string
  body?: string
  items: FeatureItem[]
  columns?: 2 | 3 | 4
  background?: 'white' | 'gray-50'
  headerAlign?: 'left' | 'center'
}

const colClasses: Record<2 | 3 | 4, string> = {
  2: 'grid grid-cols-1 md:grid-cols-2 gap-5',
  3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
  4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5',
}

export function FeatureGrid({
  label,
  headline,
  body,
  items,
  columns = 3,
  background = 'white',
  headerAlign = 'left',
}: FeatureGridProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">

        <RevealWrapper delay={0}>
          <SectionHeader
            label={label}
            headline={headline}
            body={body}
            align={headerAlign}
          />
        </RevealWrapper>

        <div className={`${colClasses[columns]} ${body || label || headline ? 'mt-12 lg:mt-16' : ''}`}>
          {items.map((item, i) => (
            <RevealWrapper key={item.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <PremiumCard
                icon={item.icon}
                title={item.title}
                description={item.body}
                href={item.href}
              />
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}
