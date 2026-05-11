// ─────────────────────────────────────────────────────────
// ETAP 5 — Session Persistence Layer
// Redis-first (Upstash HTTP), in-memory LRU fallback.
// Stores full advisory session across page refreshes.
// ─────────────────────────────────────────────────────────

import type { SessionState, BehavioralSignal } from "@/types";

// ── Persisted Session Record ──────────────────────────────
export interface PersistedSession {
  sessionId: string;
  locale: "pl" | "en";
  createdAt: number;
  updatedAt: number;
  messageCount: number;
  sessionState: SessionState;
  // Advisory progression
  escalationHistory: EscalationEvent[];
  recommendationsShown: string[];   // service slugs
  recommendationFatigue: number;    // 0–10
  // Behavioral memory
  behavioralSignals: BehavioralSignal[];
  pagesVisited: string[];
  // Advisory readiness
  advisoryDepth: number;            // 0–5
  compressionState: string;
  // Runtime events
  runtimeEvents: RuntimeEvent[];
}

export interface EscalationEvent {
  ts: number;
  phase: string;
  cta: string;
  urgency: string;
}

export interface RuntimeEvent {
  ts: number;
  type: "retry" | "fallback" | "degraded" | "stream_error" | "rate_limited" | "hallucination" | "security_block";
  detail: string;
}

// ── Session TTL ───────────────────────────────────────────
const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours
const MAX_MEMORY_SESSIONS = 500;

// ── In-Memory LRU (fallback when Redis not configured) ────
class MemorySessionStore {
  private store = new Map<string, { value: PersistedSession; expiresAt: number }>();

  get(id: string): PersistedSession | null {
    const entry = this.store.get(id);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(id);
      return null;
    }
    return entry.value;
  }

  set(id: string, value: PersistedSession): void {
    // Evict oldest if at capacity
    if (this.store.size >= MAX_MEMORY_SESSIONS) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }
    this.store.set(id, { value, expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000 });
  }

  delete(id: string): void {
    this.store.delete(id);
  }

  size(): number {
    return this.store.size;
  }
}

const memoryStore = new MemorySessionStore();

// ── Upstash Redis HTTP Client ─────────────────────────────
async function redisGet(key: string): Promise<PersistedSession | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;
    const { result } = await res.json() as { result: string | null };
    if (!result) return null;
    return JSON.parse(result) as PersistedSession;
  } catch {
    return null;
  }
}

async function redisSet(key: string, value: PersistedSession, ttl: number): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  try {
    const res = await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ value: JSON.stringify(value), ex: ttl }),
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function redisDel(key: string): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(`${url}/del/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
  } catch { /* silent */ }
}

// ── Public Session Store API ──────────────────────────────
const SESSION_KEY_PREFIX = "advisory:session:";

export async function getSession(sessionId: string): Promise<PersistedSession | null> {
  const key = SESSION_KEY_PREFIX + sessionId;

  // Try Redis first
  const redisResult = await redisGet(key);
  if (redisResult !== null) return redisResult;

  // Fallback to memory
  return memoryStore.get(key);
}

export async function saveSession(session: PersistedSession): Promise<void> {
  const key = SESSION_KEY_PREFIX + session.sessionId;
  session.updatedAt = Date.now();

  const savedToRedis = await redisSet(key, session, SESSION_TTL_SECONDS);
  if (!savedToRedis) {
    memoryStore.set(key, session);
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  const key = SESSION_KEY_PREFIX + sessionId;
  await redisDel(key);
  memoryStore.delete(key);
}

export function createEmptySession(sessionId: string, locale: "pl" | "en"): PersistedSession {
  return {
    sessionId,
    locale,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messageCount: 0,
    sessionState: {
      phase: "opening",
      detectedIntent: "UNKNOWN",
      intentConfidence: 0,
      urgency: "U3",
      buyingStage: "S1",
      maturity: "reactive",
      journeyId: null,
      journeyStep: 0,
      escalationReady: false,
      ctaFatigue: 0,
      engagementScore: 0,
    } as SessionState,
    escalationHistory: [],
    recommendationsShown: [],
    recommendationFatigue: 0,
    behavioralSignals: [],
    pagesVisited: [],
    advisoryDepth: 0,
    compressionState: "diagnostic",
    runtimeEvents: [],
  };
}

export function addRuntimeEvent(
  session: PersistedSession,
  type: RuntimeEvent["type"],
  detail: string
): void {
  session.runtimeEvents.push({ ts: Date.now(), type, detail });
  // Keep only last 50 events
  if (session.runtimeEvents.length > 50) {
    session.runtimeEvents = session.runtimeEvents.slice(-50);
  }
}

export function recordEscalation(
  session: PersistedSession,
  phase: string,
  cta: string,
  urgency: string
): void {
  session.escalationHistory.push({ ts: Date.now(), phase, cta, urgency });
}

export function recordRecommendation(session: PersistedSession, slug: string): void {
  if (!session.recommendationsShown.includes(slug)) {
    session.recommendationsShown.push(slug);
  }
  // Fatigue increases with repetition
  const count = session.recommendationsShown.filter((s) => s === slug).length;
  session.recommendationFatigue = Math.min(10, session.recommendationFatigue + (count > 1 ? 1 : 0));
}

export function isRedisConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getMemoryStoreSize(): number {
  return memoryStore.size();
}
