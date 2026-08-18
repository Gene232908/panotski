import { ShieldCheck } from "lucide-react";
import { BrandText } from "@/components/ui/BrandMark";
import { contactAssurance } from "@/content/contact";

// Right-hand column of the Contact page.
//
// Plan §10.4 removed the Email Us block, the Response Time block and the
// "1–2 business days" copy as repetition — the form already tells the visitor
// what happens next.
//
// The WhatsApp card (§10.3) and the roadmap/maze visual (§10.4) were removed
// afterwards by client decision in the post-Milestone-1 review, leaving only
// the assurance below. Don't reinstate either without a new instruction.
//
// Two shapes:
//   card   — standalone, with its own border and surface.
//   inline — no chrome, for use as the footer strip INSIDE the contact panel,
//            which supplies the surface and the divider itself. Two separate
//            blocks floating on the black band read as unfinished; one panel
//            with a quieter footer reads as designed.

type ContactInfoSectionProps = {
  variant?: "card" | "inline";
  /** `dark` for the ink band — see the Contact page. */
  tone?: "light" | "dark";
};

export function ContactInfoSection({
  variant = "card",
  tone = "light",
}: ContactInfoSectionProps) {
  const dark = tone === "dark";

  if (variant === "inline") {
    return (
      <div className="flex items-start gap-3.5">
        <span
          className={
            dark
              ? "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-300/10 text-teal-300"
              : "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700"
          }
        >
          <ShieldCheck className="h-4 w-4" aria-hidden strokeWidth={1.75} />
        </span>
        <div>
          <h3
            className={
              dark
                ? "text-[13px] font-bold tracking-tight text-paper"
                : "text-[13px] font-bold tracking-tight text-ink"
            }
          >
            {contactAssurance.title}
          </h3>
          <p
            className={
              dark
                ? "mt-1 text-[13px] leading-relaxed text-paper/55"
                : "mt-1 text-[13px] leading-relaxed text-graphite-muted"
            }
          >
            <BrandText text={contactAssurance.description} tone={tone} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-6">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <ShieldCheck className="h-[18px] w-[18px]" aria-hidden strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 text-[15px] font-bold tracking-tight text-ink">
        {contactAssurance.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-graphite-muted">
        <BrandText text={contactAssurance.description} />
      </p>
    </div>
  );
}
