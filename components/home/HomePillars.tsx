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
          ETAP 8.2: text-first hierarchy — content reads immediately.
          Active: lighter overlay, full text, full contrast.
          Inactive: heavy overlay (0.74), muted text (0.50 opacity).
          Taller blocks, larger title, more padding — editorial text layer.
          ──────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:hidden">
        {items.map((pillar, i) => {
          const isMobileActive = mobileActive === i
          return (
            <div
              key={`m-${pillar.n}`}
              className={`relative flex flex-col justify-end overflow-hidden cursor-pointer ${
                i < items.length - 1 ? 'border-b border-white/10' : ''
              }`}
              style={{ height: 'clamp(240px, 60vw, 320px)' }}
              onClick={() => setMobileActive(i)}
            >
              <Image
                src={pillar.img}
                alt={pillar.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Contrast separation: active ~45%, inactive ~74% */}
              <div
                className="absolute inset-0"
                style={{
                  background: isMobileActive ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.74)',
                  transition: 'background 700ms ease-out',
                }}
              />
              <div
                className="relative z-10 px-7 pb-9 pt-5"
                style={{
                  opacity: isMobileActive ? 1 : 0.50,
                  transition: 'opacity 700ms ease-out',
                }}
              >
                {/* Pillar number: larger, more separated, acts as structural anchor */}
                <div className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/55 mb-4">
                  {pillar.n}
                </div>
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-[15px] text-white/90 mt-4 leading-relaxed max-w-xs">
                  {pillar.desc}
                </p>
                <span className="inline-block mt-5 text-sm text-white/80">
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

          // Per-column dark overlay: inactive gets a solid dark plane that
          // kills the active background image showing through the column.
          // Active: transparent — image from the bg layer reads through.
          // Pre-activation: transparent — white page reads through.
          const columnOverlay = isInactive
            ? 'rgba(0,0,0,0.82)'
            : 'transparent'

          // Text colors: three states — pre-activation (light bg), active, inactive.
          const numColor = isInactive
            ? 'rgba(255,255,255,0.28)'
            : hasActive ? 'rgba(255,255,255,0.50)' : '#9ca3af'
          const titleColor = isInactive
            ? 'rgba(255,255,255,0.58)'
            : hasActive ? '#ffffff' : '#111827'
          const descColor = isInactive
            ? 'rgba(255,255,255,0.38)'
            : hasActive ? 'rgba(229,231,235,0.95)' : '#6b7280'
          const ctaColor = isInactive
            ? 'rgba(255,255,255,0.30)'
            : hasActive ? 'rgba(255,255,255,0.80)' : '#374151'
          const sepColor = isInactive
            ? 'rgba(255,255,255,0.14)'
            : hasActive ? 'rgba(255,255,255,0.40)' : '#e5e7eb'

          return (
            <div
              key={`d-${pillar.n}`}
              className={`relative flex flex-col justify-center p-10 flex-1 z-10 cursor-default ${
                i < items.length - 1
                  ? `border-r ${hasActive ? 'border-white/10' : 'border-gray-200'}`
                  : ''
              }`}
              style={{ transition: 'border-color 700ms ease-out' }}
              onMouseEnter={() => handleHover(i)}
            >
              {/* Per-column overlay: solid dark for inactive, transparent for active */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: columnOverlay,
                  transition: 'background 700ms ease-out',
                }}
              />

              {/* Text content */}
              <div className="relative z-10">
                {/* Pillar number — acts as structural chapter anchor */}
                <div
                  className="text-[11px] font-medium tracking-[0.28em] uppercase mb-5"
                  style={{ color: numColor, transition: 'color 700ms ease-out' }}
                >
                  {pillar.n} /
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-semibold leading-tight"
                  style={{ color: titleColor, transition: 'color 700ms ease-out' }}
                >
                  {pillar.title}
                </h3>
                {/* Separator line — editorial chapter divider */}
                <div
                  className="w-8 h-px my-5"
                  style={{ background: sepColor, transition: 'background 700ms ease-out' }}
                />
                <p
                  className="text-sm lg:text-base max-w-xs leading-relaxed"
                  style={{ color: descColor, transition: 'color 700ms ease-out' }}
                >
                  {pillar.desc}
                </p>
                <span
                  className="inline-block mt-6 text-sm"
                  style={{ color: ctaColor, transition: 'color 700ms ease-out' }}
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
