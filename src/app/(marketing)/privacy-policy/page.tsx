import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { LegalSections } from "@/components/marketing/legal/LegalSections";
import { privacyContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "cresvcs.com website is owned by CRE Services, which is a data controller of your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" headline={privacyContent.title} />
      <LegalSections intro={privacyContent.intro} sections={privacyContent.sections} />
    </>
  );
}
