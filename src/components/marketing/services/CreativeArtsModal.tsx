"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { creativeArtsGallery } from "@/content/services-gallery";
import { cn } from "@/lib/utils";

// In-page sample gallery for Creative Arts Consulting (Milestone 1 §5).
//
// Deliberately NOT a link to the creative partner's own site: the plan forbids
// sending visitors to an external partner or exposing a link that bypasses
// CREServices. Everything stays under CREServices branding.
//
// Visually led and sample-driven — the copy is intentionally minimal, because
// the work is the argument, not a list of services.

type CreativeArtsModalProps = {
  open: boolean;
  onClose: () => void;
  /** Focus returns here on close (plan §13). */
  triggerRef: React.RefObject<HTMLElement | null>;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function CreativeArtsModal({ open, onClose, triggerRef }: CreativeArtsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape. Both are required by plan §13: the modal must trap
  // focus while open and return it to its trigger when closed.
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      const active = document.activeElement;

      // Wrap in both directions so focus can never escape the dialog.
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = triggerRef.current;
    closeRef.current?.focus();

    document.addEventListener("keydown", onKeyDown);
    // Lock background scroll while the gallery is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Return focus to whatever opened the modal.
      previouslyFocused?.focus();
    };
  }, [open, onKeyDown, triggerRef]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm motion-safe:animate-[fadeIn_240ms_ease-out]"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="creative-arts-title"
        className={cn(
          "relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl",
          "bg-surface text-ink shadow-lift motion-safe:animate-[fadeIn_320ms_ease-out]",
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-teal-700">
              {creativeArtsGallery.eyebrow}
            </p>
            <h2
              id="creative-arts-title"
              className="mt-1.5 text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
            >
              {creativeArtsGallery.title}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 text-graphite-muted transition-all duration-300 ease-premium hover:border-teal-700 hover:text-teal-700 motion-reduce:transition-none"
          >
            <X className="h-4 w-4" aria-hidden strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {creativeArtsGallery.samples.map((sample) => (
              <figure key={sample.hint} className="flex flex-col gap-2">
                <ImagePlaceholder hint={sample.hint} ratio="landscape" />
                {sample.caption ? (
                  <figcaption className="text-xs leading-relaxed text-graphite-muted">
                    {sample.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-graphite-muted">
            {creativeArtsGallery.note}
          </p>
        </div>
      </div>
    </div>
  );
}
