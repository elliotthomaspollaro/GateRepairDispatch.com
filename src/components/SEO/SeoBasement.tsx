/* ═══════════════════════════════════════════════════════════════════
 * SeoBasement.tsx — Dynamic Keyword-Rich Content for pSEO Pages
 * ═══════════════════════════════════════════════════════════════════
 * Uses deterministic seeded randomization (seeded by city string)
 * to produce 3 HCU-compliant paragraphs that naturally weave
 * items from ALL 5 keyword arrays:
 *   1. Brands (OEM)
 *   2. Gate Types / Property Types
 *   3. Mechanical Failures / Symptoms
 *   4. Components / Parts
 *   5. Urgency Modifiers
 *
 * CRITICAL: Seeded by city so content is:
 *   ✓ Consistent across server re-renders (Googlebot sees same thing)
 *   ✓ Unique across different cities (no duplicate content penalty)
 * ═══════════════════════════════════════════════════════════════════ */

import {
  BRANDS,
  GATE_TYPES,
  SYMPTOMS,
  COMPONENTS,
  URGENCY_MODIFIERS,
  hashSeed,
  pickN,
  pick,
} from "@/lib/seo-data";
import type { ParsedSlug } from "@/lib/seo-utils";

interface SeoBasementProps {
  city: string;
  state: string;
  stateFull: string;
  parsed: ParsedSlug;
}

/* ═══════════════════════════════════════════════════════════════════
 * PARAGRAPH TEMPLATE SETS — Each is a function that receives the
 * city context + seeded picks from each array to produce a
 * natural, helpful paragraph. 2-3 items per array, max.
 * ═══════════════════════════════════════════════════════════════════ */

interface TemplateContext {
  city: string;
  stateFull: string;
  parsed: ParsedSlug;
  brands: string[];      // 2-3 seeded brands
  gateTypes: string[];   // 2-3 seeded gate types
  symptoms: string[];    // 2-3 seeded symptoms
  components: string[];  // 2-3 seeded components
  urgency: string;       // 1 seeded urgency modifier
}

/* ─── Paragraph 1: Intro / Problem Recognition ─── */
const INTRO_TEMPLATES = [
  (ctx: TemplateContext) =>
    `If your **${ctx.gateTypes[0]}** is **${ctx.symptoms[0]}** or your **${ctx.brands[0]} ${ctx.components[0]}** is malfunctioning in ${ctx.city}, our network provides **${ctx.urgency}** service. We specialize in connecting property owners with technicians who can fix **gates that ${ctx.symptoms[1]}**, replace **${ctx.components[1]}s**, or repair **${ctx.components[2]}s**. Whether you manage a **${ctx.gateTypes[1]}** or a single residential driveway, GateRepairDispatch.com is the fastest way to get a licensed technician dispatched in ${ctx.stateFull}.`,

  (ctx: TemplateContext) =>
    `Searching for **${ctx.urgency} ${ctx.brands[0]} gate repair in ${ctx.city}**? You're in the right place. GateRepairDispatch.com connects ${ctx.city} property owners with licensed, bonded technicians who specialize in **${ctx.gateTypes[0]}** and **${ctx.gateTypes[1]}** systems. From a gate that's **${ctx.symptoms[0]}** to a **${ctx.components[0]}** that needs replacement, our ${ctx.stateFull} repair network handles it all — and every initial on-site estimate is free.`,

  (ctx: TemplateContext) =>
    `Dealing with a gate that's **${ctx.symptoms[0]}** or a **${ctx.components[0]}** failure on your ${ctx.city} property? You're not alone. Hundreds of ${ctx.stateFull} property owners deal with **${ctx.gateTypes[0]}** failures every month. Instead of leaving your property unsecured, let GateRepairDispatch.com match you with a technician who can diagnose and fix **${ctx.brands[0]}**, **${ctx.brands[1]}**, and **${ctx.brands[2]}** systems — often the same day you call.`,
];

/* ─── Paragraph 2: Service Depth / Expertise ─── */
const DEPTH_TEMPLATES = [
  (ctx: TemplateContext) =>
    `Our ${ctx.city} technician network services all major brands including **${ctx.brands[0]}**, **${ctx.brands[1]}**, and **${ctx.brands[2]}**. Common repairs include **${ctx.components[0]}** replacement, **${ctx.components[1]}** recalibration, and **${ctx.components[2]}** diagnostics. Whether your **${ctx.gateTypes[0]}** is **${ctx.symptoms[1]}** or your **${ctx.gateTypes[2]}** was **${ctx.symptoms[2]}**, our certified professionals carry OEM parts on their trucks so most repairs are completed in a single visit across ${ctx.stateFull}.`,

  (ctx: TemplateContext) =>
    `${ctx.city} property managers and homeowners trust our network for **${ctx.gateTypes[0]}** repair, **${ctx.gateTypes[1]}** service, and **${ctx.gateTypes[2]}** maintenance. Our technicians are factory-trained on **${ctx.brands[0]}** and **${ctx.brands[1]}** systems and carry common replacement parts — including **${ctx.components[0]}s**, **${ctx.components[1]}s**, and **${ctx.components[2]}s** — on every service call. Upfront pricing, no hidden fees, licensed and insured across ${ctx.stateFull}.`,

  (ctx: TemplateContext) =>
    `A broken gate is more than an inconvenience — it's a security vulnerability. Our ${ctx.city} technicians prioritize **${ctx.urgency} dispatch** for urgent situations like a gate **${ctx.symptoms[0]}**, **${ctx.symptoms[1]}**, or **${ctx.symptoms[2]}**. We service **${ctx.brands[0]}**, **${ctx.brands[1]}**, and **${ctx.brands[2]}** systems and can replace or repair **${ctx.components[0]}s**, **${ctx.components[1]}s**, and **${ctx.components[2]}s** on-site. You get a licensed, bonded professional — not a handyman with a YouTube tutorial.`,
];

/* ─── Paragraph 3: Local CTA / Urgency ─── */
const CTA_TEMPLATES = [
  (ctx: TemplateContext) =>
    `Ready to get your gate fixed in ${ctx.city}? Enter your ZIP code above and get matched with a certified technician in 60 seconds. We provide **${ctx.urgency} service** for **${ctx.gateTypes[0]}** repair, **${ctx.gateTypes[1]}** emergencies, and all **${ctx.brands[0]}** and **${ctx.brands[1]}** systems. Free on-site estimates, **same day dispatch**, all brands serviced — that's the GateRepairDispatch.com promise to ${ctx.stateFull} property owners.`,

  (ctx: TemplateContext) =>
    `Don't leave your ${ctx.city} property unsecured another day. Whether you need a **${ctx.components[0]}** replaced, a **${ctx.brands[0]}** gate back on track, or **${ctx.urgency} repair** for your **${ctx.gateTypes[0]}**, GateRepairDispatch.com has you covered. Our ${ctx.stateFull} network dispatches licensed technicians who arrive prepared to fix the problem — not just diagnose it. Get your free quote in 60 seconds.`,

  (ctx: TemplateContext) =>
    `Stop worrying about your broken gate. GateRepairDispatch.com gives ${ctx.city} property owners the fastest path from broken to fully secured. Whether it's a **${ctx.brands[0]}** system, a **${ctx.gateTypes[0]}** that's **${ctx.symptoms[0]}**, or a **${ctx.components[0]}** that needs replacing — enter your ZIP code, describe the issue, and get matched with a licensed ${ctx.stateFull} technician. It's that simple.`,
];


/* ═══════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════ */

export default function SeoBasement({
  city,
  state,
  stateFull,
  parsed,
}: SeoBasementProps) {
  // Seed by CITY only — consistent across re-renders, unique across cities
  const seed = hashSeed(city);

  // Pick 2-3 items from each array, deterministically
  const brands = pickN(BRANDS as unknown as string[], seed, 3, 0);
  const gateTypes = pickN(GATE_TYPES as unknown as string[], seed, 3, 7);
  const symptoms = pickN(SYMPTOMS as unknown as string[], seed, 3, 13);
  const components = pickN(COMPONENTS as unknown as string[], seed, 3, 19);
  const urgency = pick(URGENCY_MODIFIERS, seed, 3);

  // Inject the page's own brand/symptom/component into the picks
  // so the on-page content is relevant to the URL
  if (parsed.brand && !brands.includes(parsed.brand)) {
    brands[0] = parsed.brand;
  }
  if (parsed.symptom && !symptoms.includes(parsed.symptom.toLowerCase())) {
    symptoms[0] = parsed.symptom.toLowerCase();
  }
  if (parsed.gateType && !gateTypes.includes(parsed.gateType.toLowerCase())) {
    gateTypes[0] = parsed.gateType.toLowerCase();
  }
  if (parsed.component && !components.includes(parsed.component.toLowerCase())) {
    components[0] = parsed.component.toLowerCase();
  }

  const ctx: TemplateContext = {
    city,
    stateFull,
    parsed,
    brands,
    gateTypes,
    symptoms,
    components,
    urgency,
  };

  // Pick paragraphs deterministically
  const introP = pick(INTRO_TEMPLATES, seed, 0)(ctx);
  const depthP = pick(DEPTH_TEMPLATES, seed, 1)(ctx);
  const ctaP = pick(CTA_TEMPLATES, seed, 2)(ctx);

  // Build the section heading based on slug type
  const heading =
    parsed.slugType === "brand"
      ? `${parsed.brand} Gate Repair in ${city}, ${state.toUpperCase()}`
      : parsed.slugType === "gateType"
        ? `${parsed.gateType} Repair in ${city}, ${state.toUpperCase()}`
        : `${parsed.component} Repair in ${city}, ${state.toUpperCase()}`;

  return (
    <article className="py-12 px-4 border-t" style={{ borderColor: "#E4DED3" }} aria-label="Additional repair information">
      <div className="max-w-4xl mx-auto leading-relaxed" style={{ color: "#6E8298" }}>
        <h2 className="text-lg font-heading mb-6" style={{ color: "#1B2D45" }}>
          {heading}
        </h2>

        <div
          className="space-y-4 text-sm [&_strong]:font-semibold"
          style={{ color: "#6E8298" }}
          dangerouslySetInnerHTML={{
            __html: [introP, depthP, ctaP]
              .map((p) => `<p>${p.replace(/\*\*(.*?)\*\*/g, "<strong style='color:#1B2D45'>$1</strong>")}</p>`)
              .join(""),
          }}
        />
      </div>
    </article>
  );
}
