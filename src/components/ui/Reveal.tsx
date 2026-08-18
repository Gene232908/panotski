"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Blur-and-settle reveal.
//
// Not a plain fade: content resolves from a soft defocus while it rises,
// which is what makes an entrance read as expensive rather than generic.
// The blur is small (8px) and clears early in the curve, so text is never
// left illegible mid-animation — it lands soft on the eye instead of
// snapping in.
//
// DRIVEN BY CSS, NOT BY JAVASCRIPT. This used to be a framer-motion
// `whileInView`, which meant every reveal on the page ran its own rAF loop
// writing inline styles each frame. The Services page alone mounts about
// thirty of these; during a fast scroll several animate at once and each one
// is animating `filter: blur()` over a large box, so the main thread was
// doing the compositor's job and the scroll stuttered for it.
//
// Now the only JavaScript is one IntersectionObserver per reveal, which fires
// once, sets a class, and disconnects. The transition itself is handed to the
// browser — see `.reveal` in globals.css. The look is unchanged: same
// distance, same easing, same durations.
//
// Reduced motion is handled in the stylesheet too, so the resting state is
// "visible" rather than "invisible until JS runs".

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
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer (very old browser, or a test environment): show the content
    // rather than leaving it stuck at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        // One-shot: nothing re-hides on the way back up, so the observer has
        // no further work to do.
        observer.disconnect();
      },
      // Matches the old framer `margin: "-12%"` — the reveal starts once the
      // block is properly into the viewport, not the instant its top edge
      // clips the bottom.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
          "--reveal-scale": scale ? 0.985 : 1,
          "--reveal-blur": `${blur}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
