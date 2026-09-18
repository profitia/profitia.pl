import assert from "node:assert/strict";
import { finalizeAdvisoryResponse } from "@/lib/advisory-chat/finalize-response";
import { buildAdvisorySystemPrompt } from "@/lib/advisory-quality/system-prompt";
import { runAdvisoryOrchestrator } from "@/lib/engines/advisory-orchestrator";
import type { AdvisorySession, Message } from "@/types";

function createSession(userMessages: string[]): AdvisorySession {
  const messages: Message[] = userMessages.map((content, index) => ({
    id: `message-${index}`,
    role: "user",
    content,
    timestamp: index,
  }));

  return {
    id: "session-stage2",
    locale: "pl",
    startedAt: 0,
    lastActivityAt: 0,
    pageContext: {
      slug: "/",
      primaryIntent: "I7_EXPLORATORY",
      secondaryIntents: [],
      conversionTier: 4,
      escalationReadiness: "low",
    },
    messages,
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
      pagesVisited: ["/"],
      scrollDepth: {},
      timeOnPage: {},
      behavioralSignals: [],
      recommendationsShown: [],
      ctasShown: [],
      ctaClicked: null,
    },
  };
}

function testStableThreeDestinationContract(): void {
  const scenarios = [
    {
      message: "Dostawca żąda podwyżki. Musimy przygotować negocjacje.",
      destinationId: "services",
    },
    {
      message: "Chcemy rozwinąć kompetencje negocjacyjne zespołu zakupowego.",
      destinationId: "competence",
    },
    {
      message: "Chcemy zautomatyzować proces zakupowy i wykorzystać AI.",
      destinationId: "digital",
    },
  ] as const;

  for (const scenario of scenarios) {
    const decision = runAdvisoryOrchestrator(createSession([scenario.message]));
    assert.equal(decision.conversation.contractVersion, "1");
    assert.equal(decision.conversation.action, "recommend");
    assert.equal(decision.conversation.destinationId, scenario.destinationId);
    assert.equal(decision.conversation.questionLimit, 0);
  }
}

function testControllerOwnsTurnLimit(): void {
  const decision = runAdvisoryOrchestrator(
    createSession([
      "Nie wiem, od czego zacząć.",
      "To ogólny temat.",
      "Nie mamy jeszcze sprecyzowanego problemu.",
      "Potrzebujemy wskazania następnego kroku.",
    ]),
  );

  assert.equal(decision.conversation.userTurnCount, 4);
  assert.equal(decision.conversation.remainingUserTurns, 0);
  assert.equal(decision.conversation.action, "recommend");
  assert.notEqual(decision.conversation.destinationId, null);
  assert.equal(decision.conversation.questionLimit, 0);
}

function testDiscoveryContractBeforeTurnLimit(): void {
  const session = createSession(["Potrzebuję pomocy, ale nie wiem, od czego zacząć."]);
  const decision = runAdvisoryOrchestrator(session);

  assert.equal(decision.conversation.action, "ask");
  assert.equal(decision.conversation.destinationId, null);
  assert.equal(decision.conversation.questionLimit, 1);

  const prompt = buildAdvisorySystemPrompt({
    locale: "pl",
    pageContext: session.pageContext,
    sessionState: session.state,
    decision,
    messageCount: session.messages.length,
    userMessageCount: 1,
  });
  assert.match(prompt, /DECYZJA KONTROLERA: DIAGNOZA/);
  assert.match(prompt, /question_limit=1/);
  assert.match(prompt, /cichą korektę składni, odmiany, zgodności gramatycznej/);
}

function testNoQuestionAfterRecommendation(): void {
  const finalized = finalizeAdvisoryResponse(
    "Rozpoznaliśmy potrzebę rozwoju zespołu. Czy chcecie kontynuować? Rekomenduję rozwój kompetencji.",
    {
      questionLimit: 0,
      emptyContentFallback: "Rekomenduję wskazany kierunek.",
    },
  );

  assert.equal(finalized.content.includes("?"), false);
  assert.match(finalized.content, /Rozpoznaliśmy potrzebę rozwoju zespołu/);
  assert.match(finalized.content, /Rekomenduję rozwój kompetencji/);

  const onlyQuestion = finalizeAdvisoryResponse("Czy przejść dalej?", {
    questionLimit: 0,
    emptyContentFallback: "Rekomenduję wskazany kierunek.",
  });
  assert.equal(onlyQuestion.content, "Rekomenduję wskazany kierunek.");
}

function testUnversionedClientDecisionIsIgnored(): void {
  const session = createSession(["Potrzebuję pomocy, ale jeszcze nie znam kierunku."]);
  const validDecision = runAdvisoryOrchestrator(session);
  const malformedDecision = {
    ...validDecision,
    conversation: {
      ...validDecision.conversation,
      contractVersion: "outdated",
      action: "recommend",
      destinationId: "digital",
      questionLimit: 0,
    },
  } as unknown as typeof validDecision;

  const prompt = buildAdvisorySystemPrompt({
    locale: "pl",
    pageContext: session.pageContext,
    sessionState: session.state,
    decision: malformedDecision,
    messageCount: session.messages.length,
    userMessageCount: 1,
  });

  assert.doesNotMatch(prompt, /ADVISORY INTELLIGENCE CONTEXT/);
  assert.doesNotMatch(prompt, /DECYZJA KONTROLERA/);
}

function testInitialStateDoesNotInventDestination(): void {
  const decision = runAdvisoryOrchestrator(createSession([]));
  assert.equal(decision.conversation.action, "wait");
  assert.equal(decision.conversation.destinationId, null);
  assert.equal(decision.conversation.questionLimit, 0);
}

testStableThreeDestinationContract();
testControllerOwnsTurnLimit();
testDiscoveryContractBeforeTurnLimit();
testNoQuestionAfterRecommendation();
testUnversionedClientDecisionIsIgnored();
testInitialStateDoesNotInventDestination();

console.log("Advisory chat stage 2: stable conversation contract tests passed");
