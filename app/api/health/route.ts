// ─────────────────────────────────────────────────────────
// ETAP 5 — Runtime Health Monitoring Endpoint
// GET /api/health — comprehensive diagnostics
// POST /api/health — reset degradation state (admin)
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { getMetricsSummary } from "@/lib/runtime-hardening/observability";
import { getRateLimitStats } from "@/lib/runtime-hardening/rate-limiter";
import { getDegradationStatus, getCurrentDegradationLevel } from "@/lib/runtime-hardening/graceful-degradation";
import { getCoordinatorStats } from "@/lib/runtime-hardening/state-coordinator";
import { getStreamMetrics } from "@/lib/runtime-hardening/streaming-recovery";
import { getBudgetStatus } from "@/lib/runtime-hardening/cost-governance";
import { isRedisConfigured, getMemoryStoreSize } from "@/lib/runtime-hardening/session-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminKey = process.env.HEALTH_ADMIN_KEY;

  // Public health check (basic)
  const isAdmin = adminKey && authHeader === `Bearer ${adminKey}`;

  const degradation = getDegradationStatus();
  const isHealthy = degradation.level === "healthy" || degradation.level === "partial";

  // Basic response for all
  const basic = {
    status: isHealthy ? "ok" : "degraded",
    degradationLevel: degradation.level,
    ts: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.NEXT_PUBLIC_SITE_VERSION ?? "5.0.0",
  };

  if (!isAdmin) {
    return NextResponse.json(basic, {
      status: isHealthy ? 200 : 503,
      headers: { "Cache-Control": "no-cache, no-store" },
    });
  }

  // Full diagnostic response for admin
  const metrics = getMetricsSummary();
  const rateLimit = getRateLimitStats();
  const coordinator = getCoordinatorStats();
  const streams = getStreamMetrics();
  const budget = getBudgetStatus();

  const full = {
    ...basic,
    session: {
      redisConnected: isRedisConfigured(),
      memorySessions: getMemoryStoreSize(),
    },
    streaming: {
      activeStreams: streams.activeCount,
      activeDetails: streams.sessions,
    },
    coordinator: {
      activeSessions: coordinator.activeSessions,
      inFlightRequests: coordinator.inFlightRequests,
      totalConflicts: coordinator.totalConflicts,
    },
    metrics: {
      totalRequests: metrics.totalRequests,
      totalErrors: metrics.totalErrors,
      errorRate: metrics.totalRequests > 0
        ? Math.round((metrics.totalErrors / metrics.totalRequests) * 100) + "%"
        : "0%",
      avgQualityScore: metrics.avgQualityScore,
      fallbackCount: metrics.fallbackCount,
      hallucinationCount: metrics.hallucinationCount,
      retryCount: metrics.retryCount,
    },
    budget: {
      date: budget.date,
      tokensUsed: budget.tokensUsed,
      tokenUtilization: Math.round(budget.tokenUtilization * 100) + "%",
      estimatedCostUsd: budget.estimatedCostUsd,
      costUtilization: Math.round(budget.costUtilization * 100) + "%",
      budgetMode: budget.budgetMode,
      requestCount: budget.requestCount,
    },
    rateLimit: {
      trackedIPs: rateLimit.trackedIPs,
      trackedSessions: rateLimit.trackedSessions,
      globalRequestsLastMinute: rateLimit.globalRequestsLastMinute,
    },
    degradation: {
      level: degradation.level,
      consecutiveFailures: degradation.consecutiveFailures,
      degradedSinceMs: degradation.degradedSinceMs,
    },
    checks: {
      openaiKeyConfigured: !!process.env.OPENAI_API_KEY,
      redisConfigured: isRedisConfigured(),
      dailyBudgetConfigured: !!(process.env.DAILY_TOKEN_LIMIT || process.env.DAILY_COST_LIMIT_USD),
    },
  };

  return NextResponse.json(full, {
    status: isHealthy ? 200 : 503,
    headers: { "Cache-Control": "no-cache, no-store" },
  });
}

// POST /api/health — reset degradation (admin only)
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminKey = process.env.HEALTH_ADMIN_KEY;

  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = await req.json() as { action?: string };

  if (action === "reset_degradation") {
    const { reportSuccess } = await import("@/lib/runtime-hardening/graceful-degradation");
    // Reset by reporting multiple successes
    for (let i = 0; i < 10; i++) reportSuccess();
    return NextResponse.json({ ok: true, action: "reset_degradation", level: getCurrentDegradationLevel() });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
