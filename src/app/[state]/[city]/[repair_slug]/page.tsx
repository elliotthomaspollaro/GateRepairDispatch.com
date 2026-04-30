import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Sections/HeroSection";
import HowItWorks from "@/components/Sections/HowItWorks";
import StatsBar from "@/components/Sections/StatsBar";
import WhyChooseUs from "@/components/Sections/WhyChooseUs";
import Testimonials from "@/components/Sections/Testimonials";
import FAQ from "@/components/Sections/FAQ";
import FinalCTA from "@/components/Sections/FinalCTA";
import StickyCTA from "@/components/UI/StickyCTA";
import SeoBasement from "@/components/SEO/SeoBasement";
import LocalFAQ from "@/components/SEO/LocalFAQ";
import NearbyCities from "@/components/SEO/NearbyCities";
import {
  parseRepairSlug,
  getStateName,
  formatCityName,
  buildMetaTitle,
  buildMetaDescription,
  buildHeadline,
} from "@/lib/seo-utils";
import { getAllCityStatePairs } from "@/lib/seo-cities";
import {
  getBuildRepairSlugs,
  BRANDS,
  COMPONENTS,
  GATE_TYPES,
  hashSeed,
  pick,
  pickN,
  URGENCY_MODIFIERS,
} from "@/lib/seo-data";

type Props = {
  params: Promise<{
    state: string;
    city: string;
    repair_slug: string;
  }>;
};

/* ─── Pre-render curated subset at build time ─── */
export async function generateStaticParams() {
  const cityPairs = getAllCityStatePairs();
  const repairSlugs = getBuildRepairSlugs();

  const params: { state: string; city: string; repair_slug: string }[] = [];

  for (const { city, state } of cityPairs) {
    for (const slug of repairSlugs) {
      params.push({ state, city, repair_slug: slug });
    }
  }

  return params;
}

/* ─── Allow non-pre-rendered paths to be generated on-demand ─── */
export const dynamicParams = true;

/* ─── Dynamic Metadata with Urgency Modifiers ─── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, repair_slug } = await params;

  const cityName = formatCityName(city);
  const stateFull = getStateName(state);
  const parsed = parseRepairSlug(repair_slug);
  const seed = hashSeed(city);
  const urgency = pick(URGENCY_MODIFIERS, seed, 0);
  const urgencyDisplay = urgency.charAt(0).toUpperCase() + urgency.slice(1);

  const title = buildMetaTitle(parsed, cityName, state, urgencyDisplay);
  const description = buildMetaDescription(parsed, cityName, stateFull, urgencyDisplay);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "GateRepairDispatch.com",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://gaterepairdispatch.com/${state}/${city}/${repair_slug}`,
    },
  };
}

/* ─── Page Component ─── */
export default async function LocationRepairPage({ params }: Props) {
  const { state, city, repair_slug } = await params;

  // Validate state abbreviation
  const stateFull = getStateName(state);
  if (stateFull === state.toUpperCase() && state.length !== 2) {
    notFound();
  }

  const cityName = formatCityName(city);
  const parsed = parseRepairSlug(repair_slug);
  const seed = hashSeed(city);

  // ─── Enriched LocalBusiness + Service JSON-LD ───
  const serviceBrands = pickN(BRANDS as unknown as string[], seed, 5, 0);
  const serviceComponents = pickN(COMPONENTS as unknown as string[], seed, 5, 7);
  const serviceGateTypes = pickN(GATE_TYPES as unknown as string[], seed, 4, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://gaterepairdispatch.com/${state}/${city}/${repair_slug}#business`,
        name: `GateRepairDispatch.com — ${cityName}, ${stateFull}`,
        description: `Emergency automatic gate repair for ${cityName}, ${stateFull}. Same-day dispatch from licensed technicians. All brands serviced.`,
        url: `https://gaterepairdispatch.com/${state}/${city}/${repair_slug}`,
        areaServed: {
          "@type": "City",
          name: cityName,
          containedInPlace: {
            "@type": "State",
            name: stateFull,
          },
        },
        priceRange: "$150 - $2,500+",
        serviceType: "Automatic Gate Repair",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gate Repair Services",
          itemListElement: [
            ...serviceBrands.map((brand) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${brand} Gate Repair`,
                description: `Factory-trained repair for ${brand} gate openers and access control systems in ${cityName}.`,
              },
            })),
            ...serviceComponents.map((comp) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${comp.charAt(0).toUpperCase() + comp.slice(1)} Repair & Replacement`,
                description: `Professional ${comp} repair and replacement for automatic gates in ${cityName}.`,
              },
            })),
          ],
        },
      },
      {
        "@type": "Service",
        "@id": `https://gaterepairdispatch.com/${state}/${city}/${repair_slug}#service`,
        name: parsed.brand
          ? `${parsed.brand} Gate Repair in ${cityName}`
          : `Automatic Gate Repair in ${cityName}`,
        provider: {
          "@id": `https://gaterepairdispatch.com/${state}/${city}/${repair_slug}#business`,
        },
        areaServed: {
          "@type": "City",
          name: cityName,
        },
        serviceType: "Gate Repair",
        description: `Licensed, bonded gate repair technicians serving ${cityName}, ${stateFull}. Specializing in ${serviceGateTypes.join(", ")} repair.`,
      },
    ],
  };

  // ─── Dynamic hero headline ───
  const headlineText = buildHeadline(parsed, cityName);

  // For the hero, extract brand/symptom from parsed data
  const heroBrand = parsed.brand || undefined;
  const heroSymptom = parsed.symptom || parsed.component || undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <HeroSection
          city={cityName}
          state={state}
          brand={heroBrand}
          symptom={heroSymptom}
          headline={<>{headlineText}</>}
        />
        <HowItWorks />
        <StatsBar />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <SeoBasement
          city={cityName}
          state={state}
          stateFull={stateFull}
          parsed={parsed}
        />
        <LocalFAQ
          city={cityName}
          stateFull={stateFull}
          parsed={parsed}
        />
        <NearbyCities
          currentCity={city}
          state={state}
          repairSlug={repair_slug}
        />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
