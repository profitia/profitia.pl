'use client'

import { motion } from 'framer-motion'

interface Props {
  eyebrow: string
  title: string
  subtitle: string
  cta1: string
  cta2: string
}

const STATS = [
  { n: '3', lines: ['lata', 'na rynku'] },
  { n: '5', lines: ['sektorów', 'działania'] },
  { n: '1', lines: ['podejście', 'do wartości'] },
]

/**
 * CareerHero
 * Light editorial split hero.
 * Tone: premium consulting, strategic, calm. Not dark SaaS.
 *
 * Layout (desktop):
 *   [left content 54%] [atmospheric panel] [stats column ~120px]
 *
 * Right panel: CSS atmospheric composition.
 * Replace with real photo by placing image at /public/career/hero.jpg
 * and swapping the panel div for <Image src="/career/hero.jpg" … />.
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
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium px-6 py-3.5 hover:bg-gray-700 transition-colors duration-200 group"
            >
              {cta1}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>

            {/* Secondary CTA — text link */}
            <a
              href="#process"
              className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors duration-200 group inline-flex items-center gap-2"
            >
              {cta2}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>
          </motion.div>

          {/* Mobile stats — below CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-8 mt-14 pb-8 lg:hidden"
          >
            {STATS.map(({ n, lines }) => (
              <div key={n}>
                <p className="text-2xl font-light text-gray-800 leading-none mb-1">{n}</p>
                {lines.map((l) => (
                  <p key={l} className="text-[9px] font-medium tracking-[0.28em] uppercase text-gray-400 leading-snug">{l}</p>
                ))}
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Right: atmospheric panel (desktop only) — full height, bleeds to edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.18 }}
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[50%]"
        aria-hidden="true"
      >
        {/* Atmospheric CSS composition */}
        <div className="relative flex-1 overflow-hidden">
          {/* Base tone */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(148deg, #eeede9 0%, #e4e3df 35%, #d6d5d0 70%, #c8c7c2 100%)' }}
          />
          {/* Subtle architectural grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(30,30,30,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(30,30,30,0.7) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          {/* Warm light bloom — top right */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(255,252,240,0.9) 0%, transparent 70%)' }}
          />
          {/* Second bloom — bottom center */}
          <div
            className="absolute bottom-0 left-1/4 right-0 h-48 opacity-30"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,254,250,0.8) 0%, transparent 70%)' }}
          />
          {/* Left-edge fade — integrates with content */}
          <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-white via-white/70 to-transparent" />
          {/* Thin accent line — vertical, architectural */}
          <div className="absolute left-[38%] top-[20%] bottom-[20%] w-px bg-gray-300/40" />
        </div>

        {/* Stats column — annual report style */}
        <div className="flex-shrink-0 w-[130px] flex flex-col justify-center gap-0 border-l border-gray-200/70 bg-white/60">
          {STATS.map(({ n, lines }, i) => (
            <div
              key={n}
              className={`px-6 py-7 ${i < STATS.length - 1 ? 'border-b border-gray-200/60' : ''}`}
            >
              <p className="text-[2.1rem] font-light text-gray-800 leading-none mb-2">{n}</p>
              {lines.map((l) => (
                <p key={l} className="text-[8px] font-semibold tracking-[0.32em] uppercase text-gray-400 leading-snug">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
