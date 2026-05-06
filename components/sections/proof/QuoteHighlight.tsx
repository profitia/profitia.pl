/**
 * QuoteHighlight
 * ─────────────────────────────────────────────────────────────────────────
 * Standalone editorial quote. Light background. Pull-quote feel.
 *
 * USAGE: Inside editorial content, between feature sections. Brief proof.
 */

import { RevealWrapper } from '@/components/ui'

export interface QuoteHighlightProps {
  quote: string
  attribution?: string
  role?: string
  background?: 'white' | 'gray-50'
}

export function QuoteHighlight({
  quote,
  attribution,
  role,
  background = 'gray-50',
}: QuoteHighlightProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-20 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-4xl px-6">
        <RevealWrapper delay={0}>
          <blockquote className="text-center">
            <p className="text-2xl md:text-3xl font-semibold text-gray-900 leading-[1.3] tracking-tight mb-8">
              &ldquo;{quote}&rdquo;
            </p>
            {attribution && (
              <footer className="flex flex-col items-center gap-1">
                <div className="w-10 h-px bg-gray-300 mb-5" />
                <cite className="not-italic text-sm font-medium text-gray-900">{attribution}</cite>
                {role && (
                  <span className="text-xs text-gray-400 tracking-wide">{role}</span>
                )}
              </footer>
            )}
          </blockquote>
        </RevealWrapper>
      </div>
    </section>
  )
}
