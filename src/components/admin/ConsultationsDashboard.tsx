"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConsultationsFilters } from "@/components/admin/ConsultationsFilters";
import { ConsultationsTable } from "@/components/admin/ConsultationsTable";
import { consultationStatusLabels, CONSULTATION_STATUSES } from "@/types/consultation";
import type { Consultation, ConsultationStatus } from "@/types/consultation";

export function ConsultationsDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "ALL") params.set("status", status);

    const response = await fetch(`/api/admin/consultations?${params.toString()}`);
    const data = await response.json();
    if (data.success) {
      setConsultations(data.consultations);
    }
    setLoading(false);
  }, [search, status]);

  useEffect(() => {
    const timeout = setTimeout(fetchConsultations, 250);
    return () => clearTimeout(timeout);
  }, [fetchConsultations]);

  async function handleStatusChange(id: string, newStatus: ConsultationStatus) {
    setUpdatingId(id);
    const previous = consultations;
    setConsultations((current) =>
      current.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );

    const response = await fetch("/api/admin/consultations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (!response.ok) {
      setConsultations(previous);
    }
    setUpdatingId(null);
  }

  const counts = useMemo(() => {
    return CONSULTATION_STATUSES.reduce<Record<string, number>>((acc, key) => {
      acc[key] = consultations.filter((c) => c.status === key).length;
      return acc;
    }, {});
  }, [consultations]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Consultation Requests</h1>
        <p className="text-sm text-ink/55">
          {consultations.length} total ·{" "}
          {CONSULTATION_STATUSES.map((key) => `${counts[key] ?? 0} ${consultationStatusLabels[key]}`).join(" · ")}
        </p>
      </div>

      <ConsultationsFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <div className="rounded-3xl border border-ink/10 bg-white p-16 text-center text-sm text-ink/50">
          Loading consultation requests...
        </div>
      ) : (
        <ConsultationsTable
          consultations={consultations}
          onStatusChange={handleStatusChange}
          updatingId={updatingId}
        />
      )}
    </div>
  );
}
