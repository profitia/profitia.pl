import assert from "node:assert/strict";
import { getAdvisoryDestinationById } from "@/lib/advisory-chat/destination-registry";
import { SSEDataParser } from "@/lib/advisory-chat/sse-data-parser";
import { runAdvisoryOrchestrator } from "@/lib/engines/advisory-orchestrator";
import type { AdvisoryDecision, AdvisorySession } from "@/types";
import {
  ADVISORY_ACCEPTANCE_SCENARIOS,
  appendAcceptanceMessage,
  createAcceptanceSession,
  type AdvisoryAcceptanceScenario,
} from "@/tests/fixtures/advisory-chat-acceptance";

const DEFAULT_BASE_URL = "https://profitia-pl.onrender.com";
const MAX_VISIBLE_RESPONSE_LENGTH = 600;

interface ChatResult {
  content: string;
  degraded: boolean;
}

function synchronizeSession(
  session: AdvisorySession,
  decision: AdvisoryDecision,
): void {
  const userTurnCount = decision.conversation.userTurnCount;
  session.state = {
    ...session.state,
    detectedIntent: decision.intent.primary,
    intentConfidence: decision.intent.primaryConfidence,
    urgency: decision.intent.urgency,
    maturity: decision.maturity.level,
    buyingStage: userTurnCount >= 4 ? "S4" : userTurnCount >= 2 ? "S3" : "S2",
    phase: decision.conversation.action === "recommend"
      ? "capability_recommendation"
      : "intent_discovery",
    escalationReady: decision.routing.shouldEscalateNow,
    journeyId: decision.routing.route?.journeyId ?? null,
    journeyStep: decision.routing.nextStep?.stepIndex ?? session.state.journeyStep,
  };
}

async function readChatResponse(response: Response): Promise<ChatResult> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = await response.json() as Record<string, unknown>;
    const content = typeof payload.content === "string" ? payload.content : "";
    return { content, degraded: payload.degraded === true || payload.type === "fallback" };
  }

  const reader = response.body?.getReader();
  assert.ok(reader, "Chat response did not contain a readable body");

  const decoder = new TextDecoder();
  const parser = new SSEDataParser();
  let content = "";
  let degraded = false;
  let done = false;

  const consume = (data: string) => {
    if (data === "[DONE]") {
      done = true;
      return;
    }

    const event = JSON.parse(data) as Record<string, unknown>;
    if (event.type === "text" && typeof event.content === "string") {
      content += event.content;
    }
    if (event.type === "fallback" || event.degraded === true) degraded = true;
  };

  while (!done) {
    const chunk = await reader.read();
    if (chunk.done) break;
    for (const data of parser.push(decoder.decode(chunk.value, { stream: true }))) {
      consume(data);
      if (done) break;
    }
  }

  if (!done) {
    for (const data of parser.finish()) consume(data);
  }

  return { content: content.trim(), degraded };
}

function assertVisibleResponse(
  scenario: AdvisoryAcceptanceScenario,
  action: "ask" | "recommend",
  result: ChatResult,
): void {
  assert.equal(result.degraded, false, `${scenario.id}: degraded response`);
  assert.ok(result.content.length > 0, `${scenario.id}: empty response`);
  assert.ok(
    result.content.length <= MAX_VISIBLE_RESPONSE_LENGTH,
    `${scenario.id}: response exceeded ${MAX_VISIBLE_RESPONSE_LENGTH} characters`,
  );
  assert.doesNotMatch(result.content, /```metadata|ADVISORY INTELLIGENCE CONTEXT/i, scenario.id);
  assert.doesNotMatch(result.content, /https?:\/\/|\]\(\//, `${scenario.id}: model returned a link`);

  const questionCount = result.content.match(/\?/g)?.length ?? 0;
  assert.equal(questionCount, action === "ask" ? 1 : 0, `${scenario.id}: question contract`);

  if (scenario.locale === "pl") {
    assert.doesNotMatch(
      result.content,
      /\b(cost breakdown|input costs?|sourcing decision|pricing volatility|maturity assessment zakupów|firefighting)\b/i,
      `${scenario.id}: known Polish-language anti-pattern`,
    );
  }
}

async function runScenario(
  baseUrl: string,
  scenario: AdvisoryAcceptanceScenario,
): Promise<void> {
  const uniqueSessionId = `acceptance-${scenario.id.toLowerCase()}-${Date.now()}`;
  const session = createAcceptanceSession(scenario, uniqueSessionId);

  for (const [index, turn] of scenario.turns.entries()) {
    appendAcceptanceMessage(session, "user", turn.user);
    const decision = runAdvisoryOrchestrator(session);
    synchronizeSession(session, decision);

    assert.equal(decision.conversation.action, turn.expectedAction, `${scenario.id}, turn ${index + 1}`);
    assert.equal(decision.conversation.intent, turn.expectedIntent, `${scenario.id}, turn ${index + 1}`);

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session.id,
        messages: session.messages.map(({ role, content }) => ({ role, content })),
        locale: scenario.locale,
        pageContext: session.pageContext,
        sessionState: session.state,
        advisoryDecision: decision,
      }),
    });

    assert.equal(response.ok, true, `${scenario.id}: HTTP ${response.status}`);
    const result = await readChatResponse(response);
    assertVisibleResponse(scenario, turn.expectedAction, result);
    appendAcceptanceMessage(session, "assistant", result.content);
  }

  const finalDecision = runAdvisoryOrchestrator(session).conversation;
  assert.equal(finalDecision.action, "recommend", scenario.id);
  assert.equal(finalDecision.destinationId, scenario.expectedDestinationId, scenario.id);
  assert.equal(
    getAdvisoryDestinationById(finalDecision.destinationId, scenario.locale).href,
    scenario.expectedHref,
    scenario.id,
  );
}

async function main(): Promise<void> {
  const baseUrl = (process.env.ADVISORY_ACCEPTANCE_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  const selectedId = process.argv[2];
  const scenarios = selectedId
    ? ADVISORY_ACCEPTANCE_SCENARIOS.filter(({ id }) => id === selectedId)
    : ADVISORY_ACCEPTANCE_SCENARIOS;

  assert.ok(scenarios.length > 0, `Unknown acceptance scenario: ${selectedId}`);
  console.log(`Advisory acceptance target: ${baseUrl}`);

  for (const scenario of scenarios) {
    process.stdout.write(`- ${scenario.id}: `);
    await runScenario(baseUrl, scenario);
    console.log("passed");
  }

  console.log(`Advisory live acceptance: ${scenarios.length}/${scenarios.length} journeys passed`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
