import { cn } from "@/lib/utils";

// Section label.
//
// Deliberately NOT the "— SHORT LABEL" pattern with a little rule before
// it: that prefix-dash eyebrow is one of the most recognisable template
// signatures, and the client called it out. The label stands on its own
// weight, colour and tracking, sitting above a full-width hairline that
// belongs to the section rather than decorating the text.

type EyebrowProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

export function Eyebrow({ children, tone = "dark", className }: EyebrowProps) {
  const light = tone === "light";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.2em]",
          light ? "text-teal-300" : "text-teal-700",
        )}
      >
        {children}
      </p>
      <span
        className={cn("h-px w-full", light ? "bg-paper/15" : "bg-ink/10")}
        aria-hidden
      />
    </div>
  );
}
