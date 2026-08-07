import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceTile } from "@/components/marketing/services/ServiceTile";
import { whatWeDoContent } from "@/content/home";
import { homeServices } from "@/content/services";

export function WhatWeDoSection() {
  return (
    <Section tone="soft">
      <Container>
        <Reveal>
          <Eyebrow>{whatWeDoContent.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={Math.min((index % 3) * 0.08, 0.24)}
              scale
            >
              <ServiceTile service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
