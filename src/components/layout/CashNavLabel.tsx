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

type CashNavLabelProps = {
  label: string;
  active?: boolean;
};

export function CashNavLabel({ label, active }: CashNavLabelProps) {
  const [first, ...rest] = label;

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
        {rest.join("")}
      </span>
    </span>
  );
}
