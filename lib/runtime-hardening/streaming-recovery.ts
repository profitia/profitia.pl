// ─────────────────────────────────────────────────────────
// ETAP 5 — Streaming Recovery Engine
// Handles interrupted streams, chunk dedup, timeout
// detection, degraded streaming mode, stream state.
// ─────────────────────────────────────────────────────────

// ── Stream State ───────────────────────────────────────────
export type StreamStatus =
  | "idle"
  | "connecting"
  | "streaming"
  | "paused"
  | "recovering"
  | "completed"
  | "failed"
  | "degraded";

export interface StreamState {
  streamId: string;
  sessionId: string;
  status: StreamStatus;
  startedAt: number;
  lastChunkAt: number;
  chunkCount: number;
  totalBytes: number;
  accumulatedContent: string;
  seenChunkHashes: Set<string>;
  errors: string[];
  retryCount: number;
  degradedAt?: number;
}

// ── Timeout thresholds ─────────────────────────────────────
const STREAM_STALE_THRESHOLD_MS = 8000;   // No chunks for 8s = stale
const STREAM_MAX_DURATION_MS = 45000;     // Hard cap: 45s
const STREAM_CONNECT_TIMEOUT_MS = 6000;  // Connection must start within 6s

// ── Chunk Deduplication ────────────────────────────────────
function hashChunk(chunk: string): string {
  // Fast 32-bit hash (djb2) — no crypto needed for dedup
  let h = 5381;
  for (let i = 0; i < chunk.length; i++) {
    h = ((h << 5) + h) ^ chunk.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
}

export function isDuplicateChunk(state: StreamState, chunk: string): boolean {
  const h = hashChunk(chunk);
  if (state.seenChunkHashes.has(h)) return true;
  state.seenChunkHashes.add(h);
  // Prune hash set to prevent memory growth
  if (state.seenChunkHashes.size > 2000) {
    const keys = [...state.seenChunkHashes];
    for (let i = 0; i < 500; i++) state.seenChunkHashes.delete(keys[i]);
  }
  return false;
}

// ── Stream State Factory ───────────────────────────────────
export function createStreamState(streamId: string, sessionId: string): StreamState {
  return {
    streamId,
    sessionId,
    status: "idle",
    startedAt: Date.now(),
    lastChunkAt: Date.now(),
    chunkCount: 0,
    totalBytes: 0,
    accumulatedContent: "",
    seenChunkHashes: new Set(),
    errors: [],
    retryCount: 0,
  };
}

// ── Stale Detection ────────────────────────────────────────
export function isStreamStale(state: StreamState): boolean {
  if (state.status === "completed" || state.status === "failed") return false;
  return Date.now() - state.lastChunkAt > STREAM_STALE_THRESHOLD_MS;
}

export function isStreamExpired(state: StreamState): boolean {
  return Date.now() - state.startedAt > STREAM_MAX_DURATION_MS;
}

export function hasConnectionTimedOut(state: StreamState): boolean {
  return state.chunkCount === 0 && Date.now() - state.startedAt > STREAM_CONNECT_TIMEOUT_MS;
}

// ── Process Incoming Chunk ─────────────────────────────────
export interface ChunkResult {
  accepted: boolean;
  deduplicated: boolean;
  stale: boolean;
}

export function processChunk(state: StreamState, chunk: string): ChunkResult {
  if (isStreamExpired(state)) {
    state.status = "failed";
    state.errors.push("Stream expired (>45s)");
    return { accepted: false, deduplicated: false, stale: true };
  }

  if (isDuplicateChunk(state, chunk)) {
    return { accepted: false, deduplicated: true, stale: false };
  }

  state.lastChunkAt = Date.now();
  state.chunkCount++;
  state.totalBytes += chunk.length;
  state.accumulatedContent += chunk;
  state.status = "streaming";

  return { accepted: true, deduplicated: false, stale: false };
}

// ── Stream Recovery Logic ──────────────────────────────────
export interface RecoveryDecision {
  action: "retry" | "degrade" | "resume" | "terminate";
  reason: string;
  preserveContent: string; // What we've accumulated so far
}

export function evaluateStreamRecovery(state: StreamState): RecoveryDecision {
  const hasSubstantialContent = state.accumulatedContent.trim().length > 100;

  if (isStreamExpired(state)) {
    return {
      action: hasSubstantialContent ? "degrade" : "retry",
      reason: "Stream max duration exceeded",
      preserveContent: state.accumulatedContent,
    };
  }

  if (isStreamStale(state) && state.retryCount < 2) {
    return {
      action: "retry",
      reason: `Stream stale (${STREAM_STALE_THRESHOLD_MS}ms no chunks)`,
      preserveContent: state.accumulatedContent,
    };
  }

  if (isStreamStale(state) && state.retryCount >= 2) {
    return {
      action: hasSubstantialContent ? "degrade" : "terminate",
      reason: "Stream stale after retries",
      preserveContent: state.accumulatedContent,
    };
  }

  if (hasConnectionTimedOut(state)) {
    if (state.retryCount < 3) {
      return { action: "retry", reason: "Connection timeout", preserveContent: "" };
    }
    return { action: "degrade", reason: "Connection timeout after retries", preserveContent: "" };
  }

  return { action: "resume", reason: "Stream healthy", preserveContent: state.accumulatedContent };
}

// ── In-flight stream registry (server-side) ───────────────
// Tracks active streams to prevent duplicate concurrent requests
const activeStreams = new Map<string, StreamState>();

export function registerStream(state: StreamState): void {
  activeStreams.set(state.sessionId, state);
}

export function unregisterStream(sessionId: string): void {
  activeStreams.delete(sessionId);
}

export function hasActiveStream(sessionId: string): boolean {
  const state = activeStreams.get(sessionId);
  if (!state) return false;
  // Expired streams are not "active"
  if (isStreamExpired(state) || state.status === "completed" || state.status === "failed") {
    activeStreams.delete(sessionId);
    return false;
  }
  return true;
}

export function getStreamMetrics() {
  return {
    activeCount: activeStreams.size,
    sessions: [...activeStreams.values()].map((s) => ({
      sessionId: s.sessionId,
      status: s.status,
      chunkCount: s.chunkCount,
      durationMs: Date.now() - s.startedAt,
    })),
  };
}
