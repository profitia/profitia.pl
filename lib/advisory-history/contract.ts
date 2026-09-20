import { z } from "zod";

export const ADVISORY_HISTORY_VISIBLE_DAYS = 90;
export const ADVISORY_HISTORY_MAX_CONVERSATIONS = 50;
export const ADVISORY_HISTORY_KEY_STORAGE = "profitia.advisory.history-key.v1";

export const advisoryHistoryMessageSchema = z.object({
  id: z.string().min(1).max(128),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4_000),
});

export const advisoryHistoryRecommendationSchema = z.object({
  id: z.string().min(1).max(128),
  href: z.string().startsWith("/").max(256),
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(500),
  actionLabel: z.string().min(1).max(120),
  contextLabel: z.string().min(1).max(200),
  summary: z.string().min(1).max(1_000),
  lead: z.string().min(1).max(200),
});

export const advisoryHistorySaveSchema = z.object({
  sessionId: z.string().min(6).max(128),
  locale: z.enum(["pl", "en"]),
  advisorId: z.enum(["adam", "anna"]),
  messages: z.array(advisoryHistoryMessageSchema).min(1).max(40),
  intentCode: z.string().max(80).nullable().optional(),
  destinationId: z.enum(["services", "competence", "digital"]).nullable().optional(),
  recommendation: advisoryHistoryRecommendationSchema.nullable().optional(),
  startedAt: z.number().int().positive(),
  lastActivityAt: z.number().int().positive(),
});

export const advisoryHistoryKeySchema = z.string().regex(/^[A-Za-z0-9_-]{32,128}$/);

export type AdvisoryHistoryMessage = z.infer<typeof advisoryHistoryMessageSchema>;
export type AdvisoryHistoryRecommendation = z.infer<typeof advisoryHistoryRecommendationSchema>;
export type AdvisoryHistorySaveInput = z.infer<typeof advisoryHistorySaveSchema>;

export interface AdvisoryHistoryRecord {
  id: string;
  title: string;
  locale: "pl" | "en";
  advisorId: "adam" | "anna";
  messages: AdvisoryHistoryMessage[];
  destinationId: "services" | "competence" | "digital" | null;
  recommendation: AdvisoryHistoryRecommendation | null;
  startedAt: string;
  updatedAt: string;
}
