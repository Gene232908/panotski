import { brand } from "@/content/site";
import { cn } from "@/lib/utils";

// The ONE approved CREServices colour split: "CRE" green, "Services" white —
// EVERYWHERE the name appears, including inside paragraphs (client decision).
//
// White text cannot sit on the site's light bands, so on those surfaces the
// name is set on a dark chip that supplies its own ground. This applies to
// running prose too, not just the nav lockup: the client asked for the colour
// to be identical in every context, and a chip is the only treatment that
// keeps white legible on white without changing the colour.
//
//   variant="lockup"  — the brand mark itself (nav, footer, admin topbar).
//                       Slightly larger chip padding.
//   variant="inline"  — the name inside a sentence. Same colours and the same
//                       chip, with tighter padding and `box-decoration-break`
//                       so it sits in the text line without inflating it.
//
// On dark bands no chip is needed — the band is already the dark ground.
//
// Every visible wordmark must go through this component: no component should
// print {brand.name} as raw visible text, or the split drifts page by page.
//
// The split point derives from `brand.name`, so renaming the brand in
// content/site.ts cannot desynchronise it.

// "CRES" carries the green, leaving "ervices" white — matching the logo, where
// the mark itself forms the S. Four, not three: the client specified the white
// half as "ervices", which puts the S on the green side.
const ACCENT_LENGTH = 4;

type BrandMarkProps = {
  tone?: "light" | "dark";
  variant?: "lockup" | "inline";
  className?: string;
  as?: "span" | "strong";
};

export function BrandMark({
  tone = "light",
  variant = "lockup",
  className,
  as = "span",
}: BrandMarkProps) {
  const Tag = as;
  const accent = brand.name.slice(0, ACCENT_LENGTH);
  const rest = brand.name.slice(ACCENT_LENGTH);

  // Light surface ⇒ the name needs its own dark ground so "Services" can stay
  // white. Dark bands already supply that ground, so no chip there.
  const chip = tone === "light";

  return (
    <Tag
      className={cn(
        // `normal-case` resists an uppercase parent. The brand name is
        // "CREServices" — the "ervices" half stays lowercase even inside an
        // all-caps eyebrow, where it would otherwise render "CRESERVICES".
        //
        // `font-bold` is what makes the name carry inside body copy: at
        // paragraph weight the green half was reading as a faint tint rather
        // than as the brand. Weight, not a lighter colour — the hex stays
        // exactly #346A5C.
        "whitespace-nowrap normal-case font-bold",
        // `w-fit`/`self-start` matter: as a flex or grid child the chip would
        // otherwise stretch to the column width and read as a black bar.
        chip &&
          variant === "lockup" &&
          "inline-flex w-fit items-baseline self-start rounded-md bg-ink px-1.5 py-0.5 leading-none",
        // Inline chips sit inside a sentence, so the padding is tighter and
        // `box-decoration-break: clone` keeps it correct if the line wraps.
        chip &&
          variant === "inline" &&
          "rounded-[4px] bg-ink px-1 py-px [-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
        className,
      )}
    >
      {/* Both halves always use the dark-band colours: on a chip the ground is
          dark, and on a dark band the band itself is. One split, everywhere. */}
      <span className="text-teal-700">{accent}</span>
      <span className="text-paper">{rest}</span>
    </Tag>
  );
}

// Renders a sentence from `content/`, swapping every occurrence of the brand
// name for a correctly-split wordmark. Always the `inline` variant — this is
// running prose, and a chip inside a paragraph reads as a rendering bug.
//
// This is what keeps copy in content/*.ts (RULES.md §2) while still satisfying
// plan §12: the alternative is pasting the brand name into JSX section by
// section, which is exactly how the splits drifted apart before.
export function BrandText({
  text,
  tone = "light",
  className,
}: {
  text: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const parts = text.split(brand.name);

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? <BrandMark tone={tone} variant="inline" /> : null}
        </span>
      ))}
    </span>
  );
}
