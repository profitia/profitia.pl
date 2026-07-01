'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  eyebrow: string
  title: string
  subtitle: string
  cta1: string
  cta2: string
}

/**
 * CareerHero
 * Light editorial split hero.
 * Tone: premium consulting, strategic, calm. Not dark SaaS.
 *
 * Layout (desktop):
 *   [left content 52%] [photo — full height bleed, no stats column]
 *
 * Photo: Unsplash — colorful consulting/office tone, consistent with site photography.
 * To swap: change the src URL below.
 */
export default function CareerHero({ eyebrow, title, subtitle, cta1, cta2 }: Props) {
  return (
    <section className="relative bg-white overflow-hidden min-h-[640px] lg:min-h-[700px]">

      {/* Left: content (inside container so it respects max-width) */}
      <div className="container-base relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-0 lg:min-h-[700px] lg:flex lg:flex-col lg:justify-center">
        <div className="lg:max-w-[52%] lg:pr-12">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-medium tracking-[0.34em] uppercase text-gray-400 mb-9"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.07 }}
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-semibold tracking-tight text-gray-900 leading-[1.07] max-w-[20ch] mb-8"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="text-[16px] text-gray-500 leading-[1.75] max-w-[36rem] mb-12"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center"
          >
            {/* Primary CTA — dark navy fill */}
            <a
              href="#roles"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium px-6 py-3.5 hover:bg-brand-blue transition-colors duration-200 group"
            >
              {cta1}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>

            {/* Secondary CTA — text link */}
            <a
              href="#process"
              className="text-[13px] text-gray-500 hover:text-brand-blue transition-colors duration-200 group inline-flex items-center gap-2"
            >
              {cta2}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* Right: photo panel (desktop only) — full height, bleeds to edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.18 }}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%]"
        aria-hidden="true"
      >
        <div className="relative w-full h-full overflow-hidden bg-gray-100">
          {/* Real photo — colorful, consulting tone */}
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85"
            alt="Zespół Profitia w pracy"
            fill
            className="object-cover object-center"
            sizes="52vw"
            priority
          />
          {/* Subtle warm overlay for consistency with page tone */}
          <div className="absolute inset-0 bg-white/8" />
          {/* Left-edge fade — integrates with content */}
          <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-white via-white/70 to-transparent" />
        </div>
      </motion.div>

    </section>
  )
}
