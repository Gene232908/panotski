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
    "At CREService, we turn vision into execution—where results meet quality, and operations meet structured, scalable processes.",
  primaryCta: { label: "Talk to an Expert", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },

  // FULL-BLEED HERO BACKGROUND.
  // Save the approved photo as `public/hero.jpg`. If it is ever renamed or
  // removed, set this back to `null` and the hero falls back to a designed
  // dark backdrop rather than breaking.
  backgroundImage: "/hero.jpg" as string | null,
  backgroundAlt:
    "CREServices consultant leading a training session beside the CREServices Beyond Strategy screen",
  imageHint: "Full-bleed hero photo — CREServices team or workplace",
} as const;

export const whatWeDoContent = {
  eyebrow: "WHAT WE DO",
} as const;

export const whoWeAreContent = {
  eyebrow: "WHO WE ARE",
  paragraphs: [
    "CREServices is a strategic and structured service consultancy provider specializing in one core mission: turning ideas into opportunities.",
    "We partner with market leaders, expert service providers, and industry specialists to bridge the gap between planning and execution—ensuring every initiative is not only launched but rolled out seamlessly with quality, consistency, operational efficiency, and measurable results.",
    "At CREServices, we understand that transforming an idea into a successful outcome requires more than vision alone. It demands the right expertise, strategic coordination, and disciplined execution.",
  ],
  beliefLead: "Our belief is simple:",
  belief:
    "Great ideas are common. Disciplined execution is rare—and that’s where we come in.",
  imageHint: "Consultation or team collaboration photo",
} as const;

export const whyUsContent = {
  eyebrow: "WHY US?",
  body: "At CREServices, we don’t just plan—we build, execute, and improve. Because in business, success doesn’t come from ideas alone—it comes from turning them into systems that consistently deliver results",
  imageHint: "Working session or project delivery photo",
} as const;

export const homeCtaContent = {
  cta: { label: "BOOK A CONSULTATION", href: "/contact" },
} as const;
