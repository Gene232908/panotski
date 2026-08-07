import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { coreStatementContent } from "@/content/about";

export function CoreStatementSection() {
  return (
    <Section tone="white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-teal-700">
              {coreStatementContent.heading}
            </p>
          </Reveal>

          <AnimatedText
            as="h2"
            text={coreStatementContent.quote}
            accentWords={["quality,", "process.”"]}
            delay={0.1}
            // Big, light, tightly tracked — the quote carries itself on
            // scale and restraint rather than an italic serif.
            className="mt-8 text-2xl font-light leading-[1.25] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.9rem]"
            accentClassName="font-medium text-teal-700"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-6">
            {coreStatementContent.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.08}>
                <p className="text-base leading-relaxed text-graphite-soft">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} scale>
            <ImagePlaceholder
              hint={coreStatementContent.imageHint}
              ratio="landscape"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
