// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Hallucination Guardrails
// Validates advisory responses before delivery.
// ─────────────────────────────────────────────────────────

// ── Known Profitia service slugs (authoritative) ──────────
const VALID_SERVICE_SLUGS = new Set([
  "/services/projekty-doradcze",
  "/services/interim-management",
  "/services/procurement-transformation",
  "/services/category-strategy",
  "/services/operating-model-design",
  "/services/procurement-pmo",
  "/services/analiza-spot",
  "/services/should-cost-analysis",
  "/services/negotiation-preparation",
  "/services/supplier-benchmarking",
  "/services/supplier-negotiation-support",
  "/services/spend-cube",
  "/services/spend-analytics",
  "/services/procurement-dashboards",
  "/services/supplier-intelligence",
  "/services/procurement-kpi-systems",
  "/education/akademia-zakupow",
  "/education/procurement-excellence",
  "/education/warsztaty-negocjacyjne",
  "/education/fact-based-negotiation",
  "/education/in-company-workshops",
  "/education/procurement-mentoring",
  "/contact",
  "/",
  "/services",
  "/education",
  "/about",
  "/blog",
]);

// ── Known hallucinated / non-existent patterns ───────────
const HALLUCINATION_PATTERNS = [
  // Fabricated services
  /\/services\/procurement-audit/i,
  /\/services\/cost-optimization/i,
  /\/services\/vendor-management/i,
  /\/services\/supplier-portal/i,
  /\/services\/e-procurement/i,
  /\/services\/spend-management/i,
  /\/services\/category-management(?!-system)/i,
  /\/services\/strategic-sourcing/i,
  // Fabricated contacts
  /\+48\s?\d{3}\s?\d{3}\s?\d{3}(?!\s?340)/i, // only allow known number
  /kontakt@(?!profitia\.pl)/i,
  // Fabricated claims about pricing
  /(?:gwarantujemy|zagwarantujemy|gwarantuje)\s+(?:oszczędności|savings|ROI)/i,
  /(?:guarantee|guaranteed)\s+(?:savings|ROI|results)/i,
  // Dangerous specificity without grounding
  /(?:typowe|średnie|standardowe)\s+oszczędności\s+(?:wynoszą|to)\s+\d+\s*%/i,
  /(?:typical|average|standard)\s+savings\s+(?:are|of)\s+\d+\s*%/i,
];

// ── Fabricated link detector ──────────────────────────────
function extractMarkdownLinks(text: string): string[] {
  const matches = text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
  return Array.from(matches).map(m => m[2]);
}

export interface GuardrailResult {
  passed: boolean;
  issues: string[];
  sanitizedContent: string;
}

// ── Main guardrail function ───────────────────────────────
export function applyHallucinationGuardrails(content: string): GuardrailResult {
  const issues: string[] = [];
  let sanitized = content;

  // 1. Check for known hallucination patterns
  for (const pattern of HALLUCINATION_PATTERNS) {
    if (pattern.test(content)) {
      issues.push(`Hallucination pattern detected: ${pattern.source.slice(0, 60)}`);
    }
  }

  // 2. Validate all markdown links point to real Profitia pages
  const links = extractMarkdownLinks(content);
  for (const link of links) {
    // Skip external links and anchors
    if (link.startsWith("http") || link.startsWith("#") || link.startsWith("mailto")) continue;
    // Internal links must be in valid set
    if (!VALID_SERVICE_SLUGS.has(link)) {
      issues.push(`Unknown internal link: ${link}`);
      // Remove the fabricated link, keep the label
      sanitized = sanitized.replace(
        new RegExp(`\\[([^\\]]+)\\]\\(${link.replace(/\//g, "\\/")}\\)`, "g"),
        "$1"
      );
    }
  }

  // 3. Strip leaked metadata from visible content
  const metaIndex = sanitized.indexOf("```metadata");
  if (metaIndex !== -1) {
    sanitized = sanitized.slice(0, metaIndex).trimEnd();
  }

  // 4. Strip triple backtick blocks if not metadata (stray code blocks)
  // Use [\s\S] instead of /s flag for ES2017 compatibility
  sanitized = sanitized.replace(/```(?!metadata)[\s\S]*?```/g, "").trim();

  return {
    passed: issues.length === 0,
    issues,
    sanitizedContent: sanitized,
  };
}

// ── Quality flags ─────────────────────────────────────────
export interface QualityFlags {
  tooLong: boolean;          // >600 chars after sanitization
  tooShort: boolean;         // <30 chars
  noActionableContent: boolean; // no link, no question, no CTA signal
  genericResponse: boolean;  // detected generic phrases
  paragraphCount: number;
}

const GENERIC_PHRASES_PL = [
  "jak mogę pomóc",
  "chętnie pomogę",
  "rozumiem twoje potrzeby",
  "świetne pytanie",
  "dziękuję za pytanie",
  "możemy pomóc zoptymalizować",
  "nasze rozwiązania",
  "nasza platforma",
];

const GENERIC_PHRASES_EN = [
  "how can i help",
  "happy to help",
  "great question",
  "i understand your needs",
  "thank you for asking",
  "our solutions",
  "our platform",
  "we can help optimize",
];

export function evaluateResponseQuality(content: string, locale: "pl" | "en"): QualityFlags {
  const lower = content.toLowerCase();
  const genericPhrases = locale === "pl" ? GENERIC_PHRASES_PL : GENERIC_PHRASES_EN;
  const hasGeneric = genericPhrases.some((p) => lower.includes(p));
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const hasLink = /\[.+?\]\(.+?\)/.test(content);
  const hasQuestion = /\?/.test(content);

  return {
    tooLong: content.length > 1200,
    tooShort: content.length < 30,
    noActionableContent: !hasLink && !hasQuestion,
    genericResponse: hasGeneric,
    paragraphCount: paragraphs.length,
  };
}
