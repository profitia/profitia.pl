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
 * Editorial typographic timeline — zero circles, zero badges.
 * Numbering: large light numerals (01–05) that interrupt the connecting line.
 * Annual-report style. Premium consulting aesthetic.
 *
 * Desktop: 5-column horizontal flow
 * Tablet: 2-column grid
 * Mobile: vertical stacked progression
 */
export default function CareerProcess({ eyebrow, title, subtitle, steps }: Props) {
  return (
    <section id="process" className="py-24 border-b border-gray-100">
      <div className="container-base">

        {/* Section header */}
        <div className="mb-20 lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-5">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>
          <p className="hidden lg:block text-[15px] text-gray-500 leading-relaxed max-w-[40rem] lg:pt-1">
            {subtitle}
          </p>
        </div>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-16 lg:hidden">{subtitle}</p>

        {/* Timeline grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="border-b border-gray-100 last:border-b-0 md:border-b-0 pb-10 md:pb-0 lg:pb-0"
            >
              {/* Number + connecting line */}
              <div className="flex items-center mb-8 lg:mb-10">
                <span className="text-[2.75rem] font-extralight text-gray-200 leading-none tracking-tight flex-shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Line — extends to right edge of cell (visual connector) */}
                <div className="ml-4 flex-1 h-px bg-gray-150 bg-gray-200/60" />
              </div>

              {/* Timing */}
              <p className="text-[9px] font-semibold tracking-[0.32em] uppercase text-gray-400 mb-4">
                {step.timing}
              </p>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight leading-snug mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-gray-500 leading-[1.8]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
