import type { Service } from "@/content/services";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// Full service entry: verbatim description + bullet list beside an image
// slot, everything visible (no disclosure). Two things alternate down the
// page and they alternate independently:
//   • the band tone, ink ↔ white — the client asked for this and says the
//     alternation is meaningful, so don't flatten it (RULES.md § Styling);
//   • the image side, so the long list doesn't march in one direction.
//
// Icon chips were removed at the client's request — the photograph
// identifies the service.

type ServiceRowProps = {
  service: Service;
  index: number;
};

export function ServiceRow({ service, index }: ServiceRowProps) {
  // `index` drives layout rhythm only — it is never printed as a counter.
  const dark = index % 2 === 0;
  const imageFirst = index % 2 === 1;

  return (
    <section
      id={service.anchor}
      className={cn(
        "scroll-mt-24 py-20 transition-colors duration-700 ease-cinematic sm:py-24 lg:py-28",
        dark ? "bg-ink text-paper" : "bg-surface text-ink",
      )}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            scale
            delay={0.08}
            className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}
          >
            <ImagePlaceholder
              hint={service.imageHint}
              ratio="landscape"
              tone={dark ? "dark" : "light"}
            />
          </Reveal>

          <Reveal className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}>
            {/* No "— 01" counter here. Numbered eyebrows are a template
                signature and add nothing: the band already alternates and
                the title is large. Restraint over another decoration. */}
            <h2
              className={cn(
                "balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-3xl lg:text-[2.4rem]",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {service.name}
            </h2>

            <p
              className={cn(
                "mt-5 text-base leading-[1.7] sm:text-[17px]",
                dark ? "text-paper/75" : "text-graphite-soft",
              )}
            >
              {service.description}
            </p>

            {service.bullets.length > 0 ? (
              <ul
                className={cn(
                  "mt-8 flex flex-col gap-3 border-t pt-8",
                  dark ? "border-paper/12" : "border-ink/10",
                )}
              >
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet.text}
                    className={cn(
                      "text-sm leading-relaxed",
                      dark ? "text-paper/85" : "text-graphite",
                    )}
                  >
                    <span className="flex gap-3">
                      <span
                        className={cn(
                          "mt-[0.55rem] h-1 w-1 shrink-0 rounded-full",
                          dark ? "bg-teal-400" : "bg-teal-700",
                        )}
                        aria-hidden
                      />
                      <span>{bullet.text}</span>
                    </span>
                    {bullet.sub ? (
                      <ul
                        className={cn(
                          "ml-4 mt-2 flex flex-col gap-1.5 border-l pl-5",
                          dark ? "border-paper/15" : "border-ink/10",
                        )}
                      >
                        {bullet.sub.map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "text-[13px] leading-relaxed",
                              dark ? "text-paper/55" : "text-graphite-muted",
                            )}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
