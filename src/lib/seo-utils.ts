/* ═══════════════════════════════════════════════════════════════════
 * seo-utils.ts — pSEO URL Parsing & Formatting Utilities
 * ═══════════════════════════════════════════════════════════════════
 * Handles 3 slug types:
 *   1. Brand-based: "liftmaster-stuck-open"
 *   2. GateType-based: "apartment-complex-gate-stuck-open"
 *   3. Component-based: "liftmaster-circuit-board-repair"
 * ═══════════════════════════════════════════════════════════════════ */

import {
  BRAND_DISPLAY,
  GATE_TYPE_DISPLAY,
  SYMPTOM_DISPLAY,
  COMPONENT_DISPLAY,
  slugify,
  BRANDS,
  GATE_TYPES,
} from "./seo-data";

export interface ParsedSlug {
  /** Which array matched: "brand", "gateType", or "component" */
  slugType: "brand" | "gateType" | "component";
  /** The brand name (display form), if matched */
  brand: string;
  /** The gate/property type (display form), if matched */
  gateType: string;
  /** The symptom (display form), if matched */
  symptom: string;
  /** The component (display form), if matched */
  component: string;
  /** Raw slug pieces for fallback display */
  rawRemainder: string;
}

/**
 * Parse a repair slug into structured data.
 * Tries matching in order: brand prefix → gate type prefix → component suffix.
 */
export function parseRepairSlug(slug: string): ParsedSlug {
  const result: ParsedSlug = {
    slugType: "brand",
    brand: "",
    gateType: "",
    symptom: "",
    component: "",
    rawRemainder: slug,
  };

  // ─── Strategy 1: Try brand prefix match ───
  const brandSlugs = BRANDS.map(slugify).sort((a, b) => b.length - a.length); // longest first
  for (const brandSlug of brandSlugs) {
    if (slug.startsWith(brandSlug + "-")) {
      result.slugType = "brand";
      result.brand = BRAND_DISPLAY[brandSlug] || titleCase(brandSlug.replace(/-/g, " "));
      const remainder = slug.slice(brandSlug.length + 1);

      // Check if remainder is a component-repair pattern
      if (remainder.endsWith("-repair")) {
        const componentPart = remainder.slice(0, -7); // remove "-repair"
        if (COMPONENT_DISPLAY[componentPart]) {
          result.slugType = "component";
          result.component = COMPONENT_DISPLAY[componentPart];
          return result;
        }
      }

      // Otherwise treat remainder as a symptom
      result.symptom = SYMPTOM_DISPLAY[remainder] || titleCase(remainder.replace(/-/g, " "));
      return result;
    }
  }

  // ─── Strategy 2: Try gate type prefix match ───
  const gateTypeSlugs = GATE_TYPES.map(slugify).sort((a, b) => b.length - a.length);
  for (const gtSlug of gateTypeSlugs) {
    if (slug.startsWith(gtSlug + "-")) {
      result.slugType = "gateType";
      result.gateType = GATE_TYPE_DISPLAY[gtSlug] || titleCase(gtSlug.replace(/-/g, " "));
      const remainder = slug.slice(gtSlug.length + 1);
      result.symptom = SYMPTOM_DISPLAY[remainder] || titleCase(remainder.replace(/-/g, " "));
      return result;
    }
  }

  // ─── Strategy 3: Standalone component repair page ───
  if (slug.endsWith("-repair")) {
    const componentPart = slug.slice(0, -7);
    if (COMPONENT_DISPLAY[componentPart]) {
      result.slugType = "component";
      result.component = COMPONENT_DISPLAY[componentPart];
      return result;
    }
  }

  // ─── Fallback: treat as generic brand-symptom ───
  const firstDash = slug.indexOf("-");
  if (firstDash > 0) {
    const maybeBrand = slug.slice(0, firstDash);
    result.brand = BRAND_DISPLAY[maybeBrand] || titleCase(maybeBrand.replace(/-/g, " "));
    result.symptom = titleCase(slug.slice(firstDash + 1).replace(/-/g, " "));
  } else {
    result.symptom = titleCase(slug.replace(/-/g, " "));
  }

  return result;
}

/**
 * Generate a human-readable headline from a parsed slug.
 */
export function buildHeadline(parsed: ParsedSlug, city: string): string {
  switch (parsed.slugType) {
    case "brand":
      return `Your ${parsed.brand} Gate in ${city} — Fixed Fast.`;
    case "gateType":
      return `${titleCase(parsed.gateType)} Repair in ${city} — Fixed Fast.`;
    case "component":
      return `${titleCase(parsed.component)} Repair${parsed.brand ? ` for ${parsed.brand}` : ""} in ${city}`;
    default:
      return `Emergency Gate Repair in ${city} — Fixed Fast.`;
  }
}

/**
 * Generate meta title from parsed slug data.
 */
export function buildMetaTitle(
  parsed: ParsedSlug,
  city: string,
  stateAbbr: string,
  urgency: string
): string {
  const loc = `${city}, ${stateAbbr.toUpperCase()}`;
  switch (parsed.slugType) {
    case "brand":
      return `${urgency} ${parsed.brand} Gate Repair in ${loc} | ${parsed.symptom}`;
    case "gateType":
      return `${urgency} ${titleCase(parsed.gateType)} Repair in ${loc} | ${parsed.symptom}`;
    case "component":
      return `${urgency} ${titleCase(parsed.component)} Repair${parsed.brand ? ` — ${parsed.brand}` : ""} in ${loc}`;
    default:
      return `${urgency} Gate Repair in ${loc}`;
  }
}

/**
 * Generate meta description from parsed slug data.
 */
export function buildMetaDescription(
  parsed: ParsedSlug,
  city: string,
  stateFull: string,
  urgency: string
): string {
  const base = `Need ${urgency.toLowerCase()} automatic gate repair in ${city}?`;
  switch (parsed.slugType) {
    case "brand":
      return `${base} Is your ${parsed.brand} gate ${parsed.symptom.toLowerCase()}? Get an immediate local gate technician dispatched in ${stateFull}. Free on-site estimate.`;
    case "gateType":
      return `${base} Is your ${parsed.gateType} ${parsed.symptom.toLowerCase()}? Licensed technicians dispatched same-day across ${stateFull}. Free estimate.`;
    case "component":
      return `${base} Need a ${parsed.component} replaced${parsed.brand ? ` on your ${parsed.brand}` : ""}? Licensed technicians dispatched same-day in ${stateFull}. Free estimate.`;
    default:
      return `${base} Get same-day dispatch from licensed gate technicians in ${stateFull}. Free on-site estimate.`;
  }
}

/* ═══════════════════════════════════════════════════════════════════
 * STATE & CITY FORMATTING
 * ═══════════════════════════════════════════════════════════════════ */

const STATE_MAP: Record<string, string> = {
  al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas",
  ca: "California", co: "Colorado", ct: "Connecticut", de: "Delaware",
  fl: "Florida", ga: "Georgia", hi: "Hawaii", id: "Idaho",
  il: "Illinois", in: "Indiana", ia: "Iowa", ks: "Kansas",
  ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
  ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi",
  mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada",
  nh: "New Hampshire", nj: "New Jersey", nm: "New Mexico", ny: "New York",
  nc: "North Carolina", nd: "North Dakota", oh: "Ohio", ok: "Oklahoma",
  or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina",
  sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah",
  vt: "Vermont", va: "Virginia", wa: "Washington", wv: "West Virginia",
  wi: "Wisconsin", wy: "Wyoming", dc: "District of Columbia",
};

export function getStateName(abbr: string): string {
  return STATE_MAP[abbr.toLowerCase()] || abbr.toUpperCase();
}

export function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
