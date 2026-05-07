'use client'

/**
 * ArticleLayout — Article Reading Experience (Client)
 *
 * Manages the two-column reading layout:
 * - Sticky TOC sidebar (desktop) / collapsible (mobile)
 * - Article content with editorial typography
 *
 * After mount:
 * 1. Scans rendered content for H2/H3 headings
 * 2. Assigns sequential IDs to headings without existing IDs
 * 3. Builds TOC from extracted headings
 * 4. Tracks active section via IntersectionObserver
 *
 * Content is rendered via dangerouslySetInnerHTML.
 * Note: sanitize content server-side before rendering in production CMS.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ArticleTOCItem } from '@/lib/content/types'

interface ArticleLayoutProps {
  content: string
}

// ── Inline TOC item ─────────────────────────────────────────────────────────

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

// ── Main component ──────────────────────────────────────────────────────────

export function ArticleLayout({ content }: ArticleLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [tocItems, setTocItems] = useState<ArticleTOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scan headings, assign IDs, build TOC, set up IntersectionObserver
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const headings = Array.from(el.querySelectorAll('h2, h3')) as HTMLElement[]

    headings.forEach((h, i) => {
      if (!h.id) {
        const slug = (h.textContent ?? '')
          .toLowerCase()
          .replace(/[^a-z0-9\u00C0-\u024F]+/gi, '-')
          .replace(/(^-|-$)/g, '') || `s${i}`
        h.id = slug
      }
      // Ensure heading is scrollable with offset for sticky header
      h.classList.add('scroll-mt-28')
    })

    const items: ArticleTOCItem[] = headings.map((h) => ({
      id: h.id,
      label: h.textContent?.trim() ?? '',
      level: h.tagName === 'H2' ? 2 : 3,
    }))

    setTocItems(items)
    if (items[0]) setActiveId(items[0].id)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [content])

  const handleTOCClick = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <div className="container-base pt-10 pb-32 lg:pb-44">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] lg:gap-16 lg:items-start">

        {/* ── TOC Sidebar ────────────────────────────────── */}
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
            {mobileOpen && tocItems.length > 0 && (
              <nav aria-label="Spis treści artykułu" className="px-4 py-4">
                <ul className="space-y-2.5">
                  {tocItems.map((item) => (
                    <TOCItem
                      key={item.id}
                      item={item}
                      isActive={activeId === item.id}
                      onClick={handleTOCClick}
                    />
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Desktop: sticky */}
          {tocItems.length > 0 && (
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
                    onClick={handleTOCClick}
                  />
                ))}
              </ul>
            </nav>
          )}
        </aside>

        {/* ── Article Content ─────────────────────────────── */}
        <div className="min-w-0">
          <div
            ref={contentRef}
            className={[
              // Paragraph
              '[&>p]:text-[16px] [&>p]:text-gray-600 [&>p]:leading-[1.85] [&>p]:mb-6',
              // Headings
              '[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-gray-900 [&>h2]:leading-snug [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-gray-100',
              '[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-9 [&>h3]:mb-3',
              '[&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mt-7 [&>h4]:mb-2',
              // Lists
              '[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2',
              '[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2',
              '[&>ul>li]:text-[15px] [&>ul>li]:text-gray-600 [&>ul>li]:leading-[1.8]',
              '[&>ol>li]:text-[15px] [&>ol>li]:text-gray-600 [&>ol>li]:leading-[1.8]',
              // Inline
              '[&_strong]:font-semibold [&_strong]:text-gray-800',
              '[&_em]:italic',
              '[&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-gray-300 [&_a:hover]:decoration-gray-600 [&_a]:transition-colors [&_a]:duration-200',
              // Pull quote / blockquote
              '[&>blockquote]:border-l-[3px] [&>blockquote]:border-gray-200 [&>blockquote]:pl-6 [&>blockquote]:my-10 [&>blockquote]:italic [&>blockquote]:text-[17px] [&>blockquote]:text-gray-500 [&>blockquote]:leading-[1.75]',
              // HR / divider
              '[&>hr]:border-0 [&>hr]:border-t [&>hr]:border-gray-100 [&>hr]:my-10',
              // Tables
              '[&>table]:w-full [&>table]:text-sm [&>table]:mb-8 [&>table]:border-collapse',
              '[&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-[11px] [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:tracking-[0.1em] [&>table>thead>tr>th]:uppercase [&>table>thead>tr>th]:text-gray-500 [&>table>thead>tr>th]:pb-3 [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-gray-200',
              '[&>table>tbody>tr>td]:py-3 [&>table>tbody>tr>td]:text-gray-600 [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-gray-100',
              // Code
              '[&>pre]:bg-gray-50 [&>pre]:border [&>pre]:border-gray-100 [&>pre]:rounded-lg [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:text-[13px] [&>pre]:text-gray-700 [&>pre]:mb-6',
              '[&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:text-gray-700 [&_code]:font-mono',
              // Image
              '[&>img]:w-full [&>img]:rounded-lg [&>img]:mb-8 [&>img]:mt-2',
              // Max width
              'max-w-[68ch]',
            ].join(' ')}
            // Note: content must be sanitized server-side before reaching this component
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

      </div>
    </div>
  )
}
