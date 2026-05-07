import React from 'react'
import { LegalSidebar } from './LegalSidebar'
import { TOCItem } from './LegalTOC'

interface LegalLayoutProps {
  toc: TOCItem[]
  children: React.ReactNode
}

/**
 * Canonical legal page shell.
 *
 * Desktop: two-column grid — 240px sticky sidebar (TOC) + fluid content column.
 * Mobile:  single column — collapsible TOC above content.
 *
 * Content is naturally constrained by prose max-width; the layout
 * never enforces full-bleed density on legal text.
 */
export function LegalLayout({ toc, children }: LegalLayoutProps) {
  return (
    <div className="container-base pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] lg:gap-16 lg:items-start">

        {/* Sidebar — first in DOM → stacks above content on mobile */}
        <LegalSidebar items={toc} />

        {/* Content column */}
        <div className="min-w-0 max-w-[65ch]">
          {children}
        </div>

      </div>
    </div>
  )
}
