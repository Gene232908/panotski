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

// ─────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — PLACEHOLDER COPY, NOT CLIENT-APPROVED.
//
// RULES.md §3 requires every user-facing sentence to come verbatim from
// cresvcs.com. The live site carries no testimonials, so there is nothing to
// copy: the quotes, names and roles below are stand-ins that exist so the
// section can be designed and reviewed at full length. They are written to
// the shape of a real reference — one engagement, one outcome — but no client
// has said them.
//
// BEFORE LAUNCH: replace every entry with quotes the client has collected and
// approved, and delete this notice. If approved quotes are not available in
// time, remove <TestimonialsSection /> from the home page rather than shipping
// invented references.
//
// Photos follow the same rule as the rest of the site (RULES.md §5): each
// entry renders an <ImagePlaceholder> naming the portrait it is waiting for.
// To swap in a real headshot, drop the file in `public/` and set `image`
// (plus `imageAlt`) — no component edit needed.
// ─────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  quote: string;
  name: string;
  /** Role and organisation, rendered as one supporting line. */
  title: string;
  /** The engagement this reference speaks to — shown as a small tag. */
  engagement: string;
  /** Set to a path in `public/` to replace the placeholder slot. */
  image: string | null;
  imageAlt: string;
  imageHint: string;
  /**
   * Client mark shown in the portrait frame at rest; the portrait itself is
   * revealed on hover / focus. Leave `null` and the frame simply shows the
   * photo — see PortraitReveal.
   */
  logo: string | null;
  logoAlt: string;
  /**
   * Whether this person has a video testimonial at all. It is what shows or
   * hides the "Watch video testimonial" control, and it is deliberately
   * separate from `video` below: a clip that is promised but not yet
   * delivered still needs the control (so the placeholder can be reviewed),
   * while a quote that will never have one must not offer it.
   */
  hasVideo: boolean;
  /**
   * The clip itself. `null` renders the player placeholder; set it to a path
   * in `public/` (e.g. "/testimonials/name.mp4") and the same slot becomes a
   * real <video> with native controls — no component edit.
   */
  video: string | null;
  /** Poster frame for the clip. */
  videoPoster: string | null;
  videoHint: string;
};

export const testimonialsContent = {
  eyebrow: "CLIENT VOICES",
  heading: "The proof is in the rollout.",
  headingAccent: ["rollout."],
  testimonials: [
    {
      quote:
        "We had the strategy on paper for two years. CREServices was the first partner that got it into the branches — same standard in every location, and a way to keep it there after they left.",
      name: "Placeholder Name",
      title: "Operations Director, Client Organisation",
      engagement: "Operational Rollout",
      image: "/zero60.jpg",
      imageAlt: "Client portrait — Zero-Sixty-Three Productions",
      imageHint: "Client portrait — operations lead, CREServices engagement",
      logo: "/logozero60.jpg",
      logoAlt: "Zero-Sixty-Three Productions logo",
      hasVideo: true,
      video: null,
      videoPoster: null,
      videoHint: "Video testimonial — operations lead on the branch rollout",
    },
    {
      quote:
        "What set them apart was the discipline. Milestones were met, the handover was documented, and our own team could run the process without us calling anyone back in.",
      name: "Placeholder Name",
      title: "General Manager, Client Organisation",
      engagement: "Process Rebuild",
      image: null,
      imageAlt: "",
      imageHint: "Client portrait — general manager, CREServices engagement",
      logo: null,
      logoAlt: "",
      hasVideo: true,
      video: null,
      videoPoster: null,
      videoHint: "Video testimonial — general manager on the process rebuild",
    },
    {
      quote:
        "They rebuilt the workflow around how the team actually works instead of how the manual said it should. Turnaround times dropped in the first quarter and have held since.",
      name: "Placeholder Name",
      title: "Head of Service Delivery, Client Organisation",
      engagement: "Service Improvement",
      image: null,
      imageAlt: "",
      imageHint: "Client portrait — service delivery lead, CREServices engagement",
      logo: null,
      logoAlt: "",
      hasVideo: true,
      video: null,
      videoPoster: null,
      videoHint: "Video testimonial — service delivery lead on turnaround times",
    },
  ] satisfies readonly Testimonial[],

  // Labels for the video swap. The control is hidden entirely on any entry
  // whose `video` slot is not wired up yet — see TestimonialCarousel.
  watchVideoLabel: "Watch video testimonial",
  backToQuoteLabel: "Back to the quote",
  closeVideoLabel: "Close video and return to the quote",
} as const;
