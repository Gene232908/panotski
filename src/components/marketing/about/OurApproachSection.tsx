import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ourApproachContent } from "@/content/about";

export function OurApproachSection() {
  return (
    <Section tone="soft">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{ourApproachContent.heading}</Eyebrow>
            </Reveal>

            <div className="mt-8 flex flex-col gap-6">
              {ourApproachContent.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.08}>
                  <p className="text-base leading-relaxed text-graphite-soft sm:text-[17px]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} scale>
            <ImagePlaceholder hint={ourApproachContent.imageHint} ratio="portrait" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
