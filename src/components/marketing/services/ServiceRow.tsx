"use client";

import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import type { Service } from "@/content/services";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Disclosure } from "@/components/ui/Disclosure";
import { CreativeArtsModal } from "@/components/marketing/services/CreativeArtsModal";
import { cn } from "@/lib/utils";

// Full service entry: title + description always visible, with the detailed
// bullet list behind a `+` control.
//
// Client decision (post-Milestone-1 review): the `+` reveals ONLY the bullets.
// The description under each title stays visible at all times — putting it
// behind the control hid the thing the visitor came to read. Services with no
// bullets therefore have no `+` at all.
//
// Two things alternate down the page, independently:
//   • the band tone, ink ↔ white — the client asked for this and says the
//     alternation is meaningful, so don't flatten it (RULES.md § Styling);
//   • the image side, so the long list doesn't march in one direction.

// Bullet count past which the list scrolls in place rather than stretching the
// row. Six fits comfortably beside the image at every breakpoint.
const SCROLL_AFTER = 6;

// Most "what's included" lines are written as "Deliverable — plain explanation"
// so a client reading the page learns what they actually get. At that length a
// flat paragraph is hard to skim, so the part before the FIRST em dash is set
// apart as a lead-in. Split on the first one only: several explanations use em
// dashes of their own further along the sentence.
//
// Bullets with no em dash (Car Rental Advisory, Online Training) fall through
// untouched and render exactly as before.
function splitBullet(text: string): { lead: string; rest: string } | null {
  const at = text.indexOf(" — ");
  if (at === -1) return null;
  return { lead: text.slice(0, at), rest: text.slice(at + 3) };
}

type ServiceRowProps = {
  service: Service;
  index: number;
};

export function ServiceRow({ service, index }: ServiceRowProps) {
  // `index` drives layout rhythm only — it is never printed as a counter.
  const dark = index % 2 === 0;
  const imageFirst = index % 2 === 1;

  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryTriggerRef = useRef<HTMLButtonElement>(null);

  // A few services carry a long "what's included" list. Left alone, those rows
  // would grow far taller than the neighbouring ones and break the even rhythm
  // of the page, so past a certain length the list scrolls INSIDE a fixed box
  // instead. The section's own padding and proportions are untouched either
  // way — only the list is capped. Short lists keep the natural height they
  // have always had.
  const scrollable = service.bullets.length > SCROLL_AFTER;

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

          <Reveal className={cn("group", imageFirst ? "lg:order-2" : "lg:order-1")}>
            <h2
              className={cn(
                "balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-3xl lg:text-[2.4rem]",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {service.name}
            </h2>

            {/* Always visible — never behind the disclosure. */}
            <p
              className={cn(
                "mt-5 text-base leading-[1.7] sm:text-[17px]",
                dark ? "text-paper/75" : "text-graphite-soft",
              )}
            >
              {service.description}
            </p>

            {service.bullets.length > 0 ? (
              <Disclosure
                className={cn(
                  "mt-8 border-t pt-6",
                  dark ? "border-paper/12" : "border-ink/10",
                )}
                controlLabel={`what's included in ${service.name}`}
                tone={dark ? "dark" : "light"}
                label={
                  <span
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-eyebrow",
                      dark ? "text-paper/70" : "text-graphite-soft",
                    )}
                  >
                    What&rsquo;s included
                  </span>
                }
              >
                <ul
                  className={cn(
                    "flex flex-col gap-3 pt-5",
                    scrollable &&
                      // `overscroll-contain` keeps a flick inside the list from
                      // scrolling the whole page once it hits the end.
                      "max-h-[21rem] overflow-y-auto overscroll-contain pr-4 [scrollbar-width:thin]",
                    scrollable &&
                      (dark
                        ? "[scrollbar-color:rgba(255,255,255,0.28)_transparent]"
                        : "[scrollbar-color:rgba(17,24,24,0.22)_transparent]"),
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
                            dark ? "bg-teal-700" : "bg-teal-700",
                          )}
                          aria-hidden
                        />
                        {(() => {
                          const parts = splitBullet(bullet.text);
                          if (!parts) return <span>{bullet.text}</span>;
                          return (
                            <span>
                              <strong
                                className={cn(
                                  "font-semibold",
                                  dark ? "text-paper" : "text-ink",
                                )}
                              >
                                {parts.lead}
                              </strong>
                              {" — "}
                              {parts.rest}
                            </span>
                          );
                        })()}
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
              </Disclosure>
            ) : null}

            {service.gallery ? (
              // Creative Arts has no bullets, so it gets no `+`. It opens the
              // in-page sample gallery instead (plan §5) — never a link out to
              // the partner's own site.
              <button
                ref={galleryTriggerRef}
                type="button"
                onClick={() => setGalleryOpen(true)}
                aria-haspopup="dialog"
                className={cn(
                  "mt-8 inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-premium motion-reduce:transition-none",
                  dark
                    ? "border-paper/25 text-paper hover:border-teal-700 hover:text-teal-700"
                    : "border-ink/15 text-ink hover:border-teal-700 hover:text-teal-700",
                )}
              >
                <ImageIcon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                View sample work
              </button>
            ) : null}
          </Reveal>
        </div>
      </div>

      {service.gallery ? (
        <CreativeArtsModal
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          triggerRef={galleryTriggerRef}
        />
      ) : null}
    </section>
  );
}
