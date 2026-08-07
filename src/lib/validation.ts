import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  companyName: z.string().trim().min(2, "Enter your company name."),
  address: z.string().trim().optional().or(z.literal("")),
  serviceInterest: z.string().trim().min(1, "Select a service."),
  preferredDate: z.string().trim().min(1, "Select a preferred date."),
  preferredTime: z.string().trim().min(1, "Select a preferred time."),
  // Marked required on the live cresvcs.com form ("Notes*") — kept required here.
  notes: z.string().trim().min(1, "Please add a short note.").max(2000),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const consultationStatusUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"]),
});

export type ConsultationStatusUpdateInput = z.infer<
  typeof consultationStatusUpdateSchema
>;
