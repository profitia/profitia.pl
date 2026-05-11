// ─────────────────────────────────────────────────────────
// ETAP 5 — Runtime State Coordinator
// Prevents: stale state, duplicate escalations, recommendation
// loops, contradictory recommendations, orchestration conflicts.
// ─────────────────────────────────────────────────────────

// ── Coordinator State ─────────────────────────────────────
interface SessionCoordinatorState {
  sessionId: string;
  lastRequestId: string | null;
  inFlight: boolean;
  escalationShownAt: number[];       // timestamps
  recommendationsThisTurn: string[]; // slugs
  conflictCount: number;
  lastIntent: string | null;
  lastUrgency: string | null;
  lastPhase: string | null;
  stateVersion: number;
}

const coordinatorStore = new Map<string, SessionCoordinatorState>();

function getCoordinator(sessionId: string): SessionCoordinatorState {
  if (!coordinatorStore.has(sessionId)) {
    coordinatorStore.set(sessionId, {
      sessionId,
      lastRequestId: null,
      inFlight: false,
      escalationShownAt: [],
      recommendationsThisTurn: [],
      conflictCount: 0,
      lastIntent: null,
      lastUrgency: null,
      lastPhase: null,
      stateVersion: 0,
    });
  }
  return coordinatorStore.get(sessionId)!;
}

// ── Duplicate Request Protection ──────────────────────────
export interface RequestAcquisitionResult {
  acquired: boolean;
  reason?: string;
}

export function acquireRequestLock(sessionId: string, requestId: string): RequestAcquisitionResult {
  const coordinator = getCoordinator(sessionId);

  if (coordinator.inFlight) {
    return { acquired: false, reason: "Another request is in flight for this session" };
  }

  coordinator.inFlight = true;
  coordinator.lastRequestId = requestId;
  return { acquired: true };
}

export function releaseRequestLock(sessionId: string): void {
  const coordinator = getCoordinator(sessionId);
  coordinator.inFlight = false;
}

export function isRequestDuplicate(sessionId: string, requestId: string): boolean {
  const coordinator = getCoordinator(sessionId);
  return coordinator.lastRequestId === requestId;
}

// ── Escalation Deduplication ──────────────────────────────
const ESCALATION_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes between escalations

export function shouldShowEscalation(sessionId: string): boolean {
  const coordinator = getCoordinator(sessionId);
  const now = Date.now();

  // Prune old escalations
  coordinator.escalationShownAt = coordinator.escalationShownAt.filter(
    (ts) => now - ts < ESCALATION_COOLDOWN_MS
  );

  // Prevent more than 2 escalations per cooldown period
  if (coordinator.escalationShownAt.length >= 2) return false;

  coordinator.escalationShownAt.push(now);
  return true;
}

// ── Recommendation Loop Detection ─────────────────────────
const RECOMMENDATION_HISTORY_SIZE = 5;
type RecommendationHistory = Map<string, string[]>; // sessionId → last slugs

const recHistory: RecommendationHistory = new Map();

export interface RecommendationConsistencyResult {
  allowed: boolean;
  reason?: string;
  filteredSlugs: string[];
}

export function filterRecommendations(sessionId: string, proposedSlugs: string[]): RecommendationConsistencyResult {
  const coordinator = getCoordinator(sessionId);
  if (!recHistory.has(sessionId)) recHistory.set(sessionId, []);
  const history = recHistory.get(sessionId)!;

  // Filter out recently shown (loop detection)
  const recentSet = new Set(history.slice(-3));
  const newSlugs = proposedSlugs.filter((s) => !recentSet.has(s));

  if (newSlugs.length === 0 && proposedSlugs.length > 0) {
    // All proposed are recent — show them anyway but flag
    coordinator.conflictCount++;
    return {
      allowed: true,
      reason: "Recommendation loop detected — showing same recommendations",
      filteredSlugs: proposedSlugs.slice(0, 2),
    };
  }

  // Update history
  const nextHistory = [...history, ...newSlugs].slice(-RECOMMENDATION_HISTORY_SIZE);
  recHistory.set(sessionId, nextHistory);

  return { allowed: true, filteredSlugs: newSlugs.slice(0, 2) };
}

// ── Intent Consistency Validation ─────────────────────────
// Prevents wildly contradictory intent shifts between turns
export interface IntentConsistencyResult {
  consistent: boolean;
  reason?: string;
  reconciledIntent: string;
}

// Intent groups — intents in the same group are compatible
const INTENT_GROUPS: ReadonlyArray<string[]> = [
  ["I1_SAVINGS", "I8_NEGOTIATIONS", "I2_FORECASTING"],
  ["I5_SOURCING", "I4_DIGITALIZATION"],
  ["I6_EDUCATION"],
  ["I3_SUPPLIER_RISK"],
  ["I7_EXPLORATORY", "UNKNOWN"],
];

function getIntentGroup(intent: string): number {
  for (let i = 0; i < INTENT_GROUPS.length; i++) {
    if (INTENT_GROUPS[i].includes(intent)) return i;
  }
  return -1;
}

export function validateIntentConsistency(sessionId: string, proposedIntent: string): IntentConsistencyResult {
  const coordinator = getCoordinator(sessionId);

  if (!coordinator.lastIntent) {
    coordinator.lastIntent = proposedIntent;
    return { consistent: true, reconciledIntent: proposedIntent };
  }

  const lastGroup = getIntentGroup(coordinator.lastIntent);
  const proposedGroup = getIntentGroup(proposedIntent);

  // Same group = consistent
  if (lastGroup === proposedGroup || lastGroup === -1 || proposedGroup === -1) {
    coordinator.lastIntent = proposedIntent;
    coordinator.stateVersion++;
    return { consistent: true, reconciledIntent: proposedIntent };
  }

  // Cross-group jump — flag but allow (user can shift topics)
  coordinator.conflictCount++;
  coordinator.lastIntent = proposedIntent;
  coordinator.stateVersion++;

  return {
    consistent: false,
    reason: `Intent shifted from ${coordinator.lastIntent} (group ${lastGroup}) to ${proposedIntent} (group ${proposedGroup})`,
    reconciledIntent: proposedIntent,
  };
}

// ── Session Reconciliation ─────────────────────────────────
// Detects and resolves drift between in-memory and persisted state
export interface ReconciliationResult {
  drifted: boolean;
  fields: string[];
}

export function reconcileSessionState(
  sessionId: string,
  inMemoryVersion: number,
  serverVersion: number
): ReconciliationResult {
  const fields: string[] = [];
  if (inMemoryVersion !== serverVersion) {
    fields.push(`version drift: client=${inMemoryVersion} server=${serverVersion}`);
  }
  return { drifted: fields.length > 0, fields };
}

// ── State Snapshot for Debugging ──────────────────────────
export function getCoordinatorSnapshot(sessionId: string) {
  return coordinatorStore.get(sessionId) ?? null;
}

export function getCoordinatorStats() {
  return {
    activeSessions: coordinatorStore.size,
    inFlightRequests: [...coordinatorStore.values()].filter((s) => s.inFlight).length,
    totalConflicts: [...coordinatorStore.values()].reduce((s, c) => s + c.conflictCount, 0),
  };
}

// ── Cleanup stale coordinators (called periodically) ──────
export function pruneCoordinators(maxAgeMs = 4 * 3600 * 1000): number {
  // We don't have timestamps here — just prune if over capacity
  if (coordinatorStore.size < 1000) return 0;
  let pruned = 0;
  const entries = [...coordinatorStore.entries()];
  // Remove first 200 entries (oldest)
  for (let i = 0; i < 200 && i < entries.length; i++) {
    coordinatorStore.delete(entries[i][0]);
    pruned++;
  }
  return pruned;
}
