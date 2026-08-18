import { formatDate } from "@/lib/utils";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { Consultation, ConsultationStatus } from "@/types/consultation";

type ConsultationsTableProps = {
  consultations: Consultation[];
  onStatusChange: (id: string, status: ConsultationStatus) => void;
  updatingId: string | null;
};

export function ConsultationsTable({
  consultations,
  onStatusChange,
  updatingId,
}: ConsultationsTableProps) {
  if (consultations.length === 0) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-white p-16 text-center text-sm text-ink/50">
        No consultation requests match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/40">
            <th className="px-5 py-4 font-semibold">Submitted</th>
            <th className="px-5 py-4 font-semibold">Client</th>
            {/* Company and Preferred Schedule columns removed — the form no
                longer collects them (plan §10.1). Legacy rows keep the data
                in the database. */}
            <th className="px-5 py-4 font-semibold">Service</th>
            <th className="px-5 py-4 font-semibold">Message</th>
            <th className="px-5 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id} className="border-b border-ink/5 align-top last:border-0">
              <td className="whitespace-nowrap px-5 py-4 text-ink/60">
                {formatDate(new Date(consultation.createdAt))}
              </td>
              <td className="px-5 py-4">
                <p className="font-semibold text-ink">{consultation.fullName}</p>
                <a
                  href={`mailto:${consultation.email}`}
                  className="text-xs text-teal-700 hover:text-teal-600"
                >
                  {consultation.email}
                </a>
                <p className="text-xs text-ink/50">{consultation.phone}</p>
              </td>
              <td className="px-5 py-4 text-ink/70">{consultation.serviceInterest}</td>
              <td className="max-w-[320px] px-5 py-4 text-ink/60">
                <p className="line-clamp-3">{consultation.notes || "—"}</p>
              </td>
              <td className="px-5 py-4">
                <StatusSelect
                  value={consultation.status}
                  disabled={updatingId === consultation.id}
                  onChange={(status) => onStatusChange(consultation.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
