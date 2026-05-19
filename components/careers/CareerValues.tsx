'use client'

import { motion } from 'framer-motion'

interface ValueItem {
  label: string
  body: string
}

interface Props {
  eyebrow: string
  title: string
  items: ValueItem[]
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

/**
 * CareerValues
 * Career Value System — typography-first editorial grid.
 * Each item: number anchor + label + thin divider + body.
 * Not a benefits list. Not HR cards.
 * Institutional reasoning about why this work matters.
 */
export default function CareerValues({ eyebrow, title, items }: Props) {
  return (
    <section className="py-24 border-b border-gray-100">
      <div className="container-base">

        {/* Section header */}
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

        {/* Value grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={[
                'py-10 pr-8',
                // Bottom borders for all except last row
                i < items.length - (items.length % 3 || 3) ? 'border-b border-gray-100' : '',
                // Right borders: every item not in last column
                i % 3 !== 2 ? 'lg:border-r lg:border-gray-100' : '',
                // md 2-col: right border on odd items
                i % 2 === 0 ? 'md:border-r md:border-gray-100 lg:border-r-0' : '',
                i % 3 !== 2 ? 'lg:border-r lg:border-gray-100' : '',
              ].join(' ')}
            >
              <div className="text-[11px] font-medium tracking-[0.28em] uppercase text-gray-300 mb-5">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight leading-snug mb-4">
                {item.label}
              </h3>
              <div className="w-5 h-px bg-gray-200 mb-4" />
              <p className="text-[14px] text-gray-500 leading-[1.85]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
