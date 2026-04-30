/* ─── SEO Cities: Texas + Florida Focus ─── */
/* Starting with TX + FL cities for gate repair niche. */
/* Expand to other states once indexation is confirmed. */

export const SEO_CITIES: Record<string, string[]> = {
  tx: [
    "houston", "san-antonio", "dallas", "austin", "fort-worth",
    "arlington", "plano", "irving", "garland", "grand-prairie",
    "mckinney", "frisco", "southlake", "denton", "mesquite",
    "flower-mound", "cedar-park", "round-rock", "georgetown", "sugar-land",
    "pearland", "league-city", "katy", "the-woodlands", "spring",
  ],
  fl: [
    "miami", "fort-lauderdale", "tampa", "orlando", "jacksonville",
    "naples", "sarasota", "cape-coral", "st-petersburg", "clearwater",
    "boca-raton", "west-palm-beach", "coral-springs", "pembroke-pines", "hialeah",
  ],
};

/** Get all city/state combos as flat array */
export function getAllCityStatePairs(): { city: string; state: string }[] {
  const pairs: { city: string; state: string }[] = [];
  for (const [state, cities] of Object.entries(SEO_CITIES)) {
    for (const city of cities) {
      pairs.push({ city, state });
    }
  }
  return pairs;
}

/** Get total city count */
export function getCityCount(): number {
  return Object.values(SEO_CITIES).reduce((acc, cities) => acc + cities.length, 0);
}
