// Creative Arts Consulting in-page sample gallery (Milestone 1 revision §5).
//
// Wording is deliberately minimal — the plan asks for a visually led gallery
// showing samples of work, not a long list of services.
//
// The sample slots below are placeholders. When the owner supplies approved
// artwork, drop the files in `public/` and replace `hint` with a real image
// per RULES.md § Images. The slot count and layout do not need to change.

export const creativeArtsGallery = {
  eyebrow: "SELECTED WORK",
  title: "Creative Arts Consulting",
  samples: [
    { hint: "Creative arts sample — completed installation", caption: undefined },
    { hint: "Creative arts sample — commissioned piece", caption: undefined },
    { hint: "Creative arts sample — space transformation", caption: undefined },
    { hint: "Creative arts sample — detail study", caption: undefined },
    { hint: "Creative arts sample — project in progress", caption: undefined },
    { hint: "Creative arts sample — finished environment", caption: undefined },
  ] as { hint: string; caption?: string }[],
  note: "Sample work shown for reference. Approved project photography to follow.",
} as const;
