import assert from "node:assert/strict";
import OpenAI from "openai";
import { nanoid } from "nanoid";
import { buildAdvisorySystemPrompt } from "@/lib/advisory-quality/system-prompt";
import { finalizeAdvisoryResponse } from "@/lib/advisory-chat/finalize-response";
import { runAdvisoryOrchestrator } from "@/lib/engines/advisory-orchestrator";
import { mergeProfitiaRoutingPreferences } from "@profitia/cic-profitia";
import type { ProfitiaRoutingPreferences } from "@profitia/cic-profitia";
import type { AdvisorySession, Message } from "@/types";

const DEFAULT_MODELS = ["gpt-4.1", "gpt-5.6-terra"] as const;

interface ComparisonScenario {
  id: string;
  locale: "pl" | "en";
  turns: readonly string[];
  expectedTerms: readonly RegExp[];
  forbiddenTerms: readonly RegExp[];
}

const SCENARIOS: readonly ComparisonScenario[] = [
  {
    id: "reported-supplier-risk-rejection",
    locale: "pl",
    turns: [
      "w czym mi mozesz pomoc?",
      "ryzyko zw z disrawcami",
      "ryzyko zwiazane z dostawcami",
      "benchmark",
      "nie uslugi doradcze, cos innego",
    ],
    expectedTerms: [/ryzyk\w* dostawc/i, /benchmark|rynk|produkt|narz[eę]dz/i],
    forbiddenTerms: [/rekomenduj\w* us[łl]ug\w* doradcz/i, /kr[oó]tk\w* rozmow/i],
  },
  {
    id: "negotiation-products-instead-of-advisory",
    locale: "pl",
    turns: [
      "Dostawca chce podnieść cenę o 14 procent.",
      "Potrzebuję benchmarku przed negocjacjami.",
      "Nie chcę usług doradczych, wolę konkretne narzędzie lub produkt.",
    ],
    expectedTerms: [/benchmark|rynk|produkt|narz[eę]dz/i],
    forbiddenTerms: [/rekomenduj\w* us[łl]ug\w* doradcz/i],
  },
  {
    id: "english-product-alternative",
    locale: "en",
    turns: [
      "We need market benchmarks before a supplier negotiation.",
      "Not advisory services. Show me a product or tool instead.",
    ],
    expectedTerms: [/benchmark|market|product|tool/i],
    forbiddenTerms: [/recommend\w* advisory services/i],
  },
] as const;

function createSession(scenario: ComparisonScenario): AdvisorySession {
  const messages: Message[] = scenario.turns.map((content, index) => ({
    id: `${scenario.id}-${index + 1}`,
    role: "user",
    content,
    timestamp: index + 1,
  }));
  const routingPreferences = scenario.turns.reduce<ProfitiaRoutingPreferences>(
    (preferences, message) => mergeProfitiaRoutingPreferences(preferences, message),
    { excludedDestinationIds: [] },
  );
  return {
    id: `model-comparison-${nanoid()}`,
    locale: scenario.locale,
    startedAt: Date.now(),
    lastActivityAt: Date.now(),
    pageContext: {
      slug: scenario.locale === "pl" ? "/" : "/en",
      primaryIntent: "I7_EXPLORATORY",
      secondaryIntents: [],
      conversionTier: 4,
      escalationReadiness: "low",
    },
    messages,
    state: {
      phase: "intent_discovery",
      detectedIntent: "UNKNOWN",
      intentConfidence: 0,
      urgency: "U3",
      buyingStage: "S3",
      maturity: "unknown",
      journeyId: null,
      journeyStep: 0,
      escalationReady: false,
      ctaFatigue: 0,
      engagementScore: 40,
      routingPreferences,
    },
    intelligence: {
      pagesVisited: [scenario.locale === "pl" ? "/" : "/en"],
      scrollDepth: {},
      timeOnPage: {},
      behavioralSignals: [],
      recommendationsShown: [],
      ctasShown: [],
      ctaClicked: null,
    },
  };
}

function scoreResponse(scenario: ComparisonScenario, content: string): number {
  let score = 0;
  if (content.length > 0 && content.length <= 600) score += 2;
  if ((content.match(/\?/g) ?? []).length === 0) score += 2;
  if (!/https?:\/\/|\]\(\//.test(content)) score += 1;
  score += scenario.expectedTerms.filter((pattern) => pattern.test(content)).length * 2;
  score += scenario.forbiddenTerms.every((pattern) => !pattern.test(content)) ? 3 : 0;
  return score;
}

async function runScenario(openai: OpenAI, model: string, scenario: ComparisonScenario) {
  const session = createSession(scenario);
  const decision = runAdvisoryOrchestrator(session);
  session.state = {
    ...session.state,
    detectedIntent: decision.intent.primary,
    intentConfidence: decision.intent.primaryConfidence,
    urgency: decision.intent.urgency,
    maturity: decision.maturity.level,
  };
  assert.equal(decision.conversation.action, "recommend", scenario.id);
  assert.equal(decision.conversation.destinationId, "products", scenario.id);

  const systemPrompt = buildAdvisorySystemPrompt({
    locale: scenario.locale,
    pageContext: session.pageContext,
    sessionState: session.state,
    decision,
    messageCount: session.messages.length,
    userMessageCount: scenario.turns.length,
  });
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...session.messages.map(({ role, content }) => ({ role: role as "user", content })),
    ],
    max_completion_tokens: 350,
  });
  const raw = completion.choices[0]?.message?.content ?? "";
  const finalized = finalizeAdvisoryResponse(raw, {
    questionLimit: 0,
    emptyContentFallback: "",
  });
  return {
    model,
    scenario: scenario.id,
    destinationId: decision.conversation.destinationId,
    score: scoreResponse(scenario, finalized.content),
    response: finalized.content,
    usage: completion.usage ?? null,
  };
}

async function main(): Promise<void> {
  assert.ok(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is required");
  const models = (process.env.ADVISORY_COMPARISON_MODELS ?? DEFAULT_MODELS.join(","))
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
  assert.equal(models.length, 2, "Exactly two comparison models are required");

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const results: Array<Awaited<ReturnType<typeof runScenario>>> = [];
  for (const model of models) {
    for (const scenario of SCENARIOS) {
      results.push(await runScenario(openai, model, scenario));
    }
  }

  const summary = models.map((model) => {
    const modelResults = results.filter((result) => result.model === model);
    return {
      model,
      totalScore: modelResults.reduce((sum, result) => sum + result.score, 0),
      maxScore: modelResults.length * 12,
      scenarios: modelResults.length,
      promptTokens: modelResults.reduce((sum, result) => sum + (result.usage?.prompt_tokens ?? 0), 0),
      completionTokens: modelResults.reduce((sum, result) => sum + (result.usage?.completion_tokens ?? 0), 0),
    };
  });

  console.log(JSON.stringify({ models, summary, results }, null, 2));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
