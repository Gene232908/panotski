import { ImageIcon } from "lucide-react";
import { BrandText } from "@/components/ui/BrandMark";
import { cn } from "@/lib/utils";

// Designed stand-in for photography the client still needs to supply.
// It reads as an intentional part of the layout (not a broken image) and
// states exactly which photo belongs in the slot. Replace with <Image />
// once approved CREServices photos are available — see RULES.md § Images.

type ImagePlaceholderProps = {
  hint: string;
  className?: string;
  tone?: "light" | "dark";
  ratio?: "portrait" | "landscape" | "square" | "wide" | "fill";
};

const ratioClasses: Record<NonNullable<ImagePlaceholderProps["ratio"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  fill: "h-full",
};

export function ImagePlaceholder({
  hint,
  className,
  tone = "light",
  ratio = "landscape",
}: ImagePlaceholderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "group relative flex items-end overflow-hidden rounded-2xl border",
        ratioClasses[ratio],
        isDark ? "border-white/12 bg-white/[0.04]" : "border-ink/10 bg-surface-muted",
        className,
      )}
      role="img"
      aria-label={`Image placeholder: ${hint}`}
    >
      {/* Diagonal hatch keeps the slot visually distinct from a real photo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${
            isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.035)"
          } 0px, ${
            isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.035)"
          } 1px, transparent 1px, transparent 11px)`,
        }}
        aria-hidden
      />

      <div className="relative flex w-full items-start gap-3 p-5">
        <span
          className={cn(
            "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isDark ? "bg-white/10 text-white/70" : "bg-white text-teal-700 shadow-sm",
          )}
        >
          <ImageIcon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
        </span>
        <span className="flex flex-col gap-0.5">
          <span
            className={cn(
              // Plan §13 contrast: at 10px this label must clear 4.5:1. The
              // previous ink/40 measured 2.8:1 on the muted surface and
              // white/45 was similarly thin on the dark band.
              "text-[10px] font-semibold uppercase tracking-eyebrow",
              isDark ? "text-white/70" : "text-graphite-soft",
            )}
          >
            Image
          </span>
          <span
            className={cn(
              "text-xs font-medium leading-snug",
              isDark ? "text-white/75" : "text-ink/65",
            )}
          >
            {/* The hint is visible on screen until a real photo replaces it,
                so a CREServices inside it needs the same split as any other
                visible wordmark (plan §12). */}
            <BrandText text={hint} tone={isDark ? "dark" : "light"} />
          </span>
        </span>
      </div>
    </div>
  );
}
