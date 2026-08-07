import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalSection } from "@/content/legal";

type LegalSectionsProps = {
  intro: string;
  sections: LegalSection[];
};

export function LegalSections({ intro, sections }: LegalSectionsProps) {
  return (
    <Section tone="white" className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-lg font-semibold leading-relaxed text-ink">{intro}</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section, sectionIndex) => (
            <Reveal key={section.heading ?? sectionIndex} delay={0.04}>
              <div>
                {section.heading ? (
                  <h2 className="mb-4 text-lg font-bold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                ) : null}

                <div className="flex flex-col gap-4">
                  {section.blocks.map((block, blockIndex) =>
                    block.type === "text" ? (
                      <p
                        key={blockIndex}
                        className="text-[15px] leading-relaxed text-graphite-soft"
                      >
                        {block.value}
                      </p>
                    ) : (
                      <ul key={blockIndex} className="flex flex-col gap-2 pl-1">
                        {block.items.map((item) => (
                          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-graphite-soft">
                            <span
                              className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-teal-700"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
