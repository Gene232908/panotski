"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/content/services";

// Hairline meta strip pinned to the bottom of the hero frame: scroll cue,
// a continuous ticker of the nine service names, and the count.
//
// The ticker previously read as broken — words appeared sliced at both ends
// and ran into the labels. Cause was the `mask-fade-x` utility missing its
// `-webkit-` prefix, so Chrome dropped the fade entirely and hard-cut the
// text. That's fixed in globals.css; the guards below keep it clean:
//   • generous gap so the track never abuts SCROLL / 9 SERVICES,
//   • the list is duplicated so the loop has no seam,
//   • hidden under lg, where there simply isn't room for three elements.

export function HeroMetaBar() {
  const shouldReduceMotion = useReducedMotion();
  const ticker = [...services, ...services];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[3px]"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center gap-12 px-6 sm:px-10 lg:px-14">
        <div className="flex shrink-0 items-center gap-3">
          <span
            className="relative flex h-6 w-px overflow-hidden bg-white/25"
            aria-hidden
          >
            {!shouldReduceMotion ? (
              <motion.span
                className="absolute inset-x-0 h-2.5 bg-teal-300"
                animate={{ y: ["-120%", "300%"] }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
              />
            ) : null}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-eyebrow text-paper/55">
            Scroll
          </span>
        </div>

        <div
          className="mask-fade-x relative hidden min-w-0 flex-1 overflow-hidden lg:block"
          aria-hidden
        >
          <div className="flex w-max animate-marquee items-center gap-10">
            {ticker.map((service, index) => (
              <span
                key={`${service.slug}-${index}`}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[10px] font-medium uppercase tracking-eyebrow text-paper/45"
              >
                {service.name}
                <span
                  className="h-[3px] w-[3px] shrink-0 rounded-full bg-teal-400/60"
                  aria-hidden
                />
              </span>
            ))}
          </div>
        </div>

        <span className="ml-auto shrink-0 text-[10px] font-medium uppercase tracking-eyebrow text-paper/55 lg:ml-0">
          {services.length} Services
        </span>
      </div>
    </motion.div>
  );
}
