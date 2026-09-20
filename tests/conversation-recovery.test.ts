import assert from "node:assert/strict";
import {
  computeConversationRecoveryDecision,
  type ConversationRecoveryDecision,
} from "@profitia/cic-core";
import {
  PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS,
  type RecoveryAcceptanceScenario,
} from "@profitia/cic-evals";
import { renderProfitiaRecoveryResponse } from "@profitia/cic-profitia";
import {
  buildConversationRecoveryPayload,
  INITIAL_CONVERSATION_RECOVERY_STATE,
  toConversationRecoverySessionState,
} from "@/lib/advisory-chat/conversation-recovery";
import type { SessionState } from "@/types";

function sessionState(
  recovery = INITIAL_CONVERSATION_RECOVERY_STATE,
): SessionState {
  return {
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
    conversationRecovery: recovery,
  };
}

for (const scenario of PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS as readonly RecoveryAcceptanceScenario[]) {
  const previous = {
    ...INITIAL_CONVERSATION_RECOVERY_STATE,
    attempt: scenario.previousRecoveryAttempt ?? 0,
    primarySignal: scenario.previousPrimarySignal ?? null,
    previousUserMessage: scenario.previousUserMessage ?? null,
    pendingEnglishConfirmation: scenario.pendingEnglishConfirmation ?? false,
    responseLanguage: scenario.locale,
  };

  for (const message of scenario.userVariants) {
    const scenarioPrevious = scenario.expectedSignal === "repetition"
      ? { ...previous, previousUserMessage: message }
      : previous;
    const payload = buildConversationRecoveryPayload({
      message,
      locale: scenario.locale,
      userTurnCount: scenario.userTurnCount ?? 1,
      sessionState: sessionState(scenarioPrevious),
      securitySignal: scenario.securitySignal,
      expectedAnswerKind: scenario.expectedAnswerKind,
    });

    assert(payload, `${scenario.id}: recovery payload missing`);
    assert.equal(payload.decision.primarySignal, scenario.expectedSignal, scenario.id);
    assert.equal(payload.decision.strategy, scenario.expectedStrategy, scenario.id);
    assert.equal(payload.decision.nextState, scenario.expectedState, scenario.id);
    assert.equal(Boolean(payload.contact), scenario.expectedContact, scenario.id);
    assert(payload.response.content.trim().length > 0, `${scenario.id}: empty response`);
    assert((payload.response.content.match(/\?/g) ?? []).length <= 1, `${scenario.id}: too many questions`);
  }
}

const unsupported = computeConversationRecoveryDecision({
  message: "Bonjour, je cherche aide pour mes achats.",
  locale: "pl",
  userTurnCount: 1,
  containsBusinessIntent: false,
});
const accepted = computeConversationRecoveryDecision({
  message: "Yes, English is fine.",
  locale: "en",
  userTurnCount: 2,
  containsBusinessIntent: false,
  pendingEnglishConfirmation: true,
});
assert.equal(unsupported.nextState, "language_confirmation");
assert.equal(accepted.strategy, "continue_in_english");
assert.equal(accepted.responseLanguage, "en");

const contactExit: ConversationRecoveryDecision = computeConversationRecoveryDecision({
  message: "Możliwe.",
  locale: "pl",
  userTurnCount: 3,
  containsBusinessIntent: false,
  previousRecoveryAttempt: 2,
});
assert.equal(contactExit.strategy, "contact_exit");
assert.equal(contactExit.handoffAction, "contact_form");
assert(renderProfitiaRecoveryResponse(contactExit)?.content.includes("Profitia"));

const stored = toConversationRecoverySessionState(contactExit, "Możliwe.");
assert.equal(stored.attempt, 3);
assert.equal(stored.state, "handoff");

const changedMindPayload = buildConversationRecoveryPayload({
  message: "ok - chodzi mi o nechmarki",
  locale: "pl",
  userTurnCount: 5,
  sessionState: sessionState(stored),
});
assert.equal(changedMindPayload, null, "a substantive correction should resume the normal conversation");

const resumed = computeConversationRecoveryDecision({
  message: "ok - chodzi mi o nechmarki",
  locale: "pl",
  userTurnCount: 5,
  containsBusinessIntent: true,
  previousRecoveryAttempt: 3,
  previousState: "handoff",
});
assert.equal(resumed.strategy, "continue_with_intent");
assert.equal(resumed.nextState, "normal");
assert.equal(resumed.terminal, false);

console.log(`Conversation recovery: ${PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS.length} classes passed`);
