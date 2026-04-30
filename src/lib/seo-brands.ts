/* ─── Brand × Symptom Grid for Programmatic SEO ─── */
/* These are the highest-intent gate repair search combos. */
/* Format: "{brand}-{symptom}" */

/** Gate opener brands with meaningful search volume */
export const SEO_BRANDS = [
  "liftmaster",
  "doorking",
  "mighty-mule",
  "viking",
  "linear",
  "faac",
  "ghost-controls",
] as const;

/** Common gate failure symptoms people search for */
export const SEO_SYMPTOMS = [
  "gate-stuck-open",
  "gate-stuck-closed",
  "keypad-not-working",
  "intercom-dead",
  "solar-battery-dead",
  "wont-move",
  "hit-by-car",
  "motor-grinding",
  "remote-not-working",
  "commercial-sliding-gate-off-track",
  "chain-drive-broken",
  "gate-sagging",
  "sensor-malfunction",
  "access-control-failure",
] as const;

/** Display-friendly brand name mapping */
export const BRAND_DISPLAY_MAP: Record<string, string> = {
  liftmaster: "LiftMaster",
  doorking: "DoorKing",
  "mighty-mule": "Mighty Mule",
  viking: "Viking",
  linear: "Linear",
  faac: "FAAC",
  "ghost-controls": "Ghost Controls",
};

/** Display-friendly symptom name mapping */
export const SYMPTOM_DISPLAY_MAP: Record<string, string> = {
  "gate-stuck-open": "Gate Stuck Open",
  "gate-stuck-closed": "Gate Stuck Closed",
  "keypad-not-working": "Keypad Not Working",
  "intercom-dead": "Intercom Dead",
  "solar-battery-dead": "Solar Battery Dead",
  "wont-move": "Won't Move",
  "hit-by-car": "Hit by Car",
  "motor-grinding": "Motor Grinding",
  "remote-not-working": "Remote Not Working",
  "commercial-sliding-gate-off-track": "Commercial Sliding Gate Off Track",
  "chain-drive-broken": "Chain Drive Broken",
  "gate-sagging": "Gate Sagging",
  "sensor-malfunction": "Sensor Malfunction",
  "access-control-failure": "Access Control Failure",
};

/** Generate all repair slugs (brand × symptom) */
export function getAllRepairSlugs(): string[] {
  const slugs: string[] = [];
  for (const brand of SEO_BRANDS) {
    for (const symptom of SEO_SYMPTOMS) {
      slugs.push(`${brand}-${symptom}`);
    }
  }
  return slugs;
}

/** Get a subset of slugs for initial build (top 6 symptoms only) */
export function getTopRepairSlugs(): string[] {
  const topSymptoms = [
    "gate-stuck-open",
    "gate-stuck-closed",
    "keypad-not-working",
    "solar-battery-dead",
    "wont-move",
    "hit-by-car",
  ] as const;

  const slugs: string[] = [];
  for (const brand of SEO_BRANDS) {
    for (const symptom of topSymptoms) {
      slugs.push(`${brand}-${symptom}`);
    }
  }
  return slugs;
}
