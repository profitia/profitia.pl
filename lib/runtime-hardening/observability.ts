// ─────────────────────────────────────────────────────────
// ETAP 5 — Runtime Observability
// Structured logging, metrics, telemetry.
// Pluggable: console (default) → PostHog / Langfuse / Sentry
// ─────────────────────────────────────────────────────────

// ── Log Level ─────────────────────────────────────────────
type LogLevel = "debug" | "info" | "warn" | "error";

// ── Metric Types ───────────────────────────────────────────
export type MetricName =
  | "advisory.request.start"
  | "advisory.request.complete"
  | "advisory.request.error"
  | "advisory.stream.start"
  | "advisory.stream.complete"
  | "advisory.stream.error"
  | "advisory.stream.chunk"
  | "advisory.stream.stale"
  | "advisory.retry.attempt"
  | "advisory.retry.exhausted"
  | "advisory.fallback.activated"
  | "advisory.degraded.mode"
  | "advisory.rate_limit.hit"
  | "advisory.security.blocked"
  | "advisory.hallucination.detected"
  | "advisory.escalation.shown"
  | "advisory.recommendation.shown"
  | "advisory.session.created"
  | "advisory.session.restored"
  | "advisory.quality.score"
  | "advisory.cost.tokens"
  | "advisory.cost.estimated_usd"
  | "advisory.health.check";

export interface MetricEvent {
  name: MetricName;
  ts: number;
  sessionId?: string;
  locale?: string;
  value?: number;
  unit?: "ms" | "tokens" | "count" | "usd" | "score";
  tags?: Record<string, string | number | boolean>;
}

export interface TraceSpan {
  spanId: string;
  name: string;
  startedAt: number;
  endedAt?: number;
  sessionId?: string;
  tags: Record<string, string | number | boolean>;
  error?: string;
}

// ── In-memory metric ring buffer ──────────────────────────
const MAX_METRICS = 2000;
const metricsBuffer: MetricEvent[] = [];

function pushMetric(event: MetricEvent): void {
  metricsBuffer.push(event);
  if (metricsBuffer.length > MAX_METRICS) metricsBuffer.shift();
}

// ── Structured Logger ─────────────────────────────────────
function log(level: LogLevel, message: string, ctx?: Record<string, unknown>): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    service: "advisory-runtime",
    msg: message,
    ...ctx,
  };

  if (process.env.NODE_ENV === "production") {
    // Structured JSON for log aggregators (Render logs → Papertrail/Datadog)
    console[level === "debug" ? "log" : level](JSON.stringify(entry));
  } else {
    const prefix = { debug: "🔍", info: "ℹ️", warn: "⚠️", error: "🔴" }[level];
    console[level === "debug" ? "log" : level](`${prefix} [advisory] ${message}`, ctx ?? "");
  }
}

// ── Span tracking ─────────────────────────────────────────
const activeSpans = new Map<string, TraceSpan>();

export function startSpan(name: string, sessionId?: string, tags?: Record<string, string | number | boolean>): string {
  const spanId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  activeSpans.set(spanId, {
    spanId,
    name,
    startedAt: Date.now(),
    sessionId,
    tags: tags ?? {},
  });
  return spanId;
}

export function endSpan(spanId: string, error?: string): TraceSpan | null {
  const span = activeSpans.get(spanId);
  if (!span) return null;
  span.endedAt = Date.now();
  if (error) span.error = error;
  activeSpans.delete(spanId);

  const durationMs = span.endedAt - span.startedAt;
  log("debug", `Span: ${span.name}`, { spanId, durationMs, sessionId: span.sessionId, error });
  return span;
}

// ── Public observability API ──────────────────────────────
export const obs = {
  // Logging
  debug: (msg: string, ctx?: Record<string, unknown>) => log("debug", msg, ctx),
  info: (msg: string, ctx?: Record<string, unknown>) => log("info", msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => log("warn", msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => log("error", msg, ctx),

  // Metrics
  metric(name: MetricName, value?: number, tags?: Record<string, string | number | boolean>, sessionId?: string): void {
    const event: MetricEvent = { name, ts: Date.now(), value, sessionId, tags };
    pushMetric(event);
    if (process.env.ENABLE_METRIC_LOGS === "true") {
      log("debug", `Metric: ${name}`, { value, tags, sessionId });
    }
    // PostHog integration (optional)
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && typeof globalThis !== "undefined") {
      // Server-side PostHog would be called here
    }
  },

  // Timing helper
  timed<T>(name: string, fn: () => Promise<T>, sessionId?: string): Promise<T> {
    const spanId = startSpan(name, sessionId);
    return fn().then(
      (result) => { endSpan(spanId); return result; },
      (err) => { endSpan(spanId, String(err)); throw err; }
    );
  },

  // Advisory request lifecycle
  requestStart(sessionId: string, locale: string, messageCount: number): void {
    this.metric("advisory.request.start", messageCount, { locale }, sessionId);
    log("info", "Advisory request started", { sessionId, locale, messageCount });
  },

  requestComplete(sessionId: string, durationMs: number, tokenCount: number): void {
    this.metric("advisory.request.complete", durationMs, { unit: "ms", tokenCount }, sessionId);
    if (durationMs > 5000) {
      log("warn", "Slow advisory response", { sessionId, durationMs });
    }
  },

  requestError(sessionId: string, error: string, failureClass: string): void {
    this.metric("advisory.request.error", 1, { failureClass }, sessionId);
    log("error", "Advisory request failed", { sessionId, error, failureClass });
  },

  streamEvent(sessionId: string, event: "start" | "complete" | "error" | "stale", detail?: Record<string, unknown>): void {
    const metricName = `advisory.stream.${event}` as MetricName;
    this.metric(metricName, 1, undefined, sessionId);
    const level = event === "error" || event === "stale" ? "warn" : "debug";
    log(level, `Stream ${event}`, { sessionId, ...detail });
  },

  retryAttempt(sessionId: string, attempt: number, failureClass: string, delayMs: number): void {
    this.metric("advisory.retry.attempt", attempt, { failureClass, delayMs }, sessionId);
    log("warn", "Retry attempt", { sessionId, attempt, failureClass, delayMs });
  },

  fallbackActivated(sessionId: string, reason: string): void {
    this.metric("advisory.fallback.activated", 1, { reason }, sessionId);
    log("warn", "Fallback activated", { sessionId, reason });
  },

  hallucinationDetected(sessionId: string, issues: string[]): void {
    this.metric("advisory.hallucination.detected", issues.length, undefined, sessionId);
    log("warn", "Hallucination detected", { sessionId, count: issues.length, issues });
  },

  tokenUsage(sessionId: string, promptTokens: number, completionTokens: number, model: string): void {
    const total = promptTokens + completionTokens;
    // Approximate cost: GPT-4.1 ~$2/1M input, $8/1M output
    const estimatedUsd = (promptTokens / 1_000_000) * 2 + (completionTokens / 1_000_000) * 8;
    this.metric("advisory.cost.tokens", total, { model, promptTokens, completionTokens }, sessionId);
    this.metric("advisory.cost.estimated_usd", estimatedUsd, { model }, sessionId);
  },

  qualityScore(sessionId: string, score: number, locale: string): void {
    this.metric("advisory.quality.score", score, { locale }, sessionId);
    if (score < 50) log("warn", "Low advisory quality score", { sessionId, score });
  },

  // Security
  securityBlock(sessionId: string, reason: string): void {
    this.metric("advisory.security.blocked", 1, { reason }, sessionId);
    log("warn", "Security block", { sessionId, reason });
  },

  rateLimitHit(ip: string, sessionId?: string): void {
    this.metric("advisory.rate_limit.hit", 1, { ip }, sessionId);
    log("warn", "Rate limit hit", { ip, sessionId });
  },
};

// ── Metrics Query API ─────────────────────────────────────
export function getMetricsSummary(): {
  totalRequests: number;
  totalErrors: number;
  avgQualityScore: number;
  totalTokens: number;
  estimatedCostUsd: number;
  fallbackCount: number;
  hallucinationCount: number;
  retryCount: number;
  rateLimitCount: number;
  recentMetrics: MetricEvent[];
} {
  const counts: Record<string, number> = {};
  let totalQuality = 0, qualityCount = 0;
  let totalTokens = 0, totalCost = 0;

  for (const m of metricsBuffer) {
    counts[m.name] = (counts[m.name] ?? 0) + 1;
    if (m.name === "advisory.quality.score" && m.value != null) {
      totalQuality += m.value;
      qualityCount++;
    }
    if (m.name === "advisory.cost.tokens" && m.value != null) totalTokens += m.value;
    if (m.name === "advisory.cost.estimated_usd" && m.value != null) totalCost += m.value;
  }

  return {
    totalRequests: counts["advisory.request.start"] ?? 0,
    totalErrors: counts["advisory.request.error"] ?? 0,
    avgQualityScore: qualityCount ? Math.round(totalQuality / qualityCount) : 0,
    totalTokens,
    estimatedCostUsd: Math.round(totalCost * 10000) / 10000,
    fallbackCount: counts["advisory.fallback.activated"] ?? 0,
    hallucinationCount: counts["advisory.hallucination.detected"] ?? 0,
    retryCount: counts["advisory.retry.attempt"] ?? 0,
    rateLimitCount: counts["advisory.rate_limit.hit"] ?? 0,
    recentMetrics: metricsBuffer.slice(-20),
  };
}
