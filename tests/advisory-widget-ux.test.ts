import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  ADVISORS,
  WIDGET_COPY,
  WIDGET_MOTION,
} from "@/lib/advisory-widget/config";
import { buildRecommendationRationale } from "@/lib/advisory-widget/recommendation-rationale";
import type { Message } from "@/types";

const root = process.cwd();

for (const locale of ["pl", "en"] as const) {
  assert.equal(
    WIDGET_COPY[locale].openingPrompts.length,
    4,
    `${locale} should retain four approved opening prompts`,
  );
  assert.ok(WIDGET_COPY[locale].firstContact.length > 60);
  assert.ok(WIDGET_COPY[locale].intro.includes("?"));
}

for (const advisor of Object.values(ADVISORS)) {
  for (const density of [128, 256]) {
    const asset = path.join(
      root,
      `public/images/advisory/${advisor.id}-${density}.webp`,
    );
    assert.equal(existsSync(asset), true, `${asset} should exist`);
    assert.ok(statSync(asset).size < 10_000, `${asset} should remain lightweight`);
  }
}

const messages: Message[] = [
  {
    id: "user-1",
    role: "user",
    content: "Dane pochodzą z kilku systemów i nie widzimy pełnej struktury wydatków.",
    timestamp: 1,
  },
];

const rationale = buildRecommendationRationale(messages, "digital", "pl");
assert.equal(rationale.context, "Rozumiem z tego, co piszesz, że:");
assert.match(rationale.summary, /Dane pochodzą z kilku systemów/);
assert.equal(rationale.lead, "Jako pierwszy krok proponuję:");

const longRationale = buildRecommendationRationale(
  [{ ...messages[0], content: "a".repeat(250) }],
  "services",
  "pl",
);
assert.ok(longRationale.summary.length <= 182);
assert.ok(longRationale.summary.endsWith("…”"));

assert.equal(WIDGET_MOTION.attentionDurationSeconds, 0.9);
assert.equal(WIDGET_MOTION.invitationVisibleMs, 12_000);

const panelSource = readFileSync(
  path.join(root, "features/advisory-assistant/AssistantPanel.tsx"),
  "utf8",
);
assert.doesNotMatch(panelSource, /header-avatar/);
assert.match(panelSource, /<AdvisorMenu/);
assert.match(panelSource, /bg-\[#242F44\]/);

const messageSource = readFileSync(
  path.join(root, "features/advisory-assistant/AssistantMessage.tsx"),
  "utf8",
);
assert.match(messageSource, /<AdvisorAvatar/);

const invitationSource = readFileSync(
  path.join(root, "features/advisory-assistant/ProactivePrompt.tsx"),
  "utf8",
);
assert.match(invitationSource, /typewriterCharacterMs/);
assert.match(invitationSource, /useReducedMotion/);

const styles = readFileSync(path.join(root, "styles/globals.css"), "utf8");
assert.match(styles, /prefers-reduced-motion: reduce/);

console.log("Advisory widget UX: configuration and regression checks passed");
