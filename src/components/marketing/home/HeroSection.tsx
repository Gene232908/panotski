"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroBackdrop } from "@/components/marketing/home/HeroBackdrop";
import { HeroHeadline } from "@/components/marketing/home/HeroHeadline";
import { HeroMetaBar } from "@/components/marketing/home/HeroMetaBar";
import { heroContent } from "@/content/home";
import { brand } from "@/content/site";

// Cinematic, photography-first hero.
//
// Motion: the backdrop zooms slowly on scroll while the copy lifts and
// fades faster. The speed gap between the two layers is what reads as
// depth. Pointer-drift parallax was removed — it needs an overscanned
// image, which crops the sides of this photograph.
//
// Layout: desktop overlays the copy on a full-bleed photograph. Mobile
// drops the photo entirely and shows text only over the dark base fill,
// since there's no room to show it uncropped on a portrait viewport.
//
// Deliberately absent (see RULES.md § 5a): orbs, glass cards, device
// mockups, grid overlays, shimmer sweeps, floating stat chips.

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Zoom only, starting at exactly 1 so the resting frame is uncropped.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Inert stand-in for reduced motion. Declared unconditionally so hook
  // order stays stable.
  const staticScale = useMotionValue(1);

  return (
    <section
      ref={sectionRef}
      // Height tracks the photograph's 16:9 aspect (56.25vw) but never
      // exceeds the viewport. On a 1440×900 screen that means an 810px hero
      // showing the complete frame, rather than a 900px one that crops the
      // CREServices screen off the right edge.
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#07100d] text-paper lg:h-[min(100svh,56.25vw)] lg:min-h-[600px] lg:justify-end"
    >
      {/* Desktop: full-bleed photograph behind the copy. */}
      <div className="hidden lg:block">
        <HeroBackdrop scale={shouldReduceMotion ? staticScale : bgScale} />
      </div>

      <motion.div
        style={
          shouldReduceMotion ? undefined : { y: copyY, opacity: copyOpacity }
        }
        className="relative z-10 w-full pb-24 pt-10 sm:pb-28 lg:pb-32 lg:pt-32"
      >
        {/* Wider than the standard page container — the banner is meant to
            fill the frame, so it runs to 1680px with generous gutters rather
            than being pinned to the 1320px content column. */}
        <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-[62rem]">
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200"
            >
              {brand.name} — {brand.tagline}
            </motion.p>

            <HeroHeadline />

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <motion.p
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 18,
                  filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
                }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.62, duration: 1, ease: EASE }}
                className="balance max-w-xl border-l border-teal-300/30 pl-5 text-[17px] leading-[1.65] text-paper/75 sm:text-lg"
              >
                {heroContent.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.74, duration: 0.95, ease: EASE }}
                className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-4"
              >
                <Link
                  href={heroContent.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-teal-700 px-7 py-3.5 text-[15px] font-medium text-paper transition-all duration-500 ease-premium hover:bg-teal-600 active:scale-[0.97]"
                >
                  {heroContent.primaryCta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>

                <Link
                  href={heroContent.secondaryCta.href}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-paper/85 transition-colors duration-300 hover:text-paper"
                >
                  <span className="relative">
                    {heroContent.secondaryCta.label}
                    <span
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-teal-300 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                      aria-hidden
                    />
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-teal-300 transition-transform duration-500 ease-premium group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <HeroMetaBar />
    </section>
  );
}
