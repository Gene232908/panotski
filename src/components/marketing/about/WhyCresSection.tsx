import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { whyCresContent } from "@/content/about";

// The dark accent band on the About page.

export function WhyCresSection() {
  return (
    <Section tone="ink" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-teal-700/20 blur-[140px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal scale>
            <ImagePlaceholder
              hint={whyCresContent.imageHint}
              ratio="landscape"
              tone="dark"
            />
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow tone="light">{whyCresContent.heading}</Eyebrow>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5">
              {whyCresContent.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.08}>
                  <p className="text-base leading-relaxed text-paper/75 sm:text-[17px]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.28}>
              <Link
                href={whyCresContent.cta.href}
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-teal-500 hover:text-paper"
              >
                {whyCresContent.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
