// VERBATIM content from cresvcs.com/contact-us. Do not rewrite this copy.
// Field labels below match the live form exactly. The service / preferred
// date / preferred time fields are the additions required by the
// enhancement proposal (§5.4) — everything else is unchanged.

export const contactHeroContent = {
  headline: "Let’s Talk About Your",
  headlineAccent: "Next Move",
  subtitle:
    "Reach out to discover how strategic planning, operational structure, and effective execution can elevate your business performance",
  imageHint: "Office reception or consultation photo",
} as const;

export const consultationFormLabels = {
  fullName: "Full Name",
  email: "E-mail address",
  phone: "Phone Number",
  companyName: "Company Name",
  address: "Address",
  serviceInterest: "Service Interest",
  preferredDate: "Preferred Date",
  preferredTime: "Preferred Time",
  notes: "Notes",
  submit: "Book a Consultation",
  submitting: "Sending...",
} as const;

export const timeSlotOptions = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "1:00 PM – 2:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
] as const;

export const formStates = {
  success: {
    headline: "Consultation request received.",
    body: "Thank you — a member of the CREServices team will reach out to confirm your schedule shortly.",
  },
  error: {
    headline: "Something went wrong.",
    body: "We couldn’t send your request. Please try again, or reach us directly at the email below.",
  },
} as const;
