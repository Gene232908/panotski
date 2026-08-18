# RULES.md — Enforced Conventions

These rules exist so any developer (or agent) can open this repo, find the
exact file responsible for a piece of text or behavior, change it, and
leave without having touched anything else. If a rule here and the code
disagree, the code is wrong — fix the code, not the rule.

## 1. The 500-line component budget

Every file under `src/components/`, `src/app/`, and `src/lib/` is capped
at **500 lines**, enforced by `eslint.config.mjs` (`max-lines`). Running
`npm run lint` fails the build if any file crosses it.

This is not a soft target — it's the mechanism that keeps components
navigable. A 1,200-line "HomePage.tsx" is exactly what this rule exists to
prevent.

**When a file approaches the budget, split by section, not by size.**
Look at what the file renders and cut along natural seams:

- A page assembling five sections → five section components
  (`components/marketing/<page>/XSection.tsx`), the page file just
  imports and orders them. See `src/app/(marketing)/page.tsx` for the
  pattern already in use.
- A section that's grown a repeated block (a card, a row, a list item) →
  extract that block as its own component and `.map()` over it. See
  `ServiceRow.tsx` / `ServicesListSection.tsx`.
- A component doing two unrelated jobs (e.g., fetching *and* rendering a
  table) → split into a data/orchestration component
  (`ConsultationsDashboard.tsx`) and presentational children
  (`ConsultationsTable.tsx`, `ConsultationsFilters.tsx`).

Never split by arbitrary line ranges (`Section1.tsx` / `Section2.tsx`
with no semantic meaning) — the file name must tell you what's inside
before you open it.

## 2. Content lives in `src/content/`, never inline in JSX

This is the rule that makes manual copy edits fast. If you're changing a
sentence, a label, a button caption, a nav item — you should never need
to open a `.tsx` file to do it.

- All page copy (headlines, body text, CTAs, form labels, legal text)
  lives in `src/content/*.ts`, one file per page/domain
  (`home.ts`, `about.ts`, `contact.ts`, `services.ts`, `legal.ts`,
  `site.ts` for global nav/footer/brand).
- Components import from `content/` and render the values. A component
  file should contain **structure and behavior**, not sentences.
- Exceptions: `aria-label`s, placeholder attribute values tied 1:1 to a
  form field that's already defined in `content/`, and genuinely
  structural strings (a Tailwind class, an HTML tag name) don't need to
  move to `content/`.
- If you add a new field to a form, update its content file, its zod
  schema in `lib/validation.ts`, and (if it needs storing)
  `prisma/schema.prisma` — in that order, in the same change.

**To find a string on the live site:** identify the page → open its
`content/<page>.ts` → search for the text. You will not need to trace
through component logic to do this.

## 3. Content fidelity — this is a rebuild, not a rewrite

**Every user-facing sentence on the public site is copied verbatim from
cresvcs.com.** Not paraphrased, not "improved", not shortened. The
enhancement proposal migrates approved wording; it does not rewrite it.

If you need to know what the live site says, fetch the raw HTML and read
the text — do not rely on a summarizing tool, which will hand you a
paraphrase that looks plausible and is wrong:

```bash
curl -sL https://cresvcs.com/services -o page.html   # then strip tags and read
```

Concrete rules that follow:

- **Do not touch the strings in `src/content/*.ts`** unless the client
  has approved the change. Layout, spacing, and grouping are yours to
  design; wording is not.

> **The Milestone 1 revision is approved and supersedes the verbatim rule**
> for the items it covers: the twelve service labels, and the corrected Why Us
> and CTA lines. Everything it does not name stays verbatim.
> The approved wording now lives in `src/content/`. If this document and the
> code disagree about a service name or a headline, the content files are the
> source of truth.

- **Keep the site's own inconsistencies** *except where the Milestone 1
  revision resolved them.* The divergent Creative Arts naming
  (`homeName` vs `name`) was one such inconsistency and is now **closed**:
  plan §6.1 forbids What We Do and Detailed Services showing different
  labels, so `name` and `homeName` must match. "At CREService," (singular)
  in the hero is untouched — the hero is out of revision scope.
- **Service ordering is now single-source.** It previously differed by
  page; plan §6.1 requires one order everywhere, so `homeServiceOrder`
  matches the `services` array and the Service Interest dropdown reads
  from the same list. Do not reintroduce a per-page order.
- **Legal pages are verbatim legal text.** Never edit, summarize, or
  "tidy" them.

Two further agreed items:

- **C.A.S.H. navigation.** The nav order is fixed: Contact Us, About,
  Services, Home — in that order, so the first letters read C-A-S-H. It's
  encoded in `content/site.ts` (`navItems`) with a comment; don't
  "fix" the order to the conventional Home-first pattern. The first
  letter of each label renders white, the rest teal
  (`components/layout/CashNavLabel.tsx`) on the dark nav — don't
  restyle this per-page.
- **"About", not "About Cres".** The live site labels it "About Cres";
  the proposal (§3) shortens it to "About". This is the one intentional
  label change.

## 4. Styling

**The site is light-dominant.** White and `#f5f5f6` carry the pages;
black is an accent, not a background. Concretely:

- Wrap page bands in `<Section tone="white | soft | ink">`. Alternate
  `white` ↔ `soft` down the page so each band reads as its own chapter.
- `tone="ink"` is a **deliberate contrast moment — at most one per
  page** (the home "WHY US?" band, the about "Why CREServices?" band).
  Don't add a second without a reason.
- **Exception — the Services accordion alternates ink/white per row.**
  The client asked for this specifically and says the alternation carries
  meaning for them. It is intentional, not a stray dark section; don't
  "fix" it back to light-dominant.
- The nav pill and the section above are the only dark chrome by
  default. Don't darken the footer, hero, or CTA.

- Use the brand tokens, not raw hex: `bg-surface` (#ffffff),
  `bg-surface-soft` (#f5f5f6), `bg-ink`, `text-paper`, `teal-50…950`
  (defined in `tailwind.config.ts`, sourced from `#000000` / `#f5f5f6` /
  `#346A5C`). If a design needs a shade not in the scale, add it to the
  scale — don't hardcode a one-off hex in a component.
- Use the `cn()` helper (`lib/utils.ts`) for conditional classes, not
  string concatenation or template literals.

**Typography — one family: Archivo.** A compact editorial grotesque with
real character, carrying display and body across its 100–900 range.

**There is no serif stack, and no italic accent face. Do not add one.**
A bold sans headline with a single italic serif word (Playfair,
Cormorant, Fraunces, Instrument Serif…) is the most recognisable tell of
a generated template, and the client called it out by name. It was
removed deliberately. Likewise avoid the default-template sans faces:
Inter, Plus Jakarta Sans, Poppins, DM Sans, Montserrat, Space Grotesk.

Hierarchy comes from **weight, size, tracking and colour inside one
family** — which is how real type systems work:

- **Accent words** = weight *drop* plus teal (`font-light text-teal-700`,
  or `text-teal-300` on dark). Never italic, never a second family.
- **Large quotes / statements** = big, `font-light`, tight tracking
  (`-0.02em`…`-0.03em`). Scale and restraint carry them.
- **Display headings** = `font-semibold` (600). Avoid 800 — at display
  size it reads blunt rather than confident.
- **Numerals / labels** = `tabular-nums` with wide tracking, not a
  decorative face.
- Negative tracking belongs on display sizes only. Never on body or
  small text.

**Reading tones — don't put pure `#000` on white.** Long paragraphs at
full black vibrate. Body copy uses the lifted `graphite` scale
(`text-graphite`, `-soft`, `-muted`); headings keep `text-ink`. Body
line-height stays generous (`leading-relaxed` / `1.65`).
- Inline `style` attributes are reserved for values that must be
  computed (e.g., the hero's generated grid-pattern background) — if a
  value is static, it belongs in a Tailwind class or the config.

## 5. Images

Every page carries photography. Until the client supplies approved
photos, each slot renders `<ImagePlaceholder hint="…" />`
(`components/ui/ImagePlaceholder.tsx`) — a designed slot that names the
photo it's waiting for, so the client can see exactly what to send.

- The hint text lives with the content it belongs to (`imageHint` in
  `content/*.ts`), not in the component.
- **To swap in a real photo:** drop the file in `public/`, replace the
  `<ImagePlaceholder>` with `next/image`, keep the same wrapper classes
  and aspect ratio, and write real `alt` text.
- Never ship a bare `<img>` or an unoptimized external URL.

**The home hero background is already wired.** Drop the photo in
`public/` and set one value — no component edit needed:

```ts
// src/content/home.ts
backgroundImage: "/hero.jpg",   // was null
backgroundAlt: "…describe the photo…",
```

`HeroBackdrop.tsx` swaps from the fallback backdrop to the real photo
automatically, keeping the same gradient scrim. Use a landscape image,
2400px+ wide, with calm space at the lower-left where the headline sits —
busy detail there will fight the type.

## 5a. Hero design rules

The home hero is photography-first and deliberately bare. Before adding
anything to it, re-read this:

- **What belongs:** the background photograph, an eyebrow, the headline,
  one line of supporting copy, two actions, a scroll cue. That is all.
- **What does not:** decorative orbs/blobs, glass cards, browser or
  device mockups, grid overlays, shimmer sweeps, floating stat chips,
  animated rings, notification badges. These were removed on purpose —
  they are well-known template anti-patterns, and Apple's
  system calls for "photography-first presentation; UI recedes."
- **Type:** weight 600 (not 800), tight negative tracking (`-0.03em`),
  `clamp()` for size. Restraint reads as expensive; oversized extrabold
  reads as a template.
- **Legibility over photos** comes from a gradient scrim, never a flat
  black sheet. Content sits lower-left so it clears the nav and the
  photo's subject.
- **Press state** is `active:scale-[0.97]`, matching the system-wide
  Apple convention. No bounce, no spring.

**Hero motion** is two scroll/pointer systems, both in `HeroSection.tsx`:

| System            | What moves                                    | Why |
| ----------------- | --------------------------------------------- | --- |
| Scroll parallax   | backdrop scales 1→1.18 and sinks 12%; copy lifts −110px and fades | The speed gap between the two layers is what reads as depth |
| Pointer parallax  | backdrop drifts ≤14px, springed                | Keeps the frame alive while idle |

Rules for touching it:

- The backdrop is overscanned (`-inset-[6%]`) so drift never exposes an
  edge. If you change the drift distance, check the overscan still covers it.
- Both systems are disabled under `prefers-reduced-motion` — the reduced
  path swaps in inert motion values (`staticScale` / `staticY`) rather
  than branching hooks. **Never call a hook conditionally** to do this.
- The headline renders from `headlineLines` (per-line clip masks). Those
  lines must always `.join(" ")` back to the verbatim `headline` — the
  split is layout, not copy.


## 5b. Navigation

Three separate floating capsules (brand / links / action), not one bar —
the gaps let the hero photograph through. Plus a scroll-progress hairline
across the top.

- **Spotlight hover** (`NavItems.tsx`) uses a single shared
  `layoutId="nav-spotlight"`, so the pill physically travels between
  items and returns to the active one on mouse-out. Don't replace it with
  per-item fades — the continuity is the effect.
- **C.A.S.H. lettering is non-negotiable** (§3). The hover animation was
  designed to reinforce it: the *initial* letter gets the teal underscore
  and the remainder brightens. Any future hover treatment must keep the
  initial visually distinct.
- Keyboard focus triggers the same spotlight as hover (`onFocus`), so the
  nav reads identically for keyboard users.
## 5c. Services layout

Each service is its own full-width band alternating ink/white, with the
image side alternating independently.

**Disclosure is back on** (Milestone 1 revision §4.3). An accordion was
built and reverted once before; the client has now asked for it again, so
service detail is collapsed by default behind a visible `+` control. The
earlier reversal is history, not a standing instruction — don't "restore"
the always-open version.

- Don't wrap the rows in a single <Section>: that imposes one background
  behind all of them and kills the alternation.
- **Keep collapsed panels mounted and animate height.** This was the
  warning attached to the first accordion and it matters more now that
  disclosure is permanent: conditionally rendering panels out strips the
  service copy from the served HTML and costs search visibility on the
  exact text describing what the client sells. Use `grid-template-rows`
  or `max-height`, never `{open && <Panel/>}`.
- The control must work with mouse, keyboard and touch, carry a clear
  accessible label, and show a visible focus state (plan §13).
- Creative Arts Consulting is the one exception: its control opens an
  in-page gallery modal rather than an inline panel (plan §5).


## 6. Motion

- Wrap section entrances in `<Reveal>` (`components/ui/Reveal.tsx`), and
  headline text in `<AnimatedText>` (word-level rise) — not bespoke
  `framer-motion` calls. Both already handle `prefers-reduced-motion`
  via `useReducedMotion()`.
- **Blur-and-settle, not plain fade.** Content resolves from a soft
  defocus (6–10px) as it rises. That's what separates these entrances
  from a stock fade-in. Two rules keep it usable:
  - the blur clears *faster* than the movement finishes (its own shorter
    `filter` transition), so text is never left illegible mid-animation;
  - keep the blur ≤10px. More looks like a loading glitch, not a reveal.
- **Clipping masks** on headline words/lines are what make the rise read
  as typeset rather than animated. Keep `overflow-hidden` on the wrapper.
- Easing is `[0.16, 1, 0.3, 1]` (`ease-cinematic`) for large surfaces,
  `[0.22, 1, 0.36, 1]` (`ease-premium`) for controls. Reveals ~1s,
  hovers 300–500ms, marquees 24–40s linear.
- Hero parallax is the one exception to "no parallax" — see § 5a. Beyond
  it: no bounce, no spring on content, nothing that blocks reading.
  Motion supports the content; it doesn't perform.

## 7. Accessibility

- Every decorative icon gets `aria-hidden`. Every functional icon-only
  button (menu toggle, close button, social links) gets `aria-label`.
- Every form input goes through `ui/Input.tsx` / `Textarea.tsx` /
  `Select.tsx` — they already wire up `label`/`htmlFor`, error text, and
  `aria-invalid`. Don't hand-roll a bare `<input>` in a page.
- Focus states are global (`globals.css` → `:focus-visible`) — don't
  suppress outlines locally.

## 8. Security & data handling

- Every API route that accepts a body validates it with a `zod` schema
  from `lib/validation.ts` before touching the database. No exceptions.
- `/admin/*` is gated twice: `middleware.ts` (edge, redirects
  unauthenticated requests) and the dashboard `layout.tsx` (server-side
  re-check). Don't remove either layer — they cover different failure
  modes (middleware matcher misconfiguration vs. direct render).
- Session tokens are signed JWTs in an `httpOnly`, `sameSite=lax` cookie
  (`lib/session.ts`). Never expose `SESSION_SECRET` or password hashes to
  the client, and never read the session cookie from client components —
  go through an API route or server component.
- `lib/session.ts` is edge-safe on purpose (no Prisma, no bcrypt) because
  `middleware.ts` runs on the Edge runtime. If you need DB or bcrypt
  access, put it in `lib/auth.ts` (Node runtime only) and don't import
  `lib/auth.ts` from `middleware.ts`.
- Passwords are hashed with bcrypt (cost 12) at seed time
  (`prisma/seed.ts`) — never store or log a plaintext password.

## 9. Before adding a new component, ask

1. **Does this content already exist in `content/`?** If yes, import it —
   don't duplicate the string.
2. **Is this a one-off arrangement of existing primitives?** If the JSX
   is just `ui/` components in a `<div>`, you may not need a new file at
   all — compose inline in the page/section.
2. **Will this be reused across ≥2 places?** If yes, it belongs in
   `components/ui/` (generic) — if it's specific to one page's content
   shape, it belongs under `components/marketing/<page>/` or
   `components/admin/`.
3. **Would adding this push the parent file over ~400 lines?** If yes,
   extract now rather than waiting for the lint error.

## 10. Responsive checkpoints

Verify at 390px (mobile), 768px (tablet), and 1440px (desktop) before
calling a UI change done:

- No horizontal scroll except the intentional `overflow-x-auto` on the
  admin consultations table.
- Hero CTA visible without scrolling on common mobile viewport heights.
- Mobile nav (`MobileNav.tsx`) opens/closes cleanly and traps focus
  visually within the full-screen overlay.
