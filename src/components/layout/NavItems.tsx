"use client";

import Link from "next/link";
import { navItems } from "@/content/site";
import { CashNavLabel } from "@/components/layout/CashNavLabel";

// Standard inline desktop nav. The only hover motion is the teal underscore
// under each item's initial letter (CashNavLabel), which reinforces the
// required C.A.S.H. treatment — see RULES.md § Content Fidelity.
//
// Clicking adds a brief press: the label dips, releases, and the page beneath
// blurs in (PageTransition). Transform only — no layout property is touched,
// so the press cannot reflow the bar, and it stays on the compositor.

type NavItemsProps = {
  pathname: string;
};

export function NavItems({ pathname }: NavItemsProps) {
  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
      {navItems.map((item) => {
        const isActive = item.href === pathname;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            // 14px with restrained tracking. Wide letter-spacing on small
            // uppercase text is what made the previous bar hard to read —
            // legibility first, styling second.
            className="group inline-block text-[14px] font-semibold uppercase tracking-[0.04em] transition-transform duration-200 ease-premium active:scale-[0.93] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <CashNavLabel label={item.label} active={isActive} />
          </Link>
        );
      })}
    </nav>
  );
}
