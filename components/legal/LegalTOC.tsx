'use client'

import { useState, useEffect } from 'react'
import { LegalAnchorLink } from './LegalAnchorLink'

export interface TOCItem {
  id: string
  label: string
}

interface LegalTOCProps {
  items: TOCItem[]
}

/**
 * Table of contents with IntersectionObserver-based active section tracking.
 * Renders only the list - LegalSidebar provides the sticky / collapsible wrapper.
 */
export function LegalTOC({ items }: LegalTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      // Section is "active" when it occupies the upper ~30% of the viewport
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  // items are module-level constants - stable across renders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav aria-label="Spis treści">
      <ul className="space-y-3">
        {items.map(({ id, label }) => (
          <li
            key={id}
            className={`border-l-[1.5px] pl-2.5 transition-colors duration-200 ease-out ${
              activeId === id ? 'border-gray-700' : 'border-gray-100'
            }`}
          >
            <LegalAnchorLink
              href={`#${id}`}
              className={`block text-[13.5px] leading-[1.5] transition-colors duration-200 ease-out ${
                activeId === id
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400 hover:text-brand-blue'
              }`}
            >
              {label}
            </LegalAnchorLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
