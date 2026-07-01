/**
 * AboutPage
 * ─────────────────────────────────────────────────────────────
 * Canonical About page for Profitia. PL + EN via locale prop.
 *
 * SECTIONS:
 *   1. Hero           - eyebrow, headline, subtitle
 *   2. Foundation     - stats column + prose (company origin, mission)
 *   3. Capabilities   - 4 numbered capability rows
 *   4. Philosophy     - 3 first-principles pillars + quote
 *   5. Leadership     - editorial team rows
 *   6. Credentials    - CIPS, trust, institutional authority
 *   7. Quiet CTA      - strategic conversation nudge, no sales pressure
 *
 * DESIGN CONSTRAINTS:
 *   - No shadows, no color, no gradients
 *   - container-base for all sections
 *   - border-t border-gray-100 between sections
 *   - Gray-500 minimum for all readable supporting text
 *   - Editorial restraint - institutional, not startup
 */

import Link from 'next/link'
import Image from 'next/image'
import { LeadershipSection } from '@/components/team/LeadershipSection'
import { FEATURED_TEAM } from '@/lib/team/data'

// ─── Copy ─────────────────────────────────────────────────────

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo zakupowe · Warszawa · od 2010',
      h1: 'Najlepsze negocjacje zaczynają się przed salą negocjacyjną.',
      subtitle:
        'Od ponad 15 lat pomagamy organizacjom budować silniejszą funkcję zakupową poprzez doradztwo, certyfikację CIPS i własną technologię. Pracujemy tam, gdzie decyzje zakupowe realnie wpływają na marżę, koszty i ryzyko operacyjne.',
    },
    foundation: {
      eyebrow: 'Fundament',
      h2: 'Polska firma. Międzynarodowe standardy.',
      p1: 'Profitia powstała w 2010 roku z misją podniesienia standardów zarządzania zakupami w Polsce. Zbudowana na bazie doświadczeń zdobytych w międzynarodowych firmach doradczych, z polskim kapitałem i głębokim zakotwiczeniem w lokalnych realiach.',
      p2: 'Pracujemy z 8 z 10 największych firm w Polsce - tam, gdzie decyzje zakupowe realnie wpływają na marżę, koszty operacyjne i ciągłość dostaw.',
      stats: [
        { value: '2010', label: 'rok założenia' },
        { value: '20+', label: 'lat doświadczenia' },
        { value: 'CIPS', label: 'Centre of Excellence' },
        { value: 'PL', label: 'polski kapitał' },
      ],
    },
    capabilities: {
      eyebrow: 'Kompetencje',
      h2: 'Co robimy.',
      items: [
        {
          num: '01',
          name: 'Doradztwo zakupowe',
          desc: 'Strategia zakupowa, optymalizacja procesów, zarządzanie kategoriami i budowanie kompetencji wewnętrznych. Pracujemy z firmami na poziomie strategicznym i operacyjnym - tam, gdzie decyzje zakupowe mają największy wpływ na wyniki.',
        },
        {
          num: '02',
          name: 'Przygotowanie do negocjacji',
          desc: 'Intelligence rynkowa, benchmarki kosztowe, mapowanie pozycji negocjacyjnej i przygotowanie strategii. Twoje negocjacje zaczynają się z przewagą informacyjną - nie z domysłami.',
        },
        {
          num: '03',
          name: 'Analityka zakupowa',
          desc: 'Analiza wydatków, identyfikacja potencjału oszczędności, analiza kategorii i rynków dostawców. Dane zakupowe zamieniane w konkretne rekomendacje decyzyjne.',
        },
        {
          num: '04',
          name: 'SpendGuru',
          desc: 'Platforma intelligence zakupowej do przygotowania do negocjacji. Automatyczna analiza wydatków, benchmarki rynkowe i rekomendacje kategorii - dla firm, które chcą negocjować systematycznie.',
        },
      ],
    },
    philosophy: {
      eyebrow: 'Podejście',
      h2: 'Jak myślimy o zakupach.',
      quote:
        'Dane bez kontekstu to tylko liczby. Kontekst bez danych to tylko intuicja. Łączymy jedno z drugim - i to jest nasza przewaga.',
      principles: [
        {
          name: 'Intelligence przed intuicją',
          desc: 'Każda rekomendacja i każda strategia negocjacyjna powinna opierać się na danych rynkowych, benchmarkach i wiedzy o dostawcach. Nie na przeczuciach.',
        },
        {
          name: 'Przewaga długoterminowa, nie jednorazowe oszczędności',
          desc: 'Celem nie jest jeden lepszy kontrakt. Celem jest systemowa dojrzałość zakupowa, która procentuje latami - w każdym przetargu, każdej kategorii, każdym rynku.',
        },
        {
          name: 'Przejrzysta metodologia',
          desc: 'Działamy transparentnie. Klient rozumie każdy krok, każde założenie i każde zalecenie. Bez czarnych skrzynek, bez ogólników.',
        },
      ],
    },
    leadership: {
      eyebrow: 'Zespół',
      h2: 'Partnerzy i eksperci.',
      description:
        'Nasz zespół tworzą praktycy zakupów, negocjacji i analizy kosztowej pracujący na co dzień z organizacjami z różnych branż.',
    },
    credentials: {
      eyebrow: 'Credentials',
      h2: 'Certyfikowane centrum kompetencji.',
      cipsDesc:
        'Profitia jest certyfikowanym partnerem CIPS (Chartered Institute of Procurement & Supply) w Polsce - uznanym Centre of Excellence. To najwyższy standard kwalifikacji w branży zakupowej, potwierdzony przez wiodącą globalną organizację.',
      points: [
        {
          label: 'CIPS Centre of Excellence',
          desc: 'Certyfikowany partner CIPS - wiodącej globalnej organizacji zakupowej z ponad 200 000 członków w 150 krajach.',
        },
        {
          label: 'Certyfikacja MCIPS',
          desc: 'Partnerzy Profitia posiadają certyfikaty MCIPS - najwyższy poziom profesjonalnej kwalifikacji zakupowej CIPS.',
        },
        {
          label: 'Publikacje i akademia',
          desc: 'Autorzy publikacji branżowych i akademickich. Wykładowcy programów MBA i szkół biznesu. Trenerzy największych firm w Polsce.',
        },
      ],
    },
    cta: {
      h2: 'Porozmawiajmy o zakupach.',
      subtitle:
        'Nie o demo, nie o ofercie handlowej. O Twoich kategoriach, Twoich dostawcach i tym, gdzie leży największy potencjał.',
      link: 'Napisz do nas',
      href: '/contact',
    },
  },
  en: {
    hero: {
      eyebrow: 'Procurement Advisory · Warsaw · Since 2010',
      h1: 'The best negotiations begin before you enter the room.',
      subtitle:
        'For over 15 years we have helped organisations build stronger procurement functions - through advisory, CIPS certification and proprietary technology. We work where procurement decisions directly shape margin, cost and operational risk.',
    },
    foundation: {
      eyebrow: 'Foundation',
      h2: 'Polish firm. International standards.',
      p1: 'Profitia was founded in 2010 with a mission to raise the standards of procurement management in Poland. Built on experience gained at international consulting firms, with Polish capital and a deep grounding in local market realities.',
      p2: 'We work with 8 of the top 10 companies in Poland - where procurement decisions directly shape margin, operating costs and supply continuity.',
      stats: [
        { value: '2010', label: 'founded' },
        { value: '20+', label: 'years experience' },
        { value: 'CIPS', label: 'Centre of Excellence' },
        { value: 'PL', label: 'Polish capital' },
      ],
    },
    capabilities: {
      eyebrow: 'Capabilities',
      h2: 'What we do.',
      items: [
        {
          num: '01',
          name: 'Procurement Advisory',
          desc: 'Procurement strategy, process optimisation, category management and internal competency building. We work with companies at both strategic and operational level - where procurement decisions have the greatest impact on results.',
        },
        {
          num: '02',
          name: 'Negotiation Preparation',
          desc: 'Market intelligence, cost benchmarks, negotiating position mapping and strategy development. Your negotiations begin with an information advantage - not assumptions.',
        },
        {
          num: '03',
          name: 'Spend Analytics',
          desc: 'Spend analysis, savings opportunity identification, category and supplier market analysis. Procurement data turned into concrete decision recommendations.',
        },
        {
          num: '04',
          name: 'SpendGuru',
          desc: 'Procurement intelligence platform for negotiation preparation. Automated spend analysis, market benchmarks and category recommendations - for companies that want to negotiate systematically.',
        },
      ],
    },
    philosophy: {
      eyebrow: 'Approach',
      h2: 'How we think about procurement.',
      quote:
        'Data without context is just numbers. Context without data is just intuition. We combine both - and that is our edge.',
      principles: [
        {
          name: 'Intelligence over intuition',
          desc: 'Every recommendation and every negotiation strategy should be grounded in market data, benchmarks and supplier knowledge. Not guesswork.',
        },
        {
          name: 'Long-term advantage, not one-off savings',
          desc: 'The goal isn\'t one better contract. It\'s systemic procurement maturity that compounds year over year - across every tender, category and market.',
        },
        {
          name: 'Transparent methodology',
          desc: 'We operate transparently. Clients understand every step, every assumption and every recommendation. No black boxes, no vague generics.',
        },
      ],
    },
    leadership: {
      eyebrow: 'Team',
      h2: 'Partners and experts.',
      description:
        'Our team consists of procurement, negotiation and cost analysis practitioners working with organisations across multiple industries.',
    },
    credentials: {
      eyebrow: 'Credentials',
      h2: 'A certified centre of excellence.',
      cipsDesc:
        'Profitia is a certified CIPS (Chartered Institute of Procurement & Supply) partner in Poland - a recognised Centre of Excellence. This is the highest standard of qualification in the procurement industry, confirmed by the world\'s leading procurement body.',
      points: [
        {
          label: 'CIPS Centre of Excellence',
          desc: 'Certified CIPS partner - the world\'s leading procurement body with over 200,000 members in 150 countries.',
        },
        {
          label: 'MCIPS Certification',
          desc: 'Profitia partners hold MCIPS certificates - the highest level of professional CIPS procurement qualification.',
        },
        {
          label: 'Publications and academy',
          desc: 'Authors of industry and academic publications. Faculty on MBA programmes and business schools. Trainers for Poland\'s largest companies.',
        },
      ],
    },
    cta: {
      h2: 'Let\'s talk about your procurement.',
      subtitle:
        'Not about a demo or a sales pitch. About your categories, your suppliers, and where the biggest opportunity lies.',
      link: 'Get in touch',
      href: '/en/contact',
    },
  },
} as const

// ─── Page Component ────────────────────────────────────────────

interface AboutPageProps {
  locale: 'pl' | 'en'
}

export function AboutPage({ locale }: AboutPageProps) {
  const t = COPY[locale]

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <div className="container-base pt-20 pb-20 lg:pt-40 lg:pb-32 border-b border-gray-100">
        <div className="max-w-[44rem]">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-8 lg:mb-12">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] font-semibold tracking-tight text-gray-900 leading-[1.06] lg:leading-[1.04] mb-8 lg:mb-10">
            {t.hero.h1}
          </h1>
          <p className="text-[1.125rem] md:text-xl text-gray-500 leading-[1.85] max-w-[46ch]">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      {/* ── 2. FOUNDATION ────────────────────────────────────────── */}
      <section className="container-base py-16 lg:py-20 border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
          {/* Stats column */}
          <div className="lg:pt-1">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-10">
              {t.foundation.eyebrow}
            </p>
            <div className="border-t border-gray-100 pt-8 grid grid-cols-2 gap-x-8 gap-y-8">
              {t.foundation.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[2.5rem] font-semibold tracking-tight text-gray-900 leading-none mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prose column */}
          <div>
            <h2 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-7">
              {t.foundation.h2}
            </h2>
            <p className="text-[15px] text-gray-500 leading-[1.82] mb-5">
              {t.foundation.p1}
            </p>
            <p className="text-[15px] text-gray-500 leading-[1.82]">
              {t.foundation.p2}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. CAPABILITIES ──────────────────────────────────────── */}
      <section className="container-base py-20 lg:py-28 border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
          {/* Left: heading */}
          <div className="lg:pt-1">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-5">
              {t.capabilities.eyebrow}
            </p>
            <h2 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.1]">
              {t.capabilities.h2}
            </h2>
          </div>

          {/* Right: numbered rows */}
          <div className="divide-y divide-gray-100">
            {t.capabilities.items.map((item) => (
              <div key={item.num} className="py-10 lg:py-12 first:pt-0 last:pb-0">
                <div className="flex gap-5 items-baseline mb-3">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-300 tabular-nums">
                    {item.num}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">
                    {item.name}
                  </h3>
                </div>
                <p className="pl-[2.25rem] text-[14.5px] text-gray-500 leading-[1.8]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PHILOSOPHY ────────────────────────────────────────── */}
      <section className="container-base py-20 sm:py-28 lg:py-36 border-b border-gray-100">
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-10">
          {t.philosophy.eyebrow}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20">
          {/* Left: heading + quote */}
          <div>
            <h2 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-10">
              {t.philosophy.h2}
            </h2>
            <figure className="border-l-2 border-gray-200 pl-6">
              <blockquote>
                <p className="text-[1.2rem] font-semibold tracking-tight text-gray-700 leading-[1.65]">
                  {t.philosophy.quote}
                </p>
              </blockquote>
            </figure>
          </div>

          {/* Right: 3 principles */}
          <div className="divide-y divide-gray-100">
            {t.philosophy.principles.map((p) => (
              <div key={p.name} className="py-8 lg:py-9 first:pt-0 last:pb-0">
                <h3 className="text-[13.5px] font-semibold text-gray-900 mb-2.5 leading-snug">
                  {p.name}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.8]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LEADERSHIP ────────────────────────────────────────── */}
      <section className="container-base py-24 lg:py-32 border-b border-gray-100">
        <div className="mb-16 lg:mb-20">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-5">
            {t.leadership.eyebrow}
          </p>
          <h2 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.1] max-w-lg">
            {t.leadership.h2}
          </h2>
          <p className="mt-4 text-[15px] text-gray-500 leading-[1.75] max-w-[56ch]">
            {t.leadership.description}
          </p>
        </div>

        <LeadershipSection members={FEATURED_TEAM} locale={locale} showAreas={false} />
      </section>

      {/* ── 6. CREDENTIALS ───────────────────────────────────────── */}
      <section className="container-base py-16 lg:py-24 border-b border-gray-100">
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-500 mb-10">
          {t.credentials.eyebrow}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
          {/* Left: CIPS logo + statement */}
          <div>
            <h2 className="text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-7">
              {t.credentials.h2}
            </h2>
            <p className="text-[14.5px] text-gray-500 leading-[1.82] mb-8">
              {t.credentials.cipsDesc}
            </p>
            <div className="mt-10 pt-8 border-t border-gray-100">
              <Image
                src="https://cipsdistancelearning.com/wp-content/uploads/2022/07/CIPS_Centre-Excellence_Logo_2022.png"
                alt="CIPS Centre of Excellence"
                width={120}
                height={48}
                className="opacity-50 grayscale h-12 w-auto"
                unoptimized
              />
            </div>
          </div>

          {/* Right: 3 credential points */}
          <div className="divide-y divide-gray-100">
            {t.credentials.points.map((point) => (
              <div key={point.label} className="py-8 lg:py-10 first:pt-0 last:pb-0">
                <h3 className="text-[13px] font-semibold text-gray-900 mb-2.5 tracking-tight">
                  {point.label}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.8]">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. QUIET CTA ─────────────────────────────────────────── */}
      <section className="container-base py-24 sm:py-32 lg:py-48">
        <div className="max-w-[42rem]">
          <h2 className="text-[2.25rem] md:text-[3rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-8">
            {t.cta.h2}
          </h2>
          <p className="text-[1.125rem] text-gray-500 leading-[1.82] max-w-[44ch] mb-14">
            {t.cta.subtitle}
          </p>
          <Link
            href={t.cta.href}
            className="
              inline-flex items-center gap-3
              text-[11px] font-semibold tracking-[0.18em] uppercase
              text-gray-400 hover:text-brand-blue
              transition-colors duration-200 ease-out
            "
          >
            {t.cta.link}
            <span aria-hidden="true" className="font-normal tracking-normal text-sm">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
