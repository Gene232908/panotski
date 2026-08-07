"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Word-level reveal for headlines.
//
// Each word rises out of its own clipping mask while resolving from a soft
// defocus — the mask is what separates this from a generic staggered fade,
// and the blur is what keeps it calm instead of snappy. Stagger is tight
// (38ms) so a long headline reads as one sweep, not a queue.

const EASE = [0.16, 1, 0.3, 1] as const;

type AnimatedTextProps = {
  text: string;
  className?: string;
  /** Words given the accent treatment (matched case-insensitively). */
  accentWords?: string[];
  accentClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const normalize = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

export function AnimatedText({
  text,
  className,
  accentWords = [],
  // Accent = weight drop + colour within the same family. Not an italic
  // serif — see RULES.md § Styling.
  accentClassName = "font-light text-teal-700",
  delay = 0,
  as = "h2",
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const accentSet = new Set(accentWords.map(normalize));
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn("balance", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.038,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className={cn(
              "inline-block",
              accentSet.has(normalize(word)) && accentClassName,
            )}
            variants={{
              hidden: {
                y: shouldReduceMotion ? 0 : "110%",
                opacity: shouldReduceMotion ? 0 : 1,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
              },
              visible: {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 1,
                  ease: EASE,
                  filter: { duration: 0.55, ease: "easeOut" },
                },
              },
            }}
            aria-hidden
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? <span aria-hidden>&nbsp;</span> : null}
        </span>
      ))}
    </MotionTag>
  );
}
