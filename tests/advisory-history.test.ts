import assert from "node:assert/strict";
import {
  ADVISORY_HISTORY_VISIBLE_DAYS,
  advisoryHistorySaveSchema,
} from "@/lib/advisory-history/contract";
import {
  hashAdvisoryHistoryKey,
  listAdvisoryHistory,
  resolveAdvisoryClientIp,
  saveAdvisoryHistory,
} from "@/lib/advisory-history/service";
import type { PrismaClient } from "@/prisma/generated/forms-client";

function headers(values: Record<string, string>) {
  return new Headers(values);
}

assert.equal(ADVISORY_HISTORY_VISIBLE_DAYS, 90);
assert.equal(resolveAdvisoryClientIp(headers({ "x-forwarded-for": "203.0.113.8, 10.0.0.1" })), "203.0.113.8");
assert.equal(resolveAdvisoryClientIp(headers({ "x-real-ip": "2001:db8::1" })), "2001:db8::1");
assert.equal(resolveAdvisoryClientIp(headers({ "x-forwarded-for": "::ffff:192.0.2.10" })), "192.0.2.10");
assert.equal(resolveAdvisoryClientIp(headers({ "x-forwarded-for": "not-an-ip" })), null);

const visitorKey = "a".repeat(32);
assert.notEqual(hashAdvisoryHistoryKey(visitorKey), visitorKey);
assert.equal(hashAdvisoryHistoryKey(visitorKey), hashAdvisoryHistoryKey(visitorKey));

const valid = advisoryHistorySaveSchema.safeParse({
  sessionId: "session-123",
  locale: "pl",
  advisorId: "adam",
  messages: [{ id: "message-1", role: "user", content: "Potrzebuję benchmarków" }],
  startedAt: Date.now(),
  lastActivityAt: Date.now(),
});
assert.equal(valid.success, true);

const oversized = advisoryHistorySaveSchema.safeParse({
  sessionId: "session-123",
  locale: "pl",
  advisorId: "adam",
  messages: [{ id: "message-1", role: "user", content: "x".repeat(4_001) }],
  startedAt: Date.now(),
  lastActivityAt: Date.now(),
});
assert.equal(oversized.success, false);

async function testPersistenceContract() {
  const listCalls: Record<string, unknown>[] = [];
  const upsertCalls: Record<string, unknown>[] = [];
  const fakePrisma = {
    advisoryConversation: {
      findMany: async (args: Record<string, unknown>) => {
        listCalls.push(args);
        return [];
      },
      upsert: async (args: Record<string, unknown>) => {
        upsertCalls.push(args);
        return {};
      },
    },
  } as unknown as PrismaClient;

  const now = new Date("2026-09-20T12:00:00.000Z");
  await listAdvisoryHistory(fakePrisma, visitorKey, now);
  assert.equal(
    ((listCalls[0]?.where as { lastActivityAt: { gt: Date } }).lastActivityAt.gt).toISOString(),
    "2026-06-22T12:00:00.000Z",
  );

  if (!valid.success) throw new Error("Expected valid history fixture");
  await saveAdvisoryHistory(fakePrisma, visitorKey, valid.data, "203.0.113.8");
  assert.equal((upsertCalls[0]?.create as { ipAddress: string }).ipAddress, "203.0.113.8");
  assert.equal((upsertCalls[0]?.update as { ipAddress: string }).ipAddress, "203.0.113.8");
  assert.equal("deleteMany" in fakePrisma.advisoryConversation, false);
}

testPersistenceContract()
  .then(() => console.log("Advisory history: validation, identity hashing and IP normalization passed"))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
