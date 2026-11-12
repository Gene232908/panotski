"use client";

import { cn } from "@/lib/utils";

// The mobile menu button — ONE control that morphs between burger and close.
//
// It used to be two separate buttons: a burger in the header and an X inside
// the overlay, at a different size and position. Opening the menu made the
// icon jump a few pixels and the header lockup vanish, which reads as a page
// swap rather than a menu opening. Now the header stays on top of the overlay
// and this button never moves — its three lines fold into the X in place.
//
// Motion: the outer lines converge on the centre and rotate; the middle line
// (shorter, right-aligned at rest) collapses toward its right edge. Transform
// and opacity only, so it stays on the compositor. Reduced motion is handled
// by the global stylesheet, which drops the transition to ~0ms.

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
  controls: string;
  className?: string;
};

const LINE =
  "absolute right-0 h-[1.5px] rounded-full bg-current transition-all duration-500 ease-premium";

export function MenuToggle({ open, onToggle, controls, className }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border text-paper transition-[background-color,border-color,transform] duration-300 ease-premium active:scale-[0.94]",
        open
          ? "border-white/25 bg-white/10"
          : "border-white/15 hover:bg-white/10",
        className,
      )}
    >
      <span className="relative block h-3.5 w-[18px]" aria-hidden>
        <span
          className={cn(
            LINE,
            "top-0 w-full",
            open && "translate-y-[6.25px] rotate-45",
          )}
        />
        <span
          className={cn(
            LINE,
            "top-1/2 -translate-y-1/2 origin-right",
            open ? "w-full scale-x-0 opacity-0" : "w-3",
          )}
        />
        <span
          className={cn(
            LINE,
            "bottom-0 w-full",
            open && "-translate-y-[6.25px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
