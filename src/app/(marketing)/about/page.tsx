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
      {/* Core Statement opens the page directly, mirroring the live site.
          Section's own top padding (py-24 sm:py-32) clears the fixed
          header on its own; this spacer just tops it up by the same
          32px PageHero adds on the other interior pages (pt-32 sm:pt-40
          vs Section's py-24 sm:py-32), so the opening gap matches. */}
      <div className="pt-8" />
      <CoreStatementSection />
      <WhyCresSection />
      <OurApproachSection />
      <CtaBand tone="white" />
    </>
  );
}
