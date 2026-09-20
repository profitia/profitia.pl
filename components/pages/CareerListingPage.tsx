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
  CareerLife,
  CareerRecruiter,
} from '@/components/careers'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import { getPublicPath } from '@/lib/routing/public-routes'
import { ContentSplit } from '@/components/sections'

interface Props {
  locale: CareerLocale
}

const SEO = {
  pl: {
    title: 'Kariera | Profitia',
    description: 'Praca w Profitia - środowisko dla osób, które chcą pracować na realnych problemach zakupowych. Analityka, negocjacje, doradztwo.',
  },
  en: {
    title: 'Career | Profitia',
    description: 'Working at Profitia - a professional environment for people who want to work on real procurement problems. Analytics, negotiations, advisory.',
  },
} as const

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Praca w Profitia',
      title: 'Rozwijaj się na styku analityki, zakupów i realnych decyzji biznesowych.',
      subtitle: 'Pracujemy z organizacjami, które traktują zakupy jako funkcję strategiczną. Łączymy analitykę, negocjacje i doradztwo, pomagając klientom podejmować lepsze decyzje zakupowe.',
      cta1: 'Zobacz otwarte role',
      cta2: 'Jak wygląda rekrutacja',
    },
    values: {
      eyebrow: 'Dlaczego warto',
      title: 'Co zyskujesz pracując w Profitii?',
      items: [
        {
          label: 'Wpływ na realne decyzje biznesowe',
          body: 'Pracujemy nad realnymi kategoriami zakupowymi i wyzwaniami klientów, wpływając na rekomendacje, przebieg negocjacji oraz decyzje biznesowe.',
        },
        {
          label: 'Różnorodność kategorii zakupowych',
          body: 'Poznajemy wiele kategorii - od surowców i logistyki po usługi profesjonalne. Dzięki temu rozwijamy szerokie rozumienie zakupów jako strategicznej funkcji organizacji.',
        },
        {
          label: 'Uczestnictwo w negocjacjach',
          body: 'Przygotowujemy negocjacje i bezpośrednio wspieramy ich prowadzenie. Takie doświadczenie zdobywamy również na wcześniejszych etapach kariery.',
        },
        {
          label: 'Rozwijamy marki osobiste',
          body: 'Wizerunek Profitii tworzymy wspólnie. Dzielimy się wiedzą, publikujemy artykuły i posty, występujemy na konferencjach oraz rozwijamy kompetencje trenerskie i własne marki eksperckie.',
        },
        {
          label: 'Mentoring jako standard',
          body: 'Rozwijamy się poprzez regularne spotkania, plany rozwoju, macierz kompetencji i bieżący feedback. Mentoring jest stałą częścią naszej pracy.',
        },
        {
          label: 'Rozwój przez projekty',
          body: 'Budujemy kompetencje w realnej pracy projektowej. Każde zadanie przynosi inne pytania biznesowe, kontekst i zestaw zmiennych, dlatego stale uczymy się czegoś nowego.',
        },
      ],
    },
    award: {
      eyebrow: 'Friendly Workplace® 2026',
      title: 'Profitia z nagrodą Friendly Workplace® 2026',
      lead: 'People. Culture. Trust. Everyday cooperation.',
      paragraphs: [
        'Friendly Workplace® to wyróżnienie dla organizacji, które budują nowoczesne, przyjazne środowisko pracy, stawiają na rozwój ludzi, partnerskie relacje i realne wsparcie pracowników - czyli dokładnie te elementy, które nie powinny być tylko ładnym hasłem na stronie internetowej, ale codzienną praktyką.',
        'W PROFITII od lat wierzymy, że dobra firma doradcza to nie tylko jakość rekomendacji, mocne analizy i odpowiedzialność za efekt u Klienta. To także zespół, który chce ze sobą pracować, ufa sobie, rozwija się i potrafi realizować wymagające projekty bez tracenia tego, co najważniejsze - dobrej energii i wzajemnego szacunku.',
        'Bo consulting to oczywiście projekty, liczby, negocjacje, transformacje i konkretne efekty. Ale za tym wszystkim stoją ludzie - ich kompetencje, charakter, zaangażowanie i codzienne mikrodecyzje, które budują kulturę firmy dużo bardziej niż jakikolwiek dokument HR-owy.',
      ],
      linkLabel: 'Więcej informacji',
      imageAlt: 'Zespół Profitia z nagrodą Friendly Workplace 2026',
    },
    life: {
      eyebrow: 'Na co dzień',
      title: 'Dobrze pracuje się tam, gdzie dobrze jest być',
      introduction: 'Łączymy wymagającą pracę projektową z atmosferą opartą na współpracy, zaufaniu i wzajemnym wsparciu. Dbamy o warunki, w których możemy rozwijać się zawodowo, dzielić wiedzą i po prostu dobrze funkcjonować jako zespół.',
      imageAlt: 'Zespół Profitia podczas wspólnego spotkania',
      items: [
        { title: 'Biuro przy metrze', description: 'Pracujemy w Villa Metro przy ul. Puławskiej 145 w Warszawie - kilka kroków od stacji Metro Wilanowska.' },
        { title: 'Praca hybrydowa', description: 'Łączymy pracę w biurze, zdalnie i u klientów. Model dopasowujemy do fazy projektu i potrzeb zespołu.' },
        { title: 'Benefity', description: 'Oferujemy rozwiązania wspierające zdrowie, aktywność i codzienny komfort pracy. Szczegóły przedstawiamy podczas rozmowy rekrutacyjnej.' },
        { title: 'Zgrany zespół', description: 'Pracujemy blisko siebie, dzielimy się wiedzą i pomagamy sobie w rozwiązywaniu problemów projektowych.' },
        { title: 'Integracje', description: 'Spotykamy się także poza projektami - podczas wspólnych śniadań, wyjazdów, wydarzeń branżowych i zespołowych inicjatyw.' },
        { title: 'Program poleceń', description: 'Doceniamy osoby, które pomagają nam budować zespół i polecają kandydatów pasujących do kultury oraz sposobu pracy Profitii.' },
      ],
    },
    workStyle: {
      eyebrow: 'Metodyka',
      title: 'Jak pracujemy',
      steps: [
        {
          phase: 'Diagnoza',
          title: 'Zrozumienie problemu',
          description: 'Zaczynamy od zrozumienia struktury wydatków klienta, priorytetów biznesowych i realnych możliwości poprawy. Analiza zakupowa zaczyna się od pytań, nie od arkuszy.',
          learning: 'Jak czytać organizację przez dane zakupowe. Jak definiować zakres projektu i hipotezy.',
        },
        {
          phase: 'Analiza',
          title: 'Modele i benchmarki',
          description: 'Budujemy modele kosztowe, should-cost analysis i benchmarki rynkowe. Tworząc rzeczywistą podstawę do decyzji - nie intuicję.',
          learning: 'Metodyki wyceny kosztów. Analiza rynkowa i struktury cen. Praca z danymi na poziomie klienta.',
        },
        {
          phase: 'Rekomendacja',
          title: 'Rekomendacje i rozwiązania',
          description: 'Tu powstaje konkretna wartość projektu. Na podstawie danych i analizy projektujemy rozwiązania szyte pod specyfikę klienta - budujemy koncepcje zmian, definiujemy priorytety wdrożeniowe i tworzymy rekomendacje gotowe do decyzji zarządu.',
          learning: 'Projektowanie i komunikacja rozwiązań dla zarządu. Definiowanie priorytetów i planu wdrożenia. Przekształcanie analizy w rekomendacje decyzyjne.',
        },
        {
          phase: 'Wdrożenie',
          title: 'Wdrożenie',
          description: 'Wspieramy klienta w pełnym cyklu wdrożenia - od negocjacji i postępowań zakupowych, przez nowe warunki handlowe, po zmiany procesowe i organizacyjne w funkcji zakupowej.',
          learning: 'Negocjacje i zarządzanie postępowaniami zakupowymi. Change management. Budowanie funkcji zakupowej od wewnątrz.',
        },
        {
          phase: 'Optymalizacja',
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
    recruiter: {
      eyebrow: 'Porozmawiajmy',
      title: 'Po drugiej stronie jest konkretna osoba',
      body: 'Masz pytanie o rolę, zespół albo proces rekrutacji? Napisz do Moniki. Możesz skontaktować się mailowo lub odezwać się bezpośrednio na LinkedIn - jeszcze zanim zdecydujesz się wysłać aplikację.',
      emailLabel: 'kariera@profitia.pl',
      linkedinLabel: 'Napisz do Moniki na LinkedIn',
    },
    cta: {
      invitation: 'Dołącz do zespołu, który łączy analitykę, negocjacje i doradztwo zakupowe. Pracuj przy projektach mających realny wpływ na decyzje i wyniki organizacji.',
      label: 'Aplikuj teraz',
      href: getPublicPath('career:apply', 'pl'),
    },
  },
  en: {
    hero: {
      eyebrow: 'Work at Profitia',
      title: 'Grow at the intersection of analytics, procurement, and real business decisions.',
      subtitle: 'We work with organisations that treat procurement as a strategic function. We combine analytics, negotiations and advisory services to help clients make better procurement decisions.',
      cta1: 'See open roles',
      cta2: 'How recruitment works',
    },
    values: {
      eyebrow: 'Why it matters',
      title: 'What we gain working at Profitia',
      items: [
        {
          label: 'Impact on real business decisions',
          body: 'We work on real procurement categories and client challenges, contributing directly to recommendations, negotiations and business decisions.',
        },
        {
          label: 'Variety of procurement categories',
          body: 'We work across categories ranging from raw materials and logistics to professional services, building a broad understanding of procurement as a strategic organisational function.',
        },
        {
          label: 'Participation in negotiations',
          body: 'We prepare negotiations and support them directly. Team members gain this experience from the earlier stages of their careers.',
        },
        {
          label: 'We build personal brands',
          body: 'Together, we shape how Profitia is seen. We share knowledge, publish articles and posts, speak at conferences, develop as trainers and build our individual expert profiles.',
        },
        {
          label: 'Mentoring as standard',
          body: 'We grow through regular conversations, development plans, a competency framework and ongoing feedback. Mentoring is a continuous part of how we work.',
        },
        {
          label: 'Growth through projects',
          body: 'We build our skills through real project work. Every assignment brings a different business question, context and set of variables, so we keep learning.',
        },
      ],
    },
    award: {
      eyebrow: 'Friendly Workplace® 2026',
      title: 'Profitia receives the Friendly Workplace® 2026 award',
      lead: 'People. Culture. Trust. Everyday cooperation.',
      paragraphs: [
        'Friendly Workplace® recognises organisations that create modern, welcoming workplaces, invest in people, build relationships based on partnership and provide genuine employee support - the very qualities that should be everyday practice rather than polished statements on a website.',
        'At Profitia, we have long believed that a strong consulting firm is defined not only by the quality of its recommendations, rigorous analysis and accountability for client outcomes. It also depends on a team whose members want to work together, trust one another, keep developing and deliver demanding projects without losing what matters most - positive energy and mutual respect.',
        'Consulting is, of course, about projects, numbers, negotiations, transformations and measurable outcomes. Behind all of them are people - their expertise, character, commitment and everyday decisions, which shape a company’s culture far more than any HR document ever could.',
      ],
      linkLabel: 'Find out more',
      imageAlt: 'The Profitia team receiving the Friendly Workplace 2026 award',
    },
    life: {
      eyebrow: 'Everyday life',
      title: 'A good place to work should also be a good place to be',
      introduction: 'We combine demanding project work with a culture built on collaboration, trust and mutual support. We create the conditions to grow professionally, share knowledge and work well together as a team.',
      imageAlt: 'The Profitia team during a team gathering',
      items: [
        { title: 'A well-connected office', description: 'We work at Villa Metro, 145 Puławska Street in Warsaw, just a few steps from Wilanowska metro station.' },
        { title: 'Hybrid work', description: 'We combine office work, remote work and time at client sites. The model follows the project phase and the needs of the team.' },
        { title: 'Benefits', description: 'We offer solutions that support health, activity and everyday comfort. We share the details during the recruitment conversation.' },
        { title: 'A close-knit team', description: 'We work closely, exchange knowledge and support one another in solving project challenges.' },
        { title: 'Time together', description: 'We also meet beyond projects - at team breakfasts, trips, industry events and team initiatives.' },
        { title: 'Referral programme', description: 'We appreciate people who help us grow the team and recommend candidates who fit Profitia’s culture and way of working.' },
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
          description: 'This is where the project delivers concrete value. Drawing on data and analysis, we design solutions tailored to each client - building concepts for change, defining implementation priorities and creating recommendations ready for board decision.',
          learning: 'Designing and communicating solutions to leadership. Setting priorities and implementation plans. Turning analysis into decision-ready recommendations.',
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
    recruiter: {
      eyebrow: 'Let’s talk',
      title: 'There is a real person on the other side',
      body: 'Have a question about a role, the team or our recruitment process? Contact Monika by email or message her directly on LinkedIn - even before you decide to submit an application.',
      emailLabel: 'kariera@profitia.pl',
      linkedinLabel: 'Message Monika on LinkedIn',
    },
    cta: {
      invitation: 'Join a team that combines analytics, negotiations and procurement advisory. Work on projects that have a real impact on organisational decisions and outcomes.',
      label: 'Apply now',
      href: getPublicPath('career:apply', 'en'),
    },
  },
}

/**
 * CareerListingPage
 * Premium consulting-aesthetic career listing.
 * Tone: editorial, institutional, strategic. Not HR marketing.
 *
 * Structure:
 *   Hero → Values → Roles → Work Style → Process → FAQ → CTA (dark)
 *
 * Server Component — child components handle 'use client' where needed.
 */
export default function CareerListingPage({ locale }: Props) {
  const c = COPY[locale]
  const jobs = getAllJobs()
  const seo = SEO[locale]

  return (
    <>
      <PublicJsonLd routeId="career:index" locale={locale} title={seo.title} description={seo.description} />
      <CareerHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        cta1={c.hero.cta1}
        cta2={c.hero.cta2}
      />

      <ContentSplit
        label={c.award.eyebrow}
        headline={c.award.title}
        body={(
          <div className="space-y-5 text-[16px] leading-[1.8] text-gray-600">
            <p className="font-semibold text-gray-900">{c.award.lead}</p>
            {c.award.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        )}
        cta={{
          label: c.award.linkLabel,
          href: 'https://markapracodawcy.pl/profitia-z-nagroda-friendly-workplace-2026/',
          target: '_blank',
        }}
        image={{
          src: '/images/website/Friendly Workspace Profitia.webp',
          alt: c.award.imageAlt,
        }}
        imagePosition="left"
        background="gray-50"
        imageLayout="stretch"
      />

      <CareerValues
        eyebrow={c.values.eyebrow}
        title={c.values.title}
        items={c.values.items}
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

      <CareerLife
        locale={locale}
        eyebrow={c.life.eyebrow}
        title={c.life.title}
        introduction={c.life.introduction}
        items={c.life.items}
        imageAlt={c.life.imageAlt}
      />

      <CareerWorkStyle
        eyebrow={c.workStyle.eyebrow}
        title={c.workStyle.title}
        steps={c.workStyle.steps}
      />

      <CareerProcess
        eyebrow={c.process.eyebrow}
        title={c.process.title}
        subtitle={c.process.subtitle}
        steps={c.process.steps}
      />

      <CareerRecruiter
        locale={locale}
        eyebrow={c.recruiter.eyebrow}
        title={c.recruiter.title}
        body={c.recruiter.body}
        emailLabel={c.recruiter.emailLabel}
        linkedinLabel={c.recruiter.linkedinLabel}
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
