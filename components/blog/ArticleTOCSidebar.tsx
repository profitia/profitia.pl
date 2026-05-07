'use client'

/**
 * ArticleTOCSidebar — TOC Interaction Layer (Client Component)
 *
 * Receives pre-computed TOC items (extracted server-side in ArticleLayout).
 * Manages scroll-based active section tracking via IntersectionObserver.
 * Finds heading elements by their pre-assigned IDs already present in the DOM.
 */

import { useCallback, useEffect, useState } from 'react'
import type { ArticleTOCItem } from '@/lib/content/types'

interface Props {
  tocItems: ArticleTOCItem[]
}

function TOCItem({
  item,
  isActive,
  onClick,
}: {
  item: ArticleTOCItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <li
      className={[
        'border-l-[1.5px] pl-2.5 transition-colors duration-200 ease-out',
        isActive ? 'border-gray-700' : 'border-gray-100',
        item.level === 3 ? 'ml-3' : '',
      ].join(' ')}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault()
          onClick()
          const el = document.getElementById(item.id)
          if (el) {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
            window.history.pushState(null, '', `#${item.id}`)
          }
        }}
        className={[
          'block transition-colors duration-200 ease-out',
          item.level === 2 ? 'text-[13.5px] leading-[1.5]' : 'text-[12.5px] leading-[1.5]',
          isActive ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600',
        ].join(' ')}
      >
        {item.label}
      </a>
    </li>
  )
}

export function ArticleTOCSidebar({ tocItems }: Props) {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (tocItems.length === 0) return

    const headings = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 },
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [tocItems])

  const handleClick = useCallback(() => {
    setMobileOpen(false)
  }, [])

  if (tocItems.length === 0) return <aside />

  return (
    <aside>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8 border border-gray-100 rounded-lg overflow-hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-out"
          aria-expanded={mobileOpen}
        >
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400">
            Spis treści
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={`text-gray-400 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {mobileOpen && (
          <nav aria-label="Spis treści artykułu" className="px-4 py-4">
            <ul className="space-y-2.5">
              {tocItems.map((item) => (
                <TOCItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={handleClick}
                />
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky */}
      <nav
        aria-label="Spis treści artykułu"
        className="hidden lg:block sticky top-28 self-start"
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">
          Spis treści
        </p>
        <ul className="space-y-3">
          {tocItems.map((item) => (
            <TOCItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={handleClick}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
