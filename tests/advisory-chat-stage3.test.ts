import assert from "node:assert/strict";
import { getAdvisoryDestinationById } from "@/lib/advisory-chat/destination-registry";
import { finalizeAdvisoryResponse } from "@/lib/advisory-chat/finalize-response";
import { buildAdvisorySystemPrompt } from "@/lib/advisory-quality/system-prompt";
import { runAdvisoryOrchestrator } from "@/lib/engines/advisory-orchestrator";
import {
  ADVISORY_ACCEPTANCE_SCENARIOS,
  appendAcceptanceMessage,
  createAcceptanceSession,
} from "@/tests/fixtures/advisory-chat-acceptance";

function modelDraft(locale: "pl" | "en", action: "ask" | "recommend"): string {
  const metadata = `\n\`\`\`metadata\n{"intent":"I7_EXPLORATORY","confidence":0.7,"urgency":"U3","phase":"intent_discovery"}\n\`\`\``;

  if (action === "ask") {
    return locale === "pl"
      ? `Najpierw ustalmy dominującą potrzebę. Czy priorytetem są wyniki, kompetencje czy automatyzacja? Czy temat jest pilny?${metadata}`
      : `Let us identify the main need first. Is the priority business results, capability development or automation? Is it urgent?${metadata}`;
  }

  return locale === "pl"
    ? `Rozpoznana potrzeba ma już konkretny kierunek. Czy kontynuować diagnozę? Rekomenduję wskazany obszar, ponieważ odpowiada on na opisany problem zakupowy.${metadata}`
    : `The need now has a clear direction. Should we continue discovery? I recommend the selected area because it addresses the procurement challenge described.${metadata}`;
}

function runReferenceJourneys(): void {
  for (const scenario of ADVISORY_ACCEPTANCE_SCENARIOS) {
    const session = createAcceptanceSession(scenario);

    for (const [index, turn] of scenario.turns.entries()) {
      appendAcceptanceMessage(session, "user", turn.user);
      const decision = runAdvisoryOrchestrator(session);
      const contract = decision.conversation;

      assert.equal(contract.contractVersion, "1", `${scenario.id}, turn ${index + 1}`);
      assert.equal(contract.userTurnCount, index + 1, `${scenario.id}, turn ${index + 1}`);
      assert.equal(contract.action, turn.expectedAction, `${scenario.id}, turn ${index + 1}`);
      assert.equal(contract.intent, turn.expectedIntent, `${scenario.id}, turn ${index + 1}`);
      assert.equal(
        contract.questionLimit,
        turn.expectedAction === "ask" ? 1 : 0,
        `${scenario.id}, turn ${index + 1}`,
      );

      if (turn.expectedAction === "recommend") {
        assert.equal(contract.destinationId, scenario.expectedDestinationId, scenario.id);
      } else {
        assert.equal(contract.destinationId, null, `${scenario.id}, turn ${index + 1}`);
      }

      const prompt = buildAdvisorySystemPrompt({
        locale: scenario.locale,
        pageContext: session.pageContext,
        sessionState: {
          ...session.state,
          detectedIntent: decision.intent.primary,
          intentConfidence: decision.intent.primaryConfidence,
          urgency: decision.intent.urgency,
          maturity: decision.maturity.level,
        },
        decision,
        messageCount: session.messages.length,
        userMessageCount: contract.userTurnCount,
      });

      if (turn.expectedAction === "ask") {
        assert.match(prompt, /DECYZJA KONTROLERA: DIAGNOZA|CONTROLLER DECISION: DISCOVERY/);
      } else {
        assert.match(prompt, /DECYZJA KONTROLERA: REKOMENDACJA|CONTROLLER DECISION: RECOMMEND/);
      }

      const finalized = finalizeAdvisoryResponse(
        modelDraft(scenario.locale, turn.expectedAction),
        {
          questionLimit: contract.questionLimit,
          emptyContentFallback: scenario.locale === "pl"
            ? "Rekomenduję wskazany kierunek."
            : "I recommend the selected direction.",
        },
      );
      const questionCount = finalized.content.match(/\?/g)?.length ?? 0;

      assert.equal(finalized.content.includes("metadata"), false, scenario.id);
      assert.equal(finalized.metadata?.intent, "I7_EXPLORATORY", scenario.id);
      assert.equal(
        questionCount,
        turn.expectedAction === "ask" ? 1 : 0,
        `${scenario.id}, turn ${index + 1}`,
      );

      appendAcceptanceMessage(session, "assistant", finalized.content);
    }

    const finalDecision = runAdvisoryOrchestrator(session).conversation;
    assert.equal(finalDecision.action, "recommend", scenario.id);
    assert.equal(finalDecision.destinationId, scenario.expectedDestinationId, scenario.id);

    const destination = getAdvisoryDestinationById(
      scenario.expectedDestinationId,
      scenario.locale,
    );
    assert.equal(destination.href, scenario.expectedHref, scenario.id);
  }
}

function assertPolishLanguageContract(): void {
  const scenario = ADVISORY_ACCEPTANCE_SCENARIOS.find(
    ({ id }) => id === "PL-ACCEPTED-DOMAIN-VOCABULARY",
  );
  assert.ok(scenario);

  const session = createAcceptanceSession(scenario);
  appendAcceptanceMessage(session, "user", scenario.turns[0].user);
  const decision = runAdvisoryOrchestrator(session);
  const prompt = buildAdvisorySystemPrompt({
    locale: "pl",
    pageContext: session.pageContext,
    sessionState: session.state,
    decision,
    messageCount: 1,
    userMessageCount: 1,
  });

  assert.match(prompt, /„cost drivers”, „sourcing”, „procurement”, „savings” i „spend”/);
  assert.doesNotMatch(
    prompt,
    /\b(cost breakdown|input costs?|sourcing decision|pricing volatility|maturity assessment zakupów|firefighting)\b/i,
  );
}

runReferenceJourneys();
assertPolishLanguageContract();

console.log(
  `Advisory chat stage 3: ${ADVISORY_ACCEPTANCE_SCENARIOS.length} reference journeys passed`,
);
