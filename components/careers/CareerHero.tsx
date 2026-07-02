'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import MobileHeroImage from '@/components/ui/MobileHeroImage'

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
    <section className="relative bg-white overflow-hidden min-h-[640px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">

      {/* Left: content (inside container so it respects max-width) */}
      <div className="container-base relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
        <div className="lg:max-w-[52%] lg:pr-12">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.07 }}
            className="mt-8 md:mt-5 2xl:mt-8 font-semibold text-gray-900 tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem] max-w-[20ch]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-8 md:mt-5 2xl:mt-8 text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-gray-500 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed max-w-[36rem]"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 md:mt-5 2xl:mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="#roles">
              {cta1}
            </Button>

            <Button href="#process" variant="secondary">
              {cta2}
            </Button>
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.18 }}
        className="md:hidden"
      >
        <MobileHeroImage
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85"
          alt="Zespół Profitia w pracy"
          priority
          overlayClassName="bg-white/8"
        />
      </motion.div>

    </section>
  )
}
