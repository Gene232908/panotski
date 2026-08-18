import { z } from "zod";

// Milestone 1 revision §10.1 — the form is deliberately small. The only
// personal-information fields are Name, Mobile Number and Email Address, plus
// Service Interest and one free-text field. Company, Address, Preferred Date
// and Preferred Time were removed; do not reintroduce them without a new
// client decision.
//
// §10.2: a lead is accepted on submission. There is intentionally no OTP or
// contact-verification step gating this schema — an unverified phone number
// must not block a submission.
export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid mobile number."),
  serviceInterest: z.string().trim().min(1, "Select a service."),
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
