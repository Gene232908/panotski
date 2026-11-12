import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BrandText } from "@/components/ui/BrandMark";
import { whoWeAreContent } from "@/content/home";

export function WhoWeAreSection() {
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal scale>
            <ImagePlaceholder
              hint={whoWeAreContent.imageHint}
              ratio="portraitDesktop"
              className="lg:sticky lg:top-28"
            />
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{whoWeAreContent.eyebrow}</Eyebrow>
            </Reveal>

            {/* Plan §7: the mission line is split so "Turning Ideas into
                Opportunities" carries the brand green and stays visually
                strong, and the wordmark uses the one approved colour split. */}
            <Reveal delay={0.08}>
              <p className="balance mt-8 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
                <BrandText text={whoWeAreContent.leadPrefix} />{" "}
                <span className="text-teal-700">{whoWeAreContent.leadAccent}</span>
              </p>
            </Reveal>

            <div className="mt-7 flex flex-col gap-5">
              {whoWeAreContent.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.14 + index * 0.06}>
                  <p className="text-base leading-relaxed text-graphite-soft">
                    <BrandText text={paragraph} />
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-10 border-l-2 border-teal-700 pl-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/45">
                  {whoWeAreContent.beliefLead}
                </p>
                <p className="mt-3 text-xl font-light leading-[1.3] tracking-[-0.02em] text-ink sm:text-[1.7rem]">
                  {whoWeAreContent.belief}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
