"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/home";
import { cn } from "@/lib/utils";

// Editorial two-line headline. Each line sits in its own clipping mask and
// rises from beneath it — the mask is what makes the entrance read as a
// title card rather than a fade. Both lines are flush left.

const EASE = [0.16, 1, 0.3, 1] as const;

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
            className="block"
            initial={{
              y: shouldReduceMotion ? 0 : "106%",
              opacity: shouldReduceMotion ? 0 : 1,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
            }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.18 + index * 0.13,
              duration: 1.3,
              ease: EASE,
              filter: { duration: 0.8, delay: 0.18 + index * 0.13, ease: "easeOut" },
            }}
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
                    isAccent && "font-light text-teal-300",
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
