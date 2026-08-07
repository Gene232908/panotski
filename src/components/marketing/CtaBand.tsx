import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { homeCtaContent } from "@/content/home";

// Closing call-to-action. Light by default so the page ends bright;
// the only wording is the site's own "BOOK A CONSULTATION" button label.

type CtaBandProps = {
  headline?: string;
  accentWords?: string[];
};

export function CtaBand({
  headline = "Let’s turn your idea into an outcome.",
  accentWords = ["outcome."],
}: CtaBandProps) {
  return (
    <Section tone="soft" className="overflow-hidden">
      <Container className="relative flex flex-col items-center text-center">
        <AnimatedText
          as="h2"
          text={headline}
          accentWords={accentWords}
          className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
        />

        <Reveal delay={0.2}>
          <Link
            href={homeCtaContent.cta.href}
            className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-4.5 text-xs font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-teal-700"
          >
            {homeCtaContent.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
