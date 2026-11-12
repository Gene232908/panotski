import { heroContent } from "@/content/home";
import { cn } from "@/lib/utils";

// Editorial wipe entrance.
//
// The headline is REVEALED left to right rather than pushed up from below.
// A vertical mask-rise is the default kinetic-type move and reads as motion
// graphics; a horizontal wipe reads as typesetting — the line arrives as if
// it were being printed, which is the register this brand wants.
//
// The details that do the work (keyframes in globals.css → `.hero-wipe`):
//   • the clip travels slightly faster than the text drifts, so the line
//     appears to settle into place rather than slide in as a block;
//   • no blur. A defocus on display type at this size reads as a loading
//     glitch, and the wipe already supplies the reveal;
//   • the second line trails the first by a short beat;
//   • the accent word is wiped in white with its line, then settles into
//     teal (`.hero-accent`) — the last beat of the headline, so it is the
//     word the eye comes to rest on.
//
// CSS, not framer-motion: the animation starts on the first painted frame
// instead of after hydration. Reduced motion turns it off in globals.css.
// No hooks left, so this renders on the server.

// Per-line start, in ms. Arbitrary-value classes have to be literal strings
// for Tailwind to find them, hence a lookup rather than a computed value.
const LINE_DELAY = ["[--at:220ms]", "[--at:340ms]", "[--at:460ms]"] as const;

export function HeroHeadline() {
  const { headlineLines, accentWord, headline } = heroContent;

  return (
    <h1
      aria-label={headline}
      // Phones/tablet: sized to the screen width (12.5vw) so "Where ideas"
      // spans most of the line instead of sitting small in a big frame.
      // Desktop keeps the approved scale.
      className="mt-5 text-[clamp(2.9rem,12.5vw,4.5rem)] lg:mt-6 lg:text-[clamp(2.6rem,7.4vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-paper"
    >
      {headlineLines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span
            className={cn(
              "hero-wipe block will-change-[clip-path,transform]",
              LINE_DELAY[Math.min(index, LINE_DELAY.length - 1)],
            )}
            aria-hidden
          >
            {line.split(" ").map((word) => {
              const isAccent = word.toLowerCase() === accentWord.toLowerCase();
              return (
                <span
                  key={word}
                  className={cn(
                    // Weight contrast within one family, not an italic
                    // serif — see RULES.md § Styling.
                    // Always the logo green (#346A5C) — brand-mandatory, never a
                    // lighter tint. Below `lg` it is set BOLD — heavier than
                    // the semibold headline — so the deep green has a thick
                    // stroke over the dark backdrop and reads as the line's
                    // payoff. Desktop keeps the approved light weight.
                    isAccent &&
                      "hero-accent font-bold text-teal-700 [--at:820ms] lg:font-light",
                  )}
                >
                  {word}{" "}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
