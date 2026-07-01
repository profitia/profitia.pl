import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'
import { FeaturedArticles } from '@/components/sections/insights'
import HomePillars from '@/components/home/HomePillars'

export default function HomePageContent({ dict }: { dict: Dictionary }) {
  const d = dict.homepage

  return (
    <>
      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT: text */}
          <div className="h-auto md:h-[calc(100vh-80px)] px-6 md:px-12 py-16 md:py-0">
            <div className="flex h-full flex-col justify-center max-w-xl">
              <div className="flex flex-col justify-center md:flex-[3]">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">{d.hero.eyebrow}</p>
                <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-6">
                  {d.hero.h1}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mt-6">
                  {d.hero.sub1a}<br />
                  {d.hero.sub1b}
                </p>
                <p className="text-gray-500 leading-relaxed mt-4">
                  {d.hero.sub2}
                </p>
              </div>

              <div className="py-10 md:py-8">
                <div className="border-t border-gray-200" />
              </div>

              <div className="flex flex-col justify-center md:flex-[2]">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-gray-900 leading-tight">
                  {d.hero.reportHeading}
                </h2>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {d.hero.reportBody}
                </p>
                <button
                  type="button"
                  aria-disabled="true"
                  className="inline-flex items-center justify-center self-start mt-6 bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm"
                >
                  {d.hero.reportCta}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="relative w-full h-[60vh] md:h-[calc(100vh-80px)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80"
              alt={d.hero.imgAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          CIPS
          ════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="py-2 lg:py-6">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">{d.cips.eyebrow}</p>
              <div className="flex flex-wrap items-center gap-8 mb-8">
                <Image
                  src="/logo/profitia-default.svg"
                  alt="Profitia"
                  width={140}
                  height={38}
                  className="h-8 w-auto"
                />
                <Image
                  src="/logo/cips.png"
                  alt="CIPS"
                  width={129}
                  height={50}
                  className="h-9 w-auto"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl leading-tight text-gray-900">
                {d.cips.h2}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mt-6 max-w-3xl">
                {d.cips.body1}
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4 max-w-3xl">
                {d.cips.body2}
              </p>
            </div>

            <div className="relative overflow-hidden bg-[#242F44] text-white min-h-[520px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1400&q=80"
                alt={d.cips.conferenceImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(72,94,136,0.5)' }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 md:px-10 md:py-12 lg:px-12">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70 mb-5">
                    {d.cips.conferenceLabel}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.02] max-w-sm">
                    {d.cips.conferenceTitle}
                  </h3>
                  <p className="text-base text-white/85 leading-relaxed mt-6 max-w-md">
                    {d.cips.conferenceBody}
                  </p>
                </div>

                <div className="pt-12">
                  <p className="text-2xl md:text-[2rem] font-medium tracking-tight text-[#5fc2ff] leading-tight max-w-sm">
                    {d.cips.conferencePrompt}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed mt-3 max-w-sm">
                    {d.cips.conferencePromptBody}
                  </p>
                  <Link
                    href="/docs/26.11.26_Conference_CIPS_Profitia_EN.pdf"
                    className="inline-block mt-6 bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.cips.conferenceButton}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROBLEM
          ════════════════════════════════════ */}
      <section id="bzze51" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">{d.problem.eyebrow}</p>
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

          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">{d.insight.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 leading-tight text-gray-900">
            {d.insight.h2}
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">{d.process.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              {d.process.h2}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
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
          <div className="mt-14 pt-10 border-t border-gray-100">
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">{d.impact.eyebrow}</p>
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
      <section id="p8800w" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">{d.usecases.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-tight">
              {d.usecases.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {d.usecases.items.map((uc) => (
              <div key={uc.n} className="group border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:shadow-lg">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-500 mb-5 transition-colors">{uc.n}</p>
                <h3 className="font-semibold text-xl text-gray-900 group-hover:text-white mb-4 transition-colors tracking-tight">{uc.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{uc.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-600">
              {d.usecases.footer}{' '}
              <Link href="#g6lvxh" className="text-gray-900 font-medium hover:underline">
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
      <section id="d31qlk" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">{d.proof.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {d.proof.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-20">
            {d.proof.stats.map((stat) => (
              <div key={stat.val} className="bg-white p-10 text-center">
                <p className="text-5xl font-semibold text-gray-900 mb-3">{stat.val}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">{d.cases.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {d.cases.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="relative w-full rounded-2xl shadow-sm aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80"
                  alt={d.cases.imgAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-10 pt-4">
              {d.cases.blocks.map((item, idx) => (
                <div key={item.label} className={idx > 0 ? 'border-t border-gray-100 pt-10' : ''}>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">{item.label}</p>
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
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
            {d.testimonial.eyebrow}
          </p>
          <blockquote className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
            &ldquo;{d.testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900">{d.testimonial.author}</p>
            <p className="text-sm text-gray-500 mt-1">{d.testimonial.company}</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
          ════════════════════════════════════ */}
      <section id="g6lvxh" className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 mb-7">{d.cta.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-7 max-w-2xl mx-auto leading-tight">
            {d.cta.h2}
          </h2>
          <p className="text-gray-400 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
            {d.cta.sub1}
          </p>
          <p className="text-gray-600 text-sm mb-12">
            {d.cta.sub2a}<br />{d.cta.sub2b}
          </p>
          <a
            href="mailto:kontakt@profitia.pl"
            className="inline-block bg-white text-black rounded-xl px-8 py-4 font-medium text-base hover:bg-gray-100 transition-colors duration-200"
          >
            {d.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
