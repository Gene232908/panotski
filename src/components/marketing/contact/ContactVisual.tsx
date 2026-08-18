"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// The single visual beside the contact form: the client's own BEYOND STRATEGY
// artwork, shown whole and at the full width of its column.
//
// It replaces the two elements that used to share this space — the roadmap
// graphic and the 3D emblem — at the client's request. That also leaves the
// Contact page with no WebGL context at all, which is the cheapest this page
// has ever been.
//
// WHY THERE IS NO CARD, BORDER OR RADIUS AROUND IT
// The artwork's own background is black and the band behind it is `ink`, which
// is exactly #000000 — the same colour. Given no frame to draw its edge, the
// image has no visible boundary: only the glowing roads read, as if they were
// lit inside the section itself. Adding a rounded card, a border or a lighter
// tone here would put the rectangle back and lose the whole effect. Keep the
// band `ink`.
//
// The idle pulse lifts the brightness over 0.5s and settles back, then holds
// before repeating — see `glowPulse` in tailwind.config.ts. `prefers-reduced-
// motion` switches it off through the global rule in globals.css.

export function ContactVisual() {
  const frameRef = useRef<HTMLDivElement>(null);
  // Animating `filter` repaints a large image on every frame, so the pulse only
  // runs while the section is actually on screen — the same rule the CTA's 3D
  // mark follows. Starts false and is switched on by the observer below.
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "120px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="w-full">
      <Image
        src="/beyond-strategyt.png"
        alt="Beyond Strategy — a network of glowing roads winding from a marker flying the UAE flag to one flying the Philippine flag"
        width={1254}
        height={1254}
        sizes="(min-width: 1024px) 50vw, 100vw"
        // `h-auto` with the intrinsic size keeps the artwork WHOLE. `fill` +
        // `object-cover` would crop it to whatever box height the row settled
        // on, and the flag and the starting marker sit near opposite corners —
        // they are the first things a crop would eat.
        className={cn(
          "h-auto w-full select-none",
          onScreen && "animate-glow-pulse",
        )}
      />
    </div>
  );
}
