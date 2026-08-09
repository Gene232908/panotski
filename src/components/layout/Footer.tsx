import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  brand,
  contactEmails,
  footerLinks,
  footerTagline,
  socialLinks,
} from "@/content/site";

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-surface-soft text-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt={`${brand.name} logo`}
              width={40}
              height={23}
              className="h-7 w-auto"
            />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight">
                {brand.name}
              </span>
              <span className="mt-1 text-[9px] font-medium uppercase tracking-eyebrow text-teal-700">
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
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink/40">
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
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink/40">
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
          <a
            href={`mailto:${contactEmails.general}`}
            className="mt-6 inline-block text-sm font-medium text-teal-700 hover:text-teal-600"
          >
            {contactEmails.general}
          </a>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink/45 sm:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-eyebrow">{brand.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
