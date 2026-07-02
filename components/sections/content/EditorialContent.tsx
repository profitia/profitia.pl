/**
 * EditorialContent
 * ─────────────────────────────────────────────────────────────────────────
 * Narrow text column. Article-like reading experience.
 *
 * USAGE: Blog articles, insights, long-form case study narrative.
 * Accepts children so rich text / MDX can be rendered inside.
 */

import { ReactNode } from 'react'
import { LabelTag, RevealWrapper } from '@/components/ui'

export interface EditorialContentProps {
  label?: string
  headline?: string
  children: ReactNode
  background?: 'white' | 'gray-50'
}

export function EditorialContent({
  label,
  headline,
  children,
  background = 'white',
}: EditorialContentProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'

  return (
    <section className={`py-28 ${bgCls} border-t border-gray-100`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto">

          {(label || headline) && (
            <RevealWrapper delay={0}>
              {label && <LabelTag className="mb-5">{label}</LabelTag>}
              {headline && (
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-10">
                  {headline}
                </h2>
              )}
            </RevealWrapper>
          )}

          <RevealWrapper delay={1}>
            <div className="prose prose-gray prose-lg max-w-none leading-relaxed
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-4
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-li:text-gray-600
            ">
              {children}
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
