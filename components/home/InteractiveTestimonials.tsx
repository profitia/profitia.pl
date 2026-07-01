'use client'

import { useState } from 'react'

type TestimonialItem = {
  company: string
  role: string
  title: string
  body: string
}

type InteractiveTestimonialsProps = {
  eyebrow: string
  items: TestimonialItem[]
}

export default function InteractiveTestimonials({
  eyebrow,
  items,
}: InteractiveTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeItem = items[activeIndex] ?? items[0]

  return (
    <section className="py-28 bg-[#242F44] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 items-start">
          <div className="lg:pt-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">
              {eyebrow}
            </p>
            <div className="border-t border-white/10">
              {items.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={`${item.company}-${item.role}`}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={[
                      'group block w-full border-b border-white/10 px-6 py-5 text-left transition-colors duration-200 last:border-b-0',
                      isActive ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]',
                    ].join(' ')}
                    aria-pressed={isActive}
                  >
                    <p
                      className={[
                        'text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-200',
                        isActive ? 'text-[#5fc2ff]' : 'text-gray-500 group-hover:text-gray-300',
                      ].join(' ')}
                    >
                      {item.company}
                    </p>
                    <p
                      className={[
                        'mt-3 text-sm font-medium transition-colors duration-200',
                        isActive ? 'text-white' : 'text-white/72 group-hover:text-white',
                      ].join(' ')}
                    >
                      {item.role}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -top-6 left-0 text-[4.5rem] md:text-[5.5rem] leading-none text-white/10 font-semibold select-none">
              &ldquo;
            </div>
            <div key={activeIndex} className="relative max-w-4xl py-6 md:py-8 testimonial-fade">
              <blockquote className="text-[2.125rem] md:text-[2.5rem] lg:text-[2.625rem] font-semibold tracking-tight leading-[1.16] text-white max-w-3xl">
                {activeItem.title}
              </blockquote>
              <p className="mt-8 text-base md:text-lg font-normal leading-[1.8] text-gray-300 max-w-2xl">
                {activeItem.body}
              </p>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 lg:hidden">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-2">
                {activeItem.company}
              </p>
              <p className="text-sm font-medium text-white">{activeItem.role}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-fade {
          animation: testimonial-fade 220ms ease-out;
        }

        @keyframes testimonial-fade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-fade {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}