import type { AdvisorySession, Message } from "@/types";
import {
  PROFITIA_ADVISORY_ACCEPTANCE_SCENARIOS,
  type AdvisoryAcceptanceScenario as CicAcceptanceScenario,
} from "@profitia/cic-evals";

export type { AdvisoryAcceptanceTurn } from "@profitia/cic-evals";

export interface AdvisoryAcceptanceScenario extends CicAcceptanceScenario {
  expectedHref: string;
}

type ScenarioId = (typeof PROFITIA_ADVISORY_ACCEPTANCE_SCENARIOS)[number]["id"];

const EXPECTED_HREF_BY_SCENARIO: Readonly<Record<ScenarioId, string>> = {
  "PL-SERVICES-NEGOTIATION": "/doradztwo/uslugi",
  "EN-SERVICES-NEGOTIATION": "/en/advisory/services",
  "PL-COMPETENCE-TEAM": "/rozwoj-kompetencji",
  "EN-COMPETENCE-TEAM": "/en/education",
  "PL-DIGITAL-AI": "/uslugi-digital/digital-consulting",
  "EN-DIGITAL-AI": "/en/digital-services/digital-consulting",
  "PL-AMBIGUOUS-FOUR-TURNS": "/doradztwo/uslugi",
  "PL-ACCEPTED-DOMAIN-VOCABULARY": "/doradztwo/uslugi",
};

/**
 * CIC owns the reference journeys and expected destination identifiers. The
 * website augments them only with the public URLs that belong to this consumer.
 */
export const ADVISORY_ACCEPTANCE_SCENARIOS: readonly AdvisoryAcceptanceScenario[] =
  PROFITIA_ADVISORY_ACCEPTANCE_SCENARIOS.map((scenario) => ({
    ...scenario,
    expectedHref: EXPECTED_HREF_BY_SCENARIO[scenario.id],
  }));

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
