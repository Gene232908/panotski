import { cn } from "@/lib/utils";

// Section surface tones. The page alternates between `white` and `soft`
// as you scroll so each band reads as its own chapter, with `ink` reserved
// for the occasional high-contrast moment (pull quote, final CTA).
// See RULES.md § Styling.

type SectionTone = "white" | "soft" | "ink";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-surface text-ink",
  soft: "bg-surface-soft text-ink",
  ink: "bg-ink text-paper",
};

type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
};

export function Section({ children, tone = "white", className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 transition-colors duration-500 sm:py-32",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
