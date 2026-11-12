"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { heroContent } from "@/content/home";
import { cn } from "@/lib/utils";

// Hero photography.
//
// Composition this is tuned for: the presenter stands in the left third
// (face around 45% height) and the CREServices screen occupies the right
// third. Both must stay visible — the scrims below are weighted to the
// bottom edge so they darken the table/foreground for legibility while
// leaving the face and the branded screen clear.
//
// `fullBleed` = desktop, where the viewport is roughly 16:9 and `object-cover`
// shows essentially the whole frame. On mobile the section renders this in a
// fixed 16:9 band instead (see HeroSection) so nothing is ever cropped away.

type HeroImageProps = {
  className?: string;
  priority?: boolean;
  /**
   * `object-position` class. Desktop is centre-weighted; the mobile crop is
   * a narrow portrait slice and has to aim at the presenter instead.
   */
  focus?: string;
  /** Defaults to full width. The blurred mobile backdrop needs far less. */
  sizes?: string;
};

export function HeroImage({
  className,
  priority,
  focus = "object-center",
  sizes = "100vw",
}: HeroImageProps) {
  const { backgroundImage, backgroundAlt } = heroContent;

  if (!backgroundImage) {
    return <FallbackBackdrop className={className} />;
  }

  return (
    <Image
      src={backgroundImage}
      alt={backgroundAlt}
      fill
      priority={priority}
      sizes={sizes}
      // Centre-weighted by default: keeps the presenter and the screen in
      // frame when a viewport is taller or wider than the source image.
      className={cn("object-cover", focus, className)}
    />
  );
}

// MOBILE hero backdrop — ambient, not literal.
//
// On desktop the photograph is the composition: the presenter's open hand
// sits beside the headline, as if he were holding the words. A phone can't
// keep that relationship — cropped to portrait, the hand and the headline
// land in unrelated places and the person just competes with the copy.
//
// So below `lg` the same photo becomes atmosphere: heavily defocused and
// darkened, so the ceiling downlights and the green screen dissolve into
// soft bokeh — the brand's light and colour without a subject. A few slow
// light "bubbles" drift over it (HeroBubbles). Copy sits on top, centred.
// Same scroll zoom as desktop.
export function HeroMobileBackdrop({ scale }: HeroBackdropProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-night lg:hidden" aria-hidden>
      <motion.div
        style={{ scale }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        <div className="hero-photo absolute inset-0">
          {/* Overscaled so the blur's soft edge never shows at the frame. */}
          {/* Kept near-NEUTRAL on purpose: the headline's accent word is the
              logo green (#346A5C, mandatory), and green type on a green
              ground disappears. A desaturated backdrop lets that green be
              the only strong colour on screen. */}
          <div className="absolute inset-0 scale-125 blur-[22px] brightness-[0.28] saturate-[0.6]">
            <HeroImage priority focus="object-[74%_40%]" sizes="50vw" />
          </div>
        </div>
      </motion.div>

      <HeroBubbles />

      {/* Even tint, then a top band for the nav and a floor for the copy. */}
      <div className="absolute inset-0 bg-night/55" />
      {/* Dark pool behind the headline: the logo green (#346A5C) is a deep
          colour and only reads against near-black, so the ground directly
          under the type is held darkest. */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_32%_at_50%_42%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.35)_55%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-night/90" />
    </div>
  );
}

// Slow bokeh drift. Two kinds: large teal glows that carry colour, and small
// soft discs that read as out-of-focus lights. Each floats on its own period
// (19–31s, never in sync), transform-only. Off under reduced motion.
// Client-requested for the mobile hero — RULES.md §5a records the exception.
const BUBBLES = [
  // Colour glows
  "left-[-25%] top-[6%] h-72 w-72 bg-teal-700/30 blur-3xl [--dur:27s] [--fx:46px] [--fy:34px]",
  "right-[-20%] top-[62%] h-64 w-64 bg-teal-700/25 blur-3xl [--dur:31s] [--fx:-40px] [--fy:-28px]",
  // Bokeh discs
  "left-[12%] top-[22%] h-20 w-20 bg-paper/[0.10] blur-[2px] ring-1 ring-paper/15 [--dur:19s] [--fx:18px] [--fy:-26px]",
  "right-[14%] top-[12%] h-12 w-12 bg-teal-300/[0.18] blur-[1px] ring-1 ring-teal-200/25 [--dur:23s] [--fx:-14px] [--fy:22px]",
  "right-[30%] top-[36%] h-28 w-28 bg-paper/[0.07] blur-[4px] ring-1 ring-paper/10 [--dur:29s] [--fx:24px] [--fy:30px]",
  "left-[6%] top-[52%] h-10 w-10 bg-paper/[0.12] blur-[1px] [--dur:21s] [--fx:20px] [--fy:-18px]",
] as const;

function HeroBubbles() {
  return (
    <div className="hero-fade absolute inset-0 [--at:200ms]">
      {BUBBLES.map((bubble) => (
        <span key={bubble} className={cn("hero-bubble absolute rounded-full", bubble)} />
      ))}
    </div>
  );
}

type HeroBackdropProps = {
  scale: MotionValue<number>;
};

// Depth comes from scroll zoom alone. Translation-based parallax (and the
// pointer drift that was here) requires overscanning the image, which crops
// the sides — unacceptable for this photograph. Zoom starting at exactly 1
// gives movement on scroll while leaving the resting frame complete.
export function HeroBackdrop({ scale }: HeroBackdropProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0b0f0e]">
      <motion.div
        style={{ scale }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        {/* NO overscan. The section is sized to the photo's 16:9 aspect, so
            at rest `object-cover` shows the frame edge to edge — the whole
            point, since the presenter and the CREServices screen sit at the
            extreme left and right. Any inset here (even vertical) changes
            the container aspect and crops the sides back off. The scroll
            zoom below is the only transform, and it starts at exactly 1. */}
        {/* `hero-photo`: first-load settle (globals.css). On this inner
            layer, not the motion.div above — that one owns the scroll zoom,
            and two systems writing one `transform` would fight. */}
        <div className="hero-photo absolute inset-0">
          <HeroImage priority />
        </div>
      </motion.div>

      <HeroScrims />
    </div>
  );
}

// Shared scrim stack — used by both the desktop full-bleed backdrop and the
// mobile image band so the photo is graded identically at every size.
export function HeroScrims() {
  return (
    <>
      {/* Bottom: carries the headline. Heaviest, and it lands on the table
          and foreground clutter rather than on anyone's face. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent"
        aria-hidden
      />
      {/* Left: light touch only — the presenter must stay readable. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent"
        aria-hidden
      />
      {/* Focused pool anchored under the copy block. The headline crosses a
          whiteboard and a framed picture — both busy and light — and needs
          more than the linear scrims to separate from them. Radial so it
          falls off before it reaches the branded screen on the right. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(75%_60%_at_18%_78%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_45%,transparent_78%)]"
        aria-hidden
      />
      {/* Top: gives the transparent navbar something to sit on so it blends
          into the photograph instead of cutting a bar across it. */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 to-transparent"
        aria-hidden
      />
      {/* Vignette — a film frame falls off at the corners. */}
      <div
        className="absolute inset-0 shadow-[inset_0_0_170px_55px_rgba(0,0,0,0.5)]"
        aria-hidden
      />
    </>
  );
}

function FallbackBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_72%_18%,#16382f_0%,#0b1a16_46%,#050807_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,246,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,246,0.9) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
    </div>
  );
}
