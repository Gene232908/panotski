import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationForm } from "@/components/marketing/contact/ConsultationForm";
import { ContactInfoSection } from "@/components/marketing/contact/ContactInfoSection";
import { contactHeroContent } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactHeroContent.subtitle,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        headline={contactHeroContent.headline}
        accent={contactHeroContent.headlineAccent}
        subtitle={contactHeroContent.subtitle}
        imageHint={contactHeroContent.imageHint}
      />

      <Section tone="soft">
        <Container className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-soft sm:p-10">
              <ConsultationForm />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactInfoSection />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
