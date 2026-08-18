import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { LegalSections } from "@/components/marketing/legal/LegalSections";
import { termsContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "These terms and conditions outline the rules and regulations for the use of CRE Services's Website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" headline={termsContent.title} />
      <LegalSections intro={termsContent.intro} sections={termsContent.sections} />
    </>
  );
}
