/* ─── pSEO Utility Functions ─── */
/* Parse and format URL slugs for dynamic page generation */

import { BRAND_DISPLAY_MAP, SYMPTOM_DISPLAY_MAP, SEO_BRANDS } from "./seo-brands";

/**
 * Parse a repair slug like "liftmaster-gate-stuck-open"
 * into structured repair data.
 */
export function parseRepairSlug(slug: string): {
  brand: string;
  brandDisplay: string;
  symptom: string;
  symptomDisplay: string;
} {
  // Try to match a known brand prefix
  let matchedBrand = "";
  let remainder = slug;

  for (const brand of SEO_BRANDS) {
    if (slug.startsWith(brand + "-")) {
      matchedBrand = brand;
      remainder = slug.slice(brand.length + 1);
      break;
    }
  }

  if (!matchedBrand) {
    // Fallback: treat first segment as brand
    const firstDash = slug.indexOf("-");
    if (firstDash > 0) {
      matchedBrand = slug.slice(0, firstDash);
      remainder = slug.slice(firstDash + 1);
    } else {
      matchedBrand = slug;
      remainder = "unknown-issue";
    }
  }

  return {
    brand: matchedBrand,
    brandDisplay: BRAND_DISPLAY_MAP[matchedBrand] || titleCase(matchedBrand.replace(/-/g, " ")),
    symptom: remainder,
    symptomDisplay: SYMPTOM_DISPLAY_MAP[remainder] || titleCase(remainder.replace(/-/g, " ")),
  };
}

/**
 * Format a state abbreviation to full name.
 */
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

/**
 * Format a city slug to title case.
 * "flower-mound" → "Flower Mound"
 * "the-woodlands" → "The Woodlands"
 */
export function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Capitalize first letter of each word.
 */
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
