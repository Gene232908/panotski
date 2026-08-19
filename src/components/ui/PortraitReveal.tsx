"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// The testimonial portrait slot, in two states.
//
// At rest the frame carries the client's LOGO — a reference reads as a client
// first and a person second, and the mark is what a prospect recognises while
// scanning. Pointing at it reveals the person behind the quote: the portrait
// arrives desaturated, holds there for a beat, then resolves to full colour.
//
// The beat is the whole point. A straight cross-fade to a colour photo is the
// stock hover every template ships; the held grey frame reads as a considered
// reveal, and the colour landing late is what makes it feel deliberate rather
// than reactive (RULES.md §6 — motion earns its place or it is cut).
//
// Timing is split across three nested layers on purpose. Tailwind sets one
// duration per element, and the three properties here need three different
// ones — opacity is quick, the filter is slow AND late, the scale settles over
// twice the length of either so the frame never snaps to a stop:
//
//   layer          property     enter                       leave
//   ─────────────  ───────────  ──────────────────────────  ──────────
//   fade           opacity      500ms, 150ms delay          400ms, no delay
//   desaturate     filter       550ms, 600ms delay          350ms, no delay
//   settle         transform    1400ms                      900ms
//
// Delays live in the `group-hover:` variant only. Put them on the base class
// and they fire on the way out too, which leaves a colour photo hanging in a
// frame the cursor has already left.
//
// Touch: `(hover: none)` has no hover state to give, so those viewports get
// the portrait outright rather than a logo that never resolves.
// Keyboard: the frame takes focus, so the reveal is reachable without a
// pointer — `group-focus-visible:` mirrors every `group-hover:` below.

export type PortraitRevealProps = {
  /** Portrait shown on hover / focus. */
  image: string;
  imageAlt: string;
  /** Client mark shown at rest. Omit and the portrait simply renders. */
  logo?: string | null;
  logoAlt?: string;
  className?: string;
};

export function PortraitReveal({
  image,
  imageAlt,
  logo,
  logoAlt = "",
  className,
}: PortraitRevealProps) {
  // No logo supplied — nothing to reveal from, so this is just the photo.
  if (!logo) {
    return (
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-muted",
          className,
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 38vw, 90vw"
          className="object-cover"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      // Focusable so the reveal is not pointer-only. `role="img"` + the alt
      // text means a screen reader gets the portrait's description in one
      // stop, not two images it has to reconcile.
      tabIndex={0}
      role="img"
      aria-label={imageAlt}
      className={cn(
        "group relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink outline-none",
        "ring-offset-2 ring-offset-paper focus-visible:ring-2 focus-visible:ring-teal-700",
        className,
      )}
    >
      {/* ── Portrait ─────────────────────────────────────────────────────
          Bottom of the stack, revealed by the logo lifting off it. */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity delay-0 duration-[400ms] ease-premium",
          "group-hover:opacity-100 group-hover:delay-150 group-hover:duration-500",
          "group-focus-visible:opacity-100 group-focus-visible:delay-150 group-focus-visible:duration-500",
          "[@media(hover:none)]:opacity-100",
          "motion-reduce:transition-none",
        )}
        aria-hidden
      >
        {/* The held beat: grey on arrival, colour 600ms later. */}
        <div
          className={cn(
            "absolute inset-0 grayscale transition-[filter] delay-0 duration-[350ms] ease-premium",
            "group-hover:grayscale-0 group-hover:delay-[600ms] group-hover:duration-[550ms]",
            "group-focus-visible:grayscale-0 group-focus-visible:delay-[600ms] group-focus-visible:duration-[550ms]",
            "[@media(hover:none)]:grayscale-0",
            "motion-reduce:grayscale-0 motion-reduce:transition-none",
          )}
        >
          {/* Slowest layer. Starts oversized and settles, so the reveal keeps
              drifting after the fade has finished — the frame comes to rest
              instead of stopping. */}
          <div
            className={cn(
              "absolute inset-0 scale-[1.08] transition-transform duration-[900ms] ease-premium",
              "group-hover:scale-100 group-hover:duration-[1400ms]",
              "group-focus-visible:scale-100 group-focus-visible:duration-[1400ms]",
              "[@media(hover:none)]:scale-100",
              "motion-reduce:scale-100 motion-reduce:transition-none",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              // Measured, not guessed: the portrait column peaks at ~38vw
              // around 1280 (501px inside the 1320px container) and falls to
              // ~26vw at 1920 where the container caps.
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ── Client mark ──────────────────────────────────────────────────
          Rest state. Lifts and softens rather than simply fading, so the two
          planes read as one moving through the other. */}
      <div
        className={cn(
          "absolute inset-0 transition-[opacity,transform,filter] duration-[550ms] ease-premium",
          "group-hover:scale-[1.03] group-hover:opacity-0 group-hover:blur-[3px]",
          "group-focus-visible:scale-[1.03] group-focus-visible:opacity-0 group-focus-visible:blur-[3px]",
          "[@media(hover:none)]:opacity-0",
          "motion-reduce:scale-100 motion-reduce:blur-none motion-reduce:transition-none",
        )}
        aria-hidden
      >
        <Image
          src={logo}
          alt={logoAlt}
          fill
          sizes="(min-width: 1024px) 38vw, 90vw"
          className="object-cover"
          draggable={false}
          priority={false}
        />
      </div>
    </div>
  );
}
