"use client";

import { motion } from "framer-motion";
import { services } from "@/content/services";

// Hairline meta strip pinned to the bottom of the hero frame: a continuous
// ticker of the nine service names.
//
// The ticker previously read as broken — words appeared sliced at both ends
// and ran into the labels. Cause was the `mask-fade-x` utility missing its
// `-webkit-` prefix, so Chrome dropped the fade entirely and hard-cut the
// text. That's fixed in globals.css; the guards below keep it clean:
//   • the list is duplicated so the loop has no seam,
//   • hidden under lg, where there simply isn't room for the track.

export function HeroMetaBar() {
  const ticker = [...services, ...services];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[3px]"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center px-6 sm:px-10 lg:px-14">
        <div
          className="mask-fade-x relative hidden min-w-0 flex-1 overflow-hidden lg:block"
          aria-hidden
        >
          <div className="flex w-max animate-marquee items-center gap-10">
            {ticker.map((service, index) => (
              <span
                key={`${service.slug}-${index}`}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[10px] font-semibold uppercase tracking-eyebrow text-paper/85"
              >
                {service.name}
                <span
                  className="h-[3px] w-[3px] shrink-0 rounded-full bg-teal-700/60"
                  aria-hidden
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
