import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  accent?: string;
  subtitle?: string;
  imageHint?: string;
};

export function PageHero({
  eyebrow,
  headline,
  accent,
  subtitle,
  imageHint,
}: PageHeroProps) {
  const fullHeadline = accent ? `${headline} ${accent}` : headline;

  return (
    <section className="relative overflow-hidden bg-surface pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        className="pointer-events-none absolute -right-40 -top-32 h-[440px] w-[440px] rounded-full bg-teal-100/50 blur-[130px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <AnimatedText
              as="h1"
              text={fullHeadline}
              accentWords={accent ? accent.split(" ") : []}
              delay={0.08}
              className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]"
            />

            {subtitle ? (
              <Reveal delay={0.35}>
                <p className="balance mt-6 max-w-xl text-base leading-relaxed text-graphite-soft sm:text-lg">
                  {subtitle}
                </p>
              </Reveal>
            ) : null}
          </div>

          {imageHint ? (
            <Reveal delay={0.2} scale>
              <ImagePlaceholder hint={imageHint} ratio="landscape" />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
