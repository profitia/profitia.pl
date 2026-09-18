import type {
  AdvisorySession,
  ConversationDecision,
  IntentScore,
  RoutingDecision,
} from "@/types";
import { getAdvisoryDestinationId } from "@/lib/advisory-chat/destination-registry";

export const CONVERSATION_CONTRACT_VERSION = "1" as const;
export const MAX_USER_TURNS = 4 as const;

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
  const remainingUserTurns = Math.max(0, MAX_USER_TURNS - userTurnCount);

  if (userTurnCount === 0) {
    return {
      contractVersion: CONVERSATION_CONTRACT_VERSION,
      action: "wait",
      intent: intent.primary,
      destinationId: null,
      userTurnCount,
      maxUserTurns: MAX_USER_TURNS,
      remainingUserTurns,
      questionLimit: 0,
      reason: "waiting_for_first_user_message",
    };
  }

  const mustRecommend =
    userTurnCount >= MAX_USER_TURNS ||
    routing.shouldEscalateNow ||
    routing.shouldShowRecommendation;

  if (mustRecommend) {
    return {
      contractVersion: CONVERSATION_CONTRACT_VERSION,
      action: "recommend",
      intent: intent.primary,
      destinationId: getAdvisoryDestinationId(intent.primary),
      userTurnCount,
      maxUserTurns: MAX_USER_TURNS,
      remainingUserTurns,
      questionLimit: 0,
      reason: routing.reason,
    };
  }

  return {
    contractVersion: CONVERSATION_CONTRACT_VERSION,
    action: "ask",
    intent: intent.primary,
    destinationId: null,
    userTurnCount,
    maxUserTurns: MAX_USER_TURNS,
    remainingUserTurns,
    questionLimit: 1,
    reason: routing.reason,
  };
}
