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
  companyName: string;
  address: string | null;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
};
