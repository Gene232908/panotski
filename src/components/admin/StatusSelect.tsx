"use client";

import {
  CONSULTATION_STATUSES,
  consultationStatusLabels,
  type ConsultationStatus,
} from "@/types/consultation";
import { cn } from "@/lib/utils";

const toneByStatus: Record<ConsultationStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
  SCHEDULED: "bg-teal-50 text-teal-700 border-teal-200",
  COMPLETED: "bg-ink/5 text-ink/70 border-ink/10",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

type StatusSelectProps = {
  value: ConsultationStatus;
  onChange: (status: ConsultationStatus) => void;
  disabled?: boolean;
};

export function StatusSelect({ value, onChange, disabled }: StatusSelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as ConsultationStatus)}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition-colors duration-200",
        toneByStatus[value],
        disabled && "opacity-50",
      )}
    >
      {CONSULTATION_STATUSES.map((status) => (
        <option key={status} value={status}>
          {consultationStatusLabels[status]}
        </option>
      ))}
    </select>
  );
}
