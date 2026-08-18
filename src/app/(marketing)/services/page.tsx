import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ServicesListSection } from "@/components/marketing/services/ServicesListSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { servicesIntro } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: servicesIntro.body,
};

export default function ServicesPage() {
  return (
    <>
      {/* Photograph only — no eyebrow, headline or intro sentence. The client
          removed all three: the boardroom shot already says "what we do", and
          the twelve service bands below carry the detail. */}
      <PageHero
        backgroundImage="/servicest.jpg"
        backgroundAlt="CREServices consultant presenting the What We Do slide to a client team in a boardroom"
      />
      <ServicesListSection />
      <CtaBand logoSpin="left" />
    </>
  );
}
