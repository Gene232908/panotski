"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CreativeArtsModal } from "@/components/marketing/services/CreativeArtsModal";

// Compact tile for the Home "WHAT WE DO" grid (four per row on desktop).
//
// Client decision (post-Milestone-1 review): NO `+` control here. The home
// grid is an overview — the tile carries the photo and the service name and
// sends the visitor to the full entry. Disclosure belongs on the Services
// page, where the `+` reveals each service's bullets.
//
// Creative Arts Consulting is the one exception: it opens the in-page sample
// gallery (plan §5) rather than navigating, and must never link out to the
// partner's own site.

type ServiceTileProps = {
  service: Service;
};

// One card at every size: photo on top, name and arrow below. On phones the
// cards stack one per row (client decision — a normal downward scroll, no
// sideways rail and no compact list); the grid in WhatWeDoSection decides the
// column count.
const SHELL =
  // `w-full`: the Creative Arts tile is a <button>, which sizes to its
  // content rather than stretching like a link block — without it that card
  // rendered narrower than the other eleven on mobile. `relative` keeps its
  // `sr-only` label positioned inside the card.
  "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface text-left transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function TileBody({ service }: ServiceTileProps) {
  return (
    <>
      <ImagePlaceholder
        hint={service.imageHint}
        ratio="landscape"
        className="rounded-none border-0 border-b border-ink/10"
      />
      <div className="flex flex-1 items-start justify-between gap-4 p-5 sm:p-6">
        <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          {service.name}
        </h3>
        <ArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-ink/20 transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700 motion-reduce:transition-none"
          aria-hidden
        />
      </div>
    </>
  );
}

export function ServiceTile({ service }: ServiceTileProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryTriggerRef = useRef<HTMLButtonElement>(null);

  if (service.gallery) {
    return (
      <>
        <button
          ref={galleryTriggerRef}
          type="button"
          onClick={() => setGalleryOpen(true)}
          aria-haspopup="dialog"
          className={SHELL}
        >
          <TileBody service={service} />
          <span className="sr-only">View sample work for {service.name}</span>
        </button>

        <CreativeArtsModal
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          triggerRef={galleryTriggerRef}
        />
      </>
    );
  }

  return (
    <Link href={`/services#${service.anchor}`} className={SHELL}>
      <TileBody service={service} />
    </Link>
  );
}
