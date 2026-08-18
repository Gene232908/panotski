"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { brand, navItems, primaryCta } from "@/content/site";
import { CashNavLabel } from "@/components/layout/CashNavLabel";
import { BrandMark } from "@/components/ui/BrandMark";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink/90 px-6 py-6 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-700/30 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-teal-500/15 blur-[110px]"
            aria-hidden
          />

          <div className="relative z-10 flex items-center justify-between">
            <span className="flex flex-col leading-none">
              <BrandMark
                as="strong"
                tone="dark"
                className="text-sm font-bold tracking-tight"
              />
              {/* Matches the desktop navbar: tagline is white, not teal. */}
              <span className="mt-1 text-[9px] font-medium uppercase tracking-eyebrow text-paper">
                {brand.tagline}
              </span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/15 p-2.5 text-paper"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav
            className="relative z-10 mt-12 flex flex-1 flex-col items-start justify-center gap-7"
            aria-label="Mobile"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 * index,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="inline-block text-[2.1rem] font-bold uppercase leading-none tracking-tight transition-transform duration-200 ease-premium active:scale-[0.95] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <CashNavLabel
                    label={item.label}
                    active={pathname === item.href}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <Link
            href={primaryCta.href}
            onClick={onClose}
            className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-teal-700 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper shadow-soft transition-transform duration-200 ease-premium active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            {primaryCta.label} →
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
