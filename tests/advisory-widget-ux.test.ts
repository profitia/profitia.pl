import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ADVISORS, WIDGET_COPY } from "@/lib/advisory-widget/config";
import { buildRecommendationRationale } from "@/lib/advisory-widget/recommendation-rationale";
import type { Message } from "@/types";

const root = process.cwd();

for (const locale of ["pl", "en"] as const) {
  assert.equal(WIDGET_COPY[locale].openingPrompts.length, 4, `${locale} should retain four approved opening prompts`);
  assert.ok(WIDGET_COPY[locale].firstContact.length > 60);
  assert.ok(WIDGET_COPY[locale].intro.includes("?"));
}

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
assert.equal(packageJson.dependencies["@profitia/advisory-widget"], "1.0.0");
const adapterSource = readFileSync(path.join(root, "features/advisory-assistant/AdvisoryAssistant.tsx"), "utf8");
assert.match(adapterSource, /@profitia\/advisory-widget/);
assert.match(adapterSource, /@profitia\/cic-core/);
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

console.log("Advisory widget UX: package migration regression checks passed");
