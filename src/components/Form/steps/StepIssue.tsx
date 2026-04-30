"use client";

import { useFormContext } from "react-hook-form";
import { ChevronLeft, DoorOpen, Lock, Keyboard, BatteryWarning, Ban, CarFront } from "lucide-react";
import type { LeadFormData } from "@/lib/validators";
import { ISSUES } from "@/lib/validators";

interface StepIssueProps {
  onNext: () => void;
  onBack: () => void;
}

const issueIcons = [DoorOpen, Lock, Keyboard, BatteryWarning, Ban, CarFront];

export default function StepIssue({ onNext, onBack }: StepIssueProps) {
  const { setValue, watch } = useFormContext<LeadFormData>();
  const selectedIssue = watch("primaryIssue");

  const handleSelect = (issue: string) => {
    setValue("primaryIssue", issue);
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
        What&apos;s The Primary Issue?
      </h3>

      <div className="grid grid-cols-1 gap-2.5">
        {ISSUES.map((issue, i) => {
          const Icon = issueIcons[i];
          const isSelected = selectedIssue === issue;
          return (
            <button
              key={issue}
              type="button"
              onClick={() => handleSelect(issue)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left font-semibold text-sm transition-all duration-200 ${
                isSelected
                  ? "border-orange bg-orange/10 text-orange"
                  : "border-border bg-card-white text-navy-light hover:border-orange/40"
              }`}
              id={`issue-${i}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? "bg-orange text-white" : "bg-cream text-muted"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              {issue}
            </button>
          );
        })}
      </div>
    </div>
  );
}
