"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Collapsible panel behind a visible `+` control (Milestone 1 revision §4.3).
//
// The panel content stays MOUNTED at all times and animates via
// grid-template-rows 0fr → 1fr. This is deliberate and load-bearing: rendering
// it conditionally (`{open && <Panel/>}`) would strip the service copy out of
// the served HTML and cost search visibility on the exact text describing what
// the client sells. See RULES.md § 5c.
//
// The `+` rotates 45° into an `×` when open — one glyph, two states, no icon
// swap. Motion is suppressed under prefers-reduced-motion via `motion-reduce:`,
// leaving an instant but fully working open/close.

type DisclosureProps = {
  /** Visible trigger content — usually the service name. */
  label: React.ReactNode;
  /** Accessible name for the toggle, e.g. the service name. */
  controlLabel: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  triggerClassName?: string;
  defaultOpen?: boolean;
};

export function Disclosure({
  label,
  controlLabel,
  children,
  tone = "light",
  className,
  triggerClassName,
  defaultOpen = false,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const dark = tone === "dark";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        // The accessible name lives on the attribute, not in an sr-only span.
        // A visually-hidden span is still real text content: it lands in the
        // clipboard when a visitor copies the page and shows up in scraped
        // copy. The attribute gives screen readers the same sentence without
        // putting it in the document text.
        aria-label={
          open ? `Hide details for ${controlLabel}` : `Show details for ${controlLabel}`
        }
        className={cn(
          "flex w-full items-start justify-between gap-4 text-left",
          triggerClassName,
        )}
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-premium motion-reduce:transition-none",
            open && "rotate-45",
            dark
              ? "border-paper/25 text-paper/70 group-hover:border-teal-700 group-hover:text-teal-700"
              : "border-ink/15 text-ink/50 group-hover:border-teal-700 group-hover:text-teal-700",
          )}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-cinematic motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        {/* Content is never unmounted — only clipped. */}
        <div
          className={cn(
            "overflow-hidden transition-opacity duration-300 motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          )}
          // Hidden from AT and tab order while collapsed, still in the DOM
          // for crawlers reading the served markup.
          inert={open ? undefined : true}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
