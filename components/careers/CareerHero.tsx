interface Props {
  eyebrow: string
  title: string
  subtitle: string
}

/**
 * CareerHero
 * ─────────────────────────────────────────────────────────────
 * Listing page hero. Institutional, calm, intelligent.
 * Not employer branding. Not HR landing page.
 * Variant of services hero pacing — commanding but not aggressive.
 */
export default function CareerHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="pt-28 pb-20 border-b border-gray-100">
      <div className="container-base">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-10">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-[38rem] mb-10">
          {title}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-[28rem]">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
