'use client'

import { useState } from 'react'
import type { PointerEvent } from 'react'

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

  const activateOnHover = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') {
      setActiveIndex(index)
    }
  }

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
                  <div key={`${item.company}-${item.role}`} className="border-b border-white/10 last:border-b-0">
                    <button
                      type="button"
                      onPointerEnter={(event) => activateOnHover(index, event)}
                      onClick={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={[
                        'hover-safe-testimonial group block w-full px-6 py-5 text-left transition-colors duration-200',
                        isActive ? 'bg-white/[0.03]' : 'bg-transparent',
                      ].join(' ')}
                      aria-pressed={isActive}
                    >
                      <p
                        className={[
                          'text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-200',
                          isActive ? 'text-[#5fc2ff]' : 'hover-safe-testimonial-company text-gray-500',
                        ].join(' ')}
                      >
                        {item.company}
                      </p>
                      <p
                        className={[
                          'mt-3 text-sm font-medium transition-colors duration-200',
                          isActive ? 'text-white' : 'hover-safe-testimonial-role text-white/72',
                        ].join(' ')}
                      >
                        {item.role}
                      </p>
                    </button>

                    {isActive ? (
                      <div className="px-6 pb-6 pt-1 lg:hidden testimonial-fade">
                        <blockquote className="text-[1.5rem] font-semibold tracking-tight leading-[1.22] text-white">
                          {item.title}
                        </blockquote>
                        <p className="mt-5 text-sm font-normal leading-[1.75] text-gray-300">
                          {item.body}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative hidden lg:block">
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