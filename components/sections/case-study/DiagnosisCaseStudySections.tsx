import { PremiumCard, RevealWrapper } from '@/components/ui'

export type CaseStudyStartingPointContent = {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  signals: readonly string[]
}

export type CaseStudyScopeContent = {
  eyebrow: string
  title: string
  intro: string
  areas: ReadonlyArray<{
    title: string
    description: string
  }>
}

export type CaseStudyResultContent = {
  eyebrow: string
  title: string
  items: readonly string[]
  highlight?: string
  boundary?: string
}

export type DiagnosisCaseStudyContent = {
  startingPoint: CaseStudyStartingPointContent
  scope: CaseStudyScopeContent
  result: CaseStudyResultContent
}

export function CaseStudyStartingPoint({ content }: { content: CaseStudyStartingPointContent }) {
  return (
    <section className="border-t border-gray-100 pt-24 pb-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
        <RevealWrapper>
          <div className="space-y-6">
            <p className="editorial-label text-gray-400">{content.eyebrow}</p>
            <h2 className="max-w-[14ch] text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
              {content.title}
            </h2>
            <div className="max-w-[43rem] space-y-5 text-[15px] leading-[1.75] text-[rgb(59,56,56)]">
              {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={1} className="h-full lg:pt-24">
          <ul className="flex flex-col gap-5 lg:h-full lg:justify-between" aria-label={content.eyebrow}>
            {content.signals.map((signal) => (
              <li key={signal} className="flex items-start gap-4 text-base font-medium leading-relaxed text-[rgb(36,47,68)]">
                <span className="mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[rgba(0,109,158,0.14)]" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[rgb(0,109,158)]" />
                </span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}

export function CaseStudyScope({ content }: { content: CaseStudyScopeContent }) {
  return (
    <section className="border-t border-gray-100 py-24">
      <RevealWrapper>
        <div className="max-w-[50rem] space-y-5">
          <p className="editorial-label text-gray-400">{content.eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
            {content.title}
          </h2>
          <p className="text-[15px] leading-[1.75] text-[rgb(59,56,56)]">{content.intro}</p>
        </div>
      </RevealWrapper>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {content.areas.map((area, index) => (
          <PremiumCard
            key={area.title}
            title={area.title}
            description={area.description}
            delay={((index % 4) as 0 | 1 | 2 | 3)}
            interactive={false}
            className="h-full rounded-[24px] p-7"
          />
        ))}
      </div>
    </section>
  )
}

export function CaseStudyResult({ content }: { content: CaseStudyResultContent }) {
  return (
    <section className="py-10">
      <RevealWrapper>
        <div className="rounded-[36px] bg-[rgb(36,47,68)] px-6 py-14 text-white sm:px-8 lg:px-12 lg:py-16">
          <div className="max-w-[48rem] space-y-6">
            <p className="editorial-label text-[rgba(199,237,251,0.7)]">{content.eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.title}</h2>
          </div>

          <ul className="mt-10 space-y-4 text-[15px] leading-[1.75] text-[rgba(255,255,255,0.84)]">
            {content.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[9px] h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(0,146,217)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {content.highlight ? (
            <div className="mt-10 max-w-[44rem] rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-6 py-6">
              <p className="text-lg font-medium leading-relaxed text-white">{content.highlight}</p>
            </div>
          ) : null}

          {content.boundary ? (
            <p className="mt-8 max-w-[42rem] text-sm leading-[1.75] text-[rgba(255,255,255,0.68)]">
              {content.boundary}
            </p>
          ) : null}
        </div>
      </RevealWrapper>
    </section>
  )
}
