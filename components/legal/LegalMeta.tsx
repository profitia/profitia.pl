interface MetaItem {
  label: string
  value: string
}

interface LegalMetaProps {
  items: MetaItem[]
}

/**
 * Institutional metadata chips — last updated, version, jurisdiction, etc.
 * Rendered inside LegalHero below the intro text.
 */
export function LegalMeta({ items }: LegalMetaProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {items.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400">
            {label}
          </span>
          <span className="text-[11px] text-gray-500">{value}</span>
        </div>
      ))}
    </div>
  )
}
