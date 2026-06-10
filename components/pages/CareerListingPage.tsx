import type { CareerLocale } from '@/lib/careers'
import { getAllJobs } from '@/lib/careers'
import {
  CareerHero,
  CareerValues,
  CareerWorkStyle,
  CareerRoles,
  CareerProcess,
  CareerFAQ,
  CareerCTA,
} from '@/components/careers'

interface Props {
  locale: CareerLocale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Praca w Profitia',
      title: 'Rozwijaj się na styku analityki, zakupów i realnych decyzji biznesowych.',
      subtitle: 'Pracujemy z organizacjami, które traktują zakupy jako funkcję strategiczną - i szukamy osób, które chcą mieć realny wpływ.',
      cta1: 'Zobacz otwarte role',
      cta2: 'Jak wygląda rekrutacja',
    },
    values: {
      eyebrow: 'Dlaczego warto',
      title: 'Co zyskujesz pracując w Profitia',
      items: [
        {
          label: 'Wpływ na realne decyzje biznesowe',
          body: 'Projekty dotyczą rzeczywistych kategorii zakupowych, realnych wyzwań klientów i decyzji z wymiernym wpływem na wyniki biznesowe. Praca daje poczucie sprawczości - na rekomendacje, na przebieg negocjacji, na decyzje zakupowe klientów.',
        },
        {
          label: 'Różnorodność kategorii zakupowych',
          body: 'W Profitia pracujesz z wieloma kategoriami - od surowców przez logistykę po usługi profesjonalne. Budujesz szerokie rozumienie zakupów jako strategicznej funkcji organizacji, nie tylko jednej kategorii.',
        },
        {
          label: 'Uczestnictwo w negocjacjach',
          body: 'Konsultanci uczestniczą w przygotowaniu i często bezpośrednim wsparciu negocjacji. To rzadka ekspozycja - szczególnie na wczesnym etapie kariery.',
        },
        {
          label: 'Dane na poziomie organizacji',
          body: 'Praca z danymi zakupowymi klientów daje wgląd w strukturę kosztów i decyzji, który jest niedostępny dla większości pracowników - nawet w organizacjach dysponujących własnymi systemami analitycznymi.',
        },
        {
          label: 'Mentoring jako standard',
          body: 'Mentoring to stały element pracy, nie jednorazowe zdarzenie. Regularne spotkania, plan rozwoju, macierz kompetencji i bieżący feedback - nie raz w roku przy ocenie rocznej.',
        },
        {
          label: 'Myślenie przez projekty',
          body: 'Kompetencje budujemy przez realną pracę projektową - każde zadanie to inne pytanie biznesowe, inny kontekst, inny zestaw zmiennych. Różnorodność problemów jest stałym elementem środowiska pracy.',
        },
      ],
    },
    workStyle: {
      eyebrow: 'Metodyka',
      title: 'Jak pracujemy',
      steps: [
        {
          phase: 'Diagnose',
          title: 'Zrozumienie problemu',
          description: 'Zaczynamy od zrozumienia struktury wydatków klienta, priorytetów biznesowych i realnych możliwości poprawy. Analiza zakupowa zaczyna się od pytań, nie od arkuszy.',
          learning: 'Jak czytać organizację przez dane zakupowe. Jak definiować zakres projektu i hipotezy.',
        },
        {
          phase: 'Analyze',
          title: 'Modele i benchmarki',
          description: 'Budujemy modele kosztowe, should-cost analysis i benchmarki rynkowe. Tworząc rzeczywistą podstawę do decyzji - nie intuicję.',
          learning: 'Metodyki wyceny kosztów. Analiza rynkowa i struktury cen. Praca z danymi na poziomie klienta.',
        },
        {
          phase: 'Recommend',
          title: 'Rekomendacje i rozwiązania',
          description: 'Tworzymy rekomendacje dopasowane do specyfiki klienta - projektujemy rozwiązania, budujemy koncepcje zmian i definiujemy priorytety wdrożeniowe. Każda rekomendacja jest szyta pod potrzeby konkretnej organizacji.',
          learning: 'Projektowanie rozwiązań zakupowych. Komunikacja rekomendacji dla zarządu. Dopasowanie koncepcji do możliwości organizacji.',
        },
        {
          phase: 'Implement',
          title: 'Wdrożenie',
          description: 'Wspieramy klienta w pełnym cyklu wdrożenia - od negocjacji i postępowań zakupowych, przez nowe warunki handlowe, po zmiany procesowe i organizacyjne w funkcji zakupowej.',
          learning: 'Negocjacje i zarządzanie postępowaniami zakupowymi. Change management. Budowanie funkcji zakupowej od wewnątrz.',
        },
        {
          phase: 'Optimize',
          title: 'Analiza efektów',
          description: 'Analizujemy osiągnięte wyniki, identyfikujemy kolejne obszary do poprawy i budujemy długoterminowe podejście klienta do kategorii.',
          learning: 'Pomiar efektów projektów zakupowych. Identyfikacja kolejnych okazji. Długofalowe myślenie o portfelu kategorii.',
        },
      ],
    },
    roles: {
      eyebrow: 'Aktywne rekrutacje',
      title: 'Aktualnie rekrutujemy',
      applyLabel: 'Aplikuj',
      expandLabel: 'Rozwiń',
      collapseLabel: 'Zwiń',
      responsibilitiesLabel: 'Zakres obowiązków',
      learningLabel: 'Czego się uczysz',
      requirementsLabel: 'Czego szukamy',
    },
    process: {
      eyebrow: 'Rekrutacja',
      title: 'Jak wygląda proces',
      subtitle: 'Cztery kroki. Pełna informacja zwrotna dla każdego kandydata. Bez zbędnego przedłużania.',
      steps: [
        {
          title: 'Formularz aplikacyjny',
          description: 'Wstępna ocena profilu i dopasowania do aktualnie prowadzonej rekrutacji. Formularz pozwala nam zapoznać się z Twoim doświadczeniem i motywacją przed pierwszą rozmową.',
          timing: '~5 dni na odpowiedź',
        },
        {
          title: 'Rozmowa wstępna',
          description: 'Krótka rozmowa wprowadzająca - poznajemy się, opowiadamy o roli i kontekście pracy.',
          timing: '~45 minut',
        },
        {
          title: 'Etap merytoryczny',
          description: 'Case study do samodzielnego przygotowania, a następnie rozmowa merytoryczna z prezentacją rozwiązania. Etap pozwala ocenić sposób myślenia, strukturyzowania problemu i komunikowania wniosków.',
          timing: '~3-5 dni na wykonanie case + ~60 minut spotkania',
        },
        {
          title: 'Decyzja',
          description: 'Informacja zwrotna dla każdego kandydata - niezależnie od wyniku.',
          timing: '~1-2 tygodnie',
        },
      ],
    },
    faq: {
      eyebrow: 'Pytania',
      title: 'Najczęstsze pytania',
      items: [
        {
          q: 'Czy potrzebuję doświadczenia w zakupach?',
          a: 'Nie zawsze. Szukamy myślenia analitycznego i ciekawości problemowej - doświadczenie zakupowe jest plusem, nie warunkiem koniecznym na każdą rolę.',
        },
        {
          q: 'Jak wygląda praca zdalna?',
          a: 'Model hybrydowy - pracujemy zarówno zdalnie, jak i u klientów. Szczegóły zależą od roli i projektu. Omawiamy indywidualnie.',
        },
        {
          q: 'Czy mogę aplikować bez CV?',
          a: 'Tak. Formularz aplikacyjny zastępuje CV. Pytamy o to, co jest dla nas ważne - nie prosimy o standardowy życiorys.',
        },
        {
          q: 'Jak długo trwa cały proces rekrutacji?',
          a: 'Zazwyczaj 3-6 tygodni od zgłoszenia do decyzji. Staramy się nie przedłużać bez potrzeby.',
        },
      ],
    },
    cta: {
      invitation: 'Chcesz pracować na realnych problemach i mieć wpływ na wyniki klientów? Zacznijmy rozmowę.',
      label: 'Aplikuj teraz',
      href: '/career/apply',
    },
  },
  en: {
    hero: {
      eyebrow: 'Work at Profitia',
      title: 'Grow at the intersection of analytics, procurement, and real business decisions.',
      subtitle: 'We work with organisations that treat procurement as a strategic function - and we look for people who want real impact.',
      cta1: 'See open roles',
      cta2: 'How recruitment works',
    },
    values: {
      eyebrow: 'Why it matters',
      title: 'What you gain working at Profitia',
      items: [
        {
          label: 'Impact on real business decisions',
          body: 'Projects concern real procurement categories, actual client challenges and decisions with measurable business impact. The work delivers a genuine sense of influence - on recommendations, on the course of negotiations, on client procurement decisions.',
        },
        {
          label: 'Variety of procurement categories',
          body: 'At Profitia you work across many categories - from raw materials through logistics to professional services. You build broad understanding of procurement as a strategic organisational function, not just a single category.',
        },
        {
          label: 'Participation in negotiations',
          body: 'Consultants participate in preparing and often directly supporting negotiations. Rare exposure - particularly at an early stage of a career.',
        },
        {
          label: 'Data at organisational depth',
          body: 'Working with client procurement data provides insight into cost structure and decision-making that is unavailable to most employees - even in organisations with their own analytics systems.',
        },
        {
          label: 'Mentoring as standard',
          body: 'Mentoring is a continuous part of the work, not a one-off event. Regular meetings, a development plan, a competency framework and ongoing feedback - not once a year in an annual review.',
        },
        {
          label: 'Thinking through projects',
          body: 'We build skills through real project work - each assignment is a different business question, a different context, a different set of variables. The variety of problems is a constant feature of the working environment.',
        },
      ],
    },
    workStyle: {
      eyebrow: 'Methodology',
      title: 'How we work',
      steps: [
        {
          phase: 'Diagnose',
          title: 'Understanding the problem',
          description: 'We start by understanding the client\'s spend structure, business priorities and realistic improvement opportunities. Procurement analysis starts with questions, not spreadsheets.',
          learning: 'How to read an organisation through procurement data. How to scope a project and define hypotheses.',
        },
        {
          phase: 'Analyze',
          title: 'Models and benchmarks',
          description: 'We build cost models, should-cost analyses and market benchmarks - creating a real basis for decisions, not intuition.',
          learning: 'Cost pricing methodologies. Market analysis and price structure. Working with client-level data.',
        },
        {
          phase: 'Recommend',
          title: 'Recommendations and solutions',
          description: 'We create recommendations tailored to each client - designing solutions, building concepts for change and defining implementation priorities. Every recommendation is shaped to the specific organisation.',
          learning: 'Designing procurement solutions. Communicating recommendations to boards. Matching concepts to organisational capacity.',
        },
        {
          phase: 'Implement',
          title: 'Implementation',
          description: 'We support clients through the full implementation cycle - from negotiations and procurement proceedings, through new commercial terms, to process and organisational changes in the procurement function.',
          learning: 'Negotiation and procurement process management. Change management. Building the procurement function from within.',
        },
        {
          phase: 'Optimize',
          title: 'Analysing outcomes',
          description: 'We analyse achieved results, identify further improvement areas and build the client\'s long-term approach to categories.',
          learning: 'Measuring procurement project outcomes. Identifying next opportunities. Long-term portfolio thinking.',
        },
      ],
    },
    roles: {
      eyebrow: 'Active recruitment',
      title: 'We are currently recruiting',
      applyLabel: 'Apply',
      expandLabel: 'Expand',
      collapseLabel: 'Collapse',
      responsibilitiesLabel: 'Responsibilities',
      learningLabel: 'What you learn',
      requirementsLabel: 'What we look for',
    },
    process: {
      eyebrow: 'Recruitment',
      title: 'How the process works',
      subtitle: 'Four steps. Full feedback for every candidate. No unnecessary delays.',
      steps: [
        {
          title: 'Application form',
          description: 'Initial profile screening and fit assessment against the active role. The form lets us understand your background and motivation before the first conversation.',
          timing: '~5 days to respond',
        },
        {
          title: 'Intro call',
          description: 'A short introductory conversation - we get to know each other and explain the role and working context.',
          timing: '~45 minutes',
        },
        {
          title: 'Substantive stage',
          description: 'A case study to prepare independently, followed by a substantive meeting with a presentation of your solution. The stage assesses how you think, structure a problem and communicate conclusions.',
          timing: '~3-5 days to complete the case + ~60-minute meeting',
        },
        {
          title: 'Decision',
          description: 'Feedback for every candidate - regardless of outcome.',
          timing: '~1-2 weeks',
        },
      ],
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions',
      items: [
        {
          q: 'Do I need procurement experience?',
          a: 'Not always. We look for analytical thinking and intellectual curiosity - procurement experience is a plus, not a requirement for every role.',
        },
        {
          q: 'How does remote work?',
          a: 'Hybrid model - we work both remotely and at client sites. Details depend on the role and project. We discuss individually.',
        },
        {
          q: 'Can I apply without a CV?',
          a: 'Yes. The application form replaces a CV. We ask about what matters to us - no standard résumé needed.',
        },
        {
          q: 'How long does the recruitment process take?',
          a: 'Usually 3-6 weeks from application to decision. We try not to extend it unnecessarily.',
        },
      ],
    },
    cta: {
      invitation: 'Want to work on real problems and have impact on client outcomes? Let\'s start the conversation.',
      label: 'Apply now',
      href: '/en/career/apply',
    },
  },
}

/**
 * CareerListingPage
 * Premium consulting-aesthetic career listing.
 * Tone: editorial, institutional, strategic. Not HR marketing.
 *
 * Structure:
 *   Hero (dark) → Values → Work Style → Roles → Process → FAQ → CTA (dark)
 *
 * Server Component — child components handle 'use client' where needed.
 */
export default function CareerListingPage({ locale }: Props) {
  const c = COPY[locale]
  const jobs = getAllJobs()

  return (
    <>
      <CareerHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        cta1={c.hero.cta1}
        cta2={c.hero.cta2}
      />

      <CareerValues
        eyebrow={c.values.eyebrow}
        title={c.values.title}
        items={c.values.items}
      />

      <CareerWorkStyle
        eyebrow={c.workStyle.eyebrow}
        title={c.workStyle.title}
        steps={c.workStyle.steps}
      />

      <CareerRoles
        eyebrow={c.roles.eyebrow}
        title={c.roles.title}
        jobs={jobs}
        locale={locale}
        applyLabel={c.roles.applyLabel}
        expandLabel={c.roles.expandLabel}
        collapseLabel={c.roles.collapseLabel}
        responsibilitiesLabel={c.roles.responsibilitiesLabel}
        learningLabel={c.roles.learningLabel}
        requirementsLabel={c.roles.requirementsLabel}
      />

      <CareerProcess
        eyebrow={c.process.eyebrow}
        title={c.process.title}
        subtitle={c.process.subtitle}
        steps={c.process.steps}
      />

      <CareerFAQ
        eyebrow={c.faq.eyebrow}
        title={c.faq.title}
        items={c.faq.items}
      />

      <CareerCTA
        locale={locale}
        invitation={c.cta.invitation}
        label={c.cta.label}
        href={c.cta.href}
      />
    </>
  )
}
