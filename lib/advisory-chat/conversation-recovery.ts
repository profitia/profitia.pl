import {
  computeConversationRecoveryDecision,
  type ConversationRecoveryDecision,
  type ConversationSignalClass,
  type RecoveryConversationState,
  type SecuritySignal,
} from "@profitia/cic-core";
import { extractIntentSignalsFromMessage } from "@profitia/cic-procurement";
import {
  renderProfitiaRecoveryResponse,
  type ProfitiaRecoveryResponse,
} from "@profitia/cic-profitia";
import { getPublicPath } from "@/lib/routing/public-routes";
import type { Locale, SessionState } from "@/types";

export interface ConversationRecoverySessionState {
  attempt: number;
  primarySignal: ConversationSignalClass | null;
  previousUserMessage: string | null;
  pendingEnglishConfirmation: boolean;
  state: RecoveryConversationState;
  responseLanguage: Locale;
}

export interface ConversationRecoveryPayload {
  decision: ConversationRecoveryDecision;
  response: ProfitiaRecoveryResponse;
  contact: { href: string; label: string } | null;
}

export const INITIAL_CONVERSATION_RECOVERY_STATE: ConversationRecoverySessionState = {
  attempt: 0,
  primarySignal: null,
  previousUserMessage: null,
  pendingEnglishConfirmation: false,
  state: "normal",
  responseLanguage: "pl",
};

export function hasBusinessIntent(message: string): boolean {
  return extractIntentSignalsFromMessage(message).length > 0;
}

export function buildConversationRecoveryPayload(input: {
  message: string;
  locale: Locale;
  userTurnCount: number;
  sessionState: SessionState;
  securitySignal?: SecuritySignal | null;
  expectedAnswerKind?: "yes_no" | "choice" | "open" | null;
}): ConversationRecoveryPayload | null {
  const previous = input.sessionState.conversationRecovery;
  const decision = computeConversationRecoveryDecision({
    message: input.message,
    locale: input.locale,
    userTurnCount: input.userTurnCount,
    containsBusinessIntent: hasBusinessIntent(input.message),
    previousRecoveryAttempt: previous?.attempt,
    previousPrimarySignal: previous?.primarySignal,
    previousUserMessage: previous?.previousUserMessage,
    pendingEnglishConfirmation: previous?.pendingEnglishConfirmation,
    securitySignal: input.securitySignal,
    expectedAnswerKind: input.expectedAnswerKind,
  });

  const response = renderProfitiaRecoveryResponse(decision);
  if (!response) return null;

  return {
    decision,
    response,
    contact: response.cta
      ? {
          href: getPublicPath("contact", decision.responseLanguage),
          label: response.cta.label,
        }
      : null,
  };
}

export function toConversationRecoverySessionState(
  decision: ConversationRecoveryDecision,
  userMessage: string,
): ConversationRecoverySessionState {
  return {
    attempt: decision.recoveryAttempt,
    primarySignal: decision.primarySignal,
    previousUserMessage: userMessage,
    pendingEnglishConfirmation: decision.nextState === "language_confirmation",
    state: decision.nextState,
    responseLanguage: decision.responseLanguage,
  };
}
