// VERBATIM content from cresvcs.com (home page). Do not rewrite this copy.
// See RULES.md § Content Fidelity.

export const heroContent = {
  headline: "Where ideas meet reality",
  // Visual line break only — `headlineLines.join(" ")` must always equal
  // `headline` above. The second line is indented for an editorial,
  // title-card composition. Changing the words here changes the site copy;
  // don't (see RULES.md § Content Fidelity).
  headlineLines: ["Where ideas", "meet reality"],
  // Given the accent treatment (lighter weight + teal) — must stay part of
  // the headline above.
  accentWord: "reality",
  subtitle:
    "At CREServices, we turn vision into execution—where results meet quality, and operations meet structured, scalable processes.",
  primaryCta: { label: "Talk to an Expert", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },

  // FULL-BLEED HERO BACKGROUND.
  // The approved photo lives at `public/heroo.png`. If it is ever renamed or
  // removed, set this back to `null` and the hero falls back to a designed
  // dark backdrop rather than breaking.
  backgroundImage: "/heroo.png" as string | null,
  backgroundAlt:
    "CREServices consultant leading a training session beside the CREServices Beyond Strategy screen",
  imageHint: "Full-bleed hero photo — CREServices team or workplace",
} as const;

export const whatWeDoContent = {
  eyebrow: "WHAT WE DO",
} as const;

export const whoWeAreContent = {
  eyebrow: "WHO WE ARE",
  // Plan §7: "Turning Ideas into Opportunities" is set in green and kept
  // visually strong, so it is lifted out of the lead sentence rather than
  // left buried in lowercase at the end of it.
  leadPrefix:
    "CREServices is a strategic and structured service consultancy provider specializing in one core mission:",
  leadAccent: "Turning Ideas into Opportunities.",
  paragraphs: [
    "We partner with market leaders, expert service providers, and industry specialists to bridge the gap between planning and execution—ensuring every initiative is not only launched but rolled out seamlessly with quality, consistency, operational efficiency, and measurable results.",
    "At CREServices, we understand that transforming an idea into a successful outcome requires more than vision alone. It demands the right expertise, strategic coordination, and disciplined execution.",
  ],
  beliefLead: "Our belief is simple:",
  belief:
    "Great ideas are common. Disciplined execution is rare—and that’s where we come in.",
  imageHint: "Consultation or team collaboration photo",
} as const;

// Milestone 1 revision §8. Two changes from the live-site copy:
//   • "Because" is removed;
//   • the supporting sentence is replaced with the corrected message.
// "Rebuild, Execute, and Improve" is held in its own field so it renders as
// one statement and can never be split into confusing fragments by a line
// break — the plan calls this out specifically.
export const whyUsContent = {
  eyebrow: "WHY US?",
  statement:
    "At CREServices, we don’t just plan — we Rebuild, Execute, and Improve.",
  statementAccent: ["Rebuild,", "Execute,", "and", "Improve."],
  body: "In business, success doesn’t come from ideas alone. It comes from bringing them into a system that consistently delivers.",
  imageHint: "Working session or project delivery photo",
} as const;

export const homeCtaContent = {
  // Plan §9.1 — exact wording. Do not revert to "…into an outcome."
  headline: "Let’s turn your idea into reality.",
  accentWords: ["reality."],
  // Plan §9.3 — a journey-oriented heading instead of repeating
  // "Book a Consultation", which the button below already says.
  heading: "Start Your Journey",

  cta: { label: "GET STARTED", href: "/contact" },
} as const;
