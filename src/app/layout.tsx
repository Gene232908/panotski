import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { brand } from "@/content/site";
import "./globals.css";

// ONE family, used properly: Archivo.
//
// A compact editorial grotesque with real character — high x-height, tight
// apertures, an industrial edge that reads as serious rather than trendy.
// It carries display and body alike across its 100–900 range.
//
// Deliberately NOT used, and don't reintroduce them (see RULES.md § Styling):
// Inter, Plus Jakarta Sans, Poppins, DM Sans, Space Grotesk — and above all
// no italic-serif accent face (Playfair, Cormorant, Fraunces, Instrument
// Serif). A bold sans headline with one italic serif word is the single
// most recognisable tell of a generated template. Hierarchy here comes from
// weight, size, tracking and colour within one family, which is how a real
// type system is built.

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "CREServices is a strategic and structured service consultancy provider specializing in one core mission: turning ideas into opportunities.",
  icons: {
    icon: "/logo.svg",
  },
  metadataBase: new URL("https://cresvcs.com"),
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
