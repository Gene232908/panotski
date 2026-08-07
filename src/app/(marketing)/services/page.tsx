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
      {/* The intro sentence is lead copy, not a headline — set as display
          type it filled an entire mobile viewport before the page began. */}
      <PageHero
        eyebrow="What We Do"
        headline="Services"
        subtitle={servicesIntro.body}
        imageHint="CREServices team delivering a client engagement"
      />
      <ServicesListSection />
      <CtaBand />
    </>
  );
}
