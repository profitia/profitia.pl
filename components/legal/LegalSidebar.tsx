'use client'

import { useState } from 'react'
import { LegalTOC, TOCItem } from './LegalTOC'

interface LegalSidebarProps {
  items: TOCItem[]
}

/**
 * Sidebar wrapper for legal TOC.
 *
 * Desktop (lg+): sticky aside column, always visible.
 * Mobile:        collapsible panel above the content.
 *
 * A single LegalSidebar is rendered in LegalLayout; it handles
 * both views via responsive Tailwind classes.
 */
export function LegalSidebar({ items }: LegalSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <aside>
      {/* ── Mobile: collapsible trigger + panel ─────────────────────── */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="legal-toc-mobile"
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 ease-out"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
            Spis treści
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden="true"
            className={`text-gray-400 transition-transform duration-200 ease-out ${mobileOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {mobileOpen && (
          <div
            id="legal-toc-mobile"
            className="mt-2 px-4 py-4 bg-gray-50 rounded-lg"
          >
            <LegalTOC items={items} />
          </div>
        )}
      </div>

      {/* ── Desktop: sticky full list ────────────────────────────────── */}
      <div className="hidden lg:block sticky top-28 self-start">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">
          Spis treści
        </p>
        <LegalTOC items={items} />
      </div>
    </aside>
  )
}
