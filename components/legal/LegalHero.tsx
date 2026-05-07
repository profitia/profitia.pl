import { LegalMeta } from './LegalMeta'

interface LegalHeroProps {
  eyebrow: string
  title: string
  intro?: string
  meta?: Array<{ label: string; value: string }>
}

/**
 * Restrained legal page hero.
 * No giant image, no marketing energy - institutional clarity only.
 */
export function LegalHero({ eyebrow, title, intro, meta }: LegalHeroProps) {
  return (
    <div className="mb-14 pb-14 border-b border-gray-100">
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-6">
        {eyebrow}
      </p>
      <h1 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08] mb-5">
        {title}
      </h1>
      {intro && (
        <p className="text-base text-gray-500 leading-[1.75] max-w-[60ch] mb-8">
          {intro}
        </p>
      )}
      {meta && meta.length > 0 && <LegalMeta items={meta} />}
    </div>
  )
}
