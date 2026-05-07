'use client'

/**
 * ReadingProgress — Thin Editorial Progress Bar
 *
 * Fixed to the top of the viewport, above the header.
 * Tracks scroll position relative to article length.
 * Appears only after scrolling past the hero.
 *
 * - 2px tall, bg-gray-900, z-[100]
 * - No animation on width — real-time, jank-free
 * - Respects prefers-reduced-motion (hidden if motion preference is reduce)
 */

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.min(100, (scrollTop / docHeight) * 100)
      setProgress(pct)
      setVisible(scrollTop > 80)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-px bg-gray-100"
    >
      <div
        className="h-full bg-gray-800 transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
