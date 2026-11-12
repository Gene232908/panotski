import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { brand, footerLinks, footerTagline, socialLinks } from "@/content/site";

// Plan §11: LinkedIn is the only active social icon. Facebook, Meta, TikTok
// and X/Twitter were removed by client decision. The email and response-time
// blocks were removed from the Contact page (§10.4) and must not reappear
// here as repetition.
const socialIcons = {
  LinkedIn: Linkedin,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-surface-soft text-ink">
      {/* Phones: the brand block spans the row, and Navigate / Legal sit side
          by side beneath it instead of stacking into a long column. */}
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt={`${brand.name} logo`}
              width={40}
              height={23}
              className="h-7 w-auto"
            />
            {/* One dark plate carries the whole lockup. The tagline has to
                read white to match the nav, and white needs a dark ground —
                so the plate wraps both lines instead of the wordmark alone.
                With the ground supplied here, BrandMark uses its dark tone
                and skips its own chip. */}
            <span className="flex flex-col gap-1 rounded-lg bg-ink px-2.5 py-1.5 leading-none">
              <BrandMark
                as="strong"
                tone="dark"
                className="text-[15px] font-bold tracking-tight"
              />
              <span className="text-[9px] font-medium uppercase tracking-eyebrow text-paper">
                {brand.tagline}
              </span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-graphite-muted">
            {footerTagline}
          </p>

          <div className="flex gap-2.5 pt-1">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-graphite-muted transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-teal-700 hover:text-teal-700"
                >
                  <Icon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink/60">
            Navigate
          </p>
          <ul className="flex flex-col gap-3">
            {footerLinks.pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm text-graphite-soft transition-colors duration-200 hover:text-teal-700"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink/60">
            Legal
          </p>
          <ul className="flex flex-col gap-3">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-graphite-soft transition-colors duration-200 hover:text-teal-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        {/* Plan §13 contrast: ink/45 measured 3.34:1 on the soft surface —
            below the 4.5:1 needed at this size. */}
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink/65 sm:flex-row">
          <p>
            © {year} <BrandMark variant="inline" /> {brand.tagline}. All rights
            reserved.
          </p>
          <p className="uppercase tracking-eyebrow">{brand.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
