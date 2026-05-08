'use client'

/**
 * HomePillars - Editorial activation sequence (ETAP 8.1 refined).
 *
 * ETAP 8.1 refinements (active/inactive hierarchy):
 *   - Active pillar bg: lighter overlay (black/38 vs /54) → more atmospheric image
 *   - Inactive text columns: backdrop-filter blur(6px) + rgba(0,0,0,0.26) zone overlay
 *     creates a clearly subordinate, hazy reading plane without hiding content
 *   - Inactive column opacity: 0.40 (from 0.45) — still accessible, clearly secondary
 *   - Mobile: mobileActive state (default: 0), tap-to-switch. Active pillar
 *     has lighter overlay (black/38), inactive pillars darker (black/66).
 *     All content always visible.
 *
 * Canon constraints:
 *   Transitions: opacity + background color only (~700ms ease-out).
 *   Blur does NOT animate (backdrop-filter: blur transitions unreliably across
 *   browsers; the opacity fade on the column makes the snap imperceptible).
 *   No slide, scale, zoom, parallax, glow, gradient.
 *   Inactive pillars remain legible — not hidden.
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
  // Mobile: tap-to-activate, first pillar dominant by default
  const [mobileActive, setMobileActive] = useState(0)
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

      {/* ── MOBILE: stacked editorial blocks, tap-to-activate ────────────────
          mobileActive (default: 0) tracks the dominant pillar.
          Active: lighter overlay, full text opacity.
          Inactive: heavier overlay, reduced text opacity.
          All content always visible — no hidden text.
          ──────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:hidden">
        {items.map((pillar, i) => {
          const isMobileActive = mobileActive === i
          return (
            <div
              key={`m-${pillar.n}`}
              className={`relative flex flex-col justify-end p-6 overflow-hidden cursor-pointer ${
                i < items.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              style={{ height: 'clamp(200px, 52vw, 280px)' }}
              onClick={() => setMobileActive(i)}
            >
              <Image
                src={pillar.img}
                alt={pillar.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay: lighter for active, considerably heavier for inactive */}
              <div
                className="absolute inset-0"
                style={{
                  background: isMobileActive ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.66)',
                  transition: 'background 700ms ease-out',
                }}
              />
              <div
                className="relative z-10"
                style={{
                  opacity: isMobileActive ? 1 : 0.55,
                  transition: 'opacity 700ms ease-out',
                }}
              >
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
          )
        })}
      </div>

      {/* ── DESKTOP: editorial sequence + full-width atmospheric background ──
          Active pillar image spans full section width (cross-faded bg layers).
          Active: light overlay (black/38), sharp, full opacity column.
          Inactive: heavier blur zone (backdrop-filter) + dark overlay inside
            the column, column opacity 0.40. Still legible, clearly secondary.
          Transitions: opacity + background (~700ms). Blur does not animate.
          ──────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex md:flex-row relative"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Full-width background image layers - cross-faded between pillars */}
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
            {/* Lighter overlay = more image shows through, more atmospheric */}
            <div className="absolute inset-0 bg-black/38" />
          </div>
        ))}

        {/* Text columns */}
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
                opacity: isInactive ? 0.40 : 1,
                transition: 'opacity 700ms ease-out',
              }}
              onMouseEnter={() => handleHover(i)}
            >
              {/* Inactive zone: blurred backdrop + subtle dark overlay.
                  Creates a clearly subordinate reading plane.
                  Blur does not transition — opacity fade masks the snap.
                  Text content sits above this at z-10. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backdropFilter: isInactive ? 'blur(6px)' : 'blur(0px)',
                  background: isInactive ? 'rgba(0,0,0,0.26)' : 'transparent',
                  transition: 'background 700ms ease-out',
                }}
              />

              {/* Text content - above blur overlay */}
              <div className="relative z-10">
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
