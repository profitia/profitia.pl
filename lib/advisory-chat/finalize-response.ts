import type { AdvisoryMetadata } from "@/runtime/schemas/advisory-output.schema";
import {
  parseAdvisoryMetadata,
  stripMetadataBlock,
} from "@/runtime/schemas/advisory-output.schema";
import { applyHallucinationGuardrails } from "@/lib/advisory-quality/hallucination-guard";
import { sanitizeOutput } from "@/lib/runtime-hardening/security";

export interface FinalizedAdvisoryResponse {
  content: string;
  metadata: AdvisoryMetadata | null;
  issues: string[];
}

interface FinalizeAdvisoryResponseOptions {
  questionLimit?: 0 | 1;
  emptyContentFallback?: string;
}

/**
 * The single output gate for model-generated advisory content.
 * Nothing is sent to the browser before this function removes private
 * metadata and applies the security and hallucination guardrails.
 */
export function finalizeAdvisoryResponse(
  rawContent: string,
  options: FinalizeAdvisoryResponseOptions = {},
): FinalizedAdvisoryResponse {
  const metadata = parseAdvisoryMetadata(rawContent);
  const withoutMetadata = stripMetadataBlock(rawContent);
  const sanitized = sanitizeOutput(withoutMetadata);
  const guarded = applyHallucinationGuardrails(sanitized.sanitized);

  return {
    content: enforceQuestionLimit(
      guarded.sanitizedContent,
      options.questionLimit ?? 1,
      options.emptyContentFallback ?? "",
    ),
    metadata,
    issues: [...sanitized.issues, ...guarded.issues],
  };
}

function enforceQuestionLimit(
  content: string,
  questionLimit: 0 | 1,
  emptyContentFallback: string,
): string {
  if (questionLimit === 0) {
    const statements = content
      .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
      ?.map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0 && !sentence.includes("?"))
      .join(" ")
      .trim();

    return statements || emptyContentFallback.trim();
  }

  const firstQuestionMark = content.indexOf("?");
  if (firstQuestionMark === -1) return content.trim();

  const hasAnotherQuestion = content.indexOf("?", firstQuestionMark + 1) !== -1;
  if (!hasAnotherQuestion) return content.trim();

  // The conversation contract permits one diagnostic question per turn.
  // Keep the complete first question and defer any follow-up to the next turn.
  return content.slice(0, firstQuestionMark + 1).trim();
}
