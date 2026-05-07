/**
 * ArticleLayout - Article Reading Experience (Server Component)
 *
 * Manages the two-column reading layout:
 * - Sticky TOC sidebar (desktop) / collapsible (mobile) - handled by ArticleTOCSidebar (Client)
 * - Article content rendered server-side via dangerouslySetInnerHTML
 *
 * Server-side:
 * 1. Extracts H2/H3 headings from content HTML via regex
 * 2. Injects sequential IDs into heading elements
 * 3. Builds tocItems array and passes it to ArticleTOCSidebar (Client Component)
 *
 * This architecture eliminates the Server→Client RSC boundary for the large
 * content HTML string - content is rendered server-side, only small tocItems
 * (array of {id, label, level}) crosses the boundary to the Client Component.
 */

import type { ArticleTOCItem } from '@/lib/content/types'
import { ArticleTOCSidebar } from './ArticleTOCSidebar'

interface ArticleLayoutProps {
  content: string
}

// ── Server-side heading extraction ───────────────────────────────────────────

/**
 * Parse H2/H3 headings from HTML, inject sequential IDs, return tocItems.
 * Uses the same slug algorithm as the original client-side scanner so that
 * IDs are stable and predictable.
 */
function prepareContent(html: string): {
  processedHtml: string
  tocItems: ArticleTOCItem[]
} {
  const tocItems: ArticleTOCItem[] = []
  const seenIds = new Set<string>()
  let idx = 0

  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === 'h2' ? 2 : 3

      // Plain text from inner HTML (strip any nested tags)
      const text = inner.replace(/<[^>]+>/g, '').trim()

      // Reuse existing id if present
      const existingId = /\bid="([^"]+)"/.exec(attrs)
      let id: string

      if (existingId) {
        id = existingId[1]
      } else {
        const base =
          text
            .toLowerCase()
            .replace(/[^a-z0-9\u00C0-\u024F]+/gi, '-')
            .replace(/(^-|-$)/g, '') || `s${idx}`

        let candidate = base
        let n = 1
        while (seenIds.has(candidate)) candidate = `${base}-${n++}`
        id = candidate
      }

      seenIds.add(id)
      idx++
      tocItems.push({ id, label: text, level })

      // Strip any pre-existing id to avoid duplicates, then inject ours
      const cleanAttrs = attrs.replace(/\s*\bid="[^"]*"/, '').trimEnd()
      return `<${tag} id="${id}"${cleanAttrs ? ' ' + cleanAttrs : ''}>${inner}</${tag}>`
    },
  )

  return { processedHtml, tocItems }
}

// ── Main component ──────────────────────────────────────────────────────────

export function ArticleLayout({ content }: ArticleLayoutProps) {
  const { processedHtml, tocItems } = prepareContent(content)

  return (
    <div className="container-base pt-12 pb-36 lg:pb-52">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] lg:gap-16 lg:items-start">

        {/* ── TOC Sidebar (Client Component) ──────────────── */}
        <ArticleTOCSidebar tocItems={tocItems} />

        {/* ── Article Content (Server-rendered HTML) ───────── */}
        <div className="min-w-0">
          <div
            className={[
              // Paragraph
              '[&>p]:text-[16px] [&>p]:text-gray-600 [&>p]:leading-[1.9] [&>p]:mb-7',
              // Headings - scroll-mt-28 for sticky header offset
              '[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-gray-900 [&>h2]:leading-snug [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:pt-10 [&>h2]:border-t [&>h2]:border-gray-100 [&>h2]:scroll-mt-28',
              '[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:scroll-mt-28',
              '[&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mt-8 [&>h4]:mb-3',
              // Lists
              '[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-7 [&>ul]:space-y-2.5',
              '[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-7 [&>ol]:space-y-2.5',
              '[&>ul>li]:text-[15px] [&>ul>li]:text-gray-600 [&>ul>li]:leading-[1.85]',
              '[&>ol>li]:text-[15px] [&>ol>li]:text-gray-600 [&>ol>li]:leading-[1.85]',
              // Inline
              '[&_strong]:font-semibold [&_strong]:text-gray-800',
              '[&_em]:italic',
              '[&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-gray-300 [&_a:hover]:decoration-gray-600 [&_a]:transition-colors [&_a]:duration-200',
              // Pull quote / blockquote
              '[&>blockquote]:border-l-[3px] [&>blockquote]:border-gray-200 [&>blockquote]:pl-7 [&>blockquote]:my-12 [&>blockquote]:italic [&>blockquote]:text-[18px] [&>blockquote]:text-gray-500 [&>blockquote]:leading-[1.78]',
              // HR / divider
              '[&>hr]:border-0 [&>hr]:border-t [&>hr]:border-gray-100 [&>hr]:my-12',
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
            // Note: content is from our own CMS seed - not user-generated input
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </div>

      </div>
    </div>
  )
}
