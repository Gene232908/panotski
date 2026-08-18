// One source for how form fields are painted on each surface, shared by Input,
// Select and Textarea so the three can never drift apart.
//
// `light` is the original treatment and the default — the admin login and any
// future form on a white band keep exactly what they had.
//
// `dark` exists for the Contact band, which is pure black. The fields are a
// 5%-white wash rather than a solid colour: on #000 that reads as a field
// without ever becoming a grey box floating on the black. Accents move UP the
// teal scale (300, not 700) because brand teal #346A5C is too dark to carry a
// focus state or an asterisk against black.
//
// `field-dark` is a real class, not decoration — globals.css uses it to beat
// Chrome's autofill, which otherwise repaints the input near-white and undoes
// the whole treatment the moment someone lets the browser fill their name in.

export type FieldTone = "light" | "dark";

type ToneTokens = {
  label: string;
  required: string;
  field: string;
  errorBorder: string;
  errorText: string;
  /** Native <option> list — rendered by the OS, so it needs its own colours. */
  option: string;
  chevron: string;
};

export const fieldTone: Record<FieldTone, ToneTokens> = {
  light: {
    label: "text-ink/80",
    required: "text-teal-700",
    field:
      "border-ink/15 bg-paper text-ink placeholder:text-ink/35 focus:border-teal-600",
    errorBorder: "border-red-500",
    errorText: "text-red-600",
    option: "",
    chevron: "text-ink/40",
  },
  dark: {
    label: "text-paper/70",
    required: "text-teal-300",
    field:
      "field-dark border-white/[0.14] bg-white/5 text-paper placeholder:text-paper/35 focus:border-teal-300 focus:bg-white/[0.07]",
    errorBorder: "border-red-400/70",
    errorText: "text-red-300",
    // The dropdown itself is an OS surface, so it stays light — white text on
    // a white popup is the classic dark-select bug.
    option: "bg-surface text-ink",
    chevron: "text-paper/45",
  },
};
