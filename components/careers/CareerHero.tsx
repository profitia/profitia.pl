'use client'

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
 * Cinematic dark opening section.
 * Sets tone: editorial, strategic, premium.
 * Not employer branding. Not job board hero.
 */
export default function CareerHero({ eyebrow, title, subtitle, cta1, cta2 }: Props) {
  return (
    <section className="relative bg-gray-950 overflow-hidden">
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-base relative z-10 pt-32 pb-28 lg:pt-44 lg:pb-36">
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16 lg:items-end">

          {/* Left - main content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-[11px] font-medium tracking-[0.32em] uppercase text-white/30 mb-10"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-4xl md:text-[2.8rem] lg:text-[3.25rem] font-semibold tracking-tight text-white leading-[1.06] max-w-[42rem] mb-9"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="text-[17px] text-white/48 leading-relaxed max-w-[34rem] mb-14"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-col sm:flex-row gap-5 sm:gap-10 sm:items-center"
            >
              <a
                href="#roles"
                className="text-[15px] text-white font-medium hover:text-white/65 transition-colors duration-200 group inline-flex items-center gap-2"
              >
                {cta1}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#process"
                className="text-[15px] text-white/38 hover:text-white/60 transition-colors duration-200"
              >
                {cta2}
              </a>
            </motion.div>
          </div>

          {/* Right - quiet stat column (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="hidden lg:block self-end pb-1"
            aria-hidden="true"
          >
            <div className="space-y-8 border-l border-white/8 pl-8">
              {[
                { n: '3', label: 'lata' },
                { n: '5', label: 'sektorów' },
                { n: '1', label: 'podejście' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-3xl font-semibold text-white/18 leading-none mb-1">{n}</p>
                  <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/22">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
