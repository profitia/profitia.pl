/**
 * ComparisonGrid
 * ─────────────────────────────────────────────────────────────────────────
 * Strategic comparison table. Two-column: Without / With SpendGuru.
 * Or any two-column comparison layout.
 *
 * USAGE: Service pages, pricing pages, "before/after" strategic framing.
 */

import { LabelTag, RevealWrapper, SectionHeader } from '@/components/ui'

export interface ComparisonRow {
  aspect: string
  before: string    // negative / problematic state
  after: string     // positive / resolved state
}

export interface ComparisonGridProps {
  label?: string
  headline?: string
  body?: string
  beforeLabel?: string
  afterLabel?: string
  rows: ComparisonRow[]
  background?: 'white' | 'gray-50'
}

export function ComparisonGrid({
  label,
  headline,
  body,
  beforeLabel = 'Bez systemu',
  afterLabel = 'Z platformą',
  rows,
  background = 'white',
}: ComparisonGridProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">

        {headline && (
          <RevealWrapper delay={0}>
            <SectionHeader
              label={label}
              headline={headline}
              body={body}
              align="left"
            />
          </RevealWrapper>
        )}

        <RevealWrapper delay={headline ? 1 : 0}>
          <div className={headline ? 'mt-12' : ''}>
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-5 bg-gray-50 border-b border-gray-200">
                <LabelTag as="span">Obszar</LabelTag>
              </div>
              <div className="p-5 bg-red-50 border-b border-gray-200 border-l">
                <LabelTag as="span" className="text-red-400">{beforeLabel}</LabelTag>
              </div>
              <div className="p-5 bg-gray-900 border-b border-gray-800 border-l">
                <LabelTag as="span" dark>{afterLabel}</LabelTag>
              </div>

              {/* Data rows */}
              {rows.map((row, i) => (
                <>
                  <div
                    key={`aspect-${i}`}
                    className="p-5 bg-gray-50 border-b border-gray-200 last-of-type:border-0 flex items-start"
                  >
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{row.aspect}</span>
                  </div>
                  <div
                    key={`before-${i}`}
                    className="p-5 border-b border-gray-200 border-l last-of-type:border-b-0 bg-white"
                  >
                    <span className="text-sm text-gray-600 leading-relaxed">{row.before}</span>
                  </div>
                  <div
                    key={`after-${i}`}
                    className="p-5 border-b border-gray-800 border-l bg-gray-900 last-of-type:border-b-0"
                  >
                    <span className="text-sm text-gray-300 leading-relaxed">{row.after}</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
