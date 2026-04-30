"use client";

import { motion } from "framer-motion";
import { CheckCircle, Wrench, Phone } from "lucide-react";

interface StepSuccessProps {
  city?: string;
}

export default function StepSuccess({ city }: StepSuccessProps) {
  const locationText = city || "your area";

  return (
    <div className="space-y-6 text-center py-2">
      {/* Success checkmark */}
      <motion.div
        className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <CheckCircle className="w-12 h-12 text-success" />
      </motion.div>

      {/* Success headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h3 className="text-2xl font-heading text-success">
          Success!
        </h3>
        <p className="text-navy-light text-base leading-relaxed max-w-sm mx-auto">
          A local certified gate technician in{" "}
          <span className="font-bold text-teal">{locationText}</span>{" "}
          has received your request and will call you shortly to dispatch a truck.
        </p>
      </motion.div>

      {/* What to expect */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 text-sm text-navy-light">
          <Phone className="w-4 h-4 text-teal" />
          Expect a call within 15 minutes
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-navy-light">
          <Wrench className="w-4 h-4 text-teal" />
          Same-day dispatch available
        </div>
      </motion.div>

      {/* Fine print */}
      <motion.p
        className="text-xs text-muted max-w-sm mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        A licensed, bonded technician will assess your gate and provide an on-site
        estimate. No obligation — if you&apos;re not satisfied with the quote, there&apos;s no charge.
      </motion.p>
    </div>
  );
}
