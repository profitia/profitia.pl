import type { Metadata } from 'next'
import Link from 'next/link'
import { CTASection } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Lepsze zakupy. Lepsze negocjacje. Lepszy wynik.',
  description:
    'Profitia to firma doradcza specjalizująca się w optymalizacji zakupów i negocjacjach z dostawcami. Pomagamy firmom obniżać koszty i budować trwałą przewagę kosztową.',
}

// ─── Content data ──────────────────────────────────────────────────────────

const PILLARS = [
  {
    num: '01',
    label: 'Fundament',
    title: 'Diagnoza i analiza',
    description:
      'Analizujemy rzeczywiste dane zakupowe — faktury, umowy, historię transakcji. Identyfikujemy gdzie Twoja firma przepłaca i dlaczego. Mapujemy siłę przetargową wobec kluczowych dostawców.',
    outcome: 'Pełna mapa potencjału oszczędnościowego po 2 tygodniach',
  },
  {
    num: '02',
    label: 'Dźwignia',
    title: 'Strategia i przygotowanie',
    description:
      'Budujemy pozycję negocjacyjną opartą na danych rynkowych i benchmarkach. Przygotowujemy argumentację, BATNA i scenariusze. Nie wchodzimy na salę negocjacyjną bez pełnego przygotowania.',
    outcome: 'Gotowa strategia negocjacyjna dla każdej kluczowej kategorii',
  },
  {
    num: '03',
    label: 'Rezultat',
    title: 'Wdrożenie i wyniki',
    description:
      'Towarzyszymy we wdrożeniu — od rozmów z dostawcami po finalizację warunków umów. Weryfikujemy czy wypracowane warunki faktycznie funkcjonują i mierzą wyniki w czasie.',
    outcome: 'Średnio +18% poprawa warunków w pierwszym cyklu renegocjacji',
  },
]

const METRICS = [
  { value: '+18%', label: 'Średnia poprawa warunków zakupowych w pierwszym cyklu' },
  { value: '3–6 tyg.', label: 'Czas od diagnozy do pierwszych mierzalnych wyników' },
  { value: '100%', label: 'Klientów wdraża co najmniej 2 rekomendacje w 3 miesiące' },
  { value: '12–18%', label: 'Wartości zakupowej traconej rocznie przez nieprzygotowane firmy' },
]

const APPROACH_POINTS = [
  {
    title: 'Dane transakcyjne',
    desc: 'Analiza 12–24 miesięcy rzeczywistych danych zakupowych Twojej firmy',
  },
  {
    title: 'Benchmarki rynkowe',
    desc: 'Porównanie z realnymi warunkami rynkowymi — nie szacunkami z innej branży',
  },
  {
    title: 'Plan wdrożeniowy',
    desc: 'Priorytetyzacja działań z właścicielami, harmonogramem i mierzalnymi KPI',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO — cinematic asymmetric split
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] min-h-[calc(100vh-64px)]">

          {/* ── Left: content ── */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:pl-16 xl:pl-24 py-24 lg:py-20">

            {/* Label with accent line */}
            <div className="flex items-center gap-4 mb-10">
              <span className="block w-8 h-[1.5px] bg-[#242F44]" aria-hidden="true" />
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-gray-400">
                Negotiation Intelligence
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-[72px] font-semibold tracking-tight text-gray-900 leading-[1.01] mb-8 max-w-xl">
              Lepsze zakupy.<br />
              Lepsze negocjacje.<br />
              <span className="text-[#242F44]">Lepszy&nbsp;wynik.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-md">
              Pomagamy firmom obniżać koszty zakupów i budować trwałą przewagę
              w negocjacjach z dostawcami.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link href="/contact" className="btn-primary">
                Umów rozmowę
              </Link>
              <Link href="/services" className="btn-secondary">
                Nasze usługi
              </Link>
            </div>

            {/* Editorial metrics footer */}
            <div className="border-t border-gray-100 pt-8 flex flex-wrap items-center gap-8">
              <div>
                <div className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">+18%</div>
                <div className="text-xs text-gray-400 mt-1">średnia poprawa warunków</div>
              </div>
              <span className="block w-px h-8 bg-gray-200" aria-hidden="true" />
              <div>
                <div className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">3–6 tyg.</div>
                <div className="text-xs text-gray-400 mt-1">czas do pierwszych wyników</div>
              </div>
              <span className="block w-px h-8 bg-gray-200" aria-hidden="true" />
              <div>
                <div className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">100%</div>
                <div className="text-xs text-gray-400 mt-1">klientów wdraża rekomendacje</div>
              </div>
            </div>
          </div>

          {/* ── Right: dark editorial panel ── */}
          <div className="hidden lg:block relative bg-[#242F44] overflow-hidden">
            {/* Grid texture */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* Framework list */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-16">
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-white/25 mb-12">
                Framework
              </p>
              <div className="space-y-8">
                {['01 — Diagnoza i analiza', '02 — Strategia i przygotowanie', '03 — Wdrożenie i wyniki'].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-4" style={{ opacity: 1 - i * 0.2 }}>
                      <span className="block w-5 h-px bg-[#0092D9]" aria-hidden="true" />
                      <span className="text-sm font-medium text-white/60 tracking-wide">{item}</span>
                    </div>
                  )
                )}
              </div>

              {/* Decorative large stat */}
              <div className="mt-auto pt-16">
                <div className="text-[80px] font-semibold text-white/10 tracking-tighter leading-none select-none">
                  +18%
                </div>
                <p className="text-[11px] text-white/25 mt-2 tracking-widest uppercase">
                  średnia poprawa warunków
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. TENSION STATEMENT — tonal break, creates narrative drama
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 xl:py-24 bg-[#242F44]">
        <div className="container-base">
          <div className="max-w-4xl">
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#CAD2E3]/40 mb-8">
              Realia rynku
            </p>
            <p className="text-2xl md:text-3xl lg:text-[38px] font-medium text-white leading-[1.25] tracking-tight">
              Polska firma traci średnio{' '}
              <span className="text-[#0092D9]">12–18%</span>{' '}
              wartości zakupowej przez brak właściwego przygotowania
              do negocjacji z dostawcami.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="block w-6 h-px bg-[#0092D9]" aria-hidden="true" />
              <p className="text-gray-400 text-base leading-relaxed">
                To nie jest problem techniczny. To jest problem strategiczny —
                i rozwiązujemy go w 3–6 tygodni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. THREE PILLARS — editorial numbered composition
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 xl:py-36 bg-white">
        <div className="container-base">

          {/* Section header — asymmetric two-column intro */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-24 mb-20">
            <div className="max-w-lg">
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-gray-400 mb-5">
                Framework działania
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight">
                Trzy filary trwałej przewagi zakupowej
              </h2>
            </div>
            <div className="lg:max-w-sm lg:pb-1">
              <p className="text-gray-500 text-base leading-relaxed">
                Każdy projekt przebiega według sprawdzonego frameworku — od diagnozy
                po konkretne wyniki wdrożone w Twojej organizacji.
              </p>
            </div>
          </div>

          {/* Pillars — editorial horizontal rows */}
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="group grid grid-cols-1 lg:grid-cols-[80px_1fr_2fr] gap-0 border-t border-gray-200 py-12 hover:bg-gray-50/50 transition-colors duration-300 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
            >
              {/* Number — large decorative */}
              <div className="text-5xl font-semibold text-gray-100 group-hover:text-gray-200 transition-colors duration-300 tracking-tighter leading-none select-none mb-5 lg:mb-0">
                {pillar.num}
              </div>

              {/* Title + label */}
              <div className="lg:pr-10 mb-5 lg:mb-0">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#006D9E] mb-2">
                  {pillar.label}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight leading-snug">
                  {pillar.title}
                </h3>
              </div>

              {/* Description + outcome */}
              <div>
                <p className="text-base text-gray-600 leading-relaxed max-w-prose mb-5">
                  {pillar.description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="block w-4 h-px bg-[#242F44]" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-600">{pillar.outcome}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200" />

          {/* Link to services */}
          <div className="mt-12 flex justify-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-300 pb-px hover:border-gray-900 transition-colors duration-200"
            >
              Poznaj szczegóły każdego filaru
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. METRICS STRIP — data-confidence moment
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container-base">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-gray-200">
            {METRICS.map((m) => (
              <div key={m.value} className="lg:px-10 first:lg:pl-0 last:lg:pr-0">
                <div className="text-4xl font-semibold tracking-tight text-gray-900 leading-none mb-2">
                  {m.value}
                </div>
                <div className="text-sm text-gray-500 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. APPROACH — executive editorial split
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 xl:py-36 bg-white border-t border-gray-100">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 xl:gap-24 items-start">

            {/* Left column */}
            <div>
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-gray-400 mb-5">
                Nasze podejście
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-tight mb-8">
                Pracujemy na Twoich danych — nie na ogólnych rekomendacjach.
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-300 pb-px hover:border-gray-900 transition-colors duration-200"
              >
                Zobacz jak działamy
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right column — pull quote + approach points */}
            <div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light max-w-prose mb-12">
                &ldquo;Każdy projekt zaczynamy od analizy rzeczywistych danych zakupowych —
                faktur, umów, historii transakcji. Nie od prezentacji
                z benchmarkami dla innej branży.&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {APPROACH_POINTS.map((pt) => (
                  <div key={pt.title} className="border-l-2 border-[#242F44] pl-4">
                    <div className="text-sm font-semibold text-gray-900">{pt.title}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">{pt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CTA — closing moment
      ═══════════════════════════════════════════════════════════════════ */}
      <CTASection
        headline="Gotowy na lepsze wyniki zakupowe?"
        subtitle="Zacznijmy od jednej kategorii. Pokażemy potencjał zanim podejmiesz decyzję."
        ctaPrimary={{ label: 'Umów rozmowę', href: '/contact' }}
        ctaSecondary={{ label: 'Nasze usługi', href: '/services' }}
        note="Bez zobowiązań. Odpowiadamy w ciągu 24 godzin."
      />
    </>
  )
}

