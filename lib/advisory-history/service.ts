import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { Prisma, type PrismaClient } from "@/prisma/generated/forms-client";
import {
  ADVISORY_HISTORY_MAX_CONVERSATIONS,
  ADVISORY_HISTORY_VISIBLE_DAYS,
  advisoryHistoryMessageSchema,
  advisoryHistoryRecommendationSchema,
  type AdvisoryHistoryRecord,
  type AdvisoryHistorySaveInput,
} from "./contract";

const VISIBLE_HISTORY_MS = ADVISORY_HISTORY_VISIBLE_DAYS * 24 * 60 * 60 * 1_000;

export function hashAdvisoryHistoryKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function resolveAdvisoryClientIp(headers: Pick<Headers, "get">) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || headers.get("x-real-ip")?.trim() || "";
  const normalized = candidate.startsWith("::ffff:") ? candidate.slice(7) : candidate;
  return isIP(normalized) ? normalized : null;
}

function buildTitle(input: AdvisoryHistorySaveInput) {
  const firstUserMessage = input.messages.find((message) => message.role === "user")?.content.trim();
  const fallback = input.locale === "pl" ? "Rozmowa z doradcą" : "Advisor conversation";
  if (!firstUserMessage) return fallback;
  return firstUserMessage.length > 96 ? `${firstUserMessage.slice(0, 95).trimEnd()}…` : firstUserMessage;
}

export async function saveAdvisoryHistory(
  prisma: PrismaClient,
  visitorKey: string,
  input: AdvisoryHistorySaveInput,
  ipAddress: string | null,
) {
  const visitorKeyHash = hashAdvisoryHistoryKey(visitorKey);
  const recommendation = input.recommendation
    ? input.recommendation as Prisma.InputJsonValue
    : Prisma.DbNull;
  await prisma.advisoryConversation.upsert({
    where: { visitorKeyHash_sessionId: { visitorKeyHash, sessionId: input.sessionId } },
    create: {
      visitorKeyHash,
      sessionId: input.sessionId,
      locale: input.locale,
      advisorId: input.advisorId,
      title: buildTitle(input),
      messages: input.messages as Prisma.InputJsonValue,
      intentCode: input.intentCode ?? null,
      destinationId: input.destinationId ?? null,
      recommendation,
      ipAddress,
      startedAt: new Date(input.startedAt),
      lastActivityAt: new Date(input.lastActivityAt),
    },
    update: {
      locale: input.locale,
      advisorId: input.advisorId,
      title: buildTitle(input),
      messages: input.messages as Prisma.InputJsonValue,
      intentCode: input.intentCode ?? null,
      destinationId: input.destinationId ?? null,
      recommendation,
      ...(ipAddress ? { ipAddress } : {}),
      lastActivityAt: new Date(input.lastActivityAt),
    },
  });
}

export async function listAdvisoryHistory(
  prisma: PrismaClient,
  visitorKey: string,
  now = new Date(),
): Promise<AdvisoryHistoryRecord[]> {
  const visitorKeyHash = hashAdvisoryHistoryKey(visitorKey);
  const visibleSince = new Date(now.getTime() - VISIBLE_HISTORY_MS);
  const conversations = await prisma.advisoryConversation.findMany({
    where: { visitorKeyHash, lastActivityAt: { gt: visibleSince } },
    orderBy: { lastActivityAt: "desc" },
    take: ADVISORY_HISTORY_MAX_CONVERSATIONS,
  });

  return conversations.map((conversation) => ({
    id: conversation.sessionId,
    title: conversation.title,
    locale: conversation.locale === "en" ? "en" : "pl",
    advisorId: conversation.advisorId === "anna" ? "anna" : "adam",
    messages: Array.isArray(conversation.messages)
      ? conversation.messages.flatMap((message) => {
          const parsed = advisoryHistoryMessageSchema.safeParse(message);
          return parsed.success ? [parsed.data] : [];
        })
      : [],
    destinationId: conversation.destinationId === "services"
      || conversation.destinationId === "products"
      || conversation.destinationId === "competence"
      || conversation.destinationId === "digital"
      ? conversation.destinationId
      : null,
    recommendation: (() => {
      const parsed = advisoryHistoryRecommendationSchema.safeParse(conversation.recommendation);
      return parsed.success ? parsed.data : null;
    })(),
    startedAt: conversation.startedAt.toISOString(),
    updatedAt: conversation.lastActivityAt.toISOString(),
  }));
}
