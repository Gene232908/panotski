import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Page banner, in two variants.
//
//   default        — light band, copy left, optional image slot right.
//   backgroundImage — full-bleed photograph with the copy set over it.
//
// The photographic variant is a banner, not a second home hero: it is capped
// well below full height so the page still begins immediately beneath it.
// Copy sits bottom-left, where a scrim can darken the frame without covering
// the subject of the photograph.

type PageHeroProps = {
  /** Optional on the photographic variant — a banner may carry no copy at all. */
  eyebrow?: string;
  headline?: string;
  accent?: string;
  subtitle?: string;
  /** Light variant only — the placeholder slot beside the copy. */
  imageHint?: string;
  /** Path under /public. Switches the whole band to the photographic variant. */
  backgroundImage?: string;
  /** Required whenever backgroundImage is set. */
  backgroundAlt?: string;
};

export function PageHero({
  eyebrow,
  headline,
  accent,
  subtitle,
  imageHint,
  backgroundImage,
  backgroundAlt,
}: PageHeroProps) {
  const fullHeadline = [headline, accent].filter(Boolean).join(" ");

  if (backgroundImage) {
    return (
      <section className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-ink text-paper lg:h-[min(80svh,54vw)] lg:min-h-[34rem]">
        <Image
          src={backgroundImage}
          alt={backgroundAlt ?? ""}
          fill
          priority
          sizes="100vw"
          // Anchored to the TOP of the photograph, which sits the picture as
          // low in the band as it can go and keeps the whole CREServices screen
          // — the reason this shot is here — in frame. The band is much wider
          // than the photograph, so what a centred crop throws away is the top,
          // and 0% is the far end of the only travel available: at 1920 the
          // overflow is 217px, so this is 26px lower than the previous 12% and
          // there is nothing further to give.
          className="object-cover object-[50%_0%]"
        />

        {/* Two scrims, each doing one job, and both kept light enough that the
            room still reads as a photograph rather than a dark texture.
            The diagonal weights the RIGHT side, which leaves the presenter and
            the branded screen on the left in clear light — they are the reason
            this photograph is on the page. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(283deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)]"
          aria-hidden
        />

        {/* The handover into the band below. It has to reach FULL black at the
            last pixel — the section underneath is `ink` (#000000), so a fade
            that stops at 70% leaves a visible seam exactly where the two meet.
            The stops are weighted low so the photograph keeps its light for
            most of the frame and only surrenders it near the bottom, which is
            what makes the change of section read as a dissolve rather than a
            cut. */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.88)_20%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0)_100%)]"
          aria-hidden
        />

        {/* Copy is optional here. With none supplied the band is purely the
            photograph, so nothing is rendered over it. */}
        {eyebrow || headline || subtitle ? (
          <Container className="relative z-10 pb-14 pt-32 sm:pb-20 lg:pb-24">
            <div className="max-w-2xl">
              {eyebrow ? (
                <Reveal>
                  <Eyebrow tone="light">{eyebrow}</Eyebrow>
                </Reveal>
              ) : null}

              {headline ? (
                <AnimatedText
                  as="h1"
                  text={fullHeadline}
                  accentWords={accent ? accent.split(" ") : []}
                  accentClassName="font-light text-teal-700"
                  brandTone="dark"
                  delay={0.08}
                  className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-paper sm:text-6xl lg:text-[4.25rem]"
                />
              ) : null}

              {subtitle ? (
                <Reveal delay={0.35}>
                  <p className="balance mt-6 max-w-xl text-base leading-[1.65] text-paper/80 sm:text-lg">
                    {subtitle}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        ) : null}
      </section>
    );
  }

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
