// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Benchmark Runner
// Usage: npx ts-node --project tsconfig.json scripts/run-benchmarks.ts
// Or: npx tsx scripts/run-benchmarks.ts
// ─────────────────────────────────────────────────────────

import OpenAI from "openai";
import { BENCHMARK_SUITE, type BenchmarkScenario } from "@/lib/advisory-quality/benchmark-suite";
import { evaluateAdvisoryQuality } from "@/lib/advisory-quality/quality-evaluator";
import { applyHallucinationGuardrails } from "@/lib/advisory-quality/hallucination-guard";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Minimal system prompt for benchmark (no session context) ──
function getBenchmarkSystemPrompt(scenario: BenchmarkScenario): string {
  const isPL = scenario.locale === "pl";
  return isPL
    ? `Jesteś doradcą zakupowym Profitia Management Consultants. Odpowiedz jak senior procurement advisor — konkretnie, procurementowo, bez chatbot tone. Maksymalnie 2 krótkie akapity. Urgency: ${scenario.urgency}. Phase: ${scenario.phase}.`
    : `You are a procurement advisor at Profitia Management Consultants. Respond like a senior procurement advisor — specific, procurement-focused, no chatbot tone. Maximum 2 short paragraphs. Urgency: ${scenario.urgency}. Phase: ${scenario.phase}.`;
}

interface BenchmarkResult {
  scenario: BenchmarkScenario;
  response: string;
  qualityReport: ReturnType<typeof evaluateAdvisoryQuality>;
  mustContainPassed: boolean;
  mustNotContainPassed: boolean;
  hallucinationIssues: string[];
  passed: boolean;
}

async function runScenario(scenario: BenchmarkScenario): Promise<BenchmarkResult> {
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_PRIMARY_MODEL ?? "gpt-4.1",
    messages: [
      { role: "system", content: getBenchmarkSystemPrompt(scenario) },
      { role: "user", content: scenario.userMessage },
    ],
    max_tokens: 500,
    temperature: 0.28,
  });

  const rawResponse = completion.choices[0]?.message?.content ?? "";
  const guardrail = applyHallucinationGuardrails(rawResponse);
  const response = guardrail.sanitizedContent;

  const qualityReport = evaluateAdvisoryQuality({
    response,
    locale: scenario.locale,
    urgency: scenario.urgency,
    phase: scenario.phase,
    hallucinationIssueCount: guardrail.issues.length,
  });

  const lowerResponse = response.toLowerCase();
  const mustContainPassed = scenario.mustContain.every((p) => lowerResponse.includes(p.toLowerCase()));
  const mustNotContainPassed = scenario.mustNotContain.every((p) => !lowerResponse.includes(p.toLowerCase()));

  const thresholds = scenario.qualityThresholds;
  const dimsPassed =
    qualityReport.dimensions.procurementReasoning.score >= thresholds.procurementReasoning &&
    qualityReport.dimensions.recommendationQuality.score >= thresholds.recommendationQuality &&
    qualityReport.dimensions.escalationQuality.score >= thresholds.escalationQuality &&
    qualityReport.dimensions.responseCompression.score >= thresholds.responseCompression &&
    qualityReport.dimensions.executiveTone.score >= thresholds.executiveTone &&
    qualityReport.overallScore >= thresholds.overallMin;

  return {
    scenario,
    response,
    qualityReport,
    mustContainPassed,
    mustNotContainPassed,
    hallucinationIssues: guardrail.issues,
    passed: mustContainPassed && mustNotContainPassed && dimsPassed,
  };
}

function printResult(result: BenchmarkResult): void {
  const { scenario, qualityReport, passed } = result;
  const icon = passed ? "✓" : "✗";
  console.log(`\n${icon} [${scenario.id}] ${scenario.name} (${scenario.locale.toUpperCase()}, ${scenario.urgency})`);
  console.log(`  Overall: ${qualityReport.overallScore}/100 (threshold: ${scenario.qualityThresholds.overallMin})`);
  console.log(`  Dims: PR=${qualityReport.dimensions.procurementReasoning.score} RQ=${qualityReport.dimensions.recommendationQuality.score} EQ=${qualityReport.dimensions.escalationQuality.score} RC=${qualityReport.dimensions.responseCompression.score} ET=${qualityReport.dimensions.executiveTone.score}`);
  if (!result.mustContainPassed) console.log(`  ✗ mustContain FAILED: ${scenario.mustContain.join(", ")}`);
  if (!result.mustNotContainPassed) console.log(`  ✗ mustNotContain FAILED`);
  if (result.hallucinationIssues.length > 0) console.log(`  ⚠ Hallucination: ${result.hallucinationIssues.join("; ")}`);
  if (qualityReport.suggestions.length > 0 && !passed) console.log(`  → ${qualityReport.suggestions[0]}`);
  if (!passed) console.log(`  Response: ${result.response.slice(0, 200)}...`);
}

async function main(): Promise<void> {
  const scenarios = BENCHMARK_SUITE;
  const target = process.argv[2]; // optional: run single benchmark by ID

  const toRun = target ? scenarios.filter((s) => s.id === target) : scenarios;
  if (toRun.length === 0) {
    console.error(`No benchmark found: ${target}`);
    process.exit(1);
  }

  console.log(`\n🔬 ETAP 4.5 Advisory Quality Benchmark`);
  console.log(`Running ${toRun.length} scenario(s)...\n`);

  const results: BenchmarkResult[] = [];
  for (const scenario of toRun) {
    process.stdout.write(`  Running ${scenario.id}...`);
    try {
      const result = await runScenario(scenario);
      results.push(result);
      printResult(result);
    } catch (err) {
      console.error(`\n  ERROR in ${scenario.id}: ${err}`);
    }
    // Rate limit protection
    await new Promise((r) => setTimeout(r, 500));
  }

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;
  const avgScore = Math.round(results.reduce((s, r) => s + r.qualityReport.overallScore, 0) / total);

  console.log(`\n${"─".repeat(60)}`);
  console.log(`RESULTS: ${passed}/${total} passed | Average score: ${avgScore}/100`);
  console.log(`Pass rate: ${Math.round((passed / total) * 100)}%`);

  if (passed < total) {
    const failed = results.filter((r) => !r.passed);
    console.log(`\nFailed scenarios: ${failed.map((r) => r.scenario.id).join(", ")}`);
    process.exit(1);
  }
}

main().catch(console.error);
