import type { Locale } from '@/lib/capabilities'
import { PUBLIC_HERO_ASSETS } from '@/lib/presentation/public-hero-assets'
import type { CatalogDomain } from './catalogTypes'
import type { DiagnosisCaseStudyContent } from '@/components/sections/case-study/DiagnosisCaseStudySections'

export type DigitalServicesPageContent = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    imageSrc: string
    imageAlt: string
  }
  seo: {
    title: string
    description: string
  }
  domains: CatalogDomain[]
  caseStudy?: DiagnosisCaseStudyContent
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
        imageAlt: 'Digital Consulting Profitia',
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
      caseStudy: {
        startingPoint: {
          eyebrow: 'Punkt wyjścia',
          title: 'Rosnąca organizacja potrzebowała uporządkować zakupy i przygotować je do dalszej skali',
          paragraphs: [
            'Dynamicznie rozwijająca się organizacja wchodziła na rynki zagraniczne, a dedykowany dział zakupów został w niej powołany dopiero niedawno. Szybka ekspansja stworzyła silną presję na automatyzację oraz uporządkowanie procesów w całej firmie.',
            'Organizacja potrzebowała przejść od działań opartych na komunikacji mailowej do spójnego środowiska narzędziowego, które zapewni przejrzystość procesów i będzie gotowe na dalszy wzrost.',
          ],
          signals: [
            'Brak narzędzi systemowych - działania zakupowe opierały się wyłącznie na komunikacji mailowej',
            'Brak przejrzystości - organizacja nie miała pełnego obrazu obszaru zakupowego ani kontroli nad procesami',
            'Niski poziom wiedzy technologicznej - ograniczona znajomość rynkowych rozwiązań IT dla zakupów',
            'Wsparcie od zera - potrzeba ustrukturyzowania całego obszaru zakupowego w odpowiedzi na rosnącą skalę biznesu',
          ],
        },
        scope: {
          eyebrow: 'Zakres diagnozy',
          title: 'Od diagnozy potrzeb do wyboru platformy zakupowej',
          intro: 'Celem projektu było przeprowadzenie Klienta przez pełny proces wyboru optymalnej platformy zakupowej oraz automatyzacja procesów Source-to-Contract (S2C). Projekt został zrealizowany w pięciu głównych etapach:',
          areas: [
            {
              title: 'Diagnoza potrzeb',
              description: 'Szczegółowa analiza i zmapowanie wymagań funkcjonalnych w obszarze narzędziowym.',
            },
            {
              title: 'Opracowanie drzewa zakupowego',
              description: 'Stworzenie spójnej struktury kategorii zakupowych na trzech poziomach.',
            },
            {
              title: 'Analiza i dopasowanie funkcjonalności',
              description: 'Weryfikacja rozwiązań pod kątem skali, profilu działalności, procedur Klienta oraz możliwości integracji z istniejącą infrastrukturą IT.',
            },
            {
              title: 'RFP i dialog techniczny',
              description: 'Przeprowadzenie zapytania ofertowego połączonego z dialogiem technicznym oraz negocjacjami cenowymi z dostawcami IT.',
            },
            {
              title: 'Wybór dostawcy',
              description: 'Wyłonienie partnera technologicznego oraz ustalenie ścieżki i kolejności wdrażania modułów.',
            },
          ],
        },
        result: {
          eyebrow: 'Rezultat',
          title: 'Od procesów manualnych do skalowalnego środowiska S2C',
          items: [
            'Dopasowanie do potrzeb i skali - wybrano dostawcę oraz zestaw funkcjonalności odpowiadający specyfice i rzeczywistym potrzebom Klienta, bez ponoszenia kosztów zbędnych modułów.',
            'Terminowość i sprawny start - precyzyjny harmonogram oraz właściwa kolejność wdrażania modułów umożliwiły szybkie uruchomienie narzędzia i terminową realizację projektu.',
            'Automatyzacja i cyfryzacja - rozproszoną komunikację e-mail zastąpiono spójnym, cyfrowym procesem S2C w całej organizacji.',
            'Skalowalność - powstał stabilny fundament narzędziowy i procesowy, gotowy na dalszą dynamiczną ekspansję zagraniczną firmy.',
          ],
          highlight: 'Projekt umożliwił organizacji sprawne przejście od procesów manualnych do nowoczesnego, zautomatyzowanego środowiska zakupowego S2C.',
        },
      },
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Usługi Digital · Spend Analytics',
        title: 'Przejrzystość wydatków, która prowadzi do lepszych decyzji',
        subtitle: 'Porządkujemy dane zakupowe i tail spend, usprawniamy zarządzanie kluczowymi kategoriami oraz identyfikujemy realny potencjał oszczędności.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
        imageAlt: 'Spend Analytics Profitia',
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
        imageAlt: 'Dedykowane aplikacje zakupowe Profitia',
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
        imageAlt: 'Agenci AI dla zakupów',
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
        imageAlt: 'Profitia Digital Consulting',
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
      caseStudy: {
        startingPoint: {
          eyebrow: 'Starting point',
          title: 'A growing organisation needed to structure procurement and prepare it to scale',
          paragraphs: [
            'A fast-growing organisation was expanding into international markets, having only recently established a dedicated procurement function. Rapid expansion created significant pressure to automate and structure processes across the business.',
            'The organisation needed to move from email-based procurement activities to a coherent technology environment that would provide process transparency and support further growth.',
          ],
          signals: [
            'No system support - procurement activities relied entirely on email communication',
            'Limited transparency - the organisation lacked a complete view of procurement and control over its processes',
            'Limited technology knowledge - there was little familiarity with procurement-specific IT solutions available on the market',
            'Building from scratch - the procurement function needed to be structured in response to the growing scale of the business',
          ],
        },
        scope: {
          eyebrow: 'Assessment scope',
          title: 'From needs assessment to procurement platform selection',
          intro: 'The project was designed to guide the client through the complete process of selecting the right procurement platform and automating Source-to-Contract (S2C) processes. The work was delivered in five main stages:',
          areas: [
            {
              title: 'Needs assessment',
              description: 'A detailed analysis and mapping of functional requirements for the technology environment.',
            },
            {
              title: 'Procurement taxonomy design',
              description: 'Development of a coherent three-level procurement category structure.',
            },
            {
              title: 'Solution and functionality fit assessment',
              description: 'Evaluation of solutions against the client’s scale, business profile, procedures and integration requirements for the existing IT infrastructure.',
            },
            {
              title: 'RFP and technical dialogue',
              description: 'Delivery of an RFP process combined with technical dialogue and commercial negotiations with technology providers.',
            },
            {
              title: 'Provider selection',
              description: 'Selection of the technology partner and definition of the implementation path and module sequence.',
            },
          ],
        },
        result: {
          eyebrow: 'Outcome',
          title: 'From manual processes to a scalable S2C environment',
          items: [
            'Fit to needs and scale - the selected provider and functionality set matched the client’s specific requirements without the cost of unnecessary modules.',
            'On-time delivery and an efficient start - a precise schedule and the right module sequence enabled a rapid launch and timely project delivery.',
            'Automation and digitalisation - fragmented email communication was replaced with a coherent digital S2C process across the organisation.',
            'Scalability - the project established a stable technology and process foundation ready to support the company’s continued international expansion.',
          ],
          highlight: 'The project enabled the organisation to move efficiently from manual processes to a modern, automated S2C procurement environment.',
        },
      },
    },
    'spend-analytics': {
      hero: {
        eyebrow: 'Digital Services · Spend Analytics',
        title: 'Clear spend data for better decisions',
        subtitle: 'We structure procurement data and tail spend, improve the management of key categories, and identify tangible savings opportunities.',
        imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
        imageAlt: 'Profitia Spend Analytics',
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
        imageAlt: 'Profitia custom procurement applications',
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
        imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
        imageAlt: 'Profitia AI agents for procurement',
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
