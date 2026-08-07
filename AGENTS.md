# AGENTS.md — CREServices Website

Orientation for any agent (human or AI) working in this repository. Read
this before touching code. Read [RULES.md](./RULES.md) before writing any
component — it's the enforced rulebook, this file is the map.

## What this project is

The CREServices ("Beyond Strategy") corporate website, rebuilt from a
Hostinger website-builder site into a custom Next.js app, per
`CREServices_WebsiteEnhancement.docx`. Scope: a four-page marketing site
(Home, Services, About, Contact) with a consultation-booking form, plus a
private admin dashboard for managing incoming consultation requests.

Out of scope (explicitly, per the proposal): car-rental reservations,
fleet management, rental payments/agreements — those are separate
projects.

## Tech stack

| Layer      | Choice                                   | Why                                                   |
| ---------- | ----------------------------------------- | ------------------------------------------------------ |
| Framework  | Next.js 15 (App Router) + TypeScript      | Required by the proposal (§6 "Why Next.js")             |
| Styling    | Tailwind CSS                              | Fast, token-driven, matches the 500-line component rule |
| Motion     | Framer Motion                             | Scroll reveals, mobile nav transitions                  |
| Forms      | react-hook-form + zod                     | Client + server validation from one schema               |
| Database   | Prisma + SQLite (dev)                     | Zero-setup locally; swap `DATABASE_URL` for Postgres in production |
| Admin auth | Credentials (bcrypt) + JWT cookie (jose)  | No third-party auth vendor needed for a single-admin dashboard |
| Email      | Resend (optional, env-gated)              | Consultation notifications; booking still saves without it |
| Icons      | lucide-react                              | Consistent, tree-shakeable service icons                |

## Folder map

```
src/
  app/
    (marketing)/          Public site — has Header + Footer via its own layout.tsx
      page.tsx             Home
      services/page.tsx
      about/page.tsx
      contact/page.tsx
      terms-and-conditions/page.tsx
      privacy-policy/page.tsx
    admin/
      login/page.tsx       Public (middleware-excluded)
      (dashboard)/         Protected — has its own AdminTopbar shell
        layout.tsx          Re-checks session server-side, redirects if absent
        page.tsx            Redirects to /consultations
        consultations/page.tsx
    api/
      consultations/route.ts        POST — public booking submission
      admin/login|logout/route.ts   Session cookie issuance/clearing
      admin/consultations/route.ts  GET (list/filter) + PATCH (status), session-gated
    layout.tsx             Bare root layout — fonts + <html>/<body> only, no chrome
    globals.css
  components/
    ui/          Generic primitives — Section (tone bands), Reveal, AnimatedText,
                 ImagePlaceholder, Eyebrow, Input/Select/Textarea, Container
    layout/      Header (floating nav pill), MobileNav, Footer, CashNavLabel
    marketing/   Page-specific sections, grouped by page (home/, services/, about/, contact/, legal/)
    admin/       Dashboard-only components
  content/       ALL copy lives here as typed data — see RULES.md § Content Fidelity
  lib/           prisma.ts, auth.ts, session.ts (edge-safe JWT), email.ts, validation.ts, utils.ts
  types/         Shared TS types (consultation.ts)
  middleware.ts  Protects /admin/* except /admin/login
prisma/
  schema.prisma  Consultation + AdminUser models
  seed.ts        Creates one AdminUser from ADMIN_EMAIL / ADMIN_PASSWORD env vars
```

## Running locally

```bash
npm install
cp .env.example .env        # then fill in SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run db:push              # creates prisma/dev.db (SQLite)
npm run db:seed              # seeds the admin user from .env
npm run dev
```

Visit `/` for the public site, `/admin/login` for the dashboard (use the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`).

## Brand & design reference

- Colors: `#000000` (ink), `#f5f5f6` (paper / `surface-soft`), `#1b6c5b`
  (teal-700 — the brand accent; full `teal-50…950` scale in
  `tailwind.config.ts`).
- **The site is light-dominant** — white and `#f5f5f6` carry the pages.
  Black appears only as the floating nav pill and one contrast band per
  page. See RULES.md § Styling before adding dark surfaces.
- Sections alternate `white` ↔ `soft` down each page via
  `<Section tone="…">`, giving scroll rhythm without heavy contrast.
- Font: **Archivo, single family** (100–900). There is deliberately no
  serif stack and no italic accent face — see RULES.md § Styling before
  adding one. Accents are weight-drop + teal. Body copy uses the lifted
  `graphite` tones, not pure black.
- Motion: `<Reveal>` for sections/images, `<AnimatedText>` for headlines
  — both blur-and-settle, both respect `prefers-reduced-motion`.
- Nav is a slim bar (56px, 48px scrolled). It is transparent over the
  home hero photograph and solid dark everywhere else, always carrying
  the required C.A.S.H. white/teal lettering.
- The home hero expects `public/hero.jpg`; it falls back to a designed
  dark backdrop if that file is missing.
- Logo: `public/logo.svg`. It renders beside an *editable* text title
  ("CREServices" / "Beyond Strategy") — never bake the wordmark into the
  logo file, per the client's explicit requirement.

## Things intentionally left as placeholders

These need real values from the client before launch:

- **Photography.** Every image slot renders `<ImagePlaceholder>` naming
  the photo it needs (see RULES.md § Images for the swap procedure).
  This is the biggest outstanding item — the proposal (§5.3) requires
  authentic, client-approved CREServices photos, not stock.
  - **Home hero background** is the highest-impact one and is already
    wired: put the file in `public/` and set `backgroundImage` in
    `src/content/home.ts`. Until then the hero renders a calm dark
    fallback backdrop and still looks finished.
- Social media URLs (`src/content/site.ts`) — currently `#`, marked
  `TODO(client)`.
- `RESEND_API_KEY` / notification emails — booking works without them,
  notifications just no-op.
- Domain/DNS connection to Hostinger (proposal §5.8) — infrastructure
  step, not a code change.

## Where to go next

- Adding a UI primitive → `src/components/ui/`.
- Adding/editing copy → `src/content/*.ts`, not inside components.
- Changing the consultation form fields → update `src/lib/validation.ts`
  (schema), `src/content/contact.ts` (labels), `prisma/schema.prisma`
  (storage) together — they're intentionally kept in sync manually rather
  than generated, since the form is small and stable.
- Adding an admin capability → `src/components/admin/` +
  `src/app/api/admin/`.
