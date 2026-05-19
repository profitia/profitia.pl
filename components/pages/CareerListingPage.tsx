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
          label: 'Ekspozycja na realne decyzje',
          body: 'Projekty dotyczą rzeczywistych kategorii zakupowych, prawdziwych negocjacji i aktualnych wyzwań klientów. Nie ma studium przypadku - jest przypadek.',
        },
        {
          label: 'Szerokość kategorii',
          body: 'W Profitia pracujesz z wieloma kategoriami - od surowców przez logistykę po usługi profesjonalne. Buduje to zrozumienie zakupów jako dyscypliny, nie tylko jednej kategorii.',
        },
        {
          label: 'Dostęp do negocjacji',
          body: 'Konsultanci uczestniczą w przygotowaniu i często bezpośrednim wsparciu negocjacji. To rzadka ekspozycja - szczególnie wcześnie w karierze.',
        },
        {
          label: 'Dane na poziomie organizacji',
          body: 'Dane zakupowe klientów dają wgląd w strukturę kosztów i decyzji na poziomie niedostępnym w większości organizacji korporacyjnych.',
        },
        {
          label: 'Mentoring jako standard',
          body: 'Po każdym projekcie - ustrukturyzowany feedback. Nie raz w roku przy ocenie rocznej.',
        },
        {
          label: 'Myślenie przez projekty',
          body: 'Kompetencje buduje się tu przez realną pracę, nie przez szkolenia. Każdy projekt to inne pytanie i inny kontekst.',
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
          description: 'Budujemy modele kosztowe, should-cost analysis i benchmarki rynkowe. Tworząc rzeczywistą podstawę do negocjacji - nie intuicję.',
          learning: 'Metodyki wyceny kosztów. Analiza rynkowa i struktury cen. Praca z danymi na poziomie klienta.',
        },
        {
          phase: 'Negotiate',
          title: 'Strategia i argumentacja',
          description: 'Przygotowujemy strategię negocjacyjną, zestawy argumentów i scenariusze. Towarzyszymy klientowi w negocjacjach lub prowadzimy je wspólnie.',
          learning: 'Budowanie narracji negocjacyjnej. Zarządzanie scenariuszami. Psychologia procesu przetargowego.',
        },
        {
          phase: 'Implement',
          title: 'Wdrożenie rekomendacji',
          description: 'Wspieramy klienta w implementacji uzgodnionych zmian - od nowych warunków handlowych po zmiany procesowe w zakupach.',
          learning: 'Change management w środowisku zakupowym. Praca z wewnętrznymi interesariuszami klienta.',
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
      eyebrow: 'Otwarte role',
      title: 'Aktualne stanowiska',
      applyLabel: 'Aplikuj na tę rolę',
      expandLabel: 'Rozwiń',
      collapseLabel: 'Zwiń',
      responsibilitiesLabel: 'Zakres pracy',
      learningLabel: 'Czego się uczysz',
      requirementsLabel: 'Czego szukamy',
    },
    process: {
      eyebrow: 'Rekrutacja',
      title: 'Jak wygląda proces',
      subtitle: 'Pięć kroków. Pełna informacja zwrotna dla każdego kandydata. Bez zbędnego przedłużania.',
      steps: [
        {
          title: 'Formularz preselekcyjny',
          description: 'Krótki formularz zamiast CV. Pytamy o to, co naprawdę nas interesuje.',
          timing: '~5 dni na odpowiedź',
        },
        {
          title: 'Rozmowa wstępna',
          description: 'Krótka rozmowa wprowadzająca - poznajemy się, opowiadamy o roli i kontekście pracy.',
          timing: '~30 minut',
        },
        {
          title: 'Zadanie analityczne',
          description: 'Krótkie zadanie praktyczne. Robimy to, żeby zobaczyć jak myślisz - nie ile wiesz.',
          timing: '~3-5 dni na wykonanie',
        },
        {
          title: 'Spotkanie z zespołem',
          description: 'Głębsza rozmowa merytoryczna. Poznasz osoby, z którymi będziesz pracować.',
          timing: '~60 minut',
        },
        {
          title: 'Decyzja',
          description: 'Informacja zwrotna dla każdego kandydata - niezależnie od wyniku.',
          timing: '~3-5 dni',
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
          label: 'Exposure to real decisions',
          body: 'Projects concern real procurement categories, actual negotiations and current client challenges. There is no case study - there is a case.',
        },
        {
          label: 'Category breadth',
          body: 'At Profitia you work across many categories - from raw materials through logistics to professional services. This builds procurement understanding as a discipline.',
        },
        {
          label: 'Access to negotiations',
          body: 'Consultants participate in preparing and often directly supporting negotiations. Rare exposure - particularly early in a career.',
        },
        {
          label: 'Data at organisational depth',
          body: 'Client procurement data provides insight into cost structure and decision-making at a level unavailable in most corporate organisations.',
        },
        {
          label: 'Mentoring as standard',
          body: 'After every project - structured feedback. Not once a year in an annual review.',
        },
        {
          label: 'Thinking through projects',
          body: 'Skills are built through real work, not training programmes. Every project is a different question and a different context.',
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
          description: 'We build cost models, should-cost analyses and market benchmarks - creating a real basis for negotiation, not intuition.',
          learning: 'Cost pricing methodologies. Market analysis and price structure. Working with client-level data.',
        },
        {
          phase: 'Negotiate',
          title: 'Strategy and argumentation',
          description: 'We prepare negotiation strategies, argument sets and scenarios. We support or co-lead client negotiations.',
          learning: 'Building negotiation narratives. Managing scenarios. The psychology of tender processes.',
        },
        {
          phase: 'Implement',
          title: 'Implementing recommendations',
          description: 'We support clients in implementing agreed changes - from new commercial terms to process changes in procurement.',
          learning: 'Change management in procurement environments. Working with client internal stakeholders.',
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
      eyebrow: 'Open roles',
      title: 'Current positions',
      applyLabel: 'Apply for this role',
      expandLabel: 'Expand',
      collapseLabel: 'Collapse',
      responsibilitiesLabel: 'Scope of work',
      learningLabel: 'What you learn',
      requirementsLabel: 'What we look for',
    },
    process: {
      eyebrow: 'Recruitment',
      title: 'How the process works',
      subtitle: 'Five steps. Full feedback for every candidate. No unnecessary delays.',
      steps: [
        {
          title: 'Pre-screening form',
          description: 'A short form instead of a CV. We ask about what actually matters to us.',
          timing: '~5 days to respond',
        },
        {
          title: 'Intro call',
          description: 'A short introductory conversation - we get to know each other and explain the role and context.',
          timing: '~30 minutes',
        },
        {
          title: 'Analytical task',
          description: 'A short practical task. We do this to see how you think - not how much you know.',
          timing: '~3-5 days to complete',
        },
        {
          title: 'Team meeting',
          description: 'A deeper conversation. You will meet the people you would work with.',
          timing: '~60 minutes',
        },
        {
          title: 'Decision',
          description: 'Feedback for every candidate - regardless of outcome.',
          timing: '~3-5 days',
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
