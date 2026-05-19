'use client'

import { motion } from 'framer-motion'

interface ProcessStep {
  title: string
  description: string
  timing: string
}

interface Props {
  eyebrow: string
  title: string
  subtitle: string
  steps: ProcessStep[]
}

/**
 * CareerProcess
 * Ultra-clean recruitment timeline.
 * 5 steps with timing estimates.
 * Goal: reduce candidate anxiety by making the process transparent and predictable.
 * Not a marketing section. A structural account of what happens.
 */
export default function CareerProcess({ eyebrow, title, subtitle, steps }: Props) {
  return (
    <section id="process" className="py-24 border-b border-gray-100">
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
          <div className="hidden lg:block">
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-[40rem] lg:pt-1">
              {subtitle}
            </p>
          </div>
        </div>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-16 lg:hidden">{subtitle}</p>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute top-5 left-0 right-0 h-px bg-gray-100 hidden lg:block"
            style={{ top: '20px' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pt-0 lg:pt-14 pb-8 border-b border-gray-100 lg:border-b-0 last:border-b-0"
              >
                {/* Step dot */}
                <div
                  className="hidden lg:block absolute top-0 left-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center -translate-y-1/2"
                  aria-hidden="true"
                  style={{ top: '-20px' }}
                >
                  <span className="text-[11px] font-medium text-gray-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Mobile step number */}
                <div className="flex items-center gap-4 mb-4 lg:hidden py-6">
                  <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-medium text-gray-400">{i + 1}</span>
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-300 mb-3 hidden lg:block">
                  {step.timing}
                </p>
                <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-[1.8] mb-3">
                  {step.description}
                </p>
                <p className="text-[11px] text-gray-400 tracking-[0.12em] lg:hidden">
                  {step.timing}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
