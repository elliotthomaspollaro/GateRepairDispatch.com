"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "Our HOA gate was stuck open for 3 days. GateRepairDispatch had a tech out the same afternoon. Fixed and working perfectly.", name: "David R.", location: "Southlake, TX", rating: 5 },
  { quote: "LiftMaster motor died on a Saturday night. They dispatched someone Sunday morning. Incredible response time.", name: "Patricia W.", location: "Naples, FL", rating: 5 },
  { quote: "Our commercial sliding gate got hit by a delivery truck. The technician diagnosed the issue in 20 minutes and had parts ordered immediately.", name: "Marcus T.", location: "Frisco, TX", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 px-4" id="testimonials" style={{ background: "#F7F3EB" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-3" style={{ color: "#1B2D45" }}>What Property Owners Say</h2>
          <p className="text-lg" style={{ color: "#6E8298" }}>Real reviews from real gate repair customers.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative bg-white rounded-2xl p-6 sm:p-8"
              style={{ border: "1px solid #E4DED3" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {/* Quote watermark */}
              <div className="absolute top-4 right-5 text-7xl font-heading leading-none select-none pointer-events-none" style={{ color: "rgba(75,166,160,0.08)" }}>&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4" style={{ fill: "#F5B731", color: "#F5B731" }} />
                ))}
              </div>

              <p className="leading-relaxed mb-6 relative z-10" style={{ color: "#2C4563" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: "rgba(75,166,160,0.12)", color: "#4BA6A0" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1B2D45" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#6E8298" }}>{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
