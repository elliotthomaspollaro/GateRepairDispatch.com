"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById("lead-form");
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const formEl = document.getElementById("lead-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="px-4 py-3 bg-navy border-t border-white/10"
            style={{ boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.3)" }}
          >
            <button
              onClick={scrollToForm}
              className="btn-primary w-full text-base"
              id="sticky-cta-btn"
            >
              <ArrowUp className="w-4 h-4" />
              Get Free Repair Quote
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
