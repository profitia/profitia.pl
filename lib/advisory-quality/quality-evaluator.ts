// ─────────────────────────────────────────────────────────
// ETAP 4.5 — Advisory Quality Evaluation Framework
// Scores advisory responses across 7 dimensions.
// ─────────────────────────────────────────────────────────

export interface QualityDimension {
  score: number;      // 0–10
  passed: boolean;    // ≥ 6 is passing
  notes: string[];
}

export interface AdvisoryQualityReport {
  overallScore: number;           // 0–100, weighted average
  passed: boolean;                // overall ≥ 60 is passing
  dimensions: {
    procurementReasoning: QualityDimension;
    recommendationQuality: QualityDimension;
    escalationQuality: QualityDimension;
    responseCompression: QualityDimension;
    executiveTone: QualityDimension;
    advisoryConfidence: QualityDimension;
    hallucinationRisk: QualityDimension;
  };
  suggestions: string[];
}

// ── Dimension weights ─────────────────────────────────────
const WEIGHTS = {
  procurementReasoning: 0.25,
  recommendationQuality: 0.20,
  escalationQuality: 0.15,
  responseCompression: 0.15,
  executiveTone: 0.10,
  advisoryConfidence: 0.10,
  hallucinationRisk: 0.05,
};

// ── Procurement Reasoning Scorer ──────────────────────────
function scoreProcurementReasoning(response: string, locale: "pl" | "en"): QualityDimension {
  const notes: string[] = [];
  let score = 5; // baseline

  const procurementTerms = locale === "pl"
    ? ["cost driver", "benchm", "should-cost", "marż", "EBIT", "cash flow", "dostawc", "negocj", "kategori", "sourcing", "spend", "category", "zakup", "KPI", "ryzyko"]
    : ["cost driver", "benchmark", "should-cost", "margin", "EBIT", "cash flow", "supplier", "negotiat", "category", "sourcing", "spend", "procurement", "KPI", "risk"];

  const termCount = procurementTerms.filter((t) => response.toLowerCase().includes(t.toLowerCase())).length;

  if (termCount >= 4) { score += 3; notes.push("Strong procurement terminology"); }
  else if (termCount >= 2) { score += 1; notes.push("Some procurement terminology"); }
  else { score -= 2; notes.push("Missing procurement concreteness"); }

  const hasConsequence = /(?:marż|EBIT|cash|koszt|ryzyko|margin|cost|risk|cash flow)/i.test(response);
  if (hasConsequence) { score += 1; notes.push("Shows business consequence"); }
  else { notes.push("Missing business consequence framing"); }

  const generic = locale === "pl"
    ? /możemy pomóc|zoptymalizować zakupy|popraw(ić|imy) efektywność/i.test(response)
    : /we can help|optimize procurement|improve efficiency/i.test(response);
  if (generic) { score -= 2; notes.push("Generic phrases detected"); }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Recommendation Quality Scorer ─────────────────────────
function scoreRecommendationQuality(response: string): QualityDimension {
  const notes: string[] = [];
  let score = 5;

  const links = (response.match(/\[([^\]]+)\]\(\/[^)]+\)/g) ?? []);
  const linkCount = links.length;

  if (linkCount === 0) { score -= 3; notes.push("No service links — recommendation not actionable"); }
  else if (linkCount === 1 || linkCount === 2) { score += 3; notes.push(`${linkCount} focused recommendation(s)`); }
  else if (linkCount > 3) { score -= 1; notes.push("Too many recommendations (>3) — loses focus"); }

  const hasJustification = /(?:bo|dlatego|ponieważ|because|since|as|given that|pozwala|allows|enables)/i.test(response);
  if (hasJustification) { score += 1; notes.push("Recommendation includes justification"); }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Escalation Quality Scorer ─────────────────────────────
function scoreEscalationQuality(
  response: string,
  urgency: "U1" | "U2" | "U3",
  phase: string
): QualityDimension {
  const notes: string[] = [];
  let score = 5;

  const hasEscalationCTA =
    /\/contact|\/services\/analiza-spot|rozmow[ęa]|conversation|20.minut/i.test(response);
  const hasEscalationPhrasing =
    /(?:porozmawiajmy|zapraszam|skontaktuj|let's talk|get in touch|next step|kolejny krok)/i.test(response);

  if (urgency === "U1") {
    if (hasEscalationCTA) { score += 4; notes.push("Correct escalation for U1 urgency"); }
    else { score -= 3; notes.push("Missing escalation for U1 — should push to contact"); }
  } else if (urgency === "U2") {
    if (hasEscalationCTA || hasEscalationPhrasing) { score += 2; notes.push("Appropriate soft escalation for U2"); }
  } else {
    if (hasEscalationCTA && phase !== "escalation") { score -= 1; notes.push("Premature escalation for U3 exploratory"); }
    else { score += 1; notes.push("Correct non-escalation for exploratory stage"); }
  }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Response Compression Scorer ───────────────────────────
function scoreResponseCompression(response: string): QualityDimension {
  const notes: string[] = [];
  let score = 7;

  const cleanLength = response.replace(/```[\s\S]*?```/g, "").trim().length;
  const paragraphs = response.split(/\n\n+/).filter((p) => p.trim().length > 10).length;

  if (cleanLength > 1000) { score -= 4; notes.push("Response too long (>1000 chars)"); }
  else if (cleanLength > 600) { score -= 2; notes.push("Response verbose (600–1000 chars)"); }
  else if (cleanLength < 80) { score -= 2; notes.push("Response too short (<80 chars)"); }
  else { score += 1; notes.push(`Good length: ${cleanLength} chars`); }

  if (paragraphs > 4) { score -= 2; notes.push("Too many paragraphs (>4)"); }

  const bulletCount = (response.match(/^[\-\*•]/gm) ?? []).length;
  if (bulletCount > 4) { score -= 1; notes.push("Excessive bullet points"); }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Executive Tone Scorer ─────────────────────────────────
function scoreExecutiveTone(response: string, locale: "pl" | "en"): QualityDimension {
  const notes: string[] = [];
  let score = 6;

  const chatbotPhrases = locale === "pl"
    ? ["jak mogę pomóc", "chętnie pomogę", "świetne pytanie", "rozumiem twoje", "oczywiście!", "z przyjemnością"]
    : ["how can i help", "happy to help", "great question", "i understand your", "of course!", "certainly!"];
  const hasChatbot = chatbotPhrases.some((p) => response.toLowerCase().includes(p.toLowerCase()));
  if (hasChatbot) { score -= 4; notes.push("Chatbot phrases detected — kills advisory credibility"); }

  const advisoryIndicators = locale === "pl"
    ? ["warto sprawdzić", "kluczowe pytanie", "zależy od", "rekomend", "typowy błąd", "w praktyce"]
    : ["worth checking", "key question", "depends on", "recommend", "common mistake", "in practice"];
  const advisoryCount = advisoryIndicators.filter((p) => response.toLowerCase().includes(p.toLowerCase())).length;
  if (advisoryCount >= 2) { score += 2; notes.push("Advisory framing detected"); }
  else if (advisoryCount === 1) { score += 1; }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Advisory Confidence Scorer ────────────────────────────
function scoreAdvisoryConfidence(response: string, locale: "pl" | "en"): QualityDimension {
  const notes: string[] = [];
  let score = 6;

  const hedging = locale === "pl"
    ? /(?:być może|możliwe że|nie jestem pewien|trudno powiedzieć|zależy od wielu czynników)/i
    : /(?:perhaps|possibly|i'm not sure|hard to say|it depends on many factors|might be|could be)/i;
  if (hedging.test(response)) { score -= 2; notes.push("Excessive hedging — weakens advisory confidence"); }

  const directStatements = locale === "pl"
    ? /(?:to jest|oznacza to|wynika z tego|kluczowe jest|fundamentalne|błąd polega)/i
    : /(?:this means|this indicates|the key is|fundamental|the mistake is|the issue is)/i;
  if (directStatements.test(response)) { score += 2; notes.push("Confident, direct statements"); }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Hallucination Risk Scorer ─────────────────────────────
function scoreHallucinationRisk(issueCount: number): QualityDimension {
  const notes: string[] = [];
  let score = 10;

  if (issueCount === 0) { notes.push("No hallucination issues"); }
  else if (issueCount === 1) { score -= 3; notes.push("1 potential hallucination issue"); }
  else { score -= issueCount * 2; notes.push(`${issueCount} hallucination issues — review needed`); }

  return { score: Math.max(0, Math.min(10, score)), passed: score >= 6, notes };
}

// ── Main Evaluator ────────────────────────────────────────
export function evaluateAdvisoryQuality(params: {
  response: string;
  locale: "pl" | "en";
  urgency: "U1" | "U2" | "U3";
  phase: string;
  hallucinationIssueCount: number;
}): AdvisoryQualityReport {
  const { response, locale, urgency, phase, hallucinationIssueCount } = params;

  const dimensions = {
    procurementReasoning: scoreProcurementReasoning(response, locale),
    recommendationQuality: scoreRecommendationQuality(response),
    escalationQuality: scoreEscalationQuality(response, urgency, phase),
    responseCompression: scoreResponseCompression(response),
    executiveTone: scoreExecutiveTone(response, locale),
    advisoryConfidence: scoreAdvisoryConfidence(response, locale),
    hallucinationRisk: scoreHallucinationRisk(hallucinationIssueCount),
  };

  const overallScore = Math.round(
    Object.entries(dimensions).reduce((sum, [key, dim]) => {
      return sum + dim.score * 10 * WEIGHTS[key as keyof typeof WEIGHTS];
    }, 0)
  );

  const suggestions: string[] = [];
  if (!dimensions.procurementReasoning.passed) suggestions.push("Add specific procurement terminology and business consequence");
  if (!dimensions.recommendationQuality.passed) suggestions.push("Include 1–2 specific service links with justification");
  if (!dimensions.escalationQuality.passed) suggestions.push("Adjust escalation CTA to match urgency level");
  if (!dimensions.responseCompression.passed) suggestions.push("Compress response — target 150–400 chars visible content");
  if (!dimensions.executiveTone.passed) suggestions.push("Remove chatbot phrases — adopt advisory/consulting tone");
  if (!dimensions.advisoryConfidence.passed) suggestions.push("Reduce hedging — make direct statements");

  return {
    overallScore,
    passed: overallScore >= 60,
    dimensions,
    suggestions,
  };
}
