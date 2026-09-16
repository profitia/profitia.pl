import type { Locale } from '@/lib/capabilities'
import type { CatalogDomain } from './catalogTypes'

export type DigitalServicesPageContent = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  seo: {
    title: string
    description: string
  }
  domains: CatalogDomain[]
}

export type DigitalServiceId =
  | 'digital-consulting'
  | 'spend-analytics'
  | 'custom-applications'
  | 'ai-agents'

const DIGITAL_SERVICES_CATALOG: Record<Locale, Record<DigitalServiceId, DigitalServicesPageContent>> = {
  pl: {
    'digital-consulting': {
      hero: {
        eyebrow: 'Usługi Digital · Digital Consulting',
        title: 'Technologia zakupowa dopasowana do Twojej organizacji',
        subtitle: 'Oceniamy dojrzałość organizacji w zakresie automatyzacji procesów zakupowych, projektujemy docelowy stack technologiczny oraz wspieramy wybór dostawców, wdrożenie i zarządzanie zmianą.',
      },
      seo: {
        title: 'Digital Consulting | Profitia',
        description: 'Oceniamy dojrzałość cyfrową zakupów, projektujemy docelowy stack technologiczny i wspieramy wybór oraz wdrożenie narzędzi.',
      },
      domains: [
        {
          id: 'doradca-technologiczny',
          title: 'Doradca technologiczny',
          products: [
            {
              id: 'przeglad',
              title: 'Przegląd',
              description: [
                'Analiza wsparcia technologicznego procesów zakupowych',
                'Ocena poziomu automatyzacji',
                'Analiza wykorzystania funkcjonalności narzędzi',
                'Weryfikacja rozwiązań pod kątem specyfiki organizacji',
                'Ocena zgodności z najlepszymi praktykami',
              ],
            },
            {
              id: 'strategie',
              title: 'Strategie',
              description: [
                'Projekt docelowego stacku technologicznego',
                'Rekomendacje w zakresie rozbudowy, wymiany lub usunięcia wykorzystywanych narzędzi',
                'Dobór architektury do skali i dojrzałości organizacji',
                'Lista docelowych funkcjonalności zwiększających automatyzację',
                'Zdefiniowanie KPI',
                'Przygotowanie i przeprowadzenie analiz rynku',
              ],
            },
            {
              id: 'wdrozenie',
              title: 'Wdrożenie',
              description: [
                'Przeprowadzenie RFP na wybór dostawcy narzędzi',
                'Prowadzenie dialogów technicznych',
                'Monitoring prac wdrożeniowych i odpowiedzialność za harmonogram',
                'Przeprowadzanie testów narzędzi',
                'Zarządzanie zmianą w organizacji',
              ],
            },
          ],
        },
      ],
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Usługi Digital · Spend Analytics',
        title: 'Przejrzystość wydatków, która prowadzi do lepszych decyzji',
        subtitle: 'Porządkujemy dane zakupowe i tail spend, usprawniamy zarządzanie kluczowymi kategoriami oraz identyfikujemy realny potencjał oszczędności.',
      },
      seo: {
        title: 'Spend Analytics | Profitia',
        description: 'Porządkujemy dane zakupowe, budujemy dopasowany Spend Cube i identyfikujemy potencjał oszczędności w kluczowych kategoriach oraz tail spend.',
      },
      domains: [
        {
          id: 'spend-analytics',
          title: 'Spend Analytics',
          products: [
            {
              id: 'spend-cube',
              title: 'Spend Cube',
              description: [
                'Czyszczenie danych dotyczących pozycji zakupowych i bazy dostawców',
                'Opracowanie drzewa kategorii dopasowanego do profilu działalności',
                'Dostosowanie widoku Spend Cube i docelowych funkcjonalności',
                'Pełny obraz skali wydatków',
                'Integracja z wewnętrznymi źródłami danych i automatyczne odświeżanie Spend Cube',
              ],
            },
          ],
        },
      ],
    },
    'custom-applications': {
      hero: {
        eyebrow: 'Usługi Digital · Dedykowane aplikacje',
        title: 'Aplikacje stworzone wokół Twoich procesów',
        subtitle: 'Projektujemy i wdrażamy dedykowane aplikacje dopasowane do istniejących procesów i procedur, aby zwiększyć automatyzację zakupów i zarządzania łańcuchem dostaw.',
      },
      seo: {
        title: 'Dedykowane aplikacje dla zakupów | Profitia',
        description: 'Projektujemy i wdrażamy aplikacje dopasowane do procesów zakupowych i zarządzania łańcuchem dostaw.',
      },
      domains: [
        {
          id: 'dedykowane-aplikacje',
          title: 'Dedykowane aplikacje',
          products: [
            {
              id: 'aplikacje',
              title: 'Aplikacje',
              description: [
                'Warsztaty z biznesem oraz mapowanie procedur i procesów',
                'Identyfikacja obszarów do automatyzacji lub integracji',
                'Rekomendacje dotyczące aplikacji i funkcjonalności wraz z szacowanymi korzyściami dla organizacji',
                'Opracowanie i wdrożenie aplikacji',
                'Szkolenie użytkowników i administratorów narzędzia',
              ],
            },
          ],
        },
      ],
    },
    'ai-agents': {
      hero: {
        eyebrow: 'Usługi Digital · Agenci AI',
        title: 'Agenci AI stworzeni do codziennej pracy zakupów',
        subtitle: 'Projektujemy spersonalizowanych agentów wspierających bieżącą pracę działu zakupów, podejmowanie decyzji i sprawniejszą realizację procesów.',
      },
      seo: {
        title: 'Agenci AI dla zakupów | Profitia',
        description: 'Projektujemy i wdrażamy spersonalizowanych agentów AI, którzy wspierają decyzje i codzienną pracę działów zakupów.',
      },
      domains: [
        {
          id: 'agenci-ai',
          title: 'Agenci AI',
          products: [
            {
              id: 'agenci',
              title: 'Agenci',
              description: [
                'Warsztaty z kluczowymi interesariuszami',
                'Identyfikacja obszarów procesu, które mogą być wspierane przez agentów AI',
                'Opracowanie dedykowanych agentów i wdrożenie ich w organizacji',
                'Zabezpieczenie infrastruktury przed wyciekiem danych',
                'Szkolenie z pracy z agentami i ich wykorzystania w codziennych zadaniach',
              ],
            },
          ],
        },
      ],
    },
  },
  en: {
    'digital-consulting': {
      hero: {
        eyebrow: 'Digital Services · Digital Consulting',
        title: 'Procurement technology designed around your organisation',
        subtitle: 'We assess your organisation’s procurement automation maturity, define the target technology stack, and support supplier selection, implementation and change management.',
      },
      seo: {
        title: 'Digital Consulting | Profitia',
        description: 'We assess procurement digital maturity, define the target technology stack, and support technology selection and implementation.',
      },
      domains: [
        {
          id: 'technology-advisory',
          title: 'Technology Advisory',
          products: [
            {
              id: 'review',
              title: 'Review',
              description: [
                'Analysis of technology support across procurement processes',
                'Assessment of the current level of automation',
                'Review of how existing tool capabilities are used',
                'Evaluation of solutions against the organisation’s specific requirements',
                'Assessment against leading practices',
              ],
            },
            {
              id: 'strategy',
              title: 'Strategy',
              description: [
                'Design of the target technology stack',
                'Recommendations to expand, replace or retire existing tools',
                'Architecture aligned with the organisation’s scale and maturity',
                'Definition of target capabilities that increase automation',
                'Definition of KPIs',
                'Preparation and delivery of market analyses',
              ],
            },
            {
              id: 'implementation',
              title: 'Implementation',
              description: [
                'Management of an RFP process to select technology providers',
                'Management of technical dialogues with potential providers',
                'Monitoring implementation work and accountability for the delivery schedule',
                'Testing of selected tools',
                'Organisational change management',
              ],
            },
          ],
        },
      ],
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Digital Services · Spend Analytics',
        title: 'Clear spend data for better decisions',
        subtitle: 'We structure procurement data and tail spend, improve the management of key categories, and identify tangible savings opportunities.',
      },
      seo: {
        title: 'Spend Analytics | Profitia',
        description: 'We structure procurement data, build a tailored Spend Cube, and identify savings opportunities across key categories and tail spend.',
      },
      domains: [
        {
          id: 'spend-analytics',
          title: 'Spend Analytics',
          products: [
            {
              id: 'spend-cube',
              title: 'Spend Cube',
              description: [
                'Data cleansing for procurement line items and supplier master data',
                'Development of a category tree tailored to the organisation’s business profile',
                'Customisation of the Spend Cube view and target capabilities',
                'A complete view of the organisation’s spend',
                'Integration with internal data sources and automated Spend Cube refreshes',
              ],
            },
          ],
        },
      ],
    },
    'custom-applications': {
      hero: {
        eyebrow: 'Digital Services · Custom Applications',
        title: 'Applications built around your processes',
        subtitle: 'We design and implement custom applications aligned with your existing processes and procedures to increase automation across procurement and supply chain management.',
      },
      seo: {
        title: 'Custom Procurement Applications | Profitia',
        description: 'We design and implement applications tailored to procurement and supply chain management processes.',
      },
      domains: [
        {
          id: 'custom-applications',
          title: 'Custom Applications',
          products: [
            {
              id: 'applications',
              title: 'Applications',
              description: [
                'Business workshops and mapping of procedures and processes',
                'Identification of opportunities for automation and integration',
                'Recommendations for applications and functionality, including estimated organisational benefits',
                'Application design, development and implementation',
                'Training for users and tool administrators',
              ],
            },
          ],
        },
      ],
    },
    'ai-agents': {
      hero: {
        eyebrow: 'Digital Services · AI Agents',
        title: 'AI agents built for day-to-day procurement work',
        subtitle: 'We design tailored AI agents that support day-to-day procurement work, improve decision-making and accelerate key processes.',
      },
      seo: {
        title: 'AI Agents for Procurement | Profitia',
        description: 'We design and implement tailored AI agents that support procurement decisions and day-to-day procurement work.',
      },
      domains: [
        {
          id: 'ai-agents',
          title: 'AI Agents',
          products: [
            {
              id: 'agents',
              title: 'Agents',
              description: [
                'Workshops with key stakeholders',
                'Identification of process areas that can be supported by AI agents',
                'Design of tailored AI agents and their implementation across the organisation',
                'Protection of the infrastructure against data leakage',
                'Training on working with AI agents and using them in day-to-day tasks',
              ],
            },
          ],
        },
      ],
    },
  },
}

export function getDigitalServiceContent(locale: Locale, serviceId: DigitalServiceId): DigitalServicesPageContent {
  return DIGITAL_SERVICES_CATALOG[locale][serviceId]
}

export function isDigitalServiceId(value: string): value is DigitalServiceId {
  return value in DIGITAL_SERVICES_CATALOG.pl
}

export const DIGITAL_SERVICE_IDS = Object.keys(DIGITAL_SERVICES_CATALOG.pl) as DigitalServiceId[]