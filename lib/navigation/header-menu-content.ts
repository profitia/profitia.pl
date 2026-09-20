import type { Locale } from '@/lib/capabilities'
import type { PublicRouteId } from '@/lib/routing/public-routes'
import { PUBLIC_HERO_ASSETS } from '@/lib/presentation/public-hero-assets'

export type HeaderMenuId = 'advisory' | 'digital-services'

export type HeaderMenuItemContent = {
  routeId: PublicRouteId
  label: string
  description: string
  imageSrc: string
  imageAlt: string
}

export type HeaderMenuContent = {
  label: string
  heading: string
  desktopColumns: 2 | 3
  items: HeaderMenuItemContent[]
}

export const HEADER_MENU_CONTENT: Record<Locale, Record<HeaderMenuId, HeaderMenuContent>> = {
  pl: {
    advisory: {
      label: 'Doradztwo',
      heading: 'Wybierz właściwy punkt startu',
      desktopColumns: 3,
      items: [
        {
          routeId: 'service:analiza-spot',
          label: 'Zacznij od analizy',
          description: 'Diagnoza dojrzałości zakupów, która wskazuje luki, priorytety i właściwy kierunek zmian.',
          imageSrc: PUBLIC_HERO_ASSETS.spotAnalysis,
          imageAlt: 'Konsultanci Profitia podczas spotkania roboczego',
        },
        {
          routeId: 'services:index',
          label: 'Usługi',
          description: 'Doradztwo zakupowe, negocjacje, analityka i transformacja funkcji zakupowej.',
          imageSrc: PUBLIC_HERO_ASSETS.advisoryServices,
          imageAlt: 'Doradztwo zakupowe Profitia',
        },
        {
          routeId: 'products:index',
          label: 'Produkty',
          description: 'Gotowe rezultaty doradcze, eksperci i narzędzia wspierające konkretne cele biznesowe.',
          imageSrc: PUBLIC_HERO_ASSETS.advisoryProducts,
          imageAlt: 'Produkty doradcze Profitia',
        },
      ],
    },
    'digital-services': {
      label: 'Usługi Digital',
      heading: 'Technologia dla nowoczesnych zakupów',
      desktopColumns: 2,
      items: [
        {
          routeId: 'digital-service:digital-consulting',
          label: 'Digital Consulting',
          description: 'Ocena dojrzałości cyfrowej, docelowy stack technologiczny oraz wsparcie wyboru i wdrożenia narzędzi.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
          imageAlt: 'Digital Consulting Profitia',
        },
        {
          routeId: 'digital-service:spend-analytics',
          label: 'Spend Analytics',
          description: 'Uporządkowane dane zakupowe, dopasowany Spend Cube i identyfikacja potencjału oszczędności.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
          imageAlt: 'Spend Analytics Profitia',
        },
        {
          routeId: 'digital-service:custom-applications',
          label: 'Dedykowane aplikacje',
          description: 'Aplikacje projektowane wokół procesów zakupowych i zarządzania łańcuchem dostaw.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
          imageAlt: 'Dedykowane aplikacje zakupowe Profitia',
        },
        {
          routeId: 'digital-service:ai-agents',
          label: 'Agenci AI',
          description: 'Spersonalizowani agenci wspierający decyzje i codzienną pracę działów zakupów.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
          imageAlt: 'Agenci AI dla zakupów',
        },
      ],
    },
  },
  en: {
    advisory: {
      label: 'Advisory',
      heading: 'Choose the right starting point',
      desktopColumns: 3,
      items: [
        {
          routeId: 'service:analiza-spot',
          label: 'Start with an assessment',
          description: 'A procurement maturity assessment that identifies gaps, priorities and the right direction for change.',
          imageSrc: PUBLIC_HERO_ASSETS.spotAnalysis,
          imageAlt: 'Profitia consultants during a working session',
        },
        {
          routeId: 'services:index',
          label: 'Services',
          description: 'Procurement advisory, negotiations, analytics and procurement function transformation.',
          imageSrc: PUBLIC_HERO_ASSETS.advisoryServices,
          imageAlt: 'Profitia procurement advisory',
        },
        {
          routeId: 'products:index',
          label: 'Products',
          description: 'Defined advisory outcomes, experts and tools supporting specific business objectives.',
          imageSrc: PUBLIC_HERO_ASSETS.advisoryProducts,
          imageAlt: 'Profitia advisory products',
        },
      ],
    },
    'digital-services': {
      label: 'Digital Services',
      heading: 'Technology for modern procurement',
      desktopColumns: 2,
      items: [
        {
          routeId: 'digital-service:digital-consulting',
          label: 'Digital Consulting',
          description: 'Digital maturity assessment, target technology stack, and support with tool selection and implementation.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalConsulting,
          imageAlt: 'Profitia Digital Consulting',
        },
        {
          routeId: 'digital-service:spend-analytics',
          label: 'Spend Analytics',
          description: 'Structured procurement data, a tailored Spend Cube, and identification of tangible savings opportunities.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalSpendAnalytics,
          imageAlt: 'Profitia Spend Analytics',
        },
        {
          routeId: 'digital-service:custom-applications',
          label: 'Custom Applications',
          description: 'Applications designed around procurement and supply chain processes.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalCustomApplications,
          imageAlt: 'Profitia custom procurement applications',
        },
        {
          routeId: 'digital-service:ai-agents',
          label: 'AI Agents',
          description: 'Personalised agents supporting decisions and the day-to-day work of procurement teams.',
          imageSrc: PUBLIC_HERO_ASSETS.digitalAiAgents,
          imageAlt: 'AI agents for procurement',
        },
      ],
    },
  },
}
