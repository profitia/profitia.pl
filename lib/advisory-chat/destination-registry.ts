import type { AdvisoryDestinationId, IntentCode, Locale } from "@/types";
import { getPublicPath, type PublicRouteId } from "@/lib/routing/public-routes";
import { getProfitiaDestinationId } from "@profitia/cic-profitia";

export type { AdvisoryDestinationId } from "@/types";

interface LocalizedCopy {
  title: string;
  description: string;
  action: string;
}

interface AdvisoryDestinationDefinition {
  id: AdvisoryDestinationId;
  analyticsId: string;
  routeId: PublicRouteId;
  copy: Record<Locale, LocalizedCopy>;
}

export interface AdvisoryDestination extends LocalizedCopy {
  id: AdvisoryDestinationId;
  analyticsId: string;
  href: string;
}

const DESTINATIONS: Record<AdvisoryDestinationId, AdvisoryDestinationDefinition> = {
  services: {
    id: "services",
    analyticsId: "DEST-SERVICES",
    routeId: "services:index",
    copy: {
      pl: {
        title: "Usługi doradcze",
        description: "Zobacz, jak możemy wesprzeć konkretny problem zakupowy.",
        action: "Przejdź do usług",
      },
      en: {
        title: "Advisory services",
        description: "See how we can support your specific procurement challenge.",
        action: "Explore services",
      },
    },
  },
  products: {
    id: "products",
    analyticsId: "DEST-PRODUCTS",
    routeId: "products:index",
    copy: {
      pl: {
        title: "Produkty i rozwiązania zakupowe",
        description: "Poznaj konkretne produkty, analitykę i narzędzia oparte na danych rynkowych.",
        action: "Zobacz produkty",
      },
      en: {
        title: "Procurement products and solutions",
        description: "Explore concrete products, analytics and tools built on market data.",
        action: "Explore products",
      },
    },
  },
  competence: {
    id: "competence",
    analyticsId: "DEST-COMPETENCE",
    routeId: "education:index",
    copy: {
      pl: {
        title: "Rozwój kompetencji",
        description: "Wybierz program rozwojowy dla siebie lub zespołu zakupowego.",
        action: "Zobacz programy",
      },
      en: {
        title: "Capability development",
        description: "Choose a development programme for you or your procurement team.",
        action: "Explore programmes",
      },
    },
  },
  digital: {
    id: "digital",
    analyticsId: "DEST-DIGITAL",
    // Until a digital listing page exists, use its canonical consulting page.
    routeId: "digital-service:digital-consulting",
    copy: {
      pl: {
        title: "Digital i AI w zakupach",
        description: "Poznaj rozwiązania wspierające cyfryzację i automatyzację zakupów.",
        action: "Przejdź do Digital",
      },
      en: {
        title: "Digital and AI for procurement",
        description: "Explore solutions for procurement digitisation and automation.",
        action: "Explore Digital",
      },
    },
  },
};

export function getAdvisoryDestination(
  intent: IntentCode,
  locale: Locale,
): AdvisoryDestination {
  return getAdvisoryDestinationById(getAdvisoryDestinationId(intent), locale);
}

export function getAdvisoryDestinationId(
  intent: IntentCode,
): AdvisoryDestinationId {
  return getProfitiaDestinationId(intent);
}

export function getAdvisoryDestinationById(
  destinationId: AdvisoryDestinationId,
  locale: Locale,
): AdvisoryDestination {
  const definition = DESTINATIONS[destinationId];

  return {
    id: definition.id,
    analyticsId: definition.analyticsId,
    href: getPublicPath(definition.routeId, locale),
    ...definition.copy[locale],
  };
}
