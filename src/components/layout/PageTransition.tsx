"use client";

import { usePathname } from "next/navigation";

// Blur-in on every page entry.
//
// `key={pathname}` is the whole mechanism: React tears the old subtree down
// and mounts a new one on each navigation, so the CSS animation on this
// wrapper replays without any JavaScript running per frame. See `.page-enter`
// in globals.css.
//
// TWO THINGS HERE ARE LOAD-BEARING, NOT STYLE:
//
// 1. NO `animation-fill-mode`. An element with a `filter` becomes the
//    containing block for `position: fixed` descendants — the Creative Arts
//    modal is fixed and lives inside this wrapper, so a filter left applied
//    after the animation finished would pin the modal to this div instead of
//    to the viewport. Without a fill mode the element drops back to its own
//    styles — no filter at all — the moment the animation ends. The final
//    keyframe already matches those styles, so nothing jumps.
//
// 2. It wraps ONLY the page body. The header is fixed and sits outside, so it
//    stays put while the page beneath it resolves — which is what makes the
//    navigation read as the page changing rather than the whole window
//    flashing.
//
// `prefers-reduced-motion` collapses the animation through the global rule in
// globals.css, leaving an instant, fully visible page.

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
