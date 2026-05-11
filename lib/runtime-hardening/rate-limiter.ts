// ─────────────────────────────────────────────────────────
// ETAP 5 — Rate Limiter + Abuse Protection
// IP throttling, session quotas, spam detection.
// In-memory with sliding window algorithm.
// ─────────────────────────────────────────────────────────

// ── Rate limit windows ────────────────────────────────────
const IP_WINDOW_MS = 60 * 1000;        // 1 minute
const IP_MAX_REQUESTS = 20;            // per IP per minute
const SESSION_WINDOW_MS = 30 * 1000;   // 30 seconds
const SESSION_MAX_REQUESTS = 8;        // per session per 30s
const GLOBAL_WINDOW_MS = 60 * 1000;
const GLOBAL_MAX_REQUESTS = 300;       // platform-wide per minute

// ── Token quota (prevents runaway LLM spend) ──────────────
const SESSION_TOKEN_QUOTA = 15000;     // tokens per session lifetime
const SESSION_TOKEN_WINDOW_HOURS = 24; // reset after 24h

// ── Sliding window counter ────────────────────────────────
interface WindowState {
  timestamps: number[];
  tokenCount: number;
  tokenWindowStart: number;
  blockedUntil?: number;
}

const ipWindows = new Map<string, WindowState>();
const sessionWindows = new Map<string, WindowState>();
let globalWindow: WindowState = { timestamps: [], tokenCount: 0, tokenWindowStart: Date.now() };

function pruneWindow(state: WindowState, windowMs: number): void {
  const cutoff = Date.now() - windowMs;
  state.timestamps = state.timestamps.filter((ts) => ts > cutoff);
}

function addRequest(state: WindowState): void {
  state.timestamps.push(Date.now());
}

function requestCount(state: WindowState, windowMs: number): number {
  pruneWindow(state, windowMs);
  return state.timestamps.length;
}

// ── IP Rate Limit ─────────────────────────────────────────
export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  retryAfterMs?: number;
  remaining?: number;
}

export function checkIpRateLimit(ip: string): RateLimitResult {
  if (!ipWindows.has(ip)) {
    ipWindows.set(ip, { timestamps: [], tokenCount: 0, tokenWindowStart: Date.now() });
  }
  const state = ipWindows.get(ip)!;

  // Check if explicitly blocked
  if (state.blockedUntil && Date.now() < state.blockedUntil) {
    return {
      allowed: false,
      reason: "IP temporarily blocked",
      retryAfterMs: state.blockedUntil - Date.now(),
    };
  }

  const count = requestCount(state, IP_WINDOW_MS);
  if (count >= IP_MAX_REQUESTS) {
    state.blockedUntil = Date.now() + 60000;
    return {
      allowed: false,
      reason: `Rate limit: ${IP_MAX_REQUESTS} req/min per IP`,
      retryAfterMs: 60000,
      remaining: 0,
    };
  }

  addRequest(state);
  return { allowed: true, remaining: IP_MAX_REQUESTS - count - 1 };
}

// ── Session Rate Limit ────────────────────────────────────
export function checkSessionRateLimit(sessionId: string): RateLimitResult {
  if (!sessionWindows.has(sessionId)) {
    sessionWindows.set(sessionId, { timestamps: [], tokenCount: 0, tokenWindowStart: Date.now() });
  }
  const state = sessionWindows.get(sessionId)!;
  const count = requestCount(state, SESSION_WINDOW_MS);

  if (count >= SESSION_MAX_REQUESTS) {
    return {
      allowed: false,
      reason: `Too fast: max ${SESSION_MAX_REQUESTS} messages per 30s`,
      retryAfterMs: SESSION_WINDOW_MS,
      remaining: 0,
    };
  }

  addRequest(state);
  return { allowed: true, remaining: SESSION_MAX_REQUESTS - count - 1 };
}

// ── Global Rate Limit ─────────────────────────────────────
export function checkGlobalRateLimit(): RateLimitResult {
  const count = requestCount(globalWindow, GLOBAL_WINDOW_MS);
  if (count >= GLOBAL_MAX_REQUESTS) {
    return {
      allowed: false,
      reason: "Platform at capacity — please retry shortly",
      retryAfterMs: GLOBAL_WINDOW_MS,
    };
  }
  addRequest(globalWindow);
  return { allowed: true, remaining: GLOBAL_MAX_REQUESTS - count - 1 };
}

// ── Token Quota Check ─────────────────────────────────────
export function checkSessionTokenQuota(sessionId: string, tokensToSpend: number): RateLimitResult {
  if (!sessionWindows.has(sessionId)) {
    sessionWindows.set(sessionId, { timestamps: [], tokenCount: 0, tokenWindowStart: Date.now() });
  }
  const state = sessionWindows.get(sessionId)!;

  // Reset if window expired
  const windowExpired = Date.now() - state.tokenWindowStart > SESSION_TOKEN_WINDOW_HOURS * 3600 * 1000;
  if (windowExpired) {
    state.tokenCount = 0;
    state.tokenWindowStart = Date.now();
  }

  if (state.tokenCount + tokensToSpend > SESSION_TOKEN_QUOTA) {
    return {
      allowed: false,
      reason: `Session token quota exceeded (${SESSION_TOKEN_QUOTA} tokens/24h)`,
    };
  }

  state.tokenCount += tokensToSpend;
  return { allowed: true, remaining: SESSION_TOKEN_QUOTA - state.tokenCount };
}

// ── Record actual token usage ──────────────────────────────
export function recordTokenUsage(sessionId: string, tokens: number): void {
  const state = sessionWindows.get(sessionId);
  if (state) state.tokenCount += tokens;
}

// ── Spam Detection ────────────────────────────────────────
interface SpamState {
  lastMessages: string[];
  duplicateCount: number;
  shortMessageCount: number;
  lastTs: number;
}

const spamTrackers = new Map<string, SpamState>();

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export function detectSpam(sessionId: string, message: string): SpamCheckResult {
  const trimmed = message.trim();

  if (!spamTrackers.has(sessionId)) {
    spamTrackers.set(sessionId, { lastMessages: [], duplicateCount: 0, shortMessageCount: 0, lastTs: Date.now() });
  }
  const state = spamTrackers.get(sessionId)!;

  // Empty message
  if (trimmed.length === 0) {
    return { isSpam: true, reason: "Empty message" };
  }

  // Excessively long message (potential injection payload)
  if (trimmed.length > 2000) {
    return { isSpam: true, reason: "Message too long (>2000 chars)" };
  }

  // Rapid identical messages
  if (state.lastMessages.includes(trimmed)) {
    state.duplicateCount++;
    if (state.duplicateCount >= 3) {
      return { isSpam: true, reason: "Duplicate message spam" };
    }
  } else {
    state.duplicateCount = 0;
  }

  // Too many single-char / meaningless messages
  if (trimmed.length <= 2) {
    state.shortMessageCount++;
    if (state.shortMessageCount >= 5) {
      return { isSpam: true, reason: "Repeated short messages" };
    }
  } else {
    state.shortMessageCount = 0;
  }

  // Update state
  state.lastMessages = [...state.lastMessages.slice(-4), trimmed];
  state.lastTs = Date.now();

  return { isSpam: false };
}

// ── Block IP (admin use) ──────────────────────────────────
export function blockIp(ip: string, durationMs: number): void {
  if (!ipWindows.has(ip)) {
    ipWindows.set(ip, { timestamps: [], tokenCount: 0, tokenWindowStart: Date.now() });
  }
  ipWindows.get(ip)!.blockedUntil = Date.now() + durationMs;
}

// ── Rate limit stats ──────────────────────────────────────
export function getRateLimitStats() {
  return {
    trackedIPs: ipWindows.size,
    trackedSessions: sessionWindows.size,
    globalRequestsLastMinute: requestCount(globalWindow, GLOBAL_WINDOW_MS),
    spamTrackers: spamTrackers.size,
  };
}

// ── Composite check (used in route) ──────────────────────
export function compositeRateLimitCheck(
  ip: string,
  sessionId: string,
  message: string,
): { allowed: boolean; reason?: string; retryAfterMs?: number } {
  const globalCheck = checkGlobalRateLimit();
  if (!globalCheck.allowed) return globalCheck;

  const ipCheck = checkIpRateLimit(ip);
  if (!ipCheck.allowed) return ipCheck;

  const sessionCheck = checkSessionRateLimit(sessionId);
  if (!sessionCheck.allowed) return sessionCheck;

  const spamCheck = detectSpam(sessionId, message);
  if (spamCheck.isSpam) return { allowed: false, reason: spamCheck.reason };

  return { allowed: true };
}
