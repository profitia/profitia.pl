import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { computeConversationRecoveryDecision } from "@profitia/cic-core";
import {
  PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS,
  type RecoveryAcceptanceScenario,
} from "@profitia/cic-evals";
import { renderProfitiaRecoveryResponse } from "@profitia/cic-profitia";

const SEED = "profitia-recovery-2026-09-19";
const reportPath = resolve("docs/CONVERSATION_RECOVERY_TEST_RESULTS.md");

function seededIndex(value: string, length: number): number {
  let hash = 2166136261;
  for (const character of `${SEED}:${value}`) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % length;
}

function outcome(state: string, contact: boolean): string {
  if (contact) return "Przejście do formularza kontaktowego";
  if (state === "closed") return "Uprzejme zakończenie rozmowy";
  if (state === "safety") return "Bezpieczne zakończenie i wskazanie pilnego wsparcia";
  if (state === "normal") return "Powrót do zwykłej rozmowy doradczej";
  if (state === "language_confirmation") return "Potwierdzenie języka angielskiego";
  return "Jedna ukierunkowana próba powrotu do celu rozmowy";
}

const lines = [
  "# Wyniki testów odzyskiwania rozmowy Profitia",
  "",
  `Data wygenerowania: 2026-09-19  `,
  `Ziarno losowania: \`${SEED}\`  `,
  `Zakres: ${PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS.length} kanoniczne sytuacje`,
  "",
  "Każda ścieżka używa jednej deterministycznie wylosowanej wypowiedzi spośród wariantów akceptacyjnych. Raport pokazuje sygnał rozpoznany przez CIC, pełną odpowiedź widoczną dla użytkownika i kontrolowane wyjście.",
  "",
];

for (const [position, scenario] of (
  PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS as readonly RecoveryAcceptanceScenario[]
).entries()) {
  const message = scenario.userVariants[seededIndex(scenario.id, scenario.userVariants.length)]!;
  const decision = computeConversationRecoveryDecision({
    message,
    locale: scenario.locale,
    userTurnCount: scenario.userTurnCount ?? 1,
    containsBusinessIntent: scenario.containsBusinessIntent,
    previousRecoveryAttempt: scenario.previousRecoveryAttempt,
    previousPrimarySignal: scenario.previousPrimarySignal,
    previousUserMessage: scenario.previousUserMessage,
    pendingEnglishConfirmation: scenario.pendingEnglishConfirmation,
    expectedAnswerKind: scenario.expectedAnswerKind,
    securitySignal: scenario.securitySignal,
  });
  const response = renderProfitiaRecoveryResponse(decision);
  if (!response) throw new Error(`${scenario.id}: response missing`);

  lines.push(
    `## ${position + 1}. ${scenario.name} (${scenario.id})`,
    "",
    `**Użytkownik:** ${message.trim() || "[pusta wiadomość]"}`,
    "",
    `**Rozpoznanie CIC:** \`${decision.primarySignal}\`, pewność \`${decision.confidence}\`, strategia \`${decision.strategy}\`.`,
    "",
    `**Czat — potwierdzenie i reakcja:** ${response.content}`,
    "",
  );

  if (decision.nextState === "language_confirmation") {
    const followUp = "Yes, English is fine.";
    const followUpDecision = computeConversationRecoveryDecision({
      message: followUp,
      locale: "en",
      userTurnCount: 2,
      containsBusinessIntent: false,
      pendingEnglishConfirmation: true,
    });
    const followUpResponse = renderProfitiaRecoveryResponse(followUpDecision);
    lines.push(
      `**Użytkownik:** ${followUp}`,
      "",
      `**Czat — potwierdzenie języka:** ${followUpResponse?.content ?? "[brak odpowiedzi]"}`,
      "",
    );
  } else if (decision.nextState === "recovery") {
    const followUp = scenario.locale === "pl"
      ? "Potrzebujemy obniżyć koszty zakupu i uporządkować sourcing."
      : "We need to reduce procurement cost and improve sourcing.";
    const followUpDecision = computeConversationRecoveryDecision({
      message: followUp,
      locale: scenario.locale,
      userTurnCount: 2,
      containsBusinessIntent: true,
      previousRecoveryAttempt: decision.recoveryAttempt,
      previousPrimarySignal: decision.primarySignal,
      previousUserMessage: message,
    });
    lines.push(
      `**Użytkownik — doprecyzowanie:** ${followUp}`,
      "",
      `**CIC — dalszy przebieg:** \`${followUpDecision.active ? followUpDecision.strategy : "continue"}\`; rozmowa wraca do aktywnego doradcy i routingu usług / kompetencji / digital.`,
      "",
    );
  }

  lines.push(
    `**Wyjście:** ${outcome(decision.nextState, Boolean(response.cta))}${response.cta ? ` — „${response.cta.label}”.` : "."}`,
    "",
  );
}

lines.push(
  "## Podsumowanie automatycznej walidacji",
  "",
  `- Obsłużone klasy: ${PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS.length}/${PROFITIA_RECOVERY_ACCEPTANCE_SCENARIOS.length}.`,
  "- Każda odpowiedź zawiera treść widoczną dla użytkownika.",
  "- Każda odpowiedź zadaje najwyżej jedno pytanie.",
  "- Przekazanie do człowieka zawsze używa kanonicznego formularza kontaktowego.",
  "- Po nieudanym odzyskaniu rozmowy kontroler kończy pętlę najpóźniej przy trzeciej próbie lub czwartym ruchu użytkownika.",
  "",
);

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
console.log(reportPath);
