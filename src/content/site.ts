// Site-wide brand, navigation, and footer data. Edit copy here — the
// components that render this file should almost never need to change.

export const brand = {
  name: "CREServices",
  tagline: "Beyond Strategy",
  domain: "cresvcs.com",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

// Order is intentional: Contact Us, About, Services, Home reads as the
// C.A.S.H. navigation concept agreed with the client. Do not reorder.
export const navItems: NavItem[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Home", href: "/" },
];

export const primaryCta = {
  label: "Book a Consultation",
  href: "/contact",
} as const;

export const footerTagline =
  "A strategic and structured service consultancy provider specializing in one core mission: turning ideas into opportunities.";

export const footerLinks = {
  legal: [
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
    { label: "Privacy & Cookie Policy", href: "/privacy-policy" },
  ],
  pages: navItems,
};

// Milestone 1 revision §10.3 / §11: LinkedIn is the ONLY social link for now.
// Facebook, Meta, Instagram, TikTok and X/Twitter were removed by explicit
// client decision — do not re-add them. WhatsApp is handled separately as a
// contact channel (see `content/contact.ts`), not as a social icon.
// TODO(client): confirm the real LinkedIn profile URL before launch.
export const socialLinks = [{ label: "LinkedIn", href: "#" }] as const;

export const contactEmails = {
  general: "cres.solidum@cresvcs.com",
  secondary: "roge04.carpiojr@gmail.com",
} as const;
