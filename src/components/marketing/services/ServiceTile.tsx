import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Compact tile used in the Home page "WHAT WE DO" grid: image slot + the
// service name exactly as written on the live home page. The icon chips
// were removed at the client's request — the photograph identifies the
// service, so a small glyph beside it was redundant decoration.

type ServiceTileProps = {
  service: Service;
};

export function ServiceTile({ service }: ServiceTileProps) {
  return (
    <Link
      href={`/services#${service.anchor}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-lift"
    >
      <ImagePlaceholder
        hint={service.imageHint}
        ratio="landscape"
        className="rounded-none border-0 border-b border-ink/10"
      />

      <div className="flex flex-1 items-start justify-between gap-4 p-6">
        <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          {service.homeName}
        </h3>
        <ArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-ink/20 transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700"
          aria-hidden
        />
      </div>
    </Link>
  );
}
