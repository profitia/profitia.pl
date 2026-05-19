'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FaqItem {
  q: string
  a: string
}

interface Props {
  eyebrow: string
  title: string
  items: FaqItem[]
}

/**
 * CareerFAQ
 * Accordion FAQ — reduces candidate friction.
 * Institutional, calm. Not a glossy help center.
 * AnimatePresence for smooth height reveal.
 */
export default function CareerFAQ({ eyebrow, title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section className="py-24 border-b border-gray-100">
      <div className="container-base">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">

          {/* Left label column */}
          <div className="mb-12 lg:mb-0 lg:pt-1">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-5">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>

          {/* Right accordion */}
          <div>
            {items.map((item, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full text-left group py-7 flex items-start justify-between gap-6"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-[16px] font-medium text-gray-800 tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex-shrink-0 text-gray-300 text-xl leading-none mt-0.5"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] text-gray-500 leading-[1.85] pb-8 max-w-[52rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
