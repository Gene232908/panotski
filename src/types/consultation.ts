export const CONSULTATION_STATUSES = [
  "NEW",
  "CONTACTED",
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type ConsultationStatus = (typeof CONSULTATION_STATUSES)[number];

export const consultationStatusLabels: Record<ConsultationStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export type Consultation = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  notes: string | null;
  // Legacy columns — no longer collected by the public form (plan §10.1),
  // but still present on rows captured before the Milestone 1 revision.
  companyName: string | null;
  address: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
};
