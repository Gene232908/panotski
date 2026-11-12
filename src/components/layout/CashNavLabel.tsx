"use client";

import { cn } from "@/lib/utils";

// C.A.S.H. navigation treatment — REQUIRED, see RULES.md § Content Fidelity.
// The first letter of each label renders white, the remainder teal, so the
// four initials read C-A-S-H across the nav.
//
// Hover leans into that concept rather than fighting it: the *initial*
// letter gets a teal underscore that draws in, and the remaining letters
// brighten toward white. The letter that spells C.A.S.H. is the one that
// animates. Driven by CSS group-hover so it costs no JS.
//
// `variant="dropcap"` (mobile menu): the same colour split, but the initial
// is set as a giant drop cap and the rest of the word runs small on its
// baseline — stacked four high, the initials spell C·A·S·H down the screen.
// `slots` lets the menu animate the two parts separately.

type CashNavLabelProps = {
  label: string;
  active?: boolean;
  variant?: "inline" | "dropcap";
  slots?: {
    initial?: (children: React.ReactNode) => React.ReactNode;
    rest?: (children: React.ReactNode) => React.ReactNode;
  };
};

export function CashNavLabel({
  label,
  active,
  variant = "inline",
  slots,
}: CashNavLabelProps) {
  const [first, ...rest] = label;
  const restText = rest.join("");

  if (variant === "dropcap") {
    const initial = (
      <span
        className={cn(
          "relative block text-[5.25rem] font-semibold leading-[0.8] tracking-[-0.04em] text-paper",
        )}
      >
        {first}
        <span
          className={cn(
            "absolute -bottom-2 left-0.5 h-[3px] w-[calc(100%-0.25rem)] origin-left rounded-full bg-teal-500 transition-transform duration-500 ease-premium",
            active ? "scale-x-100" : "scale-x-0",
          )}
          aria-hidden
        />
      </span>
    );
    const tail = (
      <span
        className={cn(
          "block pb-[0.2rem] text-[1.35rem] font-semibold uppercase leading-none tracking-[0.04em] transition-colors duration-300",
          active ? "text-paper" : "text-teal-500 group-active:text-paper",
        )}
      >
        {restText}
      </span>
    );

    return (
      <span className="flex items-end gap-1.5">
        {slots?.initial ? slots.initial(initial) : initial}
        {slots?.rest ? slots.rest(tail) : tail}
      </span>
    );
  }

  return (
    <span className="relative inline-flex items-baseline">
      <span className="relative text-paper">
        {first}
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-[1.5px] w-full origin-left rounded-full bg-teal-700 transition-transform duration-500 ease-premium",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
          aria-hidden
        />
      </span>
      <span
        className={cn(
          "transition-colors duration-300",
          active ? "text-paper/90" : "text-teal-700 group-hover:text-paper/90",
        )}
      >
        {restText}
      </span>
    </span>
  );
}
