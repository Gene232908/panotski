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
};

export function HeroImage({ className, priority }: HeroImageProps) {
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
      sizes="100vw"
      // Centre-weighted: keeps the presenter and the screen in frame when a
      // viewport is taller or wider than the source image.
      className={cn("object-cover object-center", className)}
    />
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
        <div className="absolute inset-0">
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
