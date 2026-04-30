"use client";

import { useFormContext } from "react-hook-form";
import { MapPin } from "lucide-react";
import type { LeadFormData } from "@/lib/validators";

interface StepZipCodeProps {
  onNext: () => void;
}

export default function StepZipCode({ onNext }: StepZipCodeProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const handleNext = async () => {
    const isValid = await trigger("zipCode");
    if (isValid) onNext();
  };

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-2xl font-heading text-navy leading-tight">
        Where Is Your Gate Located?
      </h3>

      <p className="text-sm text-muted">
        Enter your ZIP code so we can find technicians near you.
      </p>

      {/* ZIP input with location pin icon */}
      <div className="relative">
        <input
          {...register("zipCode")}
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="ZIP Code"
          className={`input-field pr-10 text-base ${
            errors.zipCode ? "error" : ""
          }`}
          autoFocus
          aria-label="ZIP Code"
          id="zip-code-input"
        />
        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50 pointer-events-none" />
        {errors.zipCode && (
          <p className="text-error text-sm mt-2">{errors.zipCode.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="btn-primary w-full text-base font-bold"
        id="zip-submit-btn"
      >
        Find Technicians &nbsp;→
      </button>

      <p className="text-xs text-muted">
        ⚡ Same-day dispatch available in most areas
      </p>
    </div>
  );
}
