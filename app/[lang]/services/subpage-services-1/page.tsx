import type { Metadata } from 'next'
import type { Locale } from '@/middleware'

import HeroSection from '@/components/services/subpage-services-1/HeroSection'
import OverviewSection from '@/components/services/subpage-services-1/OverviewSection'
import ExpectSection from '@/components/services/subpage-services-1/ExpectSection'
import FocusAreasSection from '@/components/services/subpage-services-1/FocusAreasSection'
import ImageContentSection from '@/components/services/subpage-services-1/ImageContentSection'
import TestimonialSection from '@/components/services/subpage-services-1/TestimonialSection'
import RelatedServicesSection from '@/components/services/subpage-services-1/RelatedServicesSection'
import CtaSection from '@/components/services/subpage-services-1/CtaSection'

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — zamień te wartości dla każdej kolejnej podstrony usługowej
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_CONTENT = {
  meta: {
    title: 'Doradztwo Zakupowe | Profitia',
    description:
      'Pomagamy firmom identyfikować potencjał oszczędnościowy, przygotowywać negocjacje i wdrażać rekomendacje zakupowe w praktyce.',
  },
  hero: {
    breadcrumb: 'Doradztwo Zakupowe',
    label: 'Usługa',
    headline: 'Zakupy, które realnie poprawiają wynik',
    subtitle:
      'Analizujemy Twoje kategorie zakupowe, identyfikujemy ukryty potencjał i pomagamy go zrealizować — od diagnozy po wdrożenie.',
    ctaPrimary: { label: 'Umów rozmowę', href: '/pl/contact' },
    ctaSecondary: { label: 'Zobacz podejście', href: '#overview' },
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
    imageAlt: 'Spotkanie strategiczne — doradztwo zakupowe',
  },
  overview: {
    label: 'Czym jest ta usługa',
    headline: 'Diagnoza, strategia i wdrożenie — w jednym projekcie',
    paragraphs: [
      'Większość firm zakupowych traci od 8 do 15% potencjalnych oszczędności, bo brakuje im zewnętrznego punktu odniesienia, danych rynkowych lub czasu na rzetelne przygotowanie do negocjacji.',
      'Wchodzimy jako zewnętrzny partner — z doświadczeniem, narzędziami i benchmarkami, których nie ma Twój zespół. Pracujemy na Twoich danych, ale z niezależną perspektywą.',
      'Efektem jest nie tylko raport, ale konkretne wyniki: lepsze warunki, szybsze decyzje i zespół, który wie jak postępować kolejnym razem.',
    ],
    stats: [
      { value: '+20%', label: 'średnia poprawa warunków zakupowych w pierwszym cyklu renegocjacji' },
      { value: '3–6 tyg.', label: 'czas od diagnozy do pierwszych konkretnych wyników' },
      { value: '100%', label: 'klientów wdraża co najmniej 2 rekomendacje w ciągu 3 miesięcy' },
    ],
  },
  expect: {
    label: 'Jak pracujemy',
    headline: 'Czego możesz oczekiwać',
    items: [
      {
        number: '01',
        headline: 'Diagnoza kategorii',
        description:
          'Analizujemy strukturę wydatków, dostawców i warunki umów. Identyfikujemy gdzie jest realna dźwignia.',
      },
      {
        number: '02',
        headline: 'Benchmarki rynkowe',
        description:
          'Porównujemy Twoje warunki z rynkiem. Dowiesz się, gdzie przepłacasz i o ile można poprawić warunki.',
      },
      {
        number: '03',
        headline: 'Strategia negocjacyjna',
        description:
          'Przygotowujemy pozycję negocjacyjną, argumentację i plan działania dopasowane do konkretnego dostawcy.',
      },
      {
        number: '04',
        headline: 'Wdrożenie i follow-up',
        description:
          'Towarzyszymy we wdrożeniu rekomendacji i weryfikujemy czy wypracowane warunki faktycznie funkcjonują.',
      },
    ],
  },
  focusAreas: {
    label: 'Obszary fokusowe',
    headline: 'Na czym koncentrujemy uwagę',
    items: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        headline: 'Analiza kategorii kosztowych',
        description: 'Mapowanie wydatków, identyfikacja kluczowych dostawców i potencjału oszczędnościowego.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        headline: 'Siła przetargowa wobec dostawców',
        description: 'Ocena pozycji negocjacyjnej i identyfikacja czynników zwiększających Twoją dźwignię.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        headline: 'Warunki umów i pricing',
        description: 'Analiza struktury cenowej, warunków płatności, rabatów i klauzul renegocjacyjnych.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
        headline: 'Plan wdrożeniowy',
        description: 'Priorytetyzacja działań z uwzględnieniem zasobów, harmonogramu i zależności operacyjnych.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        headline: 'Szybkie wygrane (quick wins)',
        description: 'Identyfikacja działań, które przynoszą efekt w ciągu 30–60 dni bez dużego wysiłku organizacyjnego.',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        headline: 'Zarządzanie ryzykiem dostawcy',
        description: 'Ocena koncentracji ryzyka i rekomendacje dywersyfikacji bazy dostawców.',
      },
    ],
  },
  imageContent1: {
    label: 'Jak wygląda projekt',
    headline: 'Pracujemy na Twoich danych. Nie na ogólnych rekomendacjach.',
    description:
      'Każdy projekt zaczynamy od analizy rzeczywistych danych zakupowych — faktur, umów, historii transakcji. Nie od prezentacji z benchmarkami dla innej branży.',
    bullets: [
      { text: 'Analiza historycznych danych transakcyjnych (12–24 miesiące)' },
      { text: 'Wywiady z kupcami i operacyjnymi interesariuszami' },
      { text: 'Mapowanie ryzyk i zależności w łańcuchu dostaw' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    imageAlt: 'Analiza danych zakupowych',
  },
  imageContent2: {
    label: 'Efekty',
    headline: 'Wyniki, które możesz pokazać zarządowi.',
    description:
      'Dostarczamy nie tylko rekomendacje, ale gotowe materiały do prezentacji — z danymi, uzasadnieniem i planem wdrożenia. Tak żeby decyzja była łatwa do podjęcia.',
    bullets: [
      { text: 'Prezentacja executive summary z kluczowymi liczbami' },
      { text: 'Roadmapa wdrożeniowa z priorytetami i właścicielami' },
      { text: 'Wsparcie w komunikacji z dostawcami' },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    imageAlt: 'Prezentacja wyników projektu',
  },
  testimonial: {
    quote:
      'W ciągu 6 tygodni zidentyfikowali oszczędności, które były tuż przed nami, ale nie mieliśmy czasu ani narzędzi, żeby je zobaczyć. Profesjonalne podejście i realne wyniki.',
    author: 'Marek Kowalski',
    role: 'Dyrektor Zakupów, firma z sektora FMCG',
    metric: '+18%',
    metricLabel: 'poprawa warunków w renegocjowanej kategorii',
  },
  relatedServices: {
    label: 'Inne usługi',
    headline: 'Odkryj więcej możliwości',
    services: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: 'Szkolenia zakupowe',
        description: 'Warsztaty negocjacyjne i szkolenia dla zespołów zakupowych oparte na realnych case studies.',
        href: '/pl/services',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
        title: 'SpendGuru — narzędzie analityczne',
        description: 'Platforma do analizy wydatków i monitorowania rynku w czasie rzeczywistym.',
        href: '/pl/services',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        title: 'Strategia sourcingowa',
        description: 'Budowanie długoterminowej strategii zakupowej dopasowanej do skali i modelu biznesowego.',
        href: '/pl/services',
      },
    ],
  },
  cta: {
    headline: 'Gotowy na lepsze wyniki zakupowe?',
    subtitle: 'Zacznijmy od jednej kategorii. Pokażemy potencjał zanim podejmiesz decyzję.',
    ctaPrimary: { label: 'Umów bezpłatną konsultację', href: '/pl/contact' },
    ctaSecondary: { label: 'Napisz do nas', href: 'mailto:kontakt@profitia.pl' },
    note: 'Bez zobowiązań. Odpowiadamy w ciągu 24 godzin.',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ lang: Locale }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_CONTENT.meta.title,
    description: PAGE_CONTENT.meta.description,
  }
}

export default async function SubpageServices1({ params }: Props) {
  const { lang } = await params
  const c = PAGE_CONTENT

  return (
    <>
      <HeroSection
        lang={lang}
        breadcrumb={c.hero.breadcrumb}
        label={c.hero.label}
        headline={c.hero.headline}
        subtitle={c.hero.subtitle}
        ctaPrimary={{ ...c.hero.ctaPrimary, href: `/${lang}/contact` }}
        ctaSecondary={c.hero.ctaSecondary}
        imageSrc={c.hero.imageSrc}
        imageAlt={c.hero.imageAlt}
      />

      <OverviewSection
        label={c.overview.label}
        headline={c.overview.headline}
        paragraphs={[...c.overview.paragraphs]}
        stats={[...c.overview.stats]}
      />

      <ExpectSection
        label={c.expect.label}
        headline={c.expect.headline}
        items={[...c.expect.items]}
      />

      <FocusAreasSection
        label={c.focusAreas.label}
        headline={c.focusAreas.headline}
        items={[...c.focusAreas.items]}
      />

      <ImageContentSection
        imageLeft={true}
        background="gray"
        label={c.imageContent1.label}
        headline={c.imageContent1.headline}
        description={c.imageContent1.description}
        bullets={[...c.imageContent1.bullets]}
        imageSrc={c.imageContent1.imageSrc}
        imageAlt={c.imageContent1.imageAlt}
      />

      <ImageContentSection
        imageLeft={false}
        background="white"
        label={c.imageContent2.label}
        headline={c.imageContent2.headline}
        description={c.imageContent2.description}
        bullets={[...c.imageContent2.bullets]}
        imageSrc={c.imageContent2.imageSrc}
        imageAlt={c.imageContent2.imageAlt}
      />

      <TestimonialSection
        quote={c.testimonial.quote}
        author={c.testimonial.author}
        role={c.testimonial.role}
        metric={c.testimonial.metric}
        metricLabel={c.testimonial.metricLabel}
      />

      <RelatedServicesSection
        lang={lang}
        label={c.relatedServices.label}
        headline={c.relatedServices.headline}
        services={[...c.relatedServices.services]}
      />

      <CtaSection
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaPrimary={{ ...c.cta.ctaPrimary, href: `/${lang}/contact` }}
        ctaSecondary={c.cta.ctaSecondary}
        note={c.cta.note}
      />
    </>
  )
}
