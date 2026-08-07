"use client";

import { Search } from "lucide-react";
import { CONSULTATION_STATUSES, consultationStatusLabels } from "@/types/consultation";

type ConsultationsFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export function ConsultationsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ConsultationsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" aria-hidden />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, email, company, or service..."
          className="w-full rounded-xl border border-ink/15 bg-white py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
        />
      </div>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-teal-600"
      >
        <option value="ALL">All Statuses</option>
        {CONSULTATION_STATUSES.map((option) => (
          <option key={option} value={option}>
            {consultationStatusLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
