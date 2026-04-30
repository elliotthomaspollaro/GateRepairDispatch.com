"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How quickly can you dispatch a gate repair technician?", answer: "In most cases, same-day dispatch is available. After you submit your request, a certified technician in your area will call you within 15 minutes to schedule service — often arriving within 2–4 hours." },
  { question: "What brands do your technicians service?", answer: "Our network covers all major gate opener brands: LiftMaster, DoorKing, Viking, Mighty Mule, Linear, FAAC, Ghost Controls, and more. If your brand isn't listed, select 'Unsure' and the technician will identify it on-site." },
  { question: "Do you repair HOA and commercial gates?", answer: "Absolutely. Our technicians service residential driveway gates, HOA community gates, apartment complexes, commercial properties, and ranch gates. We handle swing gates, sliding gates, barrier arms, and access control systems." },
  { question: "How much does a typical gate repair cost?", answer: "Repair costs vary based on the issue and parts needed. Most common repairs (motor replacement, sensor alignment, keypad reset) range from $150–$600. The technician provides a free on-site estimate before any work begins." },
  { question: "Is there a fee for the initial diagnosis?", answer: "Most technicians in our network offer free on-site estimates. You'll never be charged without approving the repair and price first." },
  { question: "What if my gate was hit by a car?", answer: "Our technicians handle collision damage, including bent gates, broken tracks, damaged motors, and misaligned posts. They'll assess the full extent of the damage and provide a comprehensive repair estimate." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-16 sm:py-20 px-4" id="faq" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ color: "#1B2D45" }}>
            Frequently Asked{" "}
            <span style={{ color: "#4BA6A0" }}>Questions</span>
          </h2>
          <p className="mt-3 text-lg max-w-xl mx-auto" style={{ color: "#6E8298" }}>
            Got questions about gate repair? We&apos;ve got answers.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E4DED3", boxShadow: "0 2px 12px rgba(27,45,69,0.04)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 transition-colors"
                style={{ color: "#1B2D45" }}
                aria-expanded={openIndex === index}
              >
                <span className="font-heading">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5" style={{ color: "#6E8298" }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-5 text-sm leading-relaxed pt-4"
                      style={{ color: "#2C4563", borderTop: "1px solid #E4DED3" }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
