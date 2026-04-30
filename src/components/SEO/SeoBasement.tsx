/* ─── SeoBasement: Dynamic Keyword-Rich Content for pSEO Pages ─── */
/* Uses deterministic "spintax" rotation seeded by city+brand+symptom slug */
/* so every page is 100% unique while naturally weaving in keywords */
/* from all 4 buckets: Emergency, HOA/Access Control, Commercial, Brand. */

interface SeoBasementProps {
  city: string;
  state: string;
  stateFull: string;
  brand: string;
  symptom: string;
}

/* ─── Deterministic hash for spintax seed ─── */
function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number, offset: number = 0): T {
  return arr[(seed + offset) % arr.length];
}

/* ─── Keyword Buckets ─── */

const BUCKET_EMERGENCY = [
  (city: string, brand: string) =>
    `emergency ${brand} driveway gate repair in ${city}`,
  (city: string, _brand: string) =>
    `24/7 emergency gate repair near ${city}`,
  (city: string, _brand: string) =>
    `same-day gate motor replacement in ${city}`,
  (city: string, _brand: string) =>
    `urgent gate stuck open repair near ${city}`,
  (city: string, brand: string) =>
    `emergency ${brand} gate opener repair in ${city}`,
  (city: string, _brand: string) =>
    `after-hours gate repair service in ${city}`,
  (city: string, _brand: string) =>
    `rapid response gate technician near ${city}`,
  (city: string, _brand: string) =>
    `emergency automatic gate fix in ${city}`,
];

const BUCKET_HOA = [
  (city: string, _brand?: string) =>
    `HOA access control fix in ${city}`,
  (city: string, _brand?: string) =>
    `community gate intercom repair near ${city}`,
  (city: string, _brand?: string) =>
    `apartment complex gate entry system repair in ${city}`,
  (city: string, _brand?: string) =>
    `gated community access control repair in ${city}`,
  (city: string, _brand?: string) =>
    `HOA gate keypad replacement in ${city}`,
  (city: string, _brand?: string) =>
    `residential community gate repair near ${city}`,
  (city: string, _brand?: string) =>
    `subdivision gate entry repair in ${city}`,
];

const BUCKET_COMMERCIAL = [
  (city: string, _brand?: string) =>
    `commercial sliding gate technician in ${city}`,
  (city: string, _brand?: string) =>
    `industrial gate off-track repair near ${city}`,
  (city: string, _brand?: string) =>
    `warehouse rolling gate service in ${city}`,
  (city: string, _brand?: string) =>
    `commercial gate access control repair in ${city}`,
  (city: string, _brand?: string) =>
    `business parking gate repair near ${city}`,
  (city: string, _brand?: string) =>
    `commercial barrier arm repair in ${city}`,
  (city: string, _brand?: string) =>
    `commercial gate motor replacement near ${city}`,
];

const BUCKET_BRAND = [
  (city: string, brand: string) =>
    `${brand} gate opener repair in ${city}`,
  (city: string, brand: string) =>
    `${brand} circuit board replacement near ${city}`,
  (city: string, brand: string) =>
    `${brand} gate motor diagnostic in ${city}`,
  (city: string, brand: string) =>
    `certified ${brand} repair technician in ${city}`,
  (city: string, brand: string) =>
    `${brand} gate remote programming near ${city}`,
  (city: string, brand: string) =>
    `${brand} gate sensor calibration in ${city}`,
  (city: string, brand: string) =>
    `${brand} access control system repair in ${city}`,
];

/* ─── Paragraph Templates (spintax) ─── */

const INTRO_TEMPLATES = [
  (city: string, stateFull: string, brand: string, symptom: string, seed: number) =>
    `Looking for ${pick(BUCKET_EMERGENCY, seed, 0)(city, brand)}? GateRepairDispatch.com is the fastest way to get a licensed gate technician dispatched to your property in ${city}, ${stateFull}. Whether your ${brand} gate is experiencing ${symptom.toLowerCase()}, a motor failure, or a complete system lockout, our network of certified repair professionals is ready to respond. We specialize in ${pick(BUCKET_HOA, seed, 1)(city)} and can have a truck rolling to you the same day.`,

  (city: string, stateFull: string, brand: string, symptom: string, seed: number) =>
    `If you\u2019re searching for a ${pick(BUCKET_BRAND, seed, 2)(city, brand)}, you\u2019ve come to the right place. GateRepairDispatch.com connects ${city} property owners with a network of licensed, bonded gate repair technicians who specialize in ${brand} systems. From ${symptom.toLowerCase()} to complete motor overhauls, our technicians handle it all \u2014 and every initial on-site estimate is free across ${stateFull}.`,

  (city: string, stateFull: string, brand: string, symptom: string, seed: number) =>
    `Dealing with ${symptom.toLowerCase()} on your ${brand} gate? You\u2019re not alone. Hundreds of ${city}, ${stateFull} property owners deal with automatic gate failures every month. Instead of leaving your property unsecured or paying inflated emergency call-out fees, let GateRepairDispatch.com connect you with a ${pick(BUCKET_COMMERCIAL, seed, 3)(city)} who can diagnose and fix the issue fast.`,
];

const EMERGENCY_TEMPLATES = [
  (city: string, stateFull: string, brand: string, _symptom: string, seed: number) =>
    `When your gate is stuck and your property is unsecured, every minute counts. That\u2019s why our ${city} technicians offer ${pick(BUCKET_EMERGENCY, seed, 4)(city, brand)}. Whether your ${brand} gate stopped working at 2 AM or was damaged during a storm, our dispatchers can connect you with a technician seven days a week \u2014 including evenings and holidays. Most ${city} service calls are scheduled within 2\u20134 hours, and ${stateFull} property owners can count on transparent, upfront pricing before any work begins.`,

  (city: string, stateFull: string, brand: string, _symptom: string, seed: number) =>
    `A broken gate is more than an inconvenience \u2014 it\u2019s a security vulnerability. Our ${city} technicians understand that urgency, which is why we prioritize same-day dispatch for ${pick(BUCKET_EMERGENCY, seed, 6)(city, brand)}. Whether you need a ${brand} motor replaced, a sensor realigned, or a chain drive repaired, our ${stateFull} network is equipped to handle it. You get a licensed, bonded professional at your door \u2014 not a handyman with a YouTube tutorial.`,
];

const HOA_TEMPLATES = [
  (city: string, stateFull: string, brand: string, _symptom: string, seed: number) =>
    `Managing a gated community in ${city}? A broken entry system doesn\u2019t just frustrate residents \u2014 it compromises the security of the entire neighborhood. Our technicians specialize in ${pick(BUCKET_HOA, seed, 0)(city)} for HOA-managed properties, apartment complexes, and condominiums across ${stateFull}. From ${brand} telephone entry systems to keypad readers and intercom panels, we repair and replace all access control components. Your property management team will receive a detailed invoice and warranty documentation for board records.`,

  (city: string, stateFull: string, brand: string, _symptom: string, seed: number) =>
    `HOA board members and property managers throughout ${city} trust GateRepairDispatch.com for ${pick(BUCKET_HOA, seed, 3)(city)}. We know the urgency of keeping community gates operational \u2014 a broken gate means liability risk, angry residents, and unauthorized access. Our ${stateFull} technicians carry common ${brand} replacement parts on their trucks so most repairs are completed in a single visit.`,
];

const COMMERCIAL_TEMPLATES = [
  (city: string, _stateFull: string, brand: string, _symptom: string, seed: number) =>
    `Need a ${pick(BUCKET_COMMERCIAL, seed, 0)(city)}? Our network includes technicians who specialize in high-cycle commercial gate systems \u2014 the kind that see hundreds of entries per day. Whether your ${brand} commercial sliding gate is off-track, your barrier arm is stuck, or your access control keypad has failed, our certified pros in ${city} can get your business back to secure, uninterrupted operation.`,

  (city: string, _stateFull: string, brand: string, _symptom: string, seed: number) =>
    `Commercial properties in ${city} can\u2019t afford gate downtime. A broken parking gate or sliding gate means unauthorized access, liability exposure, and lost revenue. Our technicians provide ${pick(BUCKET_COMMERCIAL, seed, 4)(city)} for all ${brand} commercial systems, including loop detectors, safety sensors, and photo eyes. Same-day commercial dispatch is available for emergency situations.`,
];

const BRAND_TEMPLATES = [
  (city: string, _stateFull: string, brand: string, symptom: string, seed: number) =>
    `${brand} gate systems are among the most popular in ${city} \u2014 and our technicians are factory-trained to service them. Whether you\u2019re dealing with ${symptom.toLowerCase()}, a failed circuit board, or a ${pick(BUCKET_BRAND, seed, 1)(city, brand)} situation, our pros have the diagnostic tools and OEM parts to get your ${brand} gate back online. We also handle ${brand} remote programming, sensor alignment, and preventive maintenance.`,

  (city: string, _stateFull: string, brand: string, symptom: string, seed: number) =>
    `If your ${brand} gate is showing signs of ${symptom.toLowerCase()}, don\u2019t wait until it fails completely. Our ${city}-area technicians offer ${pick(BUCKET_BRAND, seed, 4)(city, brand)} and can diagnose the root cause quickly. Common ${brand} issues include worn gear sets, capacitor failure, limit switch misalignment, and corroded wiring. Get your free diagnostic when you book through GateRepairDispatch.com.`,
];

const CTA_TEMPLATES = [
  (city: string, brand: string) =>
    `Ready to get your ${brand} gate repaired? Enter your ZIP code above and get matched with a certified technician in ${city} in 60 seconds. Free on-site estimates, same-day dispatch, all brands serviced \u2014 that\u2019s the GateRepairDispatch.com promise.`,

  (city: string, brand: string) =>
    `Don\u2019t leave your property unsecured another day. Get your free, no-obligation repair quote from GateRepairDispatch.com today. ${city} property owners trust us for the fastest emergency driveway gate repair and ${brand} access control service available.`,

  (city: string, _brand: string) =>
    `Stop worrying about your broken gate. GateRepairDispatch.com gives ${city} property owners the fastest path from broken gate to fully secured. Enter your ZIP code, describe the issue, and get matched with a licensed technician \u2014 it\u2019s that simple.`,
];

/* ─── FAQ Templates ─── */
const FAQ_SETS = [
  (city: string, stateFull: string, brand: string, symptom: string) => [
    {
      q: `How fast can you send a technician for ${brand} gate repair in ${city}?`,
      a: `Most ${city} repair calls are dispatched within 2\u20134 hours. Same-day service is available in most ${stateFull} metro areas. After submitting your request, a technician will call you within 15 minutes to confirm scheduling.`,
    },
    {
      q: `How much does it cost to fix a ${brand} gate with ${symptom.toLowerCase()} in ${city}?`,
      a: `Repair costs depend on the specific issue and parts needed. Common ${brand} repairs in ${city} range from $150\u2013$600. The technician provides a free on-site estimate before any work begins \u2014 you only pay if you approve the repair.`,
    },
    {
      q: `Do you repair HOA and community gates in ${city}, ${stateFull}?`,
      a: `Absolutely. Our technicians regularly service HOA gates, apartment complexes, and gated communities throughout ${city}. We provide detailed invoices and warranty documentation for property management records.`,
    },
    {
      q: `Can your technician fix a ${brand} gate that was hit by a car?`,
      a: `Yes. Our ${city} technicians handle collision damage including bent gate panels, broken tracks, damaged motors, and misaligned posts. They\u2019ll provide a comprehensive repair estimate and can coordinate with your insurance if needed.`,
    },
  ],
  (city: string, stateFull: string, brand: string, symptom: string) => [
    {
      q: `Is same-day gate repair available in ${city}?`,
      a: `Yes, in most cases. Our ${stateFull} technician network prioritizes emergency calls. After submitting your request through GateRepairDispatch.com, expect a call within 15 minutes to schedule \u2014 often for the same day.`,
    },
    {
      q: `Do your technicians carry ${brand} replacement parts?`,
      a: `Most technicians in our ${city} network carry common ${brand} parts on their trucks, including motors, circuit boards, remotes, and sensors. For less common parts, they can typically source and install them within 24\u201348 hours.`,
    },
    {
      q: `What if my gate has a different issue than ${symptom.toLowerCase()}?`,
      a: `No problem. Our technicians are trained to diagnose all gate issues, not just ${symptom.toLowerCase()}. They\u2019ll perform a complete system diagnostic on-site and identify the root cause before recommending a repair.`,
    },
    {
      q: `Are your gate repair technicians in ${city} licensed and insured?`,
      a: `Yes. Every technician in the GateRepairDispatch.com network is licensed, bonded, and insured in ${stateFull}. Your property is protected throughout the repair process.`,
    },
  ],
];

/* ─── Component ─── */
export default function SeoBasement({
  city,
  state,
  stateFull,
  brand,
  symptom,
}: SeoBasementProps) {
  const seed = hashSeed(`${city}-${state}-${brand}-${symptom}`);

  const introP = pick(INTRO_TEMPLATES, seed, 0)(city, stateFull, brand, symptom, seed);
  const emergencyP = pick(EMERGENCY_TEMPLATES, seed, 1)(city, stateFull, brand, symptom, seed);
  const hoaP = pick(HOA_TEMPLATES, seed, 2)(city, stateFull, brand, symptom, seed);
  const commercialP = pick(COMMERCIAL_TEMPLATES, seed, 3)(city, stateFull, brand, symptom, seed);
  const brandP = pick(BRAND_TEMPLATES, seed, 4)(city, stateFull, brand, symptom, seed);
  const ctaP = pick(CTA_TEMPLATES, seed, 5)(city, brand);
  const faqs = pick(FAQ_SETS, seed, 6)(city, stateFull, brand, symptom);

  // FAQPage JSON-LD
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
    <article className="py-12 px-4 border-t border-border/50" aria-label="Additional information">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto text-muted/70 leading-relaxed">
        <h2 className="text-lg font-heading text-muted/80 mb-4">
          {brand} {symptom} Repair in {city}, {state.toUpperCase()}
        </h2>

        <p className="mb-4 text-sm normal-case">{introP}</p>

        <h3 className="text-base font-heading font-semibold text-muted/80 mt-6 mb-3">
          Emergency Gate Repair &amp; Same-Day Dispatch in {city}
        </h3>
        <p className="mb-4 text-sm normal-case">{emergencyP}</p>

        <h3 className="text-base font-heading font-semibold text-muted/80 mt-6 mb-3">
          HOA &amp; Community Access Control Fix in {city}
        </h3>
        <p className="mb-4 text-sm normal-case">{hoaP}</p>

        <h3 className="text-base font-heading font-semibold text-muted/80 mt-6 mb-3">
          Commercial Sliding Gate Technician in {city}
        </h3>
        <p className="mb-4 text-sm normal-case">{commercialP}</p>

        <h3 className="text-base font-heading font-semibold text-muted/80 mt-6 mb-3">
          Certified {brand} Repair Specialists
        </h3>
        <p className="mb-4 text-sm normal-case">{brandP}</p>

        <p className="mb-8 text-sm font-semibold text-muted/80 normal-case">{ctaP}</p>

        {/* ─── FAQ Section ─── */}
        <div className="border-t border-border/40 pt-8 mt-4">
          <h3 className="text-base font-heading text-muted/80 mb-5">
            Frequently Asked Questions: {brand} {symptom} Repair in {city}
          </h3>
          <dl className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i}>
                <dt className="text-sm font-bold text-muted/90 mb-1 normal-case">{faq.q}</dt>
                <dd className="text-sm text-muted/70 normal-case">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
