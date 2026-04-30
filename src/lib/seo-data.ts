/* ═══════════════════════════════════════════════════════════════════
 * seo-data.ts — Centralized pSEO Keyword Arrays & Slug Generator
 * ═══════════════════════════════════════════════════════════════════
 * All 5 keyword buckets live here. Slug generation uses a curated
 * cross-product (not full Cartesian) to produce high-intent pages.
 * ═══════════════════════════════════════════════════════════════════ */

/* ─── ARRAY 1: OEM Brands (20) ─── */
export const BRANDS = [
  "LiftMaster",
  "Mighty Mule",
  "DoorKing",
  "Viking",
  "All O Matic",
  "Apollo / Nice",
  "Ramset",
  "FAAC",
  "Ghost Controls",
  "Chamberlain",
  "BFT",
  "Elite",
  "HySecurity",
  "GTO",
  "Linear",
  "USAutomatic",
  "CellGate",
  "ButterflyMX",
  "Platinum Access Systems",
  "Eagle",
] as const;

/* ─── ARRAY 2: Gate Types & Property Types (12) ─── */
export const GATE_TYPES = [
  "automatic driveway gate",
  "apartment complex gate",
  "HOA community gate",
  "commercial automatic gate",
  "farm and ranch gate",
  "self storage facility gate",
  "parking garage barrier arm",
  "storefront rollup gate",
  "industrial sliding gate",
  "cantilever gate",
  "v track gate",
  "boom gate",
] as const;

/* ─── ARRAY 3: Mechanical Failures / Panic Symptoms (15) ─── */
export const SYMPTOMS = [
  "stuck open",
  "won't open with remote",
  "keeps opening by itself",
  "closes then opens",
  "beeping constantly",
  "motor humming but not moving",
  "off track",
  "derailed",
  "sagging on driveway",
  "hit by car",
  "battery dead",
  "won't open in cold weather",
  "opens halfway and stops",
  "won't open after power outage",
  "storm damaged",
] as const;

/* ─── ARRAY 4: Components & Access Control Parts (15) ─── */
export const COMPONENTS = [
  "access control system",
  "telephone entry system",
  "photo eye sensor",
  "vehicle loop detector",
  "circuit board",
  "driveway exit wand",
  "magnetic lock / maglock",
  "broken hinge",
  "roller wheel",
  "motherboard fried by lightning",
  "intercom",
  "RFID card reader",
  "fire department knox box",
  "keypad",
  "remote control",
] as const;

/* ─── ARRAY 5: Urgency Modifiers (4) ─── */
export const URGENCY_MODIFIERS = [
  "24 hour",
  "emergency",
  "same day",
  "fast",
] as const;

/* ═══════════════════════════════════════════════════════════════════
 * SLUG GENERATION — Curated, not Cartesian.
 * We produce ~125 high-intent slugs × 40 cities = ~5,000 pages
 * at build time. dynamicParams = true catches any remaining combos.
 * ═══════════════════════════════════════════════════════════════════ */

/** Slugify any display string → URL-safe slug */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")  // "Apollo / Nice" → "apollo-nice"
    .replace(/['']/g, "")       // "won't" → "wont"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ─── Top symptoms for brand × symptom slugs ─── */
const TOP_SYMPTOMS: (typeof SYMPTOMS)[number][] = [
  "stuck open",
  "won't open with remote",
  "keeps opening by itself",
  "off track",
  "hit by car",
  "battery dead",
];

/* ─── Top symptoms for gate type × symptom slugs ─── */
const TOP_GATE_SYMPTOMS: (typeof SYMPTOMS)[number][] = [
  "stuck open",
  "off track",
  "won't open after power outage",
  "hit by car",
  "storm damaged",
];

/* ─── Top components for brand × component slugs ─── */
const TOP_COMPONENTS: (typeof COMPONENTS)[number][] = [
  "circuit board",
  "keypad",
  "remote control",
  "telephone entry system",
];

/**
 * Generate curated repair slugs for build-time static generation.
 * Returns ~275 unique slugs. When multiplied by cities, this gives
 * our pre-rendered page inventory.
 */
export function getCuratedRepairSlugs(): string[] {
  const slugs = new Set<string>();

  // 1. Brand × Top Symptoms (20 × 6 = 120)
  for (const brand of BRANDS) {
    for (const symptom of TOP_SYMPTOMS) {
      slugs.add(`${slugify(brand)}-${slugify(symptom)}`);
    }
  }

  // 2. Gate Type × Top Symptoms (12 × 5 = 60)
  for (const gateType of GATE_TYPES) {
    for (const symptom of TOP_GATE_SYMPTOMS) {
      slugs.add(`${slugify(gateType)}-${slugify(symptom)}`);
    }
  }

  // 3. Brand × Component Repairs (20 × 4 = 80)
  for (const brand of BRANDS) {
    for (const component of TOP_COMPONENTS) {
      slugs.add(`${slugify(brand)}-${slugify(component)}-repair`);
    }
  }

  // 4. Standalone Component Repair pages (15)
  for (const component of COMPONENTS) {
    slugs.add(`${slugify(component)}-repair`);
  }

  return Array.from(slugs);
}

/**
 * Get a smaller subset for the initial build to keep times fast.
 * Uses top 7 brands × top 6 symptoms = 42 slugs × 40 cities = 1,680 pages.
 * This is the "safe" build set; remaining pages are ISR on-demand.
 */
export function getBuildRepairSlugs(): string[] {
  const buildBrands = BRANDS.slice(0, 7); // LiftMaster through FAAC
  const slugs = new Set<string>();

  // Brand × Top Symptoms
  for (const brand of buildBrands) {
    for (const symptom of TOP_SYMPTOMS) {
      slugs.add(`${slugify(brand)}-${slugify(symptom)}`);
    }
  }

  // Top gate types × top symptoms (first 6 gate types)
  for (const gateType of GATE_TYPES.slice(0, 6)) {
    for (const symptom of TOP_GATE_SYMPTOMS.slice(0, 3)) {
      slugs.add(`${slugify(gateType)}-${slugify(symptom)}`);
    }
  }

  // Top brand × component (first 7 brands × first 2 components)
  for (const brand of buildBrands) {
    for (const component of TOP_COMPONENTS.slice(0, 2)) {
      slugs.add(`${slugify(brand)}-${slugify(component)}-repair`);
    }
  }

  return Array.from(slugs);
}

/* ═══════════════════════════════════════════════════════════════════
 * DISPLAY NAME MAPS — Reverse-lookup from slug → pretty name
 * ═══════════════════════════════════════════════════════════════════ */

/** Build a slug → display name map from any array */
function buildDisplayMap(arr: readonly string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of arr) {
    map[slugify(item)] = item;
  }
  return map;
}

export const BRAND_DISPLAY = buildDisplayMap(BRANDS);
export const GATE_TYPE_DISPLAY = buildDisplayMap(GATE_TYPES);
export const SYMPTOM_DISPLAY = buildDisplayMap(SYMPTOMS);
export const COMPONENT_DISPLAY = buildDisplayMap(COMPONENTS);

/* ═══════════════════════════════════════════════════════════════════
 * SEEDED RANDOMIZATION — Deterministic picks for Googlebot consistency
 * ═══════════════════════════════════════════════════════════════════ */

/** Deterministic hash from any string → positive integer */
export function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Pick one item deterministically from an array */
export function pick<T>(arr: readonly T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

/** Pick N unique items deterministically from an array */
export function pickN<T>(arr: readonly T[], seed: number, n: number, startOffset = 0): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  let offset = startOffset;
  while (result.length < n && result.length < arr.length) {
    const idx = (seed + offset) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    offset++;
  }
  return result;
}
