"use client";

import { useFormContext } from "react-hook-form";
import { ChevronLeft, Home, Building2, Building, Factory, Fence } from "lucide-react";
import type { LeadFormData } from "@/lib/validators";
import { GATE_TYPES } from "@/lib/validators";

interface StepGateTypeProps {
  onNext: () => void;
  onBack: () => void;
}

const gateIcons = [Home, Building2, Building, Factory, Fence];

export default function StepGateType({ onNext, onBack }: StepGateTypeProps) {
  const { setValue, watch } = useFormContext<LeadFormData>();
  const selectedType = watch("gateType");

  const handleSelect = (type: string) => {
    setValue("gateType", type);
    // Auto-advance after selection
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
        What Type of Gate?
      </h3>

      <div className="grid grid-cols-1 gap-2.5">
        {GATE_TYPES.map((type, i) => {
          const Icon = gateIcons[i];
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left font-semibold text-sm transition-all duration-200 ${
                isSelected
                  ? "border-teal bg-teal/10 text-teal"
                  : "border-border bg-card-white text-navy-light hover:border-teal/40"
              }`}
              id={`gate-type-${i}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? "bg-teal text-white" : "bg-cream text-muted"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
