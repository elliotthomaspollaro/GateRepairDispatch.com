"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import MultiStepLeadForm from "@/components/Form/MultiStepLeadForm";

interface HeroSectionProps {
  city?: string;
  state?: string;
  brand?: string;
  symptom?: string;
  headline?: React.ReactNode;
}

export default function HeroSection({
  city,
  state,
  brand,
  symptom,
  headline,
}: HeroSectionProps) {
  const defaultHeadline = (
    <>Emergency Gate Repair. Dispatched Fast.</>
  );

  return (
    <>
      <section
        className="relative overflow-hidden"
        id="hero"
        style={{ background: "#F7F3EB" }}
      >
        {/* Soft decorative glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 15% 85%, rgba(75,166,160,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 85% 15%, rgba(232,115,42,0.05) 0%, transparent 70%)`,
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-10 sm:pt-14 lg:pt-20 pb-14 sm:pb-20 lg:pb-28">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* ─── Left column ─── */}
            <div className="flex-1 space-y-6 lg:pt-4">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{ background: "rgba(232,115,42,0.1)", color: "#E8732A", border: "1px solid rgba(232,115,42,0.2)" }}
                >
                  <Zap className="w-3 h-3" style={{ color: "#E8732A" }} />
                  Same-Day Dispatch Available
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.08]"
                style={{ color: "#1B2D45", maxWidth: "14em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {headline || defaultHeadline}
              </motion.h1>

              {/* Subhead */}
              <motion.p
                className="text-base sm:text-lg"
                style={{ color: "#6E8298", maxWidth: "28rem" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-bold" style={{ color: "#1B2D45" }}>Licensed. Bonded. All major brands.</span>
                <br />
                Get your free repair quote in 60 seconds.
              </motion.p>

              {/* Trust chips */}
              <motion.div
                className="flex flex-wrap gap-x-5 gap-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {["LiftMaster Certified", "Same-Day Service", "Free Estimates"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#6E8298" }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#4BA6A0" }} />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ─── Right: Form ─── */}
            <motion.div
              className="w-full max-w-sm shrink-0 relative z-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="lead-form"
            >
              <MultiStepLeadForm city={city} state={state} brand={brand} symptom={symptom} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <div className="py-4 px-4" style={{ background: "#1B2D45" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ background: "rgba(75,166,160,0.15)" }}>
            <ShieldCheck className="w-5 h-5" style={{ color: "#4BA6A0" }} />
          </div>
          <div className="flex flex-col sm:items-start">
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">
              Licensed Technicians · Rapid Response · All Brands Serviced
            </span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Serving residential, HOA, and commercial properties nationwide.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
