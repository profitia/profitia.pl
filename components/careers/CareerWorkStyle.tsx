'use client'

import { motion } from 'framer-motion'

interface WorkStep {
  phase: string
  title: string
  description: string
  learning: string
}

interface Props {
  eyebrow: string
  title: string
  steps: WorkStep[]
}

/**
 * CareerWorkStyle
 * Operational flow section — "Jak pracujemy".
 * Shows the 5-phase consulting cycle and what a candidate experiences at each step.
 * Builds professional credibility and consulting vibe.
 * Not a company values wall. A structural account of work methodology.
 */
export default function CareerWorkStyle({ eyebrow, title, steps }: Props) {
  return (
    <section className="py-24 border-b border-gray-100">
      <div className="container-base">

        {/* Header */}
        <div className="mb-16 lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-5">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="border-b border-gray-100 last:border-0 py-8 lg:grid lg:grid-cols-[260px_1fr_320px] lg:gap-20 lg:py-10"
            >
              {/* Left: phase label */}
              <div className="flex items-center gap-4 mb-5 lg:mb-0 lg:block">
                <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-gray-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 lg:block lg:mt-2">
                  {step.phase}
                </span>
              </div>

              {/* Center: title + description */}
              <div>
                <h3 className="text-[18px] font-semibold text-gray-900 tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.8] max-w-[38rem]">
                  {step.description}
                </p>
              </div>

              {/* Right: what you learn */}
              <div className="mt-5 lg:mt-0 pl-0 lg:pl-0 lg:border-l lg:border-gray-100 lg:pl-8">
                <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-gray-300 mb-3">
                  czego sie uczysz
                </p>
                <p className="text-[13px] text-gray-500 leading-[1.75]">
                  {step.learning}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
