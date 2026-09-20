import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ADVISORS, WIDGET_COPY } from "@/lib/advisory-widget/config";
import { buildRecommendationRationale } from "@/lib/advisory-widget/recommendation-rationale";
import { getOpeningScenarios } from "@/lib/advisory-widget/scenarios";
import type { Message } from "@/types";

const root = process.cwd();

for (const locale of ["pl", "en"] as const) {
  const scenarios = getOpeningScenarios(locale);
  assert.equal(scenarios.length, 5, `${locale} should expose five approved opening scenarios`);
  assert.equal(new Set(scenarios.map(({ id }) => id)).size, 5, `${locale} scenario IDs should be stable and unique`);
  assert.ok(scenarios.every(({ question }) => question.endsWith("?")));
  assert.ok(scenarios.every(({ quickReplies }) => quickReplies.selectionMode === "multiple"));
  assert.ok(WIDGET_COPY[locale].firstContact.length > 60);
  assert.ok(WIDGET_COPY[locale].intro.includes("?"));
  assert.doesNotMatch(WIDGET_COPY[locale].scenarioResolved, /\?/);
}

assert.equal(getOpeningScenarios("pl")[0]?.prompt.label, "Mój dostawca zamierza podnieść ceny.");
assert.equal(getOpeningScenarios("pl")[1]?.question, "Które kategorie zakupowe generują największe wydatki?");
assert.equal(getOpeningScenarios("pl")[2]?.question, "Co ma być najważniejszym celem strategii kategorii?");
assert.equal(WIDGET_COPY.pl.advisorTitle("Adam"), "Jestem Adam, Twój doradca");
assert.equal(WIDGET_COPY.pl.advisorTitle("Anna"), "Jestem Anna, Twoja doradczyni");
assert.equal(WIDGET_COPY.pl.resetLabel, "Zacznij od nowa");

for (const advisor of Object.values(ADVISORS)) {
  for (const density of [128, 256]) {
    const asset = path.join(root, `public/images/advisory/${advisor.id}-${density}.webp`);
    assert.equal(existsSync(asset), true, `${asset} should exist`);
    assert.ok(statSync(asset).size < 10_000, `${asset} should remain lightweight`);
  }
}

const messages: Message[] = [{
  id: "user-1",
  role: "user",
  content: "Dane pochodzą z kilku systemów i nie widzimy pełnej struktury wydatków.",
  timestamp: 1,
}];
const rationale = buildRecommendationRationale(messages, "digital", "pl");
assert.equal(rationale.context, "Rozumiem z tego, co piszesz, że:");
assert.match(rationale.summary, /Dane pochodzą z kilku systemów/);
assert.equal(rationale.lead, "Jako pierwszy krok proponuję:");
assert.ok(buildRecommendationRationale([{ ...messages[0], content: "a".repeat(250) }], "services", "pl").summary.endsWith("…”"));

const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
assert.equal(packageJson.dependencies["@profitia/advisory-widget"], "1.2.0");
assert.equal(packageJson.dependencies["@profitia/cic-core"], "1.2.1");
const adapterSource = readFileSync(path.join(root, "features/advisory-assistant/AdvisoryAssistant.tsx"), "utf8");
assert.match(adapterSource, /@profitia\/advisory-widget/);
assert.match(adapterSource, /@profitia\/cic-core/);
assert.match(adapterSource, /strings\.scenarioResolved/);
assert.match(adapterSource, /initializedLocale\.current === locale/);
assert.match(adapterSource, /quickReplyMessageId\s*\? PHASE_LABELS\.opening\[conversationLocale\]/);
assert.match(adapterSource, /onReset=\{handleReset\}/);
assert.doesNotMatch(adapterSource, /framer-motion/);

for (const replacedFile of [
  "AdvisorAvatar.tsx", "AdvisorMenu.tsx", "AssistantFooter.tsx", "AssistantMessage.tsx",
  "AssistantPanel.tsx", "AssistantTrigger.tsx", "MessageInput.tsx", "MessageList.tsx",
  "ProactivePrompt.tsx", "RecommendationStrip.tsx",
]) {
  assert.equal(existsSync(path.join(root, "features/advisory-assistant", replacedFile)), false);
}

const packageStyles = readFileSync(path.join(root, "node_modules/@profitia/advisory-widget/dist/styles.css"), "utf8");
assert.match(packageStyles, /prefers-reduced-motion: reduce/);
assert.match(packageStyles, /@media \(max-width: 640px\)/);
assert.match(packageStyles, /width: 100dvw/);
assert.match(packageStyles, /height: 100dvh/);
assert.match(packageStyles, /paw-quick-reply--selected/);
assert.match(packageStyles, /--paw-panel-max-height: 700px/);
assert.match(packageStyles, /paw-footer__reset/);
assert.match(packageStyles, /paw-history-enter/);

console.log("Advisory widget UX: package migration regression checks passed");
