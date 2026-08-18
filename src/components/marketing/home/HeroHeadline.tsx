"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/home";
import { cn } from "@/lib/utils";

// Editorial wipe entrance.
//
// The headline is REVEALED left to right rather than pushed up from below.
// A vertical mask-rise is the default kinetic-type move and reads as motion
// graphics; a horizontal wipe reads as typesetting — the line arrives as if
// it were being printed, which is the register this brand wants.
//
// Three details do the work:
//   • the clip travels slightly faster than the text drifts, so the line
//     appears to settle into place rather than slide in as a block;
//   • no blur. A defocus on display type at this size reads as a loading
//     glitch, and the wipe already supplies the reveal;
//   • the second line trails the first by a short beat, so the accent word —
//     which always falls on that line — lands last and holds the eye.

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE_DELAY = 0.13;
const BASE_DELAY = 0.26;

export function HeroHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const { headlineLines, accentWord, headline } = heroContent;

  return (
    <h1
      aria-label={headline}
      className="mt-6 text-[clamp(2.6rem,7.4vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-paper"
    >
      {headlineLines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block will-change-[clip-path,transform]"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 100% -0.2em 0)", x: "-3%" }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0 0% -0.2em 0)", x: "0%" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    delay: BASE_DELAY + index * LINE_DELAY,
                    // The drift outlasts the wipe, which is what makes the
                    // line settle instead of snapping once fully revealed.
                    clipPath: { duration: 0.95, ease: EASE },
                    x: { duration: 1.35, ease: EASE },
                  }
            }
            aria-hidden
          >
            {line.split(" ").map((word) => {
              const isAccent = word.toLowerCase() === accentWord.toLowerCase();
              return (
                <span
                  key={word}
                  className={cn(
                    // Weight contrast within one family, not an italic
                    // serif — see RULES.md § Styling.
                    isAccent && "font-light text-teal-700",
                  )}
                >
                  {word}{" "}
                </span>
              );
            })}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
