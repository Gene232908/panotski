// Contact page copy. Field labels follow Milestone 1 revision §10.1, which
// reduced the form to five fields — Company, Address, Preferred Date and
// Preferred Time were removed. Do not reintroduce them without a new client
// decision; `src/lib/validation.ts` and `prisma/schema.prisma` are kept in
// step with this file by hand (RULES.md § 2).

export const contactHeroContent = {
  headline: "Let’s Talk About Your",
  headlineAccent: "Next Move",
  subtitle:
    "Reach out to discover how strategic planning, operational structure, and effective execution can elevate your business performance",
  imageHint: "Office reception or consultation photo",
} as const;

export const consultationFormLabels = {
  fullName: "Name",
  phone: "Mobile Number",
  email: "Email Address",
  serviceInterest: "Service Interest",
  notes: "Message / Inquiry",
  // Not "Book a Consultation" — that label belongs to the nav only.
  submit: "Send Request",
  submitting: "Sending...",
} as const;

export const formStates = {
  success: {
    headline: "Consultation request received.",
    body: "Thank you — a member of the CREServices team will reach out to confirm your schedule shortly.",
  },
  error: {
    headline: "Something went wrong.",
    body: "We couldn’t send your request. Please try again in a moment.",
  },
} as const;

// The right-hand column keeps ONLY this assurance. The Email Us block,
// Response Time block and "1–2 business days" copy were removed as repetition
// (plan §10.4).
//
// The WhatsApp contact card (plan §10.3) and the roadmap/maze visual
// (plan §10.4) were BOTH removed afterwards by client decision in the
// post-Milestone-1 review. Do not reinstate either without a new instruction.
export const contactAssurance = {
  title: "Your Information",
  description:
    "Every request is stored securely and reviewed only by authorized CREServices staff.",
} as const;
