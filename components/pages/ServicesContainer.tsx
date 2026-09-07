'use client'

import { useState } from 'react'
import type { CatalogContentSection, CatalogDomain, CatalogProduct } from './catalogTypes'

type Props = {
  domains: CatalogDomain[]
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-5 w-5 flex-shrink-0 text-[rgb(72,94,136)] transition-transform duration-[250ms] motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 flex-shrink-0">
      <path d="M10 3.75v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.75 8.75 10 12l3.25-3.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14.25h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ProductAction({ action }: { action: NonNullable<CatalogProduct['action']> }) {
  return (
    <a
      href={action.href}
      download={action.download}
      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[rgba(0,109,158,0.28)] bg-white px-4 py-3 text-sm font-medium text-[rgb(0,109,158)] transition-colors duration-[250ms] hover:bg-[rgba(199,237,251,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,109,158)] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-0 sm:w-auto sm:justify-start"
    >
      <DownloadIcon />
      <span>{action.label}</span>
    </a>
  )
}

function renderList(items: string[], ordered?: boolean) {
  if (items.length === 0) return null

  if (ordered) {
    return (
      <ol className="space-y-2 text-sm text-[rgb(59,56,56)] leading-relaxed list-decimal pl-5">
        {items.map((item) => (
          <li key={item} className="break-words">
            {item}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className="space-y-2 text-sm text-[rgb(59,56,56)] leading-relaxed list-disc pl-5">
      {items.map((item) => (
        <li key={item} className="break-words">
          {item}
        </li>
      ))}
    </ul>
  )
}

function ProductDescription({ description, sections }: { description?: string[]; sections?: CatalogContentSection[] }) {
  const hasDescription = Boolean(description && description.length > 0)
  const hasSections = Boolean(sections && sections.length > 0)
  if (!hasDescription && !hasSections) return null

  return (
    <div className="space-y-5">
      {hasDescription && description?.length === 1 ? (
        <p className="text-sm text-[rgb(59,56,56)] leading-relaxed">{description[0]}</p>
      ) : null}

      {hasDescription && description && description.length > 1 ? renderList(description) : null}

      {sections?.map((section, sectionIndex) => (
        <div key={`${section.title ?? 'section'}-${sectionIndex}`} className="space-y-3">
          {section.title ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgb(0,109,158)]">
              {section.title}
            </p>
          ) : null}

          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-sm text-[rgb(59,56,56)] leading-relaxed">
              {paragraph}
            </p>
          ))}

          {section.items ? renderList(section.items, section.ordered) : null}

          {section.groups?.map((group, groupIndex) => (
            <div key={`${group.title ?? 'group'}-${groupIndex}`} className="space-y-2">
              {group.title ? (
                <p className="text-sm font-semibold text-[rgb(36,47,68)] leading-relaxed">
                  {group.title}
                </p>
              ) : null}
              {group.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-sm text-[rgb(59,56,56)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {group.items ? renderList(group.items, group.ordered) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function ServicesDomainSection({
  domain,
  openItems,
  activeItemId,
  onToggle,
  isFirst,
}: {
  domain: CatalogDomain
  openItems: Record<string, boolean>
  activeItemId: string | null
  onToggle: (itemId: string) => void
  isFirst: boolean
}) {
  return (
    <section className={isFirst ? 'border-t border-[rgba(149,166,199,0.3)] pt-28 pb-12' : 'border-t border-[rgba(149,166,199,0.3)] pt-12 pb-12'}>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="lg:pt-1">
          <h2 className="text-xl font-semibold tracking-tight text-[rgb(36,47,68)] leading-snug">
            {domain.title}
          </h2>
        </div>

        <div className={isFirst ? 'lg:pt-4' : 'lg:pt-2'}>
          {domain.products.map((product, index) => {
            const itemId = `${domain.id}-${product.id}`
            const contentId = `${itemId}-panel`
            const isOpen = openItems[itemId] === true
            const isActive = activeItemId === itemId

            return (
              <div
                key={itemId}
                className={`border-b rounded-xl px-4 -mx-4 transition-colors duration-[250ms] motion-reduce:transition-none ${isActive ? 'border-[rgba(0,109,158,0.28)] bg-[rgba(199,237,251,0.38)] shadow-[inset_0_0_0_1px_rgba(0,109,158,0.08)]' : 'border-[rgba(149,166,199,0.3)] hover-safe-surface-20'} ${index === 0 ? 'pt-3 pb-3' : 'py-3'}`}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 rounded-xl py-3 text-left transition-colors duration-[250ms] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,109,158)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => onToggle(itemId)}
                >
                  <span className={`min-w-0 flex-1 pr-2 text-[15px] tracking-tight leading-snug break-words ${isActive ? 'text-[rgb(0,109,158)]' : 'text-[rgb(36,47,68)]'} ${index === 0 ? 'font-semibold' : 'font-medium'}`}>
                    {product.title}
                  </span>
                  <ChevronIcon expanded={isOpen} />
                </button>
                <div id={contentId} hidden={!isOpen} className="pb-3 pr-10 space-y-4">
                  <ProductDescription description={product.description} sections={product.sections} />
                  {product.action ? <ProductAction action={product.action} /> : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ServicesContainer({ domains }: Props) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [openOrder, setOpenOrder] = useState<string[]>([])

  function toggleItem(itemId: string) {
    setOpenItems((current) => {
      const willOpen = current[itemId] !== true

      setOpenOrder((previous) => {
        if (willOpen) {
          const nextOrder = previous.filter((id) => id !== itemId)
          return [...nextOrder, itemId]
        }

        const nextOrder = previous.filter((id) => id !== itemId)
        setActiveItemId(nextOrder.at(-1) ?? null)
        return nextOrder
      })

      if (willOpen) {
        setActiveItemId(itemId)
      }

      return {
        ...current,
        [itemId]: willOpen,
      }
    })
  }

  return domains.map((domain, index) => (
    <ServicesDomainSection
      key={domain.id}
      domain={domain}
      openItems={openItems}
      activeItemId={activeItemId}
      onToggle={toggleItem}
      isFirst={index === 0}
    />
  ))
}
