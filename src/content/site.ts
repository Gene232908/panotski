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

// TODO(client): confirm real profile URLs before launch — placeholders only.
export const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
] as const;

export const contactEmails = {
  general: "cres.solidum@cresvcs.com",
  secondary: "roge04.carpiojr@gmail.com",
} as const;
