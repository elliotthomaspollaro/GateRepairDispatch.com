"use client";

import { useFormContext } from "react-hook-form";
import { ChevronLeft, Lock } from "lucide-react";
import type { LeadFormData } from "@/lib/validators";

interface StepContactProps {
  onSubmit: (data: LeadFormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepContact({ onSubmit, onBack, isSubmitting }: StepContactProps) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const handleFormSubmit = async () => {
    const isValid = await trigger(["firstName", "email", "phone"]);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted hover:text-navy transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <h3 className="text-xl font-heading text-center">
        Where Should We Send Your Quote?
      </h3>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="contact-first-name" className="block text-sm font-semibold text-navy mb-1.5">
            First Name
          </label>
          <input
            {...register("firstName")}
            type="text"
            id="contact-first-name"
            placeholder="Your first name"
            className={`input-field ${errors.firstName ? "error" : ""}`}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-1.5">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="contact-email"
            placeholder="you@example.com"
            className={`input-field ${errors.email ? "error" : ""}`}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-navy mb-1.5">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="contact-phone"
            placeholder="(555) 123-4567"
            className={`input-field ${errors.phone ? "error" : ""}`}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && (
            <p className="text-error text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleFormSubmit}
        disabled={isSubmitting}
        className="btn-primary w-full text-lg disabled:opacity-60 disabled:cursor-not-allowed"
        id="contact-submit-btn"
      >
        Get Immediate Repair Quote 🔧
      </button>

      {/* TCPA Consent */}
      <p className="text-[10px] leading-snug text-muted/70 text-center">
        By clicking &quot;Get Immediate Repair Quote&quot;, I agree to the{" "}
        <a href="/terms" className="underline hover:text-navy">Terms of Service</a> and{" "}
        <a href="/privacy" className="underline hover:text-navy">Privacy Policy</a>, and provide
        my prior express written consent for GateRepairDispatch.com and its certified technician network to
        contact me via phone calls and text messages (including automated systems) regarding my repair
        request. Consent is not a condition of any purchase. Msg &amp; data rates may apply.
      </p>

      <div className="flex items-center justify-center gap-2 text-xs text-muted">
        <Lock className="w-3 h-3" />
        <span>Your info is 100% secure. We never spam or sell your data.</span>
      </div>
    </div>
  );
}
