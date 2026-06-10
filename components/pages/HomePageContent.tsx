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
          <div className="flex flex-col justify-center h-auto md:h-[calc(100vh-80px)] px-6 md:px-12 py-16 md:py-0">
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
            <div className="mt-8">
              <Link
                href="/services"
                className="inline-block bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
              >
                {d.hero.cta}
              </Link>
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="relative w-full h-[60vh] md:h-[calc(100vh-80px)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
              alt={d.hero.imgAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 bg-white px-4 py-3 rounded-lg shadow-md">
              <div className="text-xs text-gray-500">{d.hero.statLabel}</div>
              <div className="text-xl font-semibold text-gray-900 mt-0.5">+20%</div>
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
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
