"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <section className="py-16 sm:py-20 px-4" style={{ background: "#F0ECE2" }}>
      <motion.div
        className="max-w-2xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-balance" style={{ color: "#1B2D45" }}>
          Ready to Fix Your{" "}
          <span style={{ color: "#E8732A" }}>Gate?</span>
        </h2>
        <p className="text-lg max-w-lg mx-auto" style={{ color: "#6E8298" }}>
          It&apos;s fast, free, and there&apos;s no obligation. Get matched with a certified gate technician in 60 seconds.
        </p>
        <button onClick={scrollToTop} className="btn-primary text-lg group">
          Get Free Repair Quote
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
