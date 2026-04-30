"use client";

import { useFormContext } from "react-hook-form";
import { ChevronLeft, HelpCircle } from "lucide-react";
import type { LeadFormData } from "@/lib/validators";
import { BRANDS } from "@/lib/validators";

interface StepBrandProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepBrand({ onNext, onBack }: StepBrandProps) {
  const { setValue, watch } = useFormContext<LeadFormData>();
  const selectedBrand = watch("brand");

  const handleSelect = (brand: string) => {
    setValue("brand", brand);
    setTimeout(onNext, 200);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted hover:text-navy transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <h3 className="text-xl font-heading text-center">
        What Brand Is Your Gate Opener?
      </h3>
      <p className="text-sm text-muted text-center">
        Don&apos;t know? Select &quot;Unsure&quot; — our tech will identify it on-site.
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {BRANDS.map((brand, i) => {
          const isSelected = selectedBrand === brand;
          const isUnsure = brand === "Unsure";
          return (
            <button
              key={brand}
              type="button"
              onClick={() => handleSelect(brand)}
              className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                isSelected
                  ? "border-teal bg-teal/10 text-teal"
                  : "border-border bg-card-white text-navy-light hover:border-teal/40"
              } ${isUnsure ? "col-span-2" : ""}`}
              id={`brand-${i}`}
            >
              {isUnsure && <HelpCircle className="w-4 h-4" />}
              {brand}
            </button>
          );
        })}
      </div>
    </div>
  );
}
