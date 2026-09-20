import type {
  AdvisorySession,
  ConversationDecision,
  IntentScore,
  RoutingDecision,
} from "@/types";
import {
  computeConversationDecision as computeCicConversationDecision,
} from "@profitia/cic-core";
import { resolveProfitiaDestinationId } from "@profitia/cic-profitia";

export { CONVERSATION_CONTRACT_VERSION, MAX_USER_TURNS } from "@profitia/cic-core";

/**
 * Convert the detailed intelligence output into the single product contract
 * consumed by the prompt, output gate and UI.
 *
 * The language model never chooses navigation. It may phrase the response,
 * but the controller owns whether to ask or recommend and which Profitia
 * destination is allowed.
 */
export function computeConversationDecision(
  session: AdvisorySession,
  intent: IntentScore,
  routing: RoutingDecision,
): ConversationDecision {
  const userTurnCount = session.messages.filter(
    (message) => message.role === "user",
  ).length;

  return computeCicConversationDecision({
    userTurnCount,
    intent: intent.primary,
    routing,
    resolveDestination: (resolvedIntent) => resolveProfitiaDestinationId(
      resolvedIntent,
      session.state.routingPreferences,
    ),
  });
}
