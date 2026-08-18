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

        {/* Plan §4.1/§13: four columns on desktop (12 services = three complete
            rows), two on tablet, one on mobile.
            `auto-rows-fr` gives every row the same height and the tiles carry
            `h-full`, so all twelve cards match regardless of whether a service
            name wraps to one line or two. Without it each card is only as tall
            as its own title, which is most obvious at the two-column widths
            where long and short names sit side by side. */}
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={Math.min((index % 4) * 0.06, 0.18)}
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
