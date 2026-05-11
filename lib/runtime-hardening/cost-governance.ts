// ─────────────────────────────────────────────────────────
// ETAP 5 — AI Cost Governance + Model Routing
// Token budgets, model selection per task type,
// cost telemetry, adaptive compression, runtime budgeting.
// ─────────────────────────────────────────────────────────

// ── Model Registry ────────────────────────────────────────
export type ModelId =
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "gpt-4o"
  | "gpt-4o-mini";

export interface ModelProfile {
  id: ModelId;
  inputCostPer1M: number;   // USD per 1M input tokens
  outputCostPer1M: number;  // USD per 1M output tokens
  maxTokens: number;
  latencyClass: "fast" | "medium" | "slow";
  qualityClass: "high" | "medium" | "low";
}

export const MODEL_PROFILES: Record<ModelId, ModelProfile> = {
  "gpt-4.1": {
    id: "gpt-4.1",
    inputCostPer1M: 2.0,
    outputCostPer1M: 8.0,
    maxTokens: 32768,
    latencyClass: "medium",
    qualityClass: "high",
  },
  "gpt-4.1-mini": {
    id: "gpt-4.1-mini",
    inputCostPer1M: 0.4,
    outputCostPer1M: 1.6,
    maxTokens: 32768,
    latencyClass: "fast",
    qualityClass: "medium",
  },
  "gpt-4.1-nano": {
    id: "gpt-4.1-nano",
    inputCostPer1M: 0.1,
    outputCostPer1M: 0.4,
    maxTokens: 32768,
    latencyClass: "fast",
    qualityClass: "low",
  },
  "gpt-4o": {
    id: "gpt-4o",
    inputCostPer1M: 2.5,
    outputCostPer1M: 10.0,
    maxTokens: 128000,
    latencyClass: "slow",
    qualityClass: "high",
  },
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.6,
    maxTokens: 128000,
    latencyClass: "fast",
    qualityClass: "medium",
  },
};

// ── Task Types ────────────────────────────────────────────
export type TaskType =
  | "advisory_chat"      // Main advisory streaming — quality-critical
  | "orchestration"      // Intent/maturity classification — accuracy needed
  | "recommendation"     // Recommendation generation — can be lighter
  | "compression"        // Summarization/compression — cheapest
  | "escalation"         // High-urgency escalation — quality-critical
  | "fallback";          // Degraded mode — cheapest available

// ── Model Routing ─────────────────────────────────────────
export interface RoutingContext {
  taskType: TaskType;
  urgency: "U1" | "U2" | "U3";
  sessionDepth: number;
  budgetMode: "premium" | "standard" | "economy";
  isDegraded: boolean;
}

export function selectModel(ctx: RoutingContext): ModelId {
  const envModel = process.env.OPENAI_PRIMARY_MODEL as ModelId | undefined;

  // Degraded mode always uses cheapest
  if (ctx.isDegraded || ctx.taskType === "fallback") {
    return "gpt-4.1-mini";
  }

  // Compression and recommendation can use lighter model
  if (ctx.taskType === "compression") return "gpt-4.1-mini";
  if (ctx.taskType === "recommendation" && ctx.urgency === "U3") return "gpt-4.1-mini";

  // Economy budget mode
  if (ctx.budgetMode === "economy") return "gpt-4.1-mini";

  // U1 escalation — always quality
  if (ctx.urgency === "U1" && ctx.taskType === "escalation") return "gpt-4.1";

  // High urgency advisory — quality
  if (ctx.urgency === "U1") return "gpt-4.1";

  // Standard: use configured model or default
  if (envModel && MODEL_PROFILES[envModel]) return envModel;
  return "gpt-4.1";
}

// ── Token Budget Manager ──────────────────────────────────
interface DailyBudget {
  date: string;           // YYYY-MM-DD
  tokensUsed: number;
  estimatedCostUsd: number;
  requestCount: number;
}

let dailyBudget: DailyBudget = {
  date: new Date().toISOString().slice(0, 10),
  tokensUsed: 0,
  estimatedCostUsd: 0,
  requestCount: 0,
};

// Configurable limits
const DAILY_TOKEN_LIMIT = parseInt(process.env.DAILY_TOKEN_LIMIT ?? "500000"); // 500k/day default
const DAILY_COST_LIMIT_USD = parseFloat(process.env.DAILY_COST_LIMIT_USD ?? "5.0"); // $5/day default

function resetBudgetIfNewDay(): void {
  const today = new Date().toISOString().slice(0, 10);
  if (dailyBudget.date !== today) {
    dailyBudget = { date: today, tokensUsed: 0, estimatedCostUsd: 0, requestCount: 0 };
  }
}

export interface BudgetCheckResult {
  allowed: boolean;
  reason?: string;
  remainingTokens: number;
  remainingCostUsd: number;
  budgetMode: "premium" | "standard" | "economy";
}

export function checkBudget(estimatedTokens: number, model: ModelId): BudgetCheckResult {
  resetBudgetIfNewDay();

  const profile = MODEL_PROFILES[model] ?? MODEL_PROFILES["gpt-4.1"];
  const estimatedCost = (estimatedTokens / 1_000_000) * (profile.inputCostPer1M + profile.outputCostPer1M) / 2;

  const remainingTokens = DAILY_TOKEN_LIMIT - dailyBudget.tokensUsed;
  const remainingCost = DAILY_COST_LIMIT_USD - dailyBudget.estimatedCostUsd;

  if (remainingTokens <= 0 || remainingCost <= 0) {
    return {
      allowed: false,
      reason: "Daily budget exceeded",
      remainingTokens: Math.max(0, remainingTokens),
      remainingCostUsd: Math.max(0, remainingCost),
      budgetMode: "economy",
    };
  }

  // Budget mode based on utilization
  const tokenUtilization = dailyBudget.tokensUsed / DAILY_TOKEN_LIMIT;
  const budgetMode: "premium" | "standard" | "economy" =
    tokenUtilization > 0.8 ? "economy" :
    tokenUtilization > 0.5 ? "standard" : "premium";

  return {
    allowed: true,
    remainingTokens,
    remainingCostUsd: remainingCost,
    budgetMode,
  };
}

export function recordTokenSpend(tokens: number, model: ModelId): void {
  resetBudgetIfNewDay();
  const profile = MODEL_PROFILES[model] ?? MODEL_PROFILES["gpt-4.1"];
  const cost = (tokens / 1_000_000) * ((profile.inputCostPer1M + profile.outputCostPer1M) / 2);
  dailyBudget.tokensUsed += tokens;
  dailyBudget.estimatedCostUsd += cost;
  dailyBudget.requestCount++;
}

export function getBudgetStatus(): DailyBudget & {
  tokenUtilization: number;
  costUtilization: number;
  budgetMode: "premium" | "standard" | "economy";
} {
  resetBudgetIfNewDay();
  const tokenUtilization = dailyBudget.tokensUsed / DAILY_TOKEN_LIMIT;
  const costUtilization = dailyBudget.estimatedCostUsd / DAILY_COST_LIMIT_USD;
  return {
    ...dailyBudget,
    tokenUtilization,
    costUtilization,
    budgetMode: tokenUtilization > 0.8 ? "economy" : tokenUtilization > 0.5 ? "standard" : "premium",
  };
}

// ── Adaptive Token Budget per Request ────────────────────
export function adaptiveMaxTokens(
  baseTokens: number,
  budgetMode: "premium" | "standard" | "economy"
): number {
  const multipliers = { premium: 1.0, standard: 0.8, economy: 0.6 };
  return Math.round(baseTokens * multipliers[budgetMode]);
}

export function estimateRequestCost(model: ModelId, maxTokens: number): number {
  const profile = MODEL_PROFILES[model] ?? MODEL_PROFILES["gpt-4.1"];
  // Rough estimate: system prompt ~500 tokens input, maxTokens output
  return ((500 + maxTokens) / 1_000_000) * profile.outputCostPer1M;
}
