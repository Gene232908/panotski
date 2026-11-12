import Image from "next/image";
import { Quote, X } from "lucide-react";
import { BrandText } from "@/components/ui/BrandMark";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { testimonialsContent, type Testimonial } from "@/content/home";

// The two faces of a testimonial card — the quote and the in-card video
// player — plus the small byline avatar phones use in place of the portrait
// column. Split out of TestimonialCarousel so that file stays about rotation
// and state; these are pure presentation.

export function QuoteView({ testimonial }: { testimonial: Testimonial }) {
  return (
    <>
      <Quote className="h-6 w-6 text-teal-700 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden />

      {/* RULES.md §4: a large statement is size + `font-light` + tight
          tracking. Never italic — the italic pull-quote is the template tell
          the client named. */}
      <p className="balance mt-5 text-[1.2rem] font-light leading-[1.5] tracking-[-0.02em] text-ink sm:mt-6 sm:text-2xl sm:leading-[1.45]">
        <BrandText text={testimonial.quote} />
      </p>

      <footer className="mt-6 border-t border-ink/10 pt-5 sm:mt-8 sm:pt-6">
        <div className="flex items-center gap-4">
          {/* Phones only — on desktop the full portrait sits beside the card. */}
          <Avatar testimonial={testimonial} />
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-tight text-ink">
              {testimonial.name}
            </p>
            <p className="mt-1 text-sm leading-snug text-graphite-muted sm:leading-relaxed">
              {testimonial.title}
            </p>
          </div>
        </div>
        <p className="mt-4 inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800">
          {testimonial.engagement}
        </p>
      </footer>
    </>
  );
}

// Small byline portrait for phones, where the big portrait column is hidden.
// Falls back to the client logo, then to initials, so the slot is never empty.
function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const src = testimonial.image ?? testimonial.logo;
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-50 text-sm font-semibold text-teal-800 ring-1 ring-ink/10 lg:hidden">
      {src ? (
        <Image
          src={src}
          alt={testimonial.image ? testimonial.imageAlt : testimonial.logoAlt}
          fill
          sizes="48px"
          className="object-cover"
        />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}

// The card's video state. Same padding, same card — only the contents change,
// so the player is framed exactly where the quote was.
export function VideoView({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold tracking-tight text-ink">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-graphite-muted">
            {testimonial.title}
          </p>
        </div>

        {/* A second way out, at the corner people reach for first. The button
            under the card does the same thing. */}
        <button
          type="button"
          onClick={onClose}
          aria-label={testimonialsContent.closeVideoLabel}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink transition-all duration-300 ease-premium hover:border-teal-700 hover:bg-teal-700 hover:text-paper active:scale-[0.97]"
        >
          <X className="h-4 w-4" aria-hidden strokeWidth={1.75} />
        </button>
      </div>

      <VideoPlaceholder
        src={testimonial.video}
        poster={testimonial.videoPoster}
        hint={testimonial.videoHint}
        label={`Video testimonial from ${testimonial.name}`}
      />

      <p className="mt-6 inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800">
        {testimonial.engagement}
      </p>
    </div>
  );
}
