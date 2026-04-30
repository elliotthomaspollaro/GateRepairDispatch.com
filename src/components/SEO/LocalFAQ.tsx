/* ═══════════════════════════════════════════════════════════════════
 * LocalFAQ.tsx — Dynamically Generated FAQ Accordion with Schema
 * ═══════════════════════════════════════════════════════════════════
 * Generates 3 unique, localized Q&As per page using seeded picks
 * from the keyword arrays. Wraps in FAQPage JSON-LD for Google AI
 * Overviews and ChatGPT search. Interactive accordion UI.
 * ═══════════════════════════════════════════════════════════════════ */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  BRANDS,
  GATE_TYPES,
  SYMPTOMS,
  COMPONENTS,
  URGENCY_MODIFIERS,
  hashSeed,
  pick,
} from "@/lib/seo-data";
import type { ParsedSlug } from "@/lib/seo-utils";

interface LocalFAQProps {
  city: string;
  stateFull: string;
  parsed: ParsedSlug;
}

/* ─── FAQ Generator Functions ─── */

interface FAQ {
  q: string;
  a: string;
}

type FAQGenerator = (
  city: string,
  stateFull: string,
  parsed: ParsedSlug,
  seed: number
) => FAQ;

const FAQ_GENERATORS: FAQGenerator[] = [
  // Q: Why does my gate keep opening by itself?
  (city, stateFull, parsed, seed) => {
    const symptom = parsed.symptom || pick(SYMPTOMS, seed, 0);
    const brand = parsed.brand || pick(BRANDS, seed, 1);
    const component = pick(COMPONENTS, seed, 2);
    return {
      q: `Why does my ${brand} gate keep ${symptom.toLowerCase()} in ${city}?`,
      a: `A ${brand} gate that's ${symptom.toLowerCase()} is usually caused by a faulty ${component}, worn limit switches, or electrical interference. Our licensed ${city} technicians perform a complete system diagnostic to identify the root cause. In ${stateFull}, this is one of the most common repair calls we receive — and most are resolved in a single visit.`,
    };
  },

  // Q: How much does repair cost?
  (city, stateFull, parsed, seed) => {
    const brand = parsed.brand || pick(BRANDS, seed, 3);
    const component = parsed.component || pick(COMPONENTS, seed, 4);
    return {
      q: `How much does it cost to fix a ${brand} gate with a ${component} failure in ${city}?`,
      a: `Repair costs in ${city} depend on the specific issue and parts needed. Common ${brand} ${component} repairs range from $150–$600. More complex issues like motor replacement or full circuit board swaps may run $400–$1,200. The technician provides a free on-site estimate in ${stateFull} before any work begins — you only pay if you approve the repair.`,
    };
  },

  // Q: Emergency/24-hour service?
  (city, stateFull, parsed, seed) => {
    const urgency = pick(URGENCY_MODIFIERS, seed, 5);
    const gateType = parsed.gateType || pick(GATE_TYPES, seed, 6);
    return {
      q: `Do you provide ${urgency} ${gateType} repair in ${city}?`,
      a: `Yes. Our ${stateFull} technician network offers ${urgency} dispatch for ${gateType} emergencies in ${city} and surrounding areas. After submitting your request through GateRepairDispatch.com, expect a call within 15 minutes to confirm scheduling — often for the same day, including evenings and weekends.`,
    };
  },

  // Q: HOA/community gate service?
  (city, stateFull, parsed, seed) => {
    const brand = parsed.brand || pick(BRANDS, seed, 7);
    const component = pick(COMPONENTS, seed, 8);
    return {
      q: `Do your technicians repair HOA and community gates in ${city}, ${stateFull}?`,
      a: `Absolutely. Our technicians regularly service HOA gates, apartment complexes, and gated communities throughout ${city}. We handle ${brand} systems, ${component} replacements, and full access control overhauls. Detailed invoices and warranty documentation are provided for property management board records.`,
    };
  },

  // Q: Hit by car / collision damage?
  (city, _stateFull, parsed, seed) => {
    const brand = parsed.brand || pick(BRANDS, seed, 9);
    return {
      q: `Can your ${city} technician fix a ${brand} gate that was hit by a car?`,
      a: `Yes. Our ${city} technicians handle collision damage including bent gate panels, broken tracks, damaged motors, and misaligned posts. They'll provide a comprehensive repair estimate and can coordinate with your insurance company if needed. ${brand} OEM parts are used whenever possible.`,
    };
  },

  // Q: Brands serviced?
  (city, stateFull, _parsed, seed) => {
    const b1 = pick(BRANDS, seed, 10);
    const b2 = pick(BRANDS, seed, 11);
    const b3 = pick(BRANDS, seed, 12);
    return {
      q: `What gate opener brands do your ${city} technicians service?`,
      a: `Our ${stateFull} technicians are trained on all major brands including ${b1}, ${b2}, ${b3}, and more. Most carry common replacement parts — motors, circuit boards, remotes, and sensors — on their trucks for same-day repair.`,
    };
  },

  // Q: Parts availability?
  (city, stateFull, parsed, seed) => {
    const brand = parsed.brand || pick(BRANDS, seed, 13);
    const c1 = pick(COMPONENTS, seed, 14);
    const c2 = pick(COMPONENTS, seed, 15);
    return {
      q: `Do your technicians carry ${brand} replacement parts in ${city}?`,
      a: `Most technicians in our ${city} network carry common ${brand} parts on their trucks, including ${c1}s, ${c2}s, remotes, and sensors. For less common parts, they can typically source and install them within 24–48 hours across ${stateFull}.`,
    };
  },
];

/* ═══════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════ */

export default function LocalFAQ({ city, stateFull, parsed }: LocalFAQProps) {
  const seed = hashSeed(city);

  // Pick 3 unique FAQ generators deterministically
  const selectedIndices = new Set<number>();
  let offset = 0;
  while (selectedIndices.size < 3 && selectedIndices.size < FAQ_GENERATORS.length) {
    selectedIndices.add((seed + offset) % FAQ_GENERATORS.length);
    offset++;
  }

  const faqs = Array.from(selectedIndices).map((idx) =>
    FAQ_GENERATORS[idx](city, stateFull, parsed, seed)
  );

  // FAQPage JSON-LD for AI search engines
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-10 px-4 border-t" style={{ borderColor: "#E4DED3" }} aria-label="Frequently asked questions" id="faq-local">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-heading mb-6" style={{ color: "#1B2D45" }}>
          Frequently Asked Questions: Gate Repair in {city}
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQAccordionItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Accordion Item ─── */
function FAQAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl transition-all duration-200"
      style={{
        background: open ? "#F7F3EB" : "#FFFFFF",
        border: `1px solid ${open ? "#E8732A33" : "#E4DED3"}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-bold" style={{ color: "#1B2D45" }}>
          {question}
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{
            color: "#E8732A",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-relaxed" style={{ color: "#6E8298" }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
