import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationForm } from "@/components/marketing/contact/ConsultationForm";
import { ContactInfoSection } from "@/components/marketing/contact/ContactInfoSection";
import { ContactVisual } from "@/components/marketing/contact/ContactVisual";
import { contactHeroContent } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactHeroContent.subtitle,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        headline={contactHeroContent.headline}
        accent={contactHeroContent.headlineAccent}
        subtitle={contactHeroContent.subtitle}
        imageHint={contactHeroContent.imageHint}
      />

      {/* THE ONLY DARK BAND ON THIS PAGE — client instruction. The hero above
          and the footer below stay light; going dark here and nowhere else is
          what makes the artwork read as the lit thing on the page.

          `ink` is #000000, the same black the artwork is drawn on, so the
          image has no visible edge against the band. Changing this tone puts a
          rectangle back around it — see ContactVisual.tsx. */}
      {/* `overflow-hidden` is load-bearing, not decoration: the panel's teal
          bloom is inset -8 (32px) and the mobile gutter is only 24px, so
          without it the bloom pushes 8px past the viewport and the whole page
          scrolls sideways. */}
      <Section tone="ink" className="overflow-hidden">
        {/* Deliberately NOT wrapped in <Container>. Every other band on the
            site is capped at the 1320px content width, but this one is two
            true halves of the viewport: the artwork has to run to the right
            edge of the window (client instruction), and a max-width would stop
            it short. The left half brings its own padding and centres the form
            inside itself, so the copy still sits on the same optical grid as
            the rest of the site. */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-0">
          {/* LEFT HALF — form centred in its own 50%.
              The panel is DARK, not white. A white card on #000 read as a
              cut-out pasted over the band, so the form now shares the band's
              ground: a 4%-white wash under a hairline border, which on black
              is barely a shape and yet still frames the fields. Contrast is
              not traded away for it — every label and value is `paper` on
              near-black. */}
          <div className="flex justify-center px-6 sm:px-10">
            <Reveal className="w-full max-w-[34rem]">
              <div className="relative">
                {/* Sits BEHIND the panel and shows only as a rim, so the form
                    looks lit by the same source as the artwork opposite rather
                    than stuck on top of the band. Brand teal, not a neutral
                    glow — that is what ties the two halves together. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-teal-600/20 blur-[80px]"
                />

                {/* ONE panel, not two stacked cards: the form on the panel
                    surface, the assurance as a quieter footer below a hairline.
                    `overflow-hidden` lets the footer take the panel's bottom
                    corners without restating the radius.

                    The surface is OPAQUE, not a translucent wash. Left
                    see-through, the bloom behind it came up through the whole
                    panel and every field read as a green box — the tint has to
                    stay at the RIM, where it does its job, and off the fields,
                    where it just looks like a colour cast. #0a0c0c is barely a
                    lift off #000, so the panel is still part of the band. */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c0c]">
                  <div className="p-7 sm:p-10">
                    <ConsultationForm tone="dark" />
                  </div>

                  <div className="border-t border-white/[0.08] bg-white/[0.02] px-7 py-5 sm:px-10">
                    <ContactInfoSection variant="inline" tone="dark" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT HALF — still no LEFT padding, so the artwork keeps running
              out of the middle of the band, but the client asked for 5rem of
              breathing room before the window edge. Applied from `lg` up only:
              below that the grid is a single column and the same rule would
              pull the artwork off-centre. It is square, so it grows taller as
              this half widens; `lg:items-center` keeps it level with the form
              rather than riding high. */}
          <Reveal delay={0.18} blur={0} className="lg:pr-20">
            <ContactVisual />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
