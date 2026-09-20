"use client";

import {
  ADVISORY_HISTORY_KEY_STORAGE,
  type AdvisoryHistoryRecord,
  type AdvisoryHistorySaveInput,
} from "./contract";

interface StoredHistoryIdentity {
  id: string;
}

function createHistoryKey() {
  const browserCrypto = globalThis.crypto;
  if (typeof browserCrypto?.randomUUID === "function") {
    return browserCrypto.randomUUID().replaceAll("-", "");
  }
  const values = new Uint8Array(24);
  browserCrypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}

function readIdentity(): StoredHistoryIdentity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ADVISORY_HISTORY_KEY_STORAGE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredHistoryIdentity>;
    if (typeof parsed.id !== "string") return null;
    return { id: parsed.id };
  } catch {
    return null;
  }
}

function getOrCreateIdentity() {
  const existing = readIdentity();
  if (existing) return existing;
  const identity = { id: createHistoryKey() };
  try {
    window.localStorage.setItem(ADVISORY_HISTORY_KEY_STORAGE, JSON.stringify(identity));
  } catch {
    return null;
  }
  return identity;
}

export async function fetchAdvisoryHistory(): Promise<AdvisoryHistoryRecord[]> {
  const identity = readIdentity();
  if (!identity) return [];
  const response = await fetch("/api/advisory/history", {
    method: "GET",
    headers: { "x-profitia-history-key": identity.id },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("HISTORY_LOAD_FAILED");
  const payload = await response.json() as { conversations?: AdvisoryHistoryRecord[] };
  return Array.isArray(payload.conversations) ? payload.conversations : [];
}

export async function saveAdvisoryConversation(input: AdvisoryHistorySaveInput): Promise<void> {
  const identity = getOrCreateIdentity();
  if (!identity) return;
  const response = await fetch("/api/advisory/history", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-profitia-history-key": identity.id,
    },
    body: JSON.stringify(input),
    keepalive: true,
  });
  if (!response.ok) throw new Error("HISTORY_SAVE_FAILED");
}
