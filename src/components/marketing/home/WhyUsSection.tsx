import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { whyUsContent } from "@/content/home";

// The single dark band on the home page — a deliberate contrast moment
// between the white sections above and below it.

export function WhyUsSection() {
  return (
    <Section tone="ink" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-teal-700/20 blur-[140px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow tone="light">{whyUsContent.eyebrow}</Eyebrow>
            </Reveal>

            {/* Plan §8: "Rebuild, Execute, and Improve" is its own statement
                so a line break can never fragment it, and the supporting
                message sits below rather than being joined by "Because". */}
            <AnimatedText
              as="p"
              text={whyUsContent.statement}
              accentWords={[...whyUsContent.statementAccent]}
              accentClassName="font-light text-teal-700"
              brandTone="dark"
              className="mt-8 text-xl font-medium leading-relaxed tracking-tight text-paper sm:text-2xl lg:text-[1.75rem] lg:leading-[1.45]"
            />

            <Reveal delay={0.18}>
              <p className="balance mt-6 max-w-xl text-base leading-[1.7] text-paper/70 sm:text-[17px]">
                {whyUsContent.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} scale>
            <ImagePlaceholder
              hint={whyUsContent.imageHint}
              ratio="landscape"
              tone="dark"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
