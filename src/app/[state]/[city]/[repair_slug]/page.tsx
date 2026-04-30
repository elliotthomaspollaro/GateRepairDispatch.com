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
import NearbyCities from "@/components/SEO/NearbyCities";
import {
  parseRepairSlug,
  getStateName,
  formatCityName,
} from "@/lib/seo-utils";
import { getAllCityStatePairs } from "@/lib/seo-cities";
import { getTopRepairSlugs } from "@/lib/seo-brands";

type Props = {
  params: Promise<{
    state: string;
    city: string;
    repair_slug: string;
  }>;
};

/* ─── Pre-render pSEO pages at build time ─── */
export async function generateStaticParams() {
  const cityPairs = getAllCityStatePairs();
  const repairSlugs = getTopRepairSlugs();

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

/* ─── Dynamic Metadata for SEO ─── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, repair_slug } = await params;

  const cityName = formatCityName(city);
  const stateFull = getStateName(state);
  const { brandDisplay, symptomDisplay } = parseRepairSlug(repair_slug);

  const title = `Emergency ${brandDisplay} Gate Repair in ${cityName}, ${state.toUpperCase()} | ${symptomDisplay}`;
  const description = `${symptomDisplay} on your ${brandDisplay} gate in ${cityName}, ${stateFull}? Get same-day dispatch from a licensed, bonded gate technician. Free on-site estimate. Call now or get your quote in 60 seconds from GateRepairDispatch.com.`;

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
  const { brandDisplay, symptomDisplay } = parseRepairSlug(repair_slug);

  // JSON-LD structured data for this page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `GateRepairDispatch.com — ${cityName}, ${stateFull}`,
    description: `Emergency ${brandDisplay} gate repair for ${symptomDisplay.toLowerCase()} in ${cityName}, ${stateFull}. Same-day dispatch from licensed technicians.`,
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
  };

  // Dynamic hero headline
  const headline = (
    <>
      Your {brandDisplay} Gate in {cityName} — Fixed Fast.
    </>
  );

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
          brand={brandDisplay}
          symptom={symptomDisplay}
          headline={headline}
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
          brand={brandDisplay}
          symptom={symptomDisplay}
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
