import type {
  AdvisoryDestinationId,
  AdvisorySession,
  ConversationAction,
  IntentCode,
  Locale,
  Message,
} from "@/types";

export interface AdvisoryAcceptanceTurn {
  user: string;
  expectedAction: Extract<ConversationAction, "ask" | "recommend">;
  expectedIntent: IntentCode;
}

export interface AdvisoryAcceptanceScenario {
  id: string;
  name: string;
  locale: Locale;
  turns: AdvisoryAcceptanceTurn[];
  expectedDestinationId: AdvisoryDestinationId;
  expectedHref: string;
}

/**
 * Reference journeys for the product-facing chat contract.
 *
 * These are deliberately small and outcome-focused. They exercise both
 * languages, every supported destination and the hard four-turn exit from an
 * ambiguous conversation without encoding model-specific wording.
 */
export const ADVISORY_ACCEPTANCE_SCENARIOS: readonly AdvisoryAcceptanceScenario[] = [
  {
    id: "PL-SERVICES-NEGOTIATION",
    name: "Pilna podwyżka dostawcy prowadzi do usług",
    locale: "pl",
    turns: [
      {
        user: "Dostawca żąda podwyżki o 12 procent. Musimy przygotować negocjacje.",
        expectedAction: "recommend",
        expectedIntent: "I8_NEGOTIATIONS",
      },
    ],
    expectedDestinationId: "services",
    expectedHref: "/doradztwo/uslugi",
  },
  {
    id: "EN-SERVICES-NEGOTIATION",
    name: "Supplier price increase leads to advisory services",
    locale: "en",
    turns: [
      {
        user: "A supplier is asking for a 12 percent price increase. We need to prepare the negotiation.",
        expectedAction: "recommend",
        expectedIntent: "I8_NEGOTIATIONS",
      },
    ],
    expectedDestinationId: "services",
    expectedHref: "/en/advisory/services",
  },
  {
    id: "PL-COMPETENCE-TEAM",
    name: "Rozwój zespołu prowadzi do kompetencji",
    locale: "pl",
    turns: [
      {
        user: "Chcemy rozwinąć kompetencje negocjacyjne zespołu zakupowego.",
        expectedAction: "recommend",
        expectedIntent: "I6_EDUCATION",
      },
    ],
    expectedDestinationId: "competence",
    expectedHref: "/rozwoj-kompetencji",
  },
  {
    id: "EN-COMPETENCE-TEAM",
    name: "Procurement team training leads to capability development",
    locale: "en",
    turns: [
      {
        user: "We need negotiation training for our procurement team.",
        expectedAction: "recommend",
        expectedIntent: "I6_EDUCATION",
      },
    ],
    expectedDestinationId: "competence",
    expectedHref: "/en/education",
  },
  {
    id: "PL-DIGITAL-AI",
    name: "Automatyzacja zakupów prowadzi do Digital",
    locale: "pl",
    turns: [
      {
        user: "Chcemy zautomatyzować proces zakupowy i wykorzystać AI.",
        expectedAction: "recommend",
        expectedIntent: "I4_DIGITALIZATION",
      },
    ],
    expectedDestinationId: "digital",
    expectedHref: "/uslugi-digital/digital-consulting",
  },
  {
    id: "EN-DIGITAL-AI",
    name: "Procurement automation leads to Digital",
    locale: "en",
    turns: [
      {
        user: "We want to automate procurement with AI and integrate the process with our ERP.",
        expectedAction: "recommend",
        expectedIntent: "I4_DIGITALIZATION",
      },
    ],
    expectedDestinationId: "digital",
    expectedHref: "/en/digital-services/digital-consulting",
  },
  {
    id: "PL-AMBIGUOUS-FOUR-TURNS",
    name: "Niejasna potrzeba kończy się rekomendacją najpóźniej w czwartej turze",
    locale: "pl",
    turns: [
      {
        user: "Potrzebuję pomocy, ale nie wiem, od czego zacząć.",
        expectedAction: "ask",
        expectedIntent: "I7_EXPLORATORY",
      },
      {
        user: "Chodzi o zakupy, ale temat jest szeroki.",
        expectedAction: "ask",
        expectedIntent: "I7_EXPLORATORY",
      },
      {
        user: "Nie mamy jeszcze wspólnego priorytetu.",
        expectedAction: "ask",
        expectedIntent: "I7_EXPLORATORY",
      },
      {
        user: "Potrzebujemy wskazania następnego kroku.",
        expectedAction: "recommend",
        expectedIntent: "I7_EXPLORATORY",
      },
    ],
    expectedDestinationId: "services",
    expectedHref: "/doradztwo/uslugi",
  },
  {
    id: "PL-ACCEPTED-DOMAIN-VOCABULARY",
    name: "Dopuszczalne terminy branżowe pozostają częścią polskiej rozmowy",
    locale: "pl",
    turns: [
      {
        user: "Chcemy uporządkować spend, znaleźć savings i cost drivers oraz poprawić sourcing i procurement.",
        expectedAction: "recommend",
        expectedIntent: "I1_SAVINGS",
      },
    ],
    expectedDestinationId: "services",
    expectedHref: "/doradztwo/uslugi",
  },
] as const;

export function createAcceptanceSession(
  scenario: AdvisoryAcceptanceScenario,
  sessionId = `acceptance-${scenario.id.toLowerCase()}`,
): AdvisorySession {
  const slug = scenario.locale === "pl" ? "/" : "/en";

  return {
    id: sessionId,
    locale: scenario.locale,
    startedAt: 0,
    lastActivityAt: 0,
    pageContext: {
      slug,
      primaryIntent: "I7_EXPLORATORY",
      secondaryIntents: [],
      conversionTier: 4,
      escalationReadiness: "low",
    },
    messages: [],
    state: {
      phase: "intent_discovery",
      detectedIntent: "UNKNOWN",
      intentConfidence: 0,
      urgency: "U3",
      buyingStage: "S1",
      maturity: "unknown",
      journeyId: null,
      journeyStep: 0,
      escalationReady: false,
      ctaFatigue: 0,
      engagementScore: 0,
    },
    intelligence: {
      pagesVisited: [slug],
      scrollDepth: {},
      timeOnPage: {},
      behavioralSignals: [],
      recommendationsShown: [],
      ctasShown: [],
      ctaClicked: null,
    },
  };
}

export function appendAcceptanceMessage(
  session: AdvisorySession,
  role: Message["role"],
  content: string,
): void {
  session.messages.push({
    id: `${session.id}-${session.messages.length + 1}`,
    role,
    content,
    timestamp: session.messages.length + 1,
  });
}
