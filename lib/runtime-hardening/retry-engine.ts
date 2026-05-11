// ─────────────────────────────────────────────────────────
// ETAP 5 — Intelligent Retry Engine
// Classifies failure types and retries with smart backoff.
// NOT a naive retry(3) — understands WHY it failed.
// ─────────────────────────────────────────────────────────

// ── Failure Classification ────────────────────────────────
export type FailureClass =
  | "openai_timeout"
  | "openai_rate_limit"
  | "openai_server_error"
  | "openai_invalid_response"
  | "streaming_interrupted"
  | "schema_violation"
  | "orchestration_conflict"
  | "network_error"
  | "budget_exceeded"
  | "non_retryable";

export interface RetryContext {
  attempt: number;         // 1-based
  failureClass: FailureClass;
  lastError: Error | string;
  totalElapsedMs: number;
  idempotencyKey: string;
}

export interface RetryDecision {
  shouldRetry: boolean;
  delayMs: number;
  degradeMode: boolean;
  reason: string;
}

// ── Max attempts per failure class ───────────────────────
const MAX_ATTEMPTS: Record<FailureClass, number> = {
  openai_timeout: 3,
  openai_rate_limit: 2,
  openai_server_error: 3,
  openai_invalid_response: 2,
  streaming_interrupted: 3,
  schema_violation: 2,
  orchestration_conflict: 2,
  network_error: 3,
  budget_exceeded: 1,
  non_retryable: 1,
};

// ── Backoff strategy per class ────────────────────────────
function computeBackoff(ctx: RetryContext): number {
  const { attempt, failureClass } = ctx;
  const base = {
    openai_timeout: 1500,
    openai_rate_limit: 5000,  // Rate limits need longer wait
    openai_server_error: 2000,
    openai_invalid_response: 800,
    streaming_interrupted: 500,
    schema_violation: 300,
    orchestration_conflict: 400,
    network_error: 1000,
    budget_exceeded: 0,
    non_retryable: 0,
  }[failureClass] ?? 1000;

  // Exponential with jitter
  const exp = base * Math.pow(1.8, attempt - 1);
  const jitter = Math.random() * 400;
  return Math.min(exp + jitter, 15000); // cap at 15s
}

// ── Failure Classifier ────────────────────────────────────
export function classifyFailure(error: unknown): FailureClass {
  const msg = error instanceof Error ? error.message : String(error);
  const status = (error as { status?: number }).status;

  if (status === 429 || msg.includes("rate limit") || msg.includes("quota")) {
    return "openai_rate_limit";
  }
  if (status === 408 || msg.includes("timeout") || msg.includes("aborted") || msg.includes("ETIMEDOUT")) {
    return "openai_timeout";
  }
  if (status && status >= 500) {
    return "openai_server_error";
  }
  if (msg.includes("stream") || msg.includes("SSE") || msg.includes("EventSource")) {
    return "streaming_interrupted";
  }
  if (msg.includes("schema") || msg.includes("parse") || msg.includes("JSON")) {
    return "schema_violation";
  }
  if (msg.includes("orchestration") || msg.includes("conflict")) {
    return "orchestration_conflict";
  }
  if (msg.includes("budget") || msg.includes("cost")) {
    return "budget_exceeded";
  }
  if (msg.includes("fetch") || msg.includes("network") || msg.includes("ECONNREFUSED")) {
    return "network_error";
  }
  if (status && status >= 400 && status < 500) {
    return "non_retryable";
  }
  return "openai_invalid_response";
}

// ── Retry Decision ─────────────────────────────────────────
export function evaluateRetry(ctx: RetryContext): RetryDecision {
  const { attempt, failureClass, totalElapsedMs } = ctx;
  const maxAttempts = MAX_ATTEMPTS[failureClass] ?? 2;

  // Hard limits
  if (failureClass === "non_retryable" || failureClass === "budget_exceeded") {
    return { shouldRetry: false, delayMs: 0, degradeMode: true, reason: `${failureClass} — not retryable` };
  }
  if (attempt >= maxAttempts) {
    return { shouldRetry: false, delayMs: 0, degradeMode: true, reason: `Max attempts (${maxAttempts}) reached` };
  }
  if (totalElapsedMs > 20000) {
    return { shouldRetry: false, delayMs: 0, degradeMode: true, reason: "Total retry window (20s) exceeded" };
  }

  const delayMs = computeBackoff(ctx);
  return { shouldRetry: true, delayMs, degradeMode: false, reason: `Retrying ${failureClass} (attempt ${attempt + 1}/${maxAttempts})` };
}

// ── Retry Executor ─────────────────────────────────────────
export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: {
    idempotencyKey: string;
    onRetry?: (ctx: RetryContext) => void;
    onDegrade?: (ctx: RetryContext) => T;
  }
): Promise<T> {
  let attempt = 1;
  const startTime = Date.now();

  while (true) {
    try {
      return await fn();
    } catch (error) {
      const failureClass = classifyFailure(error);
      const ctx: RetryContext = {
        attempt,
        failureClass,
        lastError: error instanceof Error ? error : String(error),
        totalElapsedMs: Date.now() - startTime,
        idempotencyKey: opts.idempotencyKey,
      };

      const decision = evaluateRetry(ctx);
      opts.onRetry?.(ctx);

      if (!decision.shouldRetry) {
        if (opts.onDegrade) return opts.onDegrade(ctx);
        throw error;
      }

      await new Promise((r) => setTimeout(r, decision.delayMs));
      attempt++;
    }
  }
}

// ── Idempotency Key Generator ──────────────────────────────
export function generateIdempotencyKey(sessionId: string, messageCount: number): string {
  return `${sessionId}:msg${messageCount}:${Date.now().toString(36)}`;
}
