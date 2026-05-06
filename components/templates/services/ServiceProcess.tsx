/**
 * ServiceProcess
 * ─────────────────────────────────────────────────────────────────────────
 * Process steps / methodology. How the service works end-to-end.
 * Numbered, sequential, clear.
 *
 * COMPOSITION: Numbered list, editorial spacing.
 */

import { RevealWrapper, SectionHeader } from '@/components/ui'

export interface ProcessStep {
  title: string
  body: string
  duration?: string   // e.g. "Week 1-2", "Day 1"
}

export interface ServiceProcessProps {
  label?: string
  headline: string
  body?: string
  steps: ProcessStep[]
  background?: 'white' | 'gray-50'
}

export function ServiceProcess({
  label,
  headline,
  body,
  steps,
  background = 'gray-50',
}: ServiceProcessProps) {
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

        <div className="mt-12 lg:mt-16">
          {steps.map((step, i) => (
            <RevealWrapper key={step.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr_auto] gap-6 py-10 border-b border-gray-200 last:border-0">
                {/* Step number */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                    {step.body}
                  </p>
                </div>

                {/* Duration */}
                {step.duration && (
                  <div className="flex items-start md:justify-end">
                    <span className="text-xs text-gray-400 tracking-wide whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                )}
              </div>
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}
