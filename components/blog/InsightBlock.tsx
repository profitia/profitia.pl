/**
 * InsightBlock - Inline Intelligence Callout
 *
 * Used for highlighted statistics, key findings, or strategic insights
 * embedded within article content.
 *
 * Variants:
 * - 'stat'     - large number + label
 * - 'insight'  - highlighted insight text
 * - 'finding'  - research or data finding
 *
 * Restrained, editorial, institutional.
 */

interface InsightBlockProps {
  type?: 'stat' | 'insight' | 'finding'
  value?: string
  label?: string
  text?: string
  source?: string
}

const TYPE_STYLES = {
  stat: 'border-l-[3px] border-gray-900',
  insight: 'border-l-[3px] border-gray-300 bg-gray-50',
  finding: 'border-l-[3px] border-gray-200',
}

export function InsightBlock({
  type = 'insight',
  value,
  label,
  text,
  source,
}: InsightBlockProps) {
  return (
    <div className={`${TYPE_STYLES[type]} pl-6 py-5 pr-6 my-12 rounded-r-sm`}>
      {type === 'stat' && value && (
        <>
          <p className="text-4xl font-semibold tracking-tight text-gray-900 mb-1">{value}</p>
          {label && <p className="text-sm text-gray-500">{label}</p>}
        </>
      )}
      {(type === 'insight' || type === 'finding') && text && (
        <>
          <p className="text-[15px] text-gray-700 leading-[1.75] font-medium">{text}</p>
          {source && (
            <p className="mt-2 text-[12px] text-gray-500">{source}</p>
          )}
        </>
      )}
    </div>
  )
}
