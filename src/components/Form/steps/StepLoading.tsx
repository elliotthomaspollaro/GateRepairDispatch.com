"use client";

import { motion } from "framer-motion";
import { Cog, Radio } from "lucide-react";

interface StepLoadingProps {
  city?: string;
}

export default function StepLoading({ city }: StepLoadingProps) {
  const locationText = city || "your area";

  return (
    <div className="space-y-6 text-center py-4">
      {/* Spinning gear icon */}
      <motion.div
        className="w-20 h-20 mx-auto rounded-full bg-teal/10 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Cog className="w-10 h-10 text-teal" />
      </motion.div>

      {/* Pulsing text */}
      <div className="space-y-3">
        <motion.h3
          className="text-xl font-heading text-navy"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Dispatching Technicians...
        </motion.h3>

        <motion.p
          className="text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Connecting you with certified gate technicians in{" "}
          <span className="font-semibold text-teal">{locationText}</span>...
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 text-sm text-muted/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Radio className="w-4 h-4 text-orange animate-pulse" />
          <span>Checking same-day availability...</span>
        </motion.div>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-teal"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
