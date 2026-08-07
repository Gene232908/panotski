import type { Metadata } from "next";
import { ConsultationsDashboard } from "@/components/admin/ConsultationsDashboard";

export const metadata: Metadata = {
  title: "Consultations",
};

export default function AdminConsultationsPage() {
  return <ConsultationsDashboard />;
}
