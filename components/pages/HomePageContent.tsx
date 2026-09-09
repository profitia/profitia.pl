import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'
import { FeaturedArticles } from '@/components/sections/insights'
import HomePillars from '@/components/home/HomePillars'
import InteractiveTestimonials from '@/components/home/InteractiveTestimonials'
import { RevealWrapper } from '@/components/ui'
import MobileHeroImage from '@/components/ui/MobileHeroImage'

export default function HomePageContent({ dict }: { dict: Dictionary }) {
  const d = dict.homepage
  const heroTitleParts = d.hero.h1.split('. ')
  const heroTitleLead = heroTitleParts[0]
  const heroTitleTail = heroTitleParts.slice(1).join('. ')
  const eyebrowTone = 'text-[rgba(0,109,158,0.8)]'
  const eyebrowToneOnDark = 'text-[rgba(199,237,251,0.82)]'
  const separatorBorder = 'border-[rgba(149,166,199,0.35)]'
  const separatorFill = 'bg-[rgba(149,166,199,0.35)]'
  const cipsBrochureHref = '/cips/Brochure_CIPS_FUTURES_EUROPE_CONFERENCE_AND_AWARDS.pdf'
  const cipsRegisterHref = 'https://events.cips.org/CIPSFuturesEuropeConferenceAwards2026?lang=en#/buyTickets/selectTickets?lang=en'

  return (
    <>
      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">
        <div className="container-base relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
          <div className="lg:max-w-[52%] lg:pr-16">
            <RevealWrapper delay={0}>
              <div className="space-y-8 md:space-y-5 2xl:space-y-8">
                <h1 className="font-semibold text-gray-900 tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem]">
                  <span className="block break-words">
                    {heroTitleLead}.
                  </span>
                  {heroTitleTail ? (
                    <span className="mt-3 block break-words leading-[1.02] sm:mt-3 md:mt-2 2xl:mt-3.5">
                      {heroTitleTail}
                    </span>
                  ) : null}
                </h1>
                <div className="space-y-5 md:space-y-3.5 2xl:space-y-5">
                  <p className="text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-gray-600 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed">
                    {d.hero.sub1a}<br />
                    {d.hero.sub1b}
                  </p>
                  <p className="text-gray-500 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed">
                    {d.hero.sub2}
                  </p>
                </div>
              </div>
            </RevealWrapper>

            <div className="py-10 md:py-5 2xl:py-10">
              <div className="border-t border-gray-200" />
            </div>

            <RevealWrapper delay={2}>
              <div className="space-y-6 md:space-y-3.5 2xl:space-y-6 pb-10 md:pb-4 2xl:pb-10">
                <h2 className="text-2xl md:text-[1.22rem] lg:text-[1.3rem] 2xl:text-[1.75rem] font-semibold tracking-tight text-gray-900 leading-tight">
                  {d.hero.reportHeading}
                </h2>
                <p className="text-gray-600 leading-relaxed md:text-[0.94rem] lg:text-[0.98rem] md:leading-[1.55] 2xl:text-base 2xl:leading-relaxed">
                  {d.hero.reportBody}
                </p>
                <Link
                  href="/docs/wdrozenie-ai-w-zakupach.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center self-start bg-gray-900 text-white rounded-xl px-6 py-3.5 font-medium text-sm hover:bg-brand-blue transition-colors duration-200"
                >
                  {d.hero.reportCta}
                </Link>
              </div>
            </RevealWrapper>
          </div>
        </div>

        <RevealWrapper delay={1} className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]" aria-hidden="true">
          <Image
            src="/images/website/Profitia_26.jpg"
            alt={d.hero.imgAlt}
            fill
            className="object-cover object-center"
            sizes="48vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
        </RevealWrapper>

        <MobileHeroImage
          src="/images/website/Profitia_26.jpg"
          alt={d.hero.imgAlt}
          priority
          overlayClassName="bg-gradient-to-l from-black/40 to-transparent"
        />
      </section>

      {/* ════════════════════════════════════
          CIPS FUTURES EUROPE
          ════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] xl:gap-12">
            <RevealWrapper delay={0} className="min-w-0">
              <div className="space-y-6 lg:space-y-7 max-w-[44rem]">
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400">
                    {d.cips.eyebrow}
                  </p>
                  <h2 className="text-[2rem] md:text-[2.2rem] lg:text-[2.25rem] font-semibold tracking-tight leading-[1.03] text-[#242F44] whitespace-pre-line max-w-[12ch]">
                    {d.cips.h2}
                  </h2>
                </div>

                <div className="space-y-2 border-l border-gray-200 pl-5">
                  <p className="text-[0.98rem] md:text-[1.02rem] font-medium text-gray-700 leading-relaxed">
                    {d.cips.dateLine}
                  </p>
                  <p className="text-[0.98rem] md:text-[1.02rem] text-gray-600 leading-relaxed">
                    {d.cips.venueLine}
                  </p>
                </div>

                <div className="space-y-5 pt-1">
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(0,109,158,0.8)]">
                      {d.cips.conferenceLabel}
                    </p>
                    <p className="text-gray-600 leading-relaxed md:text-[0.97rem] lg:text-base">
                      {d.cips.conferenceBody}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(0,109,158,0.8)]">
                      {d.cips.awardsLabel}
                    </p>
                    <p className="text-gray-600 leading-relaxed md:text-[0.97rem] lg:text-base">
                      {d.cips.awardsBody}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-end gap-3 pt-2">
                  <span className="text-[3.5rem] md:text-[3.85rem] leading-none font-semibold tracking-[-0.06em] text-[#242F44]">
                    {d.cips.speakersCount}
                  </span>
                  <span className="pb-2 text-sm md:text-[0.95rem] font-medium uppercase tracking-[0.18em] text-gray-500">
                    {d.cips.speakersLabel}
                  </span>
                </div>

                <p className="text-sm md:text-[0.95rem] lg:text-[1rem] leading-relaxed text-gray-600 max-w-[42ch]">
                  {d.cips.topics}
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                  <Link
                    href={cipsBrochureHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-brand-blue px-6 py-3.5 text-sm font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
                  >
                    {d.cips.brochureButton}
                  </Link>
                  <Link
                    href={cipsRegisterHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
                  >
                    {d.cips.registerButton}
                  </Link>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={1} className="min-w-0">
              <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] min-h-[300px] sm:min-h-[420px] lg:min-h-[600px]">
                <Image
                  src="/cips/cips-futures-europe-2026.webp"
                  alt={d.cips.conferenceImageAlt}
                  fill
                  className="object-contain p-4 md:p-6"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROBLEM
          ════════════════════════════════════ */}
      <section id="bzze51" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p className={`text-xs font-medium tracking-[0.25em] uppercase mb-5 ${eyebrowTone}`}>{d.problem.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight text-gray-900">
              {d.problem.h2}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="space-y-10">
              {d.problem.items.slice(0, 4).map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="font-medium text-lg text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              {d.problem.items.slice(4).map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="font-medium text-lg text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 max-w-3xl border-l-4 border-gray-900 pl-6">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              {d.problem.quote}
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          INSIGHT
          ════════════════════════════════════ */}
      <section id="3hhwq4" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <p className={`text-xs font-medium tracking-[0.25em] uppercase mb-5 ${eyebrowTone}`}>{d.insight.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 leading-tight text-gray-900">
            {d.insight.h2}
          </h2>

          <div className="relative">
            <div className={`absolute left-4 top-0 bottom-0 w-px ${separatorFill}`} />
            {d.insight.items.map((item) => (
              <div key={item.n} className="relative pl-12 mb-12">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                  {item.n}
                </div>
                <p className="text-lg font-medium text-gray-900">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              {d.insight.callout1}<br />
              {d.insight.callout2}
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          PILLARS
          ════════════════════════════════════ */}
      <HomePillars items={d.pillars.items} seeMore={d.pillars.seeMore} />

      {/* ════════════════════════════════════
          PROCESS
          ════════════════════════════════════ */}
      <section id="b5xg0q" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${eyebrowTone}`}>{d.process.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              {d.process.h2}
            </h2>
          </div>
          <div className={`divide-y ${separatorBorder}`}>
            {d.process.steps.map((step) => (
              <div key={step.n} className="grid md:grid-cols-[100px_1fr] gap-6 md:gap-10 py-10 group hover:bg-gray-50 rounded-xl px-4 -mx-4 transition-colors duration-200">
                <div className="text-5xl font-thin text-gray-100 group-hover:text-gray-200 transition-colors leading-none pt-1 select-none">{step.n}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-14 pt-10 border-t ${separatorBorder}`}>
            <p className="text-xl font-medium leading-relaxed">
              {d.process.footer1}{' '}
              <span className="text-gray-400">{d.process.footer2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          IMPACT
          ════════════════════════════════════ */}
      <section id="vqj89m" className="py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${eyebrowToneOnDark}`}>{d.impact.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              {d.impact.h2}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.impact.cards.map((card) => (
              <div key={card.title} className="border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-white/30 hover:bg-white/5">
                <div className="text-white/40 mb-4">&rarr;</div>
                <h4 className="text-lg font-medium text-white mb-2">{card.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          USE-CASES
          ════════════════════════════════════ */}
      <section id="p8800w" className="py-28 bg-[rgba(199,237,251,0.24)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${eyebrowTone}`}>{d.usecases.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              {d.usecases.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {d.usecases.items.map((uc) => (
              <div key={uc.n} className="group border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-[rgba(0,109,158,0.03)] hover:border-[rgba(0,109,158,0.18)] hover:shadow-lg">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 group-hover:text-brand-blue mb-5 transition-colors">{uc.n}</p>
                <h3 className="font-semibold text-xl text-gray-900 mb-4 transition-colors tracking-tight">{uc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed transition-colors">{uc.desc}</p>
              </div>
            ))}
          </div>
          <div className={`mt-12 pt-8 border-t ${separatorBorder}`}>
            <p className="text-gray-600">
              {d.usecases.footer}{' '}
              <Link href="#g6lvxh" className="text-brand-blue font-medium hover:text-brand-blue transition-colors duration-200">
                {d.usecases.footerLink}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          INSIGHTS / ARTICLES  [CANONICAL #8]
          ════════════════════════════════════ */}
      <FeaturedArticles
        copy={{
          eyebrow: d.insights.eyebrow,
          h2: d.insights.h2,
          body: d.insights.body,
        }}
        articles={d.insights.articles}
      />

      {/* ════════════════════════════════════
          PROOF
          ════════════════════════════════════ */}
      <section id="d31qlk" className="py-28 bg-[rgba(199,237,251,0.18)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${eyebrowTone}`}>{d.proof.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {d.proof.h2}
            </h2>
          </div>
          <div className={`grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-20 ${separatorFill}`}>
            {d.proof.stats.map((stat) => (
              <div key={stat.val} className="bg-white p-10 text-center">
                <p className="text-5xl font-semibold text-gray-900 mb-3">{stat.val}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-8 ${eyebrowTone}`}>
              {d.proof.sectorsLabel}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center p-4 bg-white rounded-xl h-14 shadow-sm">
                  <div className="w-16 h-5 bg-gray-200 rounded opacity-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CASES
          ════════════════════════════════════ */}
      <section id="io58to" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${eyebrowTone}`}>{d.cases.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {d.cases.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="relative w-full shadow-sm aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/website/Profitia_31.jpg"
                  alt={d.cases.imgAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-10 pt-4">
              {d.cases.blocks.map((item, idx) => (
                <div key={item.label} className={idx > 0 ? `border-t ${separatorBorder} pt-10` : ''}>
                  <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-3 ${eyebrowTone}`}>{item.label}</p>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIAL
          ════════════════════════════════════ */}
      <InteractiveTestimonials
        eyebrow={d.testimonial.eyebrow}
        items={d.testimonial.items}
      />

      {/* ════════════════════════════════════
          CTA
          ════════════════════════════════════ */}
      <section id="g6lvxh" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/56 mb-7">{d.cta.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            {d.cta.h2}
          </h2>
          <p className="text-white/72 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
            {d.cta.sub1}
          </p>
          <p className="text-white/58 text-sm mb-12">
            {d.cta.sub2a}<br />{d.cta.sub2b}
          </p>
          <a
            href="mailto:kontakt@profitia.pl"
            className="inline-block bg-white text-gray-900 rounded-xl px-8 py-4 font-medium text-base hover:bg-[rgba(255,255,255,0.92)] transition-colors duration-200"
          >
            {d.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
