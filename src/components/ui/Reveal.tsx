"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// Blur-and-settle reveal.
//
// Not a plain fade: content resolves from a soft defocus while it rises,
// which is what makes an entrance read as expensive rather than generic.
// The blur is small (8px) and clears early in the curve, so text is never
// left illegible mid-animation — it lands soft on the eye instead of
// snapping in.

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Slight scale-up adds depth to image/card reveals. */
  scale?: boolean;
  /** Defocus distance. Set 0 to opt a block out of the blur. */
  blur?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  scale = false,
  blur = 8,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
      scale: shouldReduceMotion || !scale ? 1 : 0.985,
      filter: shouldReduceMotion || !blur ? "blur(0px)" : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.05,
        delay,
        ease: EASE,
        // Sharpen ahead of the movement finishing — legibility first.
        filter: { duration: 0.7, delay, ease: "easeOut" },
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
