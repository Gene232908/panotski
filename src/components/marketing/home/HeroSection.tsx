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
import { BrandMark, BrandText } from "@/components/ui/BrandMark";
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
//
// ─────────────────────────────────────────────────────────────────────────
// ADJUSTING THE HERO BY HAND — every knob, and what each one moves.
//
// All of these only apply from the `lg:` breakpoint up (1024px+), because the
// photograph is hidden below that and the copy centres itself instead. Change
// a value, save, and the dev server reloads — no build needed.
//
//  1. HOW FAR DOWN THE COPY SITS   → `lg:pt-[7.5rem]` on the <motion.div>
//     Bigger = lower. 6rem sits just under the nav; 12rem is roughly centred.
//     This is the one to touch first — it decides where the speaker's hand
//     falls relative to the headline.
//
//  2. WHICH EDGE THE COPY ANCHORS TO → `lg:justify-start` on the <section>
//     `justify-start` = top (current), `justify-center` = middle,
//     `justify-end` = bottom. Pair with `lg:pb-*` instead of `lg:pt-*` if you
//     switch to `justify-end`.
//
//  3. LEFT MARGIN                  → `lg:px-14` on the inner container
//     Bigger = copy starts further right. px-14 is 3.5rem.
//
//  4. HEADLINE SIZE                → HeroHeadline.tsx,
//     `text-[clamp(2.6rem,7.4vw,6.5rem)]`
//     First number = smallest allowed, middle = how fast it grows with the
//     window, last = largest allowed. Raise 7.4vw to fill more width.
//
//  5. WHERE THE HEADLINE BREAKS    → `headlineLines` in content/home.ts
//     The two lines are literal. Their words joined with a space must still
//     equal `headline` — that is copy, not layout (RULES.md § 5a).
//
//  6. SUPPORTING LINE WIDTH        → `max-w-[30rem]` on the subtitle <p>
//     Narrower = more lines. 30rem gives three lines at 1440px.
//
//  7. GAP UNDER THE HEADLINE       → `mt-8` on the stacked wrapper
//  8. GAP BETWEEN TEXT AND BUTTONS → `gap-8` on that same wrapper
//
//  9. OVERALL HERO HEIGHT          → `lg:h-[min(100svh,56.25vw)]` on <section>
//     56.25vw keeps the 16:9 frame of the photograph. Lower it and the photo
//     crops; raise it past 100svh and the hero overflows the screen.
//
// After changing anything here, check 390 / 768 / 1440 — the copy has to stay
// clear of the speaker at every width:
//     npm run dev
// ─────────────────────────────────────────────────────────────────────────

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
      // Copy is TOP-weighted on desktop, not bottom-anchored: the approved
      // composition sits the headline in the upper-left so the speaker's
      // gesture reads across toward it, with open frame beneath.
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#07100d] text-paper lg:h-[min(100svh,56.25vw)] lg:min-h-[600px] lg:justify-start"
    >
      {/* Desktop: full-bleed photograph behind the copy. */}
      <div className="hidden lg:block">
        <HeroBackdrop scale={shouldReduceMotion ? staticScale : bgScale} />
      </div>

      <motion.div
        style={
          shouldReduceMotion ? undefined : { y: copyY, opacity: copyOpacity }
        }
        // Top padding sets the headline's height in the frame (the section is
        // `justify-start` on desktop) and must clear the floating nav. Tuned so
        // the speaker's open hand lands beside the "meet reality" line rather
        // than through it. Re-check if the hero photograph is ever replaced.
        //
        // Re-checked on the heroo.png swap, and CORRECTED. A FIXED top padding
        // cannot work here: the band is `min(100svh,56.25vw)` so its height
        // moves with the window, while the copy column below this padding is a
        // constant ~29rem and the meta ticker is pinned to the bottom 3.5rem of
        // the band. At a flat 21.5rem the two hero buttons ran 756-806px down
        // an 810px band — sitting underneath the ticker on any 1440x900 laptop.
        //
        // So the padding is now whatever is LEFT once the copy and the ticker
        // have their space, capped at the approved 21.5rem. Wide screens keep
        // the original composition exactly; shorter ones give up top padding
        // instead of overlapping. 33rem = the copy column plus the ticker plus
        // a small gap. The 2rem floor keeps it sane on a very short window.
        className="relative z-10 w-full pb-24 pt-10 sm:pb-28 lg:pb-24 lg:pt-[clamp(2rem,calc(min(100svh,56.25vw)-33rem),21.5rem)]"
      >
        {/* Wider than the standard page container — the banner is meant to
            fill the frame, so it runs to 1680px with generous gutters rather
            than being pinned to the 1320px content column. */}
        <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-6">
          <div className="max-w-[62rem]">
            {/* The eyebrow drifts in from the left rather than up from below,
                so it sets the same left-to-right direction the headline wipe
                then follows. The whole entrance reads as one gesture. */}
            <motion.p
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
              // Sentence case, not uppercase — matches the approved hero
              // composition, where the eyebrow reads as a signature line
              // rather than a label.
              // White by default — only the CRES inside <BrandMark> is green.
              className="text-[13px] font-bold tracking-[0.02em] text-paper"
            >
              <BrandMark tone="dark" variant="inline" /> — {brand.tagline}
            </motion.p>

            <HeroHeadline />

            {/* Stacked, never side by side: the approved composition puts the
                actions directly beneath the supporting line so the whole block
                reads as one left-aligned column. */}
            <div className="mt-8 flex flex-col gap-8">
              {/* The rule is its own element so it can DRAW downward before
                  the sentence arrives — a border cannot be animated. That beat
                  is what stops the supporting copy from simply fading in
                  alongside everything else. */}
              <div className="relative max-w-[26.5rem] pl-5">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top bg-teal-700/40"
                  initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.86, duration: 0.75, ease: EASE }}
                />
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
                  // Narrow measure on purpose: the approved composition breaks
                  // this into three short lines beside the speaker, not two
                  // long ones running under him.
                  className="text-[17px] leading-[1.65] text-paper/75 sm:text-lg"
                >
                  {/* Runs through BrandText so the CREServices in this sentence
                      carries the same green/white split as every other wordmark
                      (plan §12). The hero band is dark, so no chip is needed —
                      the band is already the dark ground. */}
                  <BrandText text={heroContent.subtitle} tone="dark" />
                </motion.p>
              </div>

              {/* The two actions arrive one after the other, not together —
                  a short stagger closes the sequence instead of ending it on
                  a block that pops in. */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: 1.18,
                      staggerChildren: shouldReduceMotion ? 0 : 0.09,
                    },
                  },
                }}
                className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-4"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: EASE },
                    },
                  }}
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
                </motion.span>

                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: EASE },
                    },
                  }}
                >
                  <Link
                    href={heroContent.secondaryCta.href}
                    className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-paper/85 transition-colors duration-300 hover:text-paper"
                  >
                    <span className="relative">
                      {heroContent.secondaryCta.label}
                      <span
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-teal-700 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                        aria-hidden
                      />
                    </span>
                    <ChevronRight
                      className="h-4 w-4 text-teal-700 transition-transform duration-500 ease-premium group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <HeroMetaBar />
    </section>
  );
}
