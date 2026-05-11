// ─────────────────────────────────────────────────────────
// ETAP 5 — Runtime Security Layer
// Prompt injection defense, PII detection, output sanitization,
// schema enforcement, metadata protection.
// ETAP 7 — Multilingual extension: Polish injection patterns added.
// ─────────────────────────────────────────────────────────

// ── Prompt Injection Patterns ─────────────────────────────
// Based on known attack patterns: role override, instruction injection,
// jailbreaking, system prompt extraction
// Covers: English (ETAP 5) + Polish (ETAP 7)
const INJECTION_PATTERNS: ReadonlyArray<RegExp> = [
  // ── English patterns ──────────────────────────────────
  /ignore\s+(?:(?:all|the)\s+)?(?:previous|above|prior)?\s*(?:instructions?|prompts?|rules?|context)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /forget\s+(everything|all|your\s+instructions?)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(a|an|if\s+you\s+are)/i,
  /do\s+anything\s+now/i,
  /DAN\s+mode/i,
  /jailbreak/i,
  /bypass\s+(safety|filters?|restrictions?|rules?)/i,
  /system\s*:\s*\[/i,             // Fake system messages
  /<\|system\|>/i,                // Token injection
  /\[INST\]/i,                    // Llama instruction injection
  /\[\/INST\]/i,
  /###\s*(instruction|system)/i,  // Markdown injection
  /repeat\s+your\s+(system\s+)?prompt/i,
  /what\s+(is|are|were)\s+your\s+(system\s+)?(prompt|instructions?)/i,
  /print\s+(your\s+)?(system\s+)?prompt/i,
  /reveal\s+(your\s+)?(system\s+)?(prompt|instructions?)/i,
  /output\s+your\s+(initial\s+)?(prompt|instructions?)/i,
  /translate\s+your\s+(system\s+)?prompt/i,
  // Escalation abuse
  /give\s+me\s+(free|unlimited)\s+access/i,
  /bypass\s+payment/i,
  /provide\s+contact\s+details\s+of\s+all/i,

  // ── Polish patterns (ETAP 7) ──────────────────────────
  // "zignoruj [wszystkie] [poprzednie] instrukcje/zasady/ograniczenia"
  /zignoruj\s+(?:wszystkie\s+)?(?:poprzednie\s+)?(?:instrukcje|zasady|ograniczenia|polecenia|kontekst|regu[łl]y)/i,
  // "ujawnij [swoje] [instrukcje/prompt/system]"
  /ujawnij\s+(?:swoje\s+)?(?:instrukcje|prompt|system|polecenia|zasady)/i,
  // "pokaż [mi] [swój] prompt/instrukcje/system"
  /poka[żz]\s+(?:mi\s+)?(?:sw[oó]j\s+)?(?:prompt|instrukcje|system\s+prompt|polecenia|zasady)/i,
  // "obejdź/omiń [swoje] ograniczenia/zasady"
  /(?:obejd[źz]|omin\s*[^\w]|pomi[nń])\s+(?:swoje\s+)?(?:ograniczenia|zasady|filtry|regu[łl]y)/i,
  // "zachowuj się jak [coś innego]"
  /zachowuj\s+si[eę]\s+jak\s+/i,
  // "udawaj [że] jesteś [czymś innym]"
  /udawaj\s+(?:[żz]e\s+)?(?:jeste[sś]|byłeś)\s+/i,
  // "zapomnij [wszystkie] [poprzednie] instrukcje/zasady"
  /zapomnij\s+(?:wszystkie\s+)?(?:poprzednie\s+)?(?:instrukcje|zasady|polecenia|kontekst)/i,
  // "tryb deweloperski / tryb bez ograniczeń"
  /tryb\s+(?:deweloperski|bez\s+ogranicze[nń]|unrestricted|debug)/i,
  // "jesteś [teraz] wolny/bez ograniczeń"
  /jeste[sś]\s+(?:teraz\s+)?(?:wolny|wolna|bez\s+ogranicze[nń]|uwolniony)/i,
  // "powiedz mi swoje instrukcje/prompt systemowy"
  /powiedz\s+mi\s+(?:swoje\s+)?(?:instrukcje|prompt|zasady|system\s+prompt)/i,
  // "wypisz [swoje] instrukcje/zasady/prompt"
  /wypisz\s+(?:swoje\s+)?(?:instrukcje|zasady|prompt|polecenia)/i,
  // "powtórz swój prompt systemowy"
  /powt[oó]rz\s+(?:sw[oó]j\s+)?(?:prompt|instrukcje|zasady)/i,
];


// ── PII Patterns ──────────────────────────────────────────
const PII_PATTERNS: ReadonlyArray<{ name: string; pattern: RegExp }> = [
  { name: "email", pattern: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g },
  { name: "phone_pl", pattern: /(?:\+48\s?)?(?:\d{3}[\s\-]?\d{3}[\s\-]?\d{3})/g },
  { name: "phone_intl", pattern: /\+\d{1,3}[\s\-]?\d{6,14}/g },
  { name: "pesel", pattern: /\b\d{11}\b/g },
  { name: "nip", pattern: /\b\d{3}[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?\d{2}\b/g },
  { name: "credit_card", pattern: /\b(?:\d{4}[\s\-]?){3}\d{4}\b/g },
  { name: "iban", pattern: /[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){3,5}\d{1,4}/g },
];

// ── Injection Check ────────────────────────────────────────
export interface InjectionCheckResult {
  safe: boolean;
  detectedPatterns: string[];
  riskScore: number;   // 0–10
}

export function checkPromptInjection(input: string): InjectionCheckResult {
  const detected: string[] = [];

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      detected.push(pattern.source.slice(0, 50));
    }
  }

  const riskScore = Math.min(10, detected.length * 3);
  return {
    safe: detected.length === 0,
    detectedPatterns: detected,
    riskScore,
  };
}

// ── PII Detection ─────────────────────────────────────────
export interface PiiDetectionResult {
  hasPii: boolean;
  types: string[];
  sanitized: string;   // Input with PII masked
}

export function detectAndMaskPii(input: string): PiiDetectionResult {
  let sanitized = input;
  const types: string[] = [];

  for (const { name, pattern } of PII_PATTERNS) {
    const matches = sanitized.match(pattern);
    if (matches && matches.length > 0) {
      types.push(name);
      sanitized = sanitized.replace(pattern, `[${name.toUpperCase()}_REDACTED]`);
    }
  }

  return { hasPii: types.length > 0, types, sanitized };
}

// ── Output Sanitization ────────────────────────────────────
// Ensures LLM output doesn't contain leaked API keys, raw system prompts,
// or unwanted HTML/script injection
const OUTPUT_REDACT_PATTERNS: ReadonlyArray<{ name: string; pattern: RegExp; replacement: string }> = [
  // API key patterns
  { name: "openai_key", pattern: /sk-[A-Za-z0-9\-_]{20,}/g, replacement: "[API_KEY]" },
  { name: "bearer_token", pattern: /Bearer\s+[A-Za-z0-9\-_\.]{20,}/g, replacement: "[TOKEN]" },
  // System prompt leak detection
  { name: "system_prompt_leak", pattern: /You are a Procurement Advisory Intelligence/g, replacement: "[SYSTEM]" },
  // XSS prevention (HTML injection)
  { name: "script_tag", pattern: /<script[\s\S]*?<\/script>/gi, replacement: "" },
  { name: "html_injection", pattern: /<(?:iframe|object|embed|form|input|button)[^>]*>/gi, replacement: "" },
  // Internal metadata leaks
  { name: "metadata_block", pattern: /```metadata[\s\S]*?```/g, replacement: "" },
];

export interface OutputSanitizationResult {
  sanitized: string;
  issues: string[];
}

export function sanitizeOutput(content: string): OutputSanitizationResult {
  let sanitized = content;
  const issues: string[] = [];

  for (const { name, pattern, replacement } of OUTPUT_REDACT_PATTERNS) {
    if (pattern.test(sanitized)) {
      issues.push(name);
      sanitized = sanitized.replace(pattern, replacement);
    }
    // Reset regex state
    pattern.lastIndex = 0;
  }

  return { sanitized: sanitized.trim(), issues };
}

// ── Schema Enforcement ─────────────────────────────────────
// Validates that the request body conforms to expected structure
export interface SchemaValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateChatRequestSchema(body: unknown): SchemaValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be an object"] };
  }

  const b = body as Record<string, unknown>;

  // Required fields
  if (!Array.isArray(b.messages)) errors.push("messages must be an array");
  if (typeof b.locale !== "string") errors.push("locale must be a string");

  // Message validation
  if (Array.isArray(b.messages)) {
    for (let i = 0; i < b.messages.length; i++) {
      const m = b.messages[i] as Record<string, unknown>;
      if (!m || typeof m !== "object") { errors.push(`messages[${i}] invalid`); continue; }
      if (!["user", "assistant", "system"].includes(m.role as string)) {
        errors.push(`messages[${i}].role invalid`);
      }
      if (typeof m.content !== "string") errors.push(`messages[${i}].content must be string`);
      if (typeof m.content === "string" && m.content.length > 10000) {
        errors.push(`messages[${i}].content too long`);
      }
    }

    // Max message count (prevent history flooding)
    if (b.messages.length > 50) {
      errors.push("Too many messages in history (max 50)");
    }
  }

  // Locale validation
  if (typeof b.locale === "string" && !["pl", "en"].includes(b.locale)) {
    errors.push("locale must be 'pl' or 'en'");
  }

  return { valid: errors.length === 0, errors };
}

// ── Full security check (used in route) ──────────────────
export interface SecurityCheckResult {
  passed: boolean;
  action: "allow" | "sanitize" | "block";
  reasons: string[];
  sanitizedMessage?: string;
}

export function runSecurityCheck(userMessage: string, sessionId: string): SecurityCheckResult {
  const reasons: string[] = [];

  // 1. Injection check
  const injectionResult = checkPromptInjection(userMessage);
  if (!injectionResult.safe) {
    return {
      passed: false,
      action: "block",
      reasons: [`Prompt injection detected (score: ${injectionResult.riskScore})`],
    };
  }

  // 2. PII detection — sanitize rather than block
  const piiResult = detectAndMaskPii(userMessage);
  if (piiResult.hasPii) {
    reasons.push(`PII detected (${piiResult.types.join(", ")}) — masked`);
  }

  // 3. Empty after sanitization
  if (piiResult.sanitized.trim().length === 0) {
    return { passed: false, action: "block", reasons: ["Message empty after sanitization"] };
  }

  return {
    passed: true,
    action: piiResult.hasPii ? "sanitize" : "allow",
    reasons,
    sanitizedMessage: piiResult.sanitized,
  };
}
