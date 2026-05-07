interface WorkItem {
  label: string
  body: string
}

interface Props {
  eyebrow: string
  title: string
  items: WorkItem[]
}

/**
 * CareerPhilosophy
 * ─────────────────────────────────────────────────────────────
 * "How we work" section - institutional operating philosophy.
 * Not values cards. Not mission statements.
 * A clear account of expectations, thinking style and ownership culture.
 */
export default function CareerPhilosophy({ eyebrow, title, items }: Props) {
  return (
    <section className="pt-20 pb-12 border-b border-gray-100">
      <div className="container-base">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">

          {/* Left - label column */}
          <div className="mb-10 lg:mb-0 lg:pt-1">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-4">
              {eyebrow}
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>

          {/* Right - items */}
          <div className="space-y-8">
            {items.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <p className="text-[13px] font-semibold text-gray-800 mb-2 tracking-tight">
                  {item.label}
                </p>
                <p className="text-[15px] text-gray-500 leading-[1.75]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
