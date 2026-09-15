import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import { PremiumCard, RevealWrapper } from '@/components/ui'
import { getPublicPath } from '@/lib/routing/public-routes'
import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Diagnoza dojrzałości zakupów · SPOT',
      title: 'Zakupy mogą działać lepiej. SPOT pokaże, od czego zacząć',
      subtitle:
        'SPOT to kompleksowa diagnoza dojrzałości funkcji zakupowej. W ciągu 3–4 tygodni pokazujemy, gdzie występują najważniejsze luki, które obszary wymagają uwagi i od jakich działań warto rozpocząć usprawnienia.',
    },
    problem: {
      eyebrow: 'Punkt wyjścia',
      title: 'Wiesz, że coś wymaga poprawy, ale trudno wskazać przyczynę?',
      paragraphs: [
        'Sygnałem mogą być przedłużające się procesy, reaktywny charakter pracy zespołu, niewykorzystany potencjał dostawców lub brak wiarygodnej informacji zarządczej. Problemy są widoczne, ale ich źródła często pozostają niejasne.',
        'Czasami problem został już nazwany, lecz brakuje obiektywnej oceny jego skali, przyczyn oraz możliwych rozwiązań. Bez takiej diagnozy trudno wybrać właściwy punkt startu i uzasadnić priorytety przed zarządem lub biznesem.',
      ],
      signals: [
        'Przedłużające się procesy',
        'Reaktywna praca zespołu',
        'Niewykorzystany potencjał dostawców',
        'Brak wiarygodnej informacji zarządczej',
      ],
    },
    scope: {
      eyebrow: 'Zakres diagnozy',
      title: 'SPOT porządkuje sytuację i wskazuje priorytety',
      intro:
        'Łączymy analizę danych i dokumentów z wywiadami eksperckimi oraz oceną rzeczywistych przykładów biznesowych. Badamy ponad 80 aspektów funkcjonowania zakupów w czterech obszarach:',
      areas: [
        {
          title: 'Sourcing',
          description:
            'Zarządzanie kategoriami, baza dostawców, kontraktowanie, negocjacje i realizacja strategii zakupowych.',
        },
        {
          title: 'Procesy',
          description:
            'Planowanie i budżetowanie, wybór dostawców, zamówienia, płatności oraz powiązanie zakupów z celami firmy.',
        },
        {
          title: 'Organizacja',
          description:
            'Rola zakupów w firmie, odpowiedzialności, zakres zarządzanych wydatków i kompetencje zespołu.',
        },
        {
          title: 'Narzędzia',
          description:
            'Dane zakupowe, e-sourcing, onboarding dostawców, zarządzanie umowami i mierzenie wyników.',
        },
      ],
    },
    graphic: {
      eyebrow: 'Mapa metodyki',
      title: '80+ badanych aspektów → mapa dojrzałości w 4 obszarach → priorytety działań',
      input: '80+ badanych aspektów',
      center: 'Mapa dojrzałości',
      output: 'Priorytety działań',
      caption:
        'Schemat pokazuje przejście od analizy ponad 80 aspektów, przez uporządkowanie obserwacji w czterech obszarach, do listy priorytetów działań bez prezentowania przykładowych ocen.',
    },
    process: {
      eyebrow: 'Przebieg',
      title: 'Jak przebiega analiza?',
      steps: [
        {
          title: 'Zakres i dane wejściowe',
          description:
            'Ustalamy cele badania i zbieramy niezbędne dane, procedury oraz przykłady postępowań.',
        },
        {
          title: 'Wywiady i warsztaty',
          description:
            'Rozmawiamy z zespołem zakupowym i kluczowymi interesariuszami, aby poznać rzeczywisty przebieg procesów.',
        },
        {
          title: 'Analiza i benchmarking',
          description:
            'Oceniamy dojrzałość zakupów i porównujemy organizację z dobrymi praktykami rynkowymi oraz spółkami referencyjnymi.',
        },
        {
          title: 'Wyniki i priorytety',
          description:
            'Przedstawiamy luki, ich znaczenie oraz rekomendowaną kolejność dalszych działań.',
        },
      ],
    },
    results: {
      eyebrow: 'Rezultat',
      title: 'Co otrzymujesz?',
      items: [
        'Ocenę obecnej dojrzałości zakupów, przedstawioną liczbowo i opisowo.',
        'Raport luk względem dobrych praktyk rynkowych.',
        'Wskazanie obszarów o największym potencjale poprawy.',
        'Listę krótkoterminowych usprawnień wraz z oceną ich możliwych korzyści.',
        'Propozycję kierunku docelowego i plan kolejnych działań.',
      ],
      highlight:
        'Po zakończeniu SPOT wiadomo, na czym skoncentrować zasoby, które inicjatywy uruchomić najpierw i gdzie szukać efektów biznesowych.',
      boundary:
        'Zakres kończy się na diagnozie oraz rekomendacjach. Wdrożenie usprawnień stanowi kolejny, odrębnie uzgadniany etap.',
    },
    credibility: {
      eyebrow: 'Doświadczenie',
      title: 'Doświadczenie, na którym można oprzeć decyzję',
      description:
        'Profitia od ponad 15 lat pomaga organizacjom rozwijać funkcje zakupowe i poprawiać efektywność kosztową. Współpracujemy z 8 z 10 największych firm w Polsce i jesteśmy certyfikowanym partnerem CIPS.',
      proof: [
        { value: '15+', label: 'lat rozwoju funkcji zakupowych' },
        { value: '8 z 10', label: 'największych firm w Polsce współpracuje z Profitią' },
        { value: 'CIPS', label: 'certyfikowany partner w Polsce' },
      ],
    },
    cta: {
      invitation: 'Zacznij od obiektywnej diagnozy sytuacji zakupowej.',
      label: 'Porozmawiajmy o SPOT',
      href: getPublicPath('contact', 'pl'),
    },
  },
  en: {
    hero: {
      eyebrow: 'Procurement maturity diagnosis · SPOT',
      title: 'Procurement can perform better. SPOT shows where to start',
      subtitle:
        'SPOT is a comprehensive assessment of procurement function maturity. Over 3–4 weeks, we show where the most important gaps sit, which areas need attention, and which actions should come first.',
    },
    problem: {
      eyebrow: 'Starting point',
      title: 'You know something needs to improve, but it is hard to pinpoint why?',
      paragraphs: [
        'The signals may include prolonged processes, a reactive way of working, untapped supplier potential, or a lack of reliable management information. The issues are visible, but their root causes often remain unclear.',
        'Sometimes the problem has already been named, but there is still no objective assessment of its scale, causes, or possible remedies. Without that diagnosis, it is difficult to choose the right starting point and justify priorities to the board or the business.',
      ],
      signals: [
        'Prolonged processes',
        'A reactive way of working',
        'Untapped supplier potential',
        'Lack of reliable management information',
      ],
    },
    scope: {
      eyebrow: 'Assessment scope',
      title: 'SPOT structures the situation and sets priorities',
      intro:
        'We combine data and document analysis with expert interviews and a review of real business cases. We assess 80+ aspects of procurement performance across four areas:',
      areas: [
        {
          title: 'Sourcing',
          description:
            'Category management, supplier base, contracting, negotiations, and execution of procurement strategies.',
        },
        {
          title: 'Processes',
          description:
            'Planning and budgeting, supplier selection, purchase orders, payments, and the link between procurement and company objectives.',
        },
        {
          title: 'Organisation',
          description:
            'Procurement’s role in the business, responsibilities, spend coverage, and team capabilities.',
        },
        {
          title: 'Tools',
          description:
            'Procurement data, e-sourcing, supplier onboarding, contract management, and performance measurement.',
        },
      ],
    },
    graphic: {
      eyebrow: 'Method map',
      title: '80+ aspects assessed → maturity map across 4 areas → action priorities',
      input: '80+ aspects assessed',
      center: 'Maturity map',
      output: 'Action priorities',
      caption:
        'The scheme shows the progression from assessing more than 80 aspects, through organising observations into four areas, to a prioritised action agenda without displaying example scores.',
    },
    process: {
      eyebrow: 'Process',
      title: 'How does the assessment work?',
      steps: [
        {
          title: 'Scope and input data',
          description:
            'We define the objectives of the assessment and collect the required data, procedures, and examples of procurement cases.',
        },
        {
          title: 'Interviews and workshops',
          description:
            'We speak with the procurement team and key stakeholders to understand how processes actually work in practice.',
        },
        {
          title: 'Analysis and benchmarking',
          description:
            'We assess procurement maturity and compare the organisation against market best practices and peer organisations.',
        },
        {
          title: 'Findings and priorities',
          description:
            'We present the gaps, their significance, and the recommended sequence of next actions.',
        },
      ],
    },
    results: {
      eyebrow: 'Outcome',
      title: 'What do you receive?',
      items: [
        'An assessment of current procurement maturity, presented both numerically and descriptively.',
        'A gap report against market best practices.',
        'A clear indication of the areas with the greatest improvement potential.',
        'A list of short-term improvements together with an assessment of their likely benefits.',
        'A proposed target direction and a roadmap for the next actions.',
      ],
      highlight:
        'By the end of SPOT, it is clear where to focus resources, which initiatives to launch first, and where to look for business impact.',
      boundary:
        'The engagement ends with the diagnosis and recommendations. Implementation is agreed separately as a follow-on phase.',
    },
    credibility: {
      eyebrow: 'Experience',
      title: 'Experience you can rely on when making decisions',
      description:
        'For over 15 years, Profitia has helped organisations strengthen procurement functions and improve cost efficiency. We work with 8 out of 10 of the largest companies in Poland and are a certified CIPS partner.',
      proof: [
        { value: '15+', label: 'years of developing procurement functions' },
        { value: '8 out of 10', label: 'of the largest companies in Poland work with Profitia' },
        { value: 'CIPS', label: 'certified partner in Poland' },
      ],
    },
    cta: {
      invitation: 'Start with an objective assessment of your procurement function.',
      label: 'Let’s talk about SPOT',
      href: getPublicPath('contact', 'en'),
    },
  },
} as const

const AREAS = ['Sourcing', 'Procesy', 'Organizacja', 'Narzędzia'] as const
const AREAS_EN = ['Sourcing', 'Processes', 'Organisation', 'Tools'] as const

export default function SpotAnalysisPage({ locale }: Props) {
  const c = COPY[locale]
  const graphicAreas = locale === 'pl' ? AREAS : AREAS_EN

  return (
    <>
      <PublicJsonLd
        routeId="service:analiza-spot"
        locale={locale}
        title={locale === 'pl' ? 'Analiza dojrzałości zakupów SPOT | Profitia' : 'SPOT Procurement Maturity Assessment | Profitia'}
        description={locale === 'pl'
          ? 'Kompleksowa diagnoza dojrzałości funkcji zakupowej. Ponad 80 badanych aspektów, raport luk i priorytety działań w ciągu 3-4 tygodni.'
          : 'Comprehensive procurement maturity assessment. Over 80 assessed aspects, a gap report, and action priorities within 3-4 weeks.'}
      />
      <CapabilityHero
        locale={locale}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        variant="services"
        imageSrc="/images/website/Profitia_17.jpg"
        imageAlt={
          locale === 'pl'
            ? 'Konsultanci Profitia podczas spotkania roboczego'
            : 'Profitia consultants during a working session'
        }
      />

      <div className="container-base pb-20">
        <section className="border-t border-gray-100 pt-24 pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
            <RevealWrapper>
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                  {c.problem.eyebrow}
                </p>
                <h2 className="max-w-[14ch] text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
                  {c.problem.title}
                </h2>
                <div className="max-w-[43rem] space-y-5 text-[15px] leading-[1.75] text-[rgb(59,56,56)]">
                  {c.problem.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={1} className="h-full lg:pt-24">
              <ul className="flex flex-col gap-5 lg:h-full lg:justify-between" aria-label={c.problem.eyebrow}>
                {c.problem.signals.map((signal) => (
                  <li
                    key={signal}
                    className="flex items-start gap-4 text-base font-medium leading-relaxed text-[rgb(36,47,68)]"
                  >
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

        <section className="border-t border-gray-100 py-24">
          <RevealWrapper>
            <div className="max-w-[50rem] space-y-5">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                {c.scope.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
                {c.scope.title}
              </h2>
              <p className="text-[15px] leading-[1.75] text-[rgb(59,56,56)]">{c.scope.intro}</p>
            </div>
          </RevealWrapper>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {c.scope.areas.map((area, index) => (
              <PremiumCard
                key={area.title}
                title={area.title}
                description={area.description}
                delay={((index % 4) as 0 | 1 | 2 | 3)}
                className="h-full rounded-[24px] p-7"
              />
            ))}
          </div>
        </section>

        <section className="border-t border-gray-100 py-24">
          <RevealWrapper>
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                {c.graphic.eyebrow}
              </p>
              <h2 className="max-w-[28ch] text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
                {c.graphic.title}
              </h2>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={1} className="mt-12">
            <figure>
              <figcaption className="sr-only">{c.graphic.caption}</figcaption>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.1fr)_auto_minmax(0,0.8fr)] lg:items-center">
                <div className="rounded-[24px] border border-[rgba(0,109,158,0.16)] bg-white px-5 py-6 text-center shadow-[0_10px_30px_rgba(0,109,158,0.08)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(0,109,158)]">
                    {c.graphic.input}
                  </p>
                </div>

                <div className="flex justify-center text-[rgb(72,94,136)]" aria-hidden="true">
                  <svg viewBox="0 0 40 16" fill="none" className="h-4 w-10 rotate-90 transform lg:h-5 lg:w-12 lg:rotate-0">
                    <path d="M1 8h34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M28 2l8 6-8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="rounded-[28px] border border-[rgba(149,166,199,0.32)] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(72,94,136)]">
                    {c.graphic.center}
                  </p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={c.graphic.center}>
                    {graphicAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-2xl border border-[rgba(199,237,251,0.95)] bg-[rgba(199,237,251,0.32)] px-4 py-4 text-sm font-medium text-[rgb(36,47,68)]"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center text-[rgb(72,94,136)]" aria-hidden="true">
                  <svg viewBox="0 0 40 16" fill="none" className="h-4 w-10 rotate-90 transform lg:h-5 lg:w-12 lg:rotate-0">
                    <path d="M1 8h34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M28 2l8 6-8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="rounded-[24px] border border-[rgba(36,47,68,0.12)] bg-[rgb(36,47,68)] px-5 py-6 text-center text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(199,237,251,0.88)]">
                    {c.graphic.output}
                  </p>
                </div>
              </div>
            </figure>
          </RevealWrapper>
        </section>

        <section className="border-t border-gray-100 py-24">
          <RevealWrapper>
            <div className="max-w-[42rem] space-y-5">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                {c.process.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
                {c.process.title}
              </h2>
            </div>
          </RevealWrapper>

          <ol className="mt-12 grid gap-5 lg:grid-cols-4">
            {c.process.steps.map((step, index) => (
              <li key={step.title} className="list-none">
                <RevealWrapper delay={((index % 4) as 0 | 1 | 2 | 3)} className="h-full">
                  <div className="flex h-full flex-col rounded-[28px] border border-[rgba(149,166,199,0.28)] bg-white px-6 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(0,109,158)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-[rgb(36,47,68)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.75] text-[rgb(59,56,56)]">
                      {step.description}
                    </p>
                  </div>
                </RevealWrapper>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-10">
          <RevealWrapper>
            <div className="rounded-[36px] bg-[rgb(36,47,68)] px-6 py-14 text-white sm:px-8 lg:px-12 lg:py-16">
              <div className="max-w-[48rem] space-y-6">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[rgba(199,237,251,0.7)]">
                  {c.results.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {c.results.title}
                </h2>
              </div>

              <ul className="mt-10 space-y-4 text-[15px] leading-[1.75] text-[rgba(255,255,255,0.84)]">
                {c.results.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(0,146,217)]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 max-w-[44rem] rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-6 py-6">
                <p className="text-lg font-medium leading-relaxed text-white">{c.results.highlight}</p>
              </div>

              <p className="mt-8 max-w-[42rem] text-sm leading-[1.75] text-[rgba(255,255,255,0.68)]">
                {c.results.boundary}
              </p>
            </div>
          </RevealWrapper>
        </section>

        <section className="border-t border-gray-100 py-24">
          <RevealWrapper>
            <div className="max-w-[44rem] space-y-5">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                {c.credibility.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[rgb(36,47,68)] md:text-4xl">
                {c.credibility.title}
              </h2>
              <p className="text-[15px] leading-[1.75] text-[rgb(59,56,56)]">{c.credibility.description}</p>
            </div>
          </RevealWrapper>

          <div className="mt-12 grid gap-8 border-t border-[rgba(149,166,199,0.28)] pt-10 md:grid-cols-3">
            {c.credibility.proof.map((item, index) => (
              <RevealWrapper key={item.value} delay={((index % 3) as 0 | 1 | 2)}>
                <div className="space-y-3">
                  <p className="text-4xl font-semibold tracking-[-0.05em] text-[rgb(36,47,68)]">
                    {item.value}
                  </p>
                  <p className="max-w-[18rem] text-sm leading-[1.7] text-[rgb(59,56,56)]">
                    {item.label}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </section>

        <CapabilityCTA
          locale={locale}
          note={locale === 'pl' ? 'Następny krok' : 'Next step'}
          invitation={c.cta.invitation}
          label={c.cta.label}
          href={c.cta.href}
        />
      </div>
    </>
  )
}