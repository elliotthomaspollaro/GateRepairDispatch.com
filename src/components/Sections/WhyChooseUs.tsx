"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Wrench, BadgeCheck } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Licensed & Bonded",
    description: "Every technician in our network is licensed, bonded, and insured. Your property is protected.",
  },
  {
    icon: Zap,
    title: "Same-Day Dispatch",
    description: "Emergency response when your gate is stuck. Most technicians arrive within 2–4 hours of your call.",
  },
  {
    icon: Wrench,
    title: "All Brands Serviced",
    description: "LiftMaster, DoorKing, Viking, Mighty Mule, Linear, FAAC, Ghost Controls — we repair them all.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guaranteed",
    description: "If you're not satisfied with the repair, we'll send another tech at no extra cost.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 px-4" id="why-choose-us" style={{ background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-balance" style={{ color: "#1B2D45" }}>
            Why Choose{" "}
            <span style={{ color: "#4BA6A0" }}>Us?</span>
          </h2>
          <p className="mt-3 text-lg max-w-xl mx-auto" style={{ color: "#6E8298" }}>
            We make emergency gate repair simple, fast, and stress-free.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300"
              style={{ background: "#F7F3EB", border: "1px solid #E4DED3" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
              }}
            >
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: "rgba(75,166,160,0.12)" }}>
                <benefit.icon className="w-6 h-6" style={{ color: "#4BA6A0" }} />
              </div>
              <div>
                <h3 className="text-lg mb-1" style={{ color: "#1B2D45" }}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E8298" }}>
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
