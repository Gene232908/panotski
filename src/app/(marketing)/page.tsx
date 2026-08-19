import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/home/HeroSection";
import { WhatWeDoSection } from "@/components/marketing/home/WhatWeDoSection";
import { WhoWeAreSection } from "@/components/marketing/home/WhoWeAreSection";
import { WhyUsSection } from "@/components/marketing/home/WhyUsSection";
import { TestimonialsSection } from "@/components/marketing/home/TestimonialsSection";
import { CtaBand } from "@/components/marketing/CtaBand";

export const metadata: Metadata = {
  title: "Home",
  description:
    "At CREService, we turn vision into execution—where results meet quality, and operations meet structured, scalable processes.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <WhoWeAreSection />
      <WhyUsSection />
      <TestimonialsSection />
      {/* `white` because TestimonialsSection above is `soft` — two adjacent
          soft bands read as one oversized block (see CtaBand's tone prop). */}
      <CtaBand tone="white" />
    </>
  );
}
