import { Play } from "lucide-react";
import { BrandText } from "@/components/ui/BrandMark";
import { cn } from "@/lib/utils";

// Video slot, sibling to <ImagePlaceholder>.
//
// With `src` set it is a real <video> element with native controls — nothing
// here re-implements play/pause/scrub, because the browser's own player is
// keyboard accessible, captions-aware and free.
//
// With `src` null it renders a designed stand-in that names the clip it is
// waiting for, exactly like the image slots elsewhere on the site (RULES.md
// §5). The play glyph in that state is a plain <span>, NOT a button: a control
// that looks pressable and does nothing is worse than an obvious placeholder,
// and the "00:00 / --:--" readout is there to say "no file yet" rather than to
// imitate a working timeline.
//
// To go live: drop the file in `public/` and set `video` on the content entry.

type VideoPlaceholderProps = {
  /** Path in `public/`, or null while the clip is outstanding. */
  src: string | null;
  /** Poster frame shown before playback. */
  poster?: string | null;
  /** Describes the clip this slot is waiting for. */
  hint: string;
  /** Accessible name for the player itself. */
  label: string;
  className?: string;
};

export function VideoPlaceholder({
  src,
  poster,
  hint,
  label,
  className,
}: VideoPlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-xl bg-ink",
          className,
        )}
      >
        {/* Captions: add a <track kind="captions"> here the moment the client
            supplies the .vtt alongside the clip — a testimonial is speech, so
            it is unusable without them for deaf visitors. */}
        <video
          src={src}
          poster={poster ?? undefined}
          controls
          preload="metadata"
          playsInline
          aria-label={label}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-ink p-5",
        className,
      )}
      role="img"
      aria-label={`Video placeholder: ${hint}`}
    >
      {/* Same diagonal hatch as <ImagePlaceholder>, so an outstanding asset
          looks the same wherever it appears on the site. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 11px)",
        }}
        aria-hidden
      />

      <span className="relative text-[10px] font-semibold uppercase tracking-eyebrow text-white/70">
        Video
      </span>

      {/* Scales down on narrow cards — at 390px the full-size glyph crowds the
          hint line directly beneath it. */}
      <span
        className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 sm:h-14 sm:w-14"
        aria-hidden
      >
        <Play
          className="ml-0.5 h-4 w-4 text-paper sm:h-5 sm:w-5"
          fill="currentColor"
          strokeWidth={0}
        />
      </span>

      <span className="relative flex flex-col gap-2">
        <span className="text-xs font-medium leading-snug text-white/75">
          <BrandText text={hint} tone="dark" />
        </span>
        {/* Deliberately inert and visibly empty — a stand-in for a timeline,
            not a fake one. */}
        <span className="flex items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-white/15" />
          <span className="text-[10px] font-semibold tabular-nums tracking-[0.14em] text-white/45">
            00:00 / --:--
          </span>
        </span>
      </span>
    </div>
  );
}
