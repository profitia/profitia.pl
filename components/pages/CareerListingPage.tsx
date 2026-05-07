import type { CareerLocale } from '@/lib/careers'
import { getAllJobs } from '@/lib/careers'
import {
  CareerHero,
  CareerPhilosophy,
  CareerRoles,
  CareerExposure,
  CareerCTA,
} from '@/components/careers'

interface Props {
  locale: CareerLocale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Środowisko pracy',
      title: 'Praca na realnych problemach zakupowych — bez uproszczeń.',
      subtitle: 'Analityka, negocjacje, transformacja. Praca z danymi i klientami, nie z prezentacjami o danych.',
    },
    philosophy: {
      eyebrow: 'Jak pracujemy',
      title: 'Sposób myślenia i pracy',
      items: [
        {
          label: 'Problemy, nie procesy',
          body: 'Zaczynamy od zrozumienia problemu biznesowego, a nie od wdrożenia procesu. Analiza zakupowa ma sens wtedy, gdy zmienia decyzje — nie wtedy, gdy wygląda schludnie w raporcie.',
        },
        {
          label: 'Dane jako argument, nie dekoracja',
          body: 'Każda rekomendacja musi być uzasadniona ilościowo lub rynkowo. Opinia bez podstawy analitycznej nie trafia do klienta. To standard, nie aspiracja.',
        },
        {
          label: 'Odpowiedzialność za wynik',
          body: 'Konsultanci Profitia mają bezpośredni kontakt z klientami i realnymi decyzjami zakupowymi. Nie ma buforowania od rzeczywistości — co oznacza też realny wpływ na wyniki.',
        },
        {
          label: 'Myślenie przez strukturę',
          body: 'Złożone sytuacje zakupowe wymagają ustrukturyzowanego podejścia. Preferujemy precyzyjne pytanie nad szybką odpowiedzią i wnioski z danych nad intuicję.',
        },
        {
          label: 'Uczenie się przez projekty',
          body: 'Kompetencje w Profitia buduje się przez pracę z realnymi klientami, nie przez szkolenia. Mentoring jest integralną częścią każdego projektu — nie opcją dostępną przy dobrej woli.',
        },
      ],
    },
    roles: {
      eyebrow: 'Otwarte role',
      title: 'Aktualne stanowiska',
    },
    exposure: {
      eyebrow: 'Dlaczego ludzie zostają',
      title: 'Ekspozycja, która ma znaczenie',
      items: [
        {
          label: 'Praca z realnymi decyzjami',
          body: 'Projekty dotyczą rzeczywistych kategorii zakupowych, prawdziwych negocjacji i aktualnych wyzwań klientów. Nie ma studium przypadku — jest przypadek.',
        },
        {
          label: 'Szerokość ekspozycji kategorii',
          body: 'W Profitia pracujesz z wieloma kategoriami — od surowców przez logistykę po usługi profesjonalne. Buduje to zrozumienie zakupów jako dyscypliny, nie tylko jednej kategorii.',
        },
        {
          label: 'Dostęp do negocjacji',
          body: 'Konsultanci uczestniczą w przygotowaniu i często bezpośrednim wsparciu negocjacji. To rzadka ekspozycja — szczególnie wcześnie w karierze.',
        },
        {
          label: 'Praca z danymi na poziomie organizacji',
          body: 'Dane zakupowe klientów dają wgląd w strukturę kosztów i decyzji na poziomie, który jest niedostępny w większości organizacji korporacyjnych.',
        },
        {
          label: 'Feedback jako standard',
          body: 'Po każdym projekcie — ustrukturyzowany feedback. Nie raz w roku przy ocenie rocznej.',
        },
      ],
    },
    cta: {
      invitation: 'Jeżeli interesuje Cię praca oparta na analizie, odpowiedzialności i realnym wpływie — porozmawiajmy.',
      label: 'Skontaktuj się',
      href: '/contact',
    },
  },
  en: {
    hero: {
      eyebrow: 'Professional environment',
      title: 'Working on real procurement problems — without simplification.',
      subtitle: 'Analytics, negotiations, transformation. Working with data and clients, not with presentations about data.',
    },
    philosophy: {
      eyebrow: 'How we work',
      title: 'Thinking and working style',
      items: [
        {
          label: 'Problems, not processes',
          body: 'We start from understanding the business problem, not from implementing a process. Procurement analysis has value when it changes decisions — not when it looks tidy in a report.',
        },
        {
          label: 'Data as argument, not decoration',
          body: 'Every recommendation must be grounded in quantitative or market evidence. An opinion without an analytical foundation does not reach the client. This is a standard, not an aspiration.',
        },
        {
          label: 'Ownership of outcomes',
          body: 'Profitia consultants have direct contact with clients and real procurement decisions. There is no buffer from reality — which also means real influence on results.',
        },
        {
          label: 'Thinking through structure',
          body: 'Complex procurement situations require a structured approach. We prefer a precise question over a quick answer and conclusions from data over intuition.',
        },
        {
          label: 'Learning through projects',
          body: 'Skills at Profitia are built through work with real clients, not through training programmes. Mentoring is an integral part of every project — not an option dependent on goodwill.',
        },
      ],
    },
    roles: {
      eyebrow: 'Open roles',
      title: 'Current positions',
    },
    exposure: {
      eyebrow: 'Why people stay',
      title: 'Exposure that matters',
      items: [
        {
          label: 'Working with real decisions',
          body: 'Projects concern real procurement categories, actual negotiations and current client challenges. There is no case study — there is a case.',
        },
        {
          label: 'Category breadth',
          body: 'At Profitia you work across many categories — from raw materials through logistics to professional services. This builds understanding of procurement as a discipline, not just one category.',
        },
        {
          label: 'Access to negotiations',
          body: 'Consultants participate in preparing and often directly supporting negotiations. This is rare exposure — particularly early in a career.',
        },
        {
          label: 'Data at organisational depth',
          body: 'Client procurement data provides insight into cost structure and decision-making at a level unavailable in most corporate organisations.',
        },
        {
          label: 'Feedback as standard',
          body: 'After every project — structured feedback. Not once a year in an annual review.',
        },
      ],
    },
    cta: {
      invitation: 'If you are interested in work grounded in analysis, ownership and real impact — let\'s talk.',
      label: 'Get in touch',
      href: '/en/contact',
    },
  },
}

/**
 * CareerListingPage
 * ─────────────────────────────────────────────────────────────
 * Institutional career listing.
 * Not employer branding. Not HR landing page.
 * An honest account of a professional environment.
 *
 * Structure:
 *   Hero → Working Philosophy → Open Roles → Exposure → CTA
 *
 * Server Component.
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
      />

      <div className="container-base">

        <CareerPhilosophy
          eyebrow={c.philosophy.eyebrow}
          title={c.philosophy.title}
          items={c.philosophy.items}
        />

        <CareerRoles
          eyebrow={c.roles.eyebrow}
          title={c.roles.title}
          jobs={jobs}
          locale={locale}
        />

        <CareerExposure
          eyebrow={c.exposure.eyebrow}
          title={c.exposure.title}
          items={c.exposure.items}
        />

        <CareerCTA
          locale={locale}
          invitation={c.cta.invitation}
          label={c.cta.label}
          href={c.cta.href}
        />

      </div>
    </>
  )
}
