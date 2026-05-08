'use client'

/**
 * HomePillars - Editorial activation sequence for the three-pillar section.
 *
 * DESKTOP:
 *   When the section enters the viewport, an editorial activation sequence runs:
 *   1. Pillar 0 activates immediately.
 *   2. After 2500ms, Pillar 1 activates.
 *   3. After 2500ms, Pillar 2 activates. Sequence ends.
 *   After the first sequence, the system is fully manual (hover controls active state).
 *   Hover at any point immediately overrides the sequence.
 *
 *   Active pillar image spans the FULL WIDTH of the section as an atmospheric
 *   editorial background. Inactive pillars are at reduced opacity (0.45).
 *   Transitions: opacity fade only, 700ms. No sliding, no scaling, no zoom.
 *
 * MOBILE:
 *   No autoplay. All three pillars are always visible as stacked editorial blocks,
 *   each with its own image visible. Content readable without interaction.
 *
 * Visual canon: institutional silence. Not marketing UI.
 */

import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'

interface PillarItem {
  n: string
  title: string
  desc: string
  img: string
  alt: string
}

interface Props {
  items: PillarItem[]
  seeMore: string
}

export default function HomePillars({ items, seeMore }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const manualRef = useRef(false)
  const seqDoneRef = useRef(false)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const startSequence = useCallback(() => {
    if (manualRef.current || seqDoneRef.current) return

    setActive(0)

    const t1 = setTimeout(() => {
      if (manualRef.current) return
      setActive(1)

      const t2 = setTimeout(() => {
        if (manualRef.current) return
        setActive(2)
        seqDoneRef.current = true
      }, 2500)

      timersRef.current.push(t2)
    }, 2500)

    timersRef.current.push(t1)
  }, []) // stable - reads only refs, no state deps

  // IntersectionObserver: fire sequence on first desktop viewport entry
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (window.innerWidth >= 768) startSequence()
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [startSequence])

  // Desktop hover: immediately override sequence
  const handleHover = useCallback(
    (i: number) => {
      manualRef.current = true
      seqDoneRef.current = true
      clearTimers()
      setActive(i)
    },
    [clearTimers]
  )

  const hasActive = active !== null

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* ── MOBILE: always-visible stacked editorial blocks ───────────────────
          Each pillar always shows its image. Readable without interaction.
          ──────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:hidden">
        {items.map((pillar, i) => (
          <div
            key={`m-${pillar.n}`}
            className={`relative flex flex-col justify-end p-6 overflow-hidden ${
              i < items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
            style={{ height: 'clamp(200px, 52vw, 280px)' }}
          >
            <Image
              src={pillar.img}
              alt={pillar.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/52" />
            <div className="relative z-10">
              <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">
                {pillar.n}
              </div>
              <h3 className="text-xl font-semibold text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-200 mt-2 leading-relaxed max-w-xs">
                {pillar.desc}
              </p>
              <span className="inline-block mt-4 text-sm text-white/70">
                {seeMore}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: editorial sequence + full-width atmospheric background ──
          Active pillar image spans full section width.
          Inactive pillars: opacity 0.45 but always readable.
          Transition: opacity fade only, 700ms ease-out.
          ──────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex md:flex-row relative"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Full-width background image layers - one per pillar, cross-faded */}
        {items.map((pillar, i) => (
          <div
            key={`bg-${i}`}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: active === i ? 1 : 0,
              transition: 'opacity 700ms ease-out',
            }}
          >
            <Image
              src={pillar.img}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark atmospheric overlay - text always readable */}
            <div className="absolute inset-0 bg-black/54" />
          </div>
        ))}

        {/* Pillar text columns */}
        {items.map((pillar, i) => {
          const isInactive = hasActive && active !== i

          return (
            <div
              key={`d-${pillar.n}`}
              className={`relative flex flex-col justify-end p-8 flex-1 z-10 cursor-default ${
                i < items.length - 1
                  ? `border-r ${hasActive ? 'border-white/10' : 'border-gray-200'}`
                  : ''
              }`}
              style={{
                opacity: isInactive ? 0.45 : 1,
                transition: 'opacity 700ms ease-out, border-color 700ms ease-out',
              }}
              onMouseEnter={() => handleHover(i)}
            >
              <div>
                <div
                  className="text-[10px] font-medium tracking-[0.2em] uppercase mb-4"
                  style={{
                    color: hasActive ? 'rgba(255,255,255,0.38)' : '#9ca3af',
                    transition: 'color 700ms ease-out',
                  }}
                >
                  {pillar.n}
                </div>
                <h3
                  className="text-xl md:text-2xl font-semibold leading-snug"
                  style={{
                    color: hasActive ? '#ffffff' : '#111827',
                    transition: 'color 700ms ease-out',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm md:text-base mt-3 max-w-xs leading-relaxed"
                  style={{
                    color: hasActive ? 'rgba(229,231,235,0.92)' : '#6b7280',
                    transition: 'color 700ms ease-out',
                  }}
                >
                  {pillar.desc}
                </p>
                <span
                  className="inline-block mt-5 text-sm"
                  style={{
                    color: hasActive ? 'rgba(255,255,255,0.75)' : '#374151',
                    transition: 'color 700ms ease-out',
                  }}
                >
                  {seeMore}
                </span>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
