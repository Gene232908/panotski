"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCtaContent } from "@/content/home";

// Closing call-to-action. Light by default so the page ends bright;
// the only wording is the site's own "BOOK A CONSULTATION" button label.
// Copy sits left, the interactive 3D mark (client request) sits right;
// on small screens the mark stacks above the copy (order-* below).

// The 3D canvas is browser-only (WebGL); render nothing on the server and
// keep the layout box reserved while the chunk loads.
const Logo3D = dynamic(
  () => import("@/components/marketing/cta3d/Logo3D").then((m) => m.Logo3D),
  { ssr: false, loading: () => <div className="aspect-square w-full" /> },
);

type CtaBandProps = {
  headline?: string;
  accentWords?: string[];
  // Defaults to "soft"; override when the section immediately above is
  // also "soft" (see About page) so the two don't fuse into one
  // oversized, unbroken band.
  tone?: "white" | "soft";
  /**
   * Idle rotation direction of the 3D mark, alternating page to page —
   * Home right, Services left, About right. The layout is identical on every
   * page; only the drift reverses.
   */
  logoSpin?: "left" | "right";
};

export function CtaBand({
  // Plan §9.1 — exact wording, sourced from content/ so it cannot drift.
  headline = homeCtaContent.headline,
  accentWords = [...homeCtaContent.accentWords],
  tone = "soft",
  logoSpin = "right",
}: CtaBandProps) {
  return (
    <Section tone={tone} className="overflow-hidden">
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            {/* Plan §9.3: a journey-oriented heading, not a second
                "Book a Consultation" competing with the button below. */}
            <Reveal>
              <Eyebrow>{homeCtaContent.heading}</Eyebrow>
            </Reveal>

            <AnimatedText
              as="h2"
              text={headline}
              accentWords={accentWords}
              className="mt-7 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
            />

            <Reveal delay={0.2}>
              <Link
                href={homeCtaContent.cta.href}
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-[1.225rem] text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-teal-700"
              >
                {homeCtaContent.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} blur={0} className="order-1 lg:order-2">
            <Logo3D
              spin={logoSpin}
              className="mx-auto aspect-square w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[520px]"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
