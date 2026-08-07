"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { brand, primaryCta } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { NavItems } from "@/components/layout/NavItems";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

// Standard top bar: 80px, tightening to 68px on scroll.
//
// An earlier pass took this to 56/48px, which pushed the brand lockup and
// nav labels below a readable size — the height budget has to fit a logo,
// a two-line brand lockup, four nav items and a CTA. Slim here means
// restrained proportions and a single row, not shrinking the type.
//
// Blending: on the home page the bar is fully transparent at the top of the
// scroll, sitting directly on the hero photograph — the hero's own top scrim
// (HeroBackdrop → HeroScrims) is what keeps the white lettering readable, so
// no bar edge cuts across the image. Once scrolled it settles into a dark
// blurred bar.
//
// Interior pages open on white and the C.A.S.H. lettering is white-on-dark,
// so there the bar is always solid — a transparent one would be invisible.
//
// C.A.S.H. lettering lives in CashNavLabel; see RULES.md.

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the home hero is a dark photograph the bar can dissolve into.
  const blendsIntoHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium",
          scrolled
            ? "border-b border-white/10 bg-ink/95 shadow-nav backdrop-blur-xl backdrop-saturate-150"
            : blendsIntoHero
              ? "border-b border-transparent bg-transparent"
              : "border-b border-white/5 bg-ink/85 backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between transition-all duration-500 ease-premium",
            scrolled ? "h-[68px]" : "h-20",
          )}
        >
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.svg"
              alt={`${brand.name} logo`}
              width={48}
              height={27}
              className={cn(
                "w-auto transition-all duration-500 ease-premium",
                scrolled ? "h-7" : "h-9",
              )}
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-[16px] font-bold tracking-[-0.01em] text-paper">
                {brand.name}
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-400">
                {brand.tagline}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <NavItems pathname={pathname} />

            <Link
              href={primaryCta.href}
              className="hidden rounded-full bg-teal-700 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper transition-all duration-300 ease-premium hover:bg-teal-600 active:scale-[0.97] lg:inline-flex"
            >
              {primaryCta.label}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-paper transition-colors duration-200 hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-[18px] w-[18px]" aria-hidden />
            </button>
          </div>
        </Container>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-teal-500/70"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
