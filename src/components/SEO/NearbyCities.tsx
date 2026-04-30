import Link from "next/link";
import { MapPin } from "lucide-react";
import { SEO_CITIES } from "@/lib/seo-cities";
import { formatCityName } from "@/lib/seo-utils";

interface NearbyCitiesProps {
  currentCity: string;
  state: string;
  repairSlug: string;
}

/**
 * "Nearby Cities" internal linking widget for pSEO pages.
 * Gets 6 neighboring cities from the same state and links to their
 * equivalent repair page. Creates a spiderweb of internal links
 * so Googlebot can crawl between all pages.
 */
export default function NearbyCities({
  currentCity,
  state,
  repairSlug,
}: NearbyCitiesProps) {
  const stateCities = SEO_CITIES[state];
  if (!stateCities || stateCities.length < 2) return null;

  const idx = stateCities.indexOf(currentCity);
  const nearby: string[] = [];
  const total = stateCities.length;

  for (let offset = 1; nearby.length < 6 && offset <= total; offset++) {
    const beforeIdx = (idx - offset + total) % total;
    const afterIdx = (idx + offset) % total;

    if (stateCities[beforeIdx] !== currentCity && !nearby.includes(stateCities[beforeIdx])) {
      nearby.push(stateCities[beforeIdx]);
    }
    if (nearby.length < 6 && stateCities[afterIdx] !== currentCity && !nearby.includes(stateCities[afterIdx])) {
      nearby.push(stateCities[afterIdx]);
    }
  }

  return (
    <nav
      className="py-8 px-4 border-t border-border/40"
      aria-label="Nearby cities"
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-heading text-muted/80 mb-4">
          We Also Repair Gates in Nearby Cities
        </h3>
        <div className="flex flex-wrap gap-2">
          {nearby.map((neighborCity) => (
            <Link
              key={neighborCity}
              href={`/${state}/${neighborCity}/${repairSlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-white border border-border/40 hover:border-teal/40 hover:shadow-sm transition-all text-xs font-semibold text-muted hover:text-teal"
            >
              <MapPin className="w-3 h-3" />
              {formatCityName(neighborCity)}, {state.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
