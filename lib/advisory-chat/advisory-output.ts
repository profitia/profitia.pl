import { z } from "zod";

export const AdvisoryMetadataSchema = z.object({
  intent: z.string().default("UNKNOWN"),
  confidence: z.number().min(0).max(1).default(0),
  urgency: z.enum(["U1", "U2", "U3"]).default("U3"),
  phase: z.string().default("idle"),
  buyingStage: z.enum(["S1", "S2", "S3", "S4"]).optional(),
  maturitySignals: z.array(z.string()).optional(),
  recommendations: z
    .array(
      z.object({
        serviceSlug: z.string(),
        serviceName: z.string(),
        reason: z.string(),
        priority: z.number().int().min(1).max(10),
        url: z.string(),
      }),
    )
    .optional(),
  cta: z
    .object({
      type: z.enum([
        "contact_form",
        "spot_analysis",
        "workshop",
        "phone",
        "email",
        "service_order",
        "coaching",
        "content",
      ]),
      url: z.string(),
      label: z.string(),
      urgency: z.enum(["U1", "U2", "U3"]),
    })
    .optional(),
  escalation: z
    .object({
      ready: z.boolean(),
      score: z.number().min(0).max(1),
      reason: z.string(),
      suggestedAction: z
        .enum(["contact_form", "calendar", "phone_request", "demo_request"])
        .optional(),
    })
    .optional(),
  workshopProbability: z.number().min(0).max(1).optional(),
  discoveryReadiness: z.number().min(0).max(1).optional(),
  executiveHint: z
    .enum([
      "CFO",
      "CEO",
      "CPO",
      "procurement_director",
      "category_manager",
      "general",
    ])
    .optional(),
  behavioralSignals: z.array(z.string()).optional(),
  capabilityRecommendations: z.array(z.string()).optional(),
  nextBestAction: z
    .enum([
      "ask_diagnostic",
      "present_capability",
      "recommend_service",
      "escalate",
      "offer_workshop",
      "show_case_study",
      "discuss_roi",
    ])
    .optional(),
});

export type AdvisoryMetadata = z.infer<typeof AdvisoryMetadataSchema>;

export function parseAdvisoryMetadata(
  fullContent: string,
): AdvisoryMetadata | null {
  const match = fullContent.match(/```metadata\s*([\s\S]*?)```/);
  if (!match) return null;

  try {
    const raw = JSON.parse(match[1]);
    const result = AdvisoryMetadataSchema.safeParse(raw);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function stripMetadataBlock(content: string): string {
  return content.replace(/\n?```metadata[\s\S]*?```\n?/g, "").trim();
}
