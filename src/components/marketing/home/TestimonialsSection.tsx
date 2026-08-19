import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { testimonialsContent } from "@/content/home";

// Sits between the dark "WHY US?" band and the closing CTA — the claim, then
// the people it applies to. `soft` keeps the alternation honest: ink → soft →
// white, so the home CTA below is passed tone="white" rather than fusing two
// #f5f5f6 bands into one oversized block.
//
// Reads as a chapter like every other band: Eyebrow, AnimatedText heading,
// then the content. Nothing bespoke at this level.

export function TestimonialsSection() {
  return (
    <Section tone="soft">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{testimonialsContent.eyebrow}</Eyebrow>
          </Reveal>

          <AnimatedText
            as="h2"
            text={testimonialsContent.heading}
            accentWords={[...testimonialsContent.headingAccent]}
            className="mt-8 text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]"
          />
        </div>

        <Reveal delay={0.12} scale className="mt-14 lg:mt-16">
          <TestimonialCarousel testimonials={testimonialsContent.testimonials} />
        </Reveal>
      </Container>
    </Section>
  );
}
