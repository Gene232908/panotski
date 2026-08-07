import type { Metadata } from "next";
import { CoreStatementSection } from "@/components/marketing/about/CoreStatementSection";
import { WhyCresSection } from "@/components/marketing/about/WhyCresSection";
import { OurApproachSection } from "@/components/marketing/about/OurApproachSection";
import { CtaBand } from "@/components/marketing/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "When ideas meet reality, results meet quality, and operations meet the process.",
};

export default function AboutPage() {
  return (
    <>
      {/* Core Statement opens the page directly, mirroring the live site. */}
      <div className="pt-20 sm:pt-24" />
      <CoreStatementSection />
      <WhyCresSection />
      <OurApproachSection />
      <CtaBand />
    </>
  );
}
