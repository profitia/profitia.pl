import assert from "node:assert/strict";
import { createStreamState, processChunk } from "@/lib/runtime-hardening/streaming-recovery";
import { SSEDataParser } from "@/lib/advisory-chat/sse-data-parser";
import { finalizeAdvisoryResponse } from "@/lib/advisory-chat/finalize-response";
import { getAdvisoryDestination } from "@/lib/advisory-chat/destination-registry";
import { computeRoutingDecision, getNextRouteStep } from "@/lib/engines/routing-engine";
import { runAdvisoryOrchestrator } from "@/lib/engines/advisory-orchestrator";
import { useAdvisorySession } from "@/stores/advisory-session.store";
import type { AdvisorySession, IntentScore, Message } from "@/types";

function createSession(userMessages: string[]): AdvisorySession {
  const messages: Message[] = userMessages.map((content, index) => ({
    id: `message-${index}`,
    role: "user",
    content,
    timestamp: index,
  }));

  return {
    id: "session-stage1",
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
      detectedIntent: "I8_NEGOTIATIONS",
      intentConfidence: 0.8,
      urgency: "U2",
      buyingStage: "S2",
      maturity: "operational",
      journeyId: "J-NEG-01",
      journeyStep: 0,
      escalationReady: false,
      ctaFatigue: 0,
      engagementScore: 20,
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

function negotiationIntent(): IntentScore {
  return {
    primary: "I8_NEGOTIATIONS",
    primaryConfidence: 0.85,
    secondary: null,
    secondaryConfidence: 0,
    urgency: "U2",
    businessImpact: "high",
    escalationProbability: 0.5,
    workshopProbability: 0.2,
    signals: [],
  };
}

function testRepeatedDeltas(): void {
  const state = createStreamState("stream", "session");
  for (const chunk of ["To ", "nie ", "jest ", "nie ", "problem."]) {
    assert.equal(processChunk(state, chunk).accepted, true);
  }
  assert.equal(state.accumulatedContent, "To nie jest nie problem.");
}

function testFragmentedSSE(): void {
  const parser = new SSEDataParser();
  const wire = [
    'data: {"type":"text","content":"Dzień ',
    'dobry"}\n\n',
    'data: {"type":"metadata","intent":"I6_EDUCATION"}\n',
    '\ndata: [DONE]\n\n',
  ];
  const payloads = wire.flatMap((chunk) => parser.push(chunk));
  payloads.push(...parser.finish());

  assert.deepEqual(payloads, [
    '{"type":"text","content":"Dzień dobry"}',
    '{"type":"metadata","intent":"I6_EDUCATION"}',
    "[DONE]",
  ]);
}

function testValidatedOutputGate(): void {
  const raw = 'Krótka odpowiedź.\n```metadata\n{"intent":"I4_DIGITALIZATION","confidence":0.9,"urgency":"U2","phase":"capability_recommendation"}\n```';
  const result = finalizeAdvisoryResponse(raw);

  assert.equal(result.content, "Krótka odpowiedź.");
  assert.equal(result.content.includes("metadata"), false);
  assert.equal(result.metadata?.intent, "I4_DIGITALIZATION");
}

function testSingleQuestionContract(): void {
  const result = finalizeAdvisoryResponse(
    "Najpierw trzeba ustalić punkt wyjścia. Czy macie dane kosztowe? Jak często je aktualizujecie?",
  );

  assert.equal(
    result.content,
    "Najpierw trzeba ustalić punkt wyjścia. Czy macie dane kosztowe?",
  );
  assert.equal((result.content.match(/\?/g) ?? []).length, 1);
}

function testThreeDestinations(): void {
  assert.equal(getAdvisoryDestination("I8_NEGOTIATIONS", "pl").href, "/doradztwo/uslugi");
  assert.equal(getAdvisoryDestination("I6_EDUCATION", "pl").href, "/rozwoj-kompetencji");
  assert.equal(
    getAdvisoryDestination("I4_DIGITALIZATION", "pl").href,
    "/uslugi-digital/digital-consulting",
  );
}

function testJourneyProgressAndTurnLimit(): void {
  assert.equal(getNextRouteStep(createSession(["Pierwsza"]), "I8_NEGOTIATIONS")?.stepIndex, 0);
  assert.equal(getNextRouteStep(createSession(["Pierwsza", "Druga"]), "I8_NEGOTIATIONS")?.stepIndex, 1);
  assert.equal(getNextRouteStep(createSession(["Pierwsza", "Druga", "Trzecia"]), "I8_NEGOTIATIONS")?.stepIndex, 2);

  const decision = computeRoutingDecision(
    createSession(["Pierwsza", "Druga", "Trzecia", "Czwarta"]),
    negotiationIntent(),
  );
  assert.equal(decision.shouldEscalateNow, true);
  assert.match(decision.reason, /turn_limit=true/);
}

function testBusinessDestinationClassification(): void {
  const cases = [
    {
      message: "Dostawca żąda podwyżki o 12 procent. Musimy przygotować negocjacje.",
      intent: "I8_NEGOTIATIONS",
      destination: "services",
    },
    {
      message: "Chcemy rozwinąć kompetencje negocjacyjne zespołu zakupowego.",
      intent: "I6_EDUCATION",
      destination: "competence",
    },
    {
      message: "Chcemy zautomatyzować proces zakupowy i wykorzystać AI.",
      intent: "I4_DIGITALIZATION",
      destination: "digital",
    },
  ] as const;

  for (const scenario of cases) {
    const decision = runAdvisoryOrchestrator(createSession([scenario.message]));
    assert.equal(decision.intent.primary, scenario.intent, scenario.message);
    assert.equal(
      getAdvisoryDestination(decision.intent.primary, "pl").id,
      scenario.destination,
      scenario.message,
    );
  }
}

function testSessionStateProgression(): void {
  useAdvisorySession.setState({
    session: createSession([]),
    isInitialized: true,
    lastDecision: null,
  });

  useAdvisorySession.getState().addMessage(
    "user",
    "Dostawca żąda podwyżki. Przygotowujemy negocjacje.",
  );
  useAdvisorySession.getState().runOrchestration();
  assert.equal(useAdvisorySession.getState().session?.state.journeyStep, 0);
  assert.equal(useAdvisorySession.getState().session?.state.buyingStage, "S2");

  useAdvisorySession.getState().addMessage("user", "Termin mamy za dwa tygodnie.");
  useAdvisorySession.getState().runOrchestration();
  assert.equal(useAdvisorySession.getState().session?.state.journeyStep, 1);
  assert.equal(useAdvisorySession.getState().session?.state.buyingStage, "S3");

  useAdvisorySession.getState().addMessage("user", "Mamy strukturę kosztów kategorii.");
  useAdvisorySession.getState().runOrchestration();
  const finalState = useAdvisorySession.getState().session?.state;
  assert.equal(finalState?.journeyStep, 2);
  assert.equal(finalState?.buyingStage, "S4");
  assert.equal(finalState?.phase, "escalation");
}

testRepeatedDeltas();
testFragmentedSSE();
testValidatedOutputGate();
testSingleQuestionContract();
testThreeDestinations();
testJourneyProgressAndTurnLimit();
testBusinessDestinationClassification();
testSessionStateProgression();

console.log("Advisory chat stage 1: all regression tests passed");
