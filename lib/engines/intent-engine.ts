// The procurement intelligence implementation is versioned in CIC. Keep this
// module as the stable application import boundary so consumer code does not
// depend on the package layout.
export {
  aggregateIntentSignals,
  computeBusinessImpact,
  computeEscalationProbability,
  computeIntentScore,
  computeUrgencyLevel,
  computeWorkshopProbability,
  extractIntentSignalsFromBehavior,
  extractIntentSignalsFromMessage,
  extractIntentSignalsFromPage,
} from "@profitia/cic-procurement";
