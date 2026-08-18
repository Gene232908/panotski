import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/home/HeroSection";
import { WhatWeDoSection } from "@/components/marketing/home/WhatWeDoSection";
import { WhoWeAreSection } from "@/components/marketing/home/WhoWeAreSection";
import { WhyUsSection } from "@/components/marketing/home/WhyUsSection";
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
      <CtaBand />
    </>
  );
}
