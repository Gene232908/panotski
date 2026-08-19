"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Quote, X } from "lucide-react";
import { BrandText } from "@/components/ui/BrandMark";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PortraitReveal } from "@/components/ui/PortraitReveal";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { cn } from "@/lib/utils";
import { testimonialsContent, type Testimonial } from "@/content/home";

// One reference at a time: portrait on the left, quote card overlapping it.
//
// Adapted from a generic light/dark "profile card" carousel. Three things were
// rebuilt rather than kept, all for RULES.md reasons:
//
//   • The `dark:` variant pairs are gone. Tailwind's default dark mode is
//     `media`, so those classes would have fired on a visitor's OS setting and
//     dropped a dark card into a light-dominant band nobody asked to darken
//     (§4). Surfaces come from the brand tokens instead.
//   • The GitHub / X / YouTube row is gone. Developer socials say nothing
//     about a service consultancy's references; the slot now carries the
//     engagement the quote speaks to, which is what a prospect is scanning for.
//   • Portraits render through <ImagePlaceholder> until the client supplies
//     approved headshots (§5). Set `image` on the content entry and the slot
//     becomes <PortraitReveal>: the client logo at rest, the portrait on
//     hover — no edit here.
//
// The card overlaps the portrait by design: the two planes are what make the
// composition read as editorial rather than as a boxed widget. Below `lg` the
// overlap is dropped and the card sits under the portrait, because at that
// width an overlap only eats into the quote.
//
// VIDEO: the clip plays INSIDE the card — the quote view is replaced in place,
// never a lightbox or a new page. The card is the frame either way, so the
// composition never breaks and the portrait beside it stays put.
//
// AUTOPLAY: advances every 4s, but only while every one of these holds. Each
// is a case where advancing would take something away from the visitor rather
// than move them along:
//
//   in view      — an IntersectionObserver gates it, so a carousel two
//                  sections up is not burning through its references at
//                  someone's back. Scroll away and it holds; scroll back and
//                  it resumes on a full interval, not a stub of one.
//   tab visible  — same argument, other tab.
//   quote mode   — the clip plays INSIDE the card. Rotating the card out from
//                  under a video is the worst thing this could do, so opening
//                  one stops the timer and closing it starts it again. Leave
//                  one open and scroll away and it closes itself.
//   portrait not — hovering the portrait holds the reveal open; PortraitReveal
//   hovered        runs 1.4s and a 4s tick would cut its own animation short.
//                  Hover pause is scoped to that one slot, NOT the whole band
//                  — see the handlers below for why.
//   no keyboard  — `:focus-visible` only. A click focuses the button it hit;
//   focus          treating that as engagement means closing the video would
//                  never hand autoplay back.
//   not paused   — the explicit control below. WCAG 2.2.2 wants a way to stop
//                  content that moves on its own for more than 5s, and "hover
//                  somewhere and don't move" is not a mechanism.
//   full motion  — `prefers-reduced-motion` turns autoplay off entirely.
//                  Someone who asked for less movement did not mean "less,
//                  except the thing that replaces the paragraph you are on".
//
// The timer is a setTimeout re-armed per index, not a repeating interval:
// pressing an arrow at 3.9s restarts the countdown instead of leaving the next
// slide 100ms away.

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Dwell per reference.
 *
 * This is the HOLD, not the cycle. The real gap between two quotes is this
 * plus the crossfade, and `mode="wait"` makes that crossfade sequential —
 * the outgoing quote finishes leaving before the incoming one starts. At the
 * old 0.45s each that was 0.9s of dead frame on top of the dwell, which read
 * as a stall: the countdown bar hit full and then nothing happened for most
 * of a second. The fade is 0.3s each now, so the cycle is 4.6s, not 5.9s.
 */
const AUTOPLAY_MS = 4000;

type CardMode = "quote" | "video";

export type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
  /** Accessible name for the carousel region. */
  label?: string;
  className?: string;
};

export function TestimonialCarousel({
  testimonials,
  label = "Client testimonials",
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<CardMode>("quote");
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  // Starts false: the section sits well below the fold, and the observer
  // reports on mount anyway. Assuming `true` would spend the first interval
  // before anyone had it on screen.
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = testimonials.length;
  const showingVideo = mode === "video";

  // 0.4 rather than "any pixel": a strip of the section clipping the viewport
  // is not someone reading it.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Scrolling out of the section closes the player, in real time. A clip left
  // running behind a visitor is the same problem autoplay has, only louder —
  // and coming back to a half-watched video sitting where a quote should be
  // is a worse resume than simply returning to the reference. `engaged` is
  // cleared with it: the pointer cannot be resting on something that is no
  // longer on screen, and a stale `true` would hold the timer off after the
  // visitor scrolled back.
  useEffect(() => {
    if (inView) return;
    setMode("quote");
    setEngaged(false);
  }, [inView]);

  const playing =
    count > 1 &&
    inView &&
    tabVisible &&
    !showingVideo &&
    !engaged &&
    !userPaused &&
    !reduceMotion;

  useEffect(() => {
    if (!playing) return;

    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
    // `index` is a dependency on purpose — it re-arms the timer for the slide
    // now showing rather than letting one countdown span two of them.
  }, [playing, index, count]);

  // Moving to another person always returns the card to their quote. Leaving
  // it on "video" would drop the next visitor straight into a second player
  // they never asked to open — and would keep an <video> element mounted for
  // someone whose clip they were not watching.
  const goTo = (next: number) => {
    setIndex((next + count) % count);
    setMode("quote");
  };

  // `noUncheckedIndexedAccess` — an empty list is a content mistake, not a
  // crash: render nothing rather than throwing during the server render.
  // Below every hook, so hook order never changes between renders.
  const active = testimonials[index];
  if (!active) return null;

  // Crossfade only. No slide, no spring: the quote is the content, and text
  // sliding sideways under a reader is not a feature. Blur-and-settle matches
  // every other transition on the site (§6).
  const fade = {
    initial: { opacity: 0, filter: reduceMotion ? "none" : "blur(6px)" },
    animate: { opacity: 1, filter: "none" },
    exit: { opacity: 0, filter: reduceMotion ? "none" : "blur(6px)" },
    transition: { duration: reduceMotion ? 0 : 0.3, ease: EASE },
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      // Hover pause lives on the PORTRAIT only, not on the whole band. It is
      // there so a 1.4s reveal is not cut short by a 4s tick — that is the
      // one place a resting pointer means "hold this". Anywhere else, the
      // cursor is simply parked where it was left, and pausing on it is what
      // made closing the video look broken: the click leaves the pointer on
      // the card, so autoplay would never restart. WCAG 2.2.2 is covered by
      // the pause control, not by a hover.
      //
      // `:focus-visible`, not `:focus` — clicking a button focuses it, and a
      // plain focus check would hold the timer off until the visitor clicked
      // somewhere else entirely. Keyboard focus still pauses; a click does
      // not. React's focus events bubble, so one handler covers every
      // control inside.
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) setEngaged(true);
      }}
      // `relatedTarget` guard: tabbing from one arrow to the next fires blur
      // before focus, and without this the timer would re-arm for a frame in
      // between — enough to flash the countdown bar back to zero.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setEngaged(false);
        }
      }}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-0">
        {/* Portrait. Mouse events, not pointer: `pointerenter` fires on a
            touch tap and then never leaves, which would strand autoplay off
            after one tap. */}
        <div
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`portrait-${index}`} {...fade}>
              {active.image ? (
                // Logo at rest, portrait on hover — the timing lives in
                // PortraitReveal. Entries with no `logo` fall through to the
                // plain photo inside it, so this stays one slot either way.
                <PortraitReveal
                  image={active.image}
                  imageAlt={active.imageAlt}
                  logo={active.logo}
                  logoAlt={active.logoAlt}
                />
              ) : (
                <ImagePlaceholder hint={active.imageHint} ratio="portrait" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quote card. The negative margin only applies from `lg`, where there
            is room for the overlap to read as depth rather than a collision. */}
        <div className="relative z-10 lg:-ml-20 xl:-ml-28">
          {/* `layout` on the shell, not on the content: quote and video are
              different heights, so the card resizes between them instead of
              snapping. Tween, not the default spring — RULES.md §6 rules out
              bounce on content. */}
          <motion.div
            layout
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-surface p-8 shadow-lift sm:p-10 lg:p-12"
          >
            {/* aria-live, not a focus jump: the content replaces itself in
                place, so a screen reader hears the new state without being
                moved out of the section. */}
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                {showingVideo ? (
                  <motion.div key={`video-${index}`} {...fade}>
                    <VideoView
                      testimonial={active}
                      onClose={() => setMode("quote")}
                    />
                  </motion.div>
                ) : (
                  <motion.blockquote key={`quote-${index}`} {...fade}>
                    <QuoteView testimonial={active} />
                  </motion.blockquote>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* The trigger sits just under the card, on the card's own column —
              close enough to read as part of it, outside it so the card's
              inside is only ever the quote or the player. Hidden entirely for
              anyone with no clip (`hasVideo: false`). */}
          {active.hasVideo ? (
            <div className="mt-5 flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => setMode(showingVideo ? "quote" : "video")}
                aria-expanded={showingVideo}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/10 bg-surface px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-soft transition-all duration-300 ease-premium hover:border-teal-700 hover:text-teal-700 active:scale-[0.97]"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-paper transition-colors duration-300 ease-premium">
                  {showingVideo ? (
                    <X className="h-3.5 w-3.5" aria-hidden strokeWidth={2.25} />
                  ) : (
                    <Play
                      className="ml-px h-3 w-3"
                      aria-hidden
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}
                </span>
                {showingVideo
                  ? testimonialsContent.backToQuoteLabel
                  : testimonialsContent.watchVideoLabel}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-5 lg:mt-12 lg:justify-end lg:pr-2">
        <p className="text-xs font-semibold tabular-nums tracking-[0.18em] text-graphite-muted">
          {String(index + 1).padStart(2, "0")}
          <span className="text-ink/25"> / </span>
          {String(count).padStart(2, "0")}
        </p>

        {/* Progress ticks, not controls — the arrows and the counter already
            carry the interaction, so these stay out of the tab order. The
            active tick doubles as the autoplay countdown: it fills over the
            interval, so the advance is telegraphed before it happens instead
            of arriving on top of the reader. Held, it sits filled — a bar
            frozen part-way reads as a stall rather than a pause. */}
        <div className="flex items-center gap-2" aria-hidden>
          {testimonials.map((testimonial, dotIndex) => (
            <span
              key={`${testimonial.name}-${dotIndex}`}
              className={cn(
                "relative h-[3px] overflow-hidden rounded-full bg-ink/15 transition-all duration-500 ease-premium",
                dotIndex === index ? "w-8" : "w-4",
              )}
            >
              {dotIndex === index ? (
                <motion.span
                  // Re-keyed whenever the countdown restarts, which is what
                  // makes a resume start the fill over rather than continue a
                  // bar whose timer no longer exists.
                  key={`fill-${index}-${playing}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-teal-700"
                  initial={{ width: playing ? "0%" : "100%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: playing ? AUTOPLAY_MS / 1000 : 0,
                    ease: "linear",
                  }}
                />
              ) : null}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* WCAG 2.2.2. Hidden where there is nothing to pause — a single
              reference never rotates, and neither does a reduced-motion
              session. */}
          {count > 1 && !reduceMotion ? (
            <CarouselButton
              onClick={() => setUserPaused((paused) => !paused)}
              label={userPaused ? "Resume autoplay" : "Pause autoplay"}
              pressed={userPaused}
            >
              {userPaused ? (
                <Play
                  className="ml-px h-3.5 w-3.5"
                  aria-hidden
                  fill="currentColor"
                  strokeWidth={0}
                />
              ) : (
                <Pause
                  className="h-3.5 w-3.5"
                  aria-hidden
                  fill="currentColor"
                  strokeWidth={0}
                />
              )}
            </CarouselButton>
          ) : null}

          <CarouselButton onClick={() => goTo(index - 1)} label="Previous testimonial">
            <ArrowLeft className="h-4 w-4" aria-hidden strokeWidth={1.75} />
          </CarouselButton>
          <CarouselButton onClick={() => goTo(index + 1)} label="Next testimonial">
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.75} />
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

function QuoteView({ testimonial }: { testimonial: Testimonial }) {
  return (
    <>
      <Quote className="h-7 w-7 text-teal-700" strokeWidth={1.5} aria-hidden />

      {/* RULES.md §4: a large statement is size + `font-light` + tight
          tracking. Never italic — the italic pull-quote is the template tell
          the client named. */}
      <p className="balance mt-6 text-xl font-light leading-[1.5] tracking-[-0.02em] text-ink sm:text-2xl sm:leading-[1.45]">
        <BrandText text={testimonial.quote} />
      </p>

      <footer className="mt-8 border-t border-ink/10 pt-6">
        <p className="text-base font-semibold tracking-tight text-ink">
          {testimonial.name}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-graphite-muted">
          {testimonial.title}
        </p>
        <p className="mt-4 inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800">
          {testimonial.engagement}
        </p>
      </footer>
    </>
  );
}

// The card's video state. Same padding, same card — only the contents change,
// so the player is framed exactly where the quote was.
function VideoView({
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

// `active:scale-[0.97]` is the site-wide press state (RULES.md §5a), so these
// controls feel identical to the hero actions.
function CarouselButton({
  onClick,
  label,
  children,
  pressed,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  /** Toggle state, for the pause control. Omit on a plain action. */
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-surface text-ink transition-all duration-300 ease-premium hover:border-teal-700 hover:bg-teal-700 hover:text-paper active:scale-[0.97]"
    >
      {children}
    </button>
  );
}
