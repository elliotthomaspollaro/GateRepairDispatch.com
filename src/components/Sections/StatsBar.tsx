"use client";

import { motion } from "framer-motion";
import { Wrench, Timer, Star, Globe } from "lucide-react";

const stats = [
  { icon: Wrench, value: "15,000+", label: "Gates Repaired" },
  { icon: Timer, value: "Same-Day", label: "Dispatch Available" },
  { icon: Star, value: "98%", label: "Customer Satisfaction" },
  { icon: Globe, value: "Nationwide", label: "Coverage" },
];

export default function StatsBar() {
  return (
    <section className="py-14 sm:py-18 px-4" style={{ background: "#1B2D45" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl text-white mb-2">
            Trusted. Certified.{" "}
            <span style={{ color: "#F5B731" }}>Rapid Response.</span>
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            Real results from our certified technician network.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: "#F5B731" }} />
              <p className="text-3xl sm:text-4xl font-heading text-white">
                {stat.value}
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
