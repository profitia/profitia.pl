/**
 * TeamSection
 * ─────────────────────────────────────────────────────────────
 * Generic section wrapper for any team block.
 * Provides: eyebrow + heading + optional description + content slot.
 *
 * USAGE: Drop-in wrapper for LeadershipSection, TeamGrid, AdvisorySection.
 */

interface TeamSectionProps {
  eyebrow?: string
  heading?: string
  description?: string
  children: React.ReactNode
  border?: boolean
}

export function TeamSection({
  eyebrow,
  heading,
  description,
  children,
  border = true,
}: TeamSectionProps) {
  return (
    <section
      className={`container-base py-20 lg:py-28 ${border ? 'border-t border-gray-100' : ''}`}
    >
      {(eyebrow || heading || description) && (
        <div className="mb-14">
          {eyebrow && (
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-4">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-base text-gray-500 leading-[1.75] max-w-[56ch]">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
