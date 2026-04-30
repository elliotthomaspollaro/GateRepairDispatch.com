"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadFormSchema, type LeadFormData } from "@/lib/validators";
import StepZipCode from "./steps/StepZipCode";
import StepGateType from "./steps/StepGateType";
import StepBrand from "./steps/StepBrand";
import StepIssue from "./steps/StepIssue";
import StepLoading from "./steps/StepLoading";
import StepContact from "./steps/StepContact";
import StepSuccess from "./steps/StepSuccess";

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

interface MultiStepLeadFormProps {
  city?: string;
  state?: string;
  brand?: string;
  symptom?: string;
}

export default function MultiStepLeadForm({
  city,
  state,
  brand,
  symptom,
}: MultiStepLeadFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      zipCode: "",
      gateType: "",
      brand: brand || "",
      primaryIssue: symptom || "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sourceUrl: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      referrer: "",
    },
    mode: "onTouched",
  });

  // Capture UTM params and referrer on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      methods.setValue("sourceUrl", window.location.href);
      methods.setValue("referrer", document.referrer || "");
      methods.setValue("utmSource", params.get("utm_source") || "");
      methods.setValue("utmMedium", params.get("utm_medium") || "");
      methods.setValue("utmCampaign", params.get("utm_campaign") || "");
      methods.setValue("utmContent", params.get("utm_content") || "");
    }
  }, [methods]);

  const goNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS + 2));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    // Show loading step (step 6)
    goNext();

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Artificial delay for psychological anticipation
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // 🔥 GA4 lead submission event
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          gate_type: data.gateType,
          brand: data.brand,
          issue: data.primaryIssue,
          zip_code: data.zipCode,
          api_success: result.success,
        });
      }

      setDirection(1);
      setCurrentStep(7);
    } catch {
      // Even on API failure, show success (we still have the lead in DB)
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setDirection(1);
      setCurrentStep(7);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress bar width
  const progressPercent = Math.min(
    ((currentStep - 1) / TOTAL_STEPS) * 100,
    100
  );

  return (
    <FormProvider {...methods}>
      <div className="card p-6 sm:p-8 overflow-hidden border border-border/50" id="lead-form">
        {/* Progress Bar — hidden on step 1 to keep initial form clean */}
        {currentStep >= 2 && currentStep <= TOTAL_STEPS && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted mb-2">
              <span>Step {currentStep} of {TOTAL_STEPS}</span>
              <span>{Math.round(progressPercent)}% complete</span>
            </div>
            <div className="h-2 bg-cream rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Step Content with Slide Animation */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepZipCode onNext={goNext} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepGateType onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepBrand onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepIssue onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step-5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepContact
                  onSubmit={handleSubmit}
                  onBack={goBack}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                key="step-loading"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepLoading city={city} />
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div
                key="step-success"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StepSuccess city={city} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
}
