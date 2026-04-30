import type { MetadataRoute } from "next";
import { getAllCityStatePairs } from "@/lib/seo-cities";
import { getCuratedRepairSlugs } from "@/lib/seo-data";

const BASE_URL = "https://gaterepairdispatch.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Static pages ───
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // ─── pSEO city/brand/symptom pages ───
  const cityPairs = getAllCityStatePairs();
  const repairSlugs = getCuratedRepairSlugs();

  const pseoPages: MetadataRoute.Sitemap = [];

  for (const { city, state } of cityPairs) {
    for (const slug of repairSlugs) {
      pseoPages.push({
        url: `${BASE_URL}/${state}/${city}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...pseoPages];
}
