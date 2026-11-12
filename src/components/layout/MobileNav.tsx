"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brand, navItems, primaryCta } from "@/content/site";
import { CashNavLabel } from "@/components/layout/CashNavLabel";

// Full-screen mobile menu — built around C.A.S.H.
//
// The first version was the stock template menu: numbered rows, hairline
// dividers, an arrow on every line. It said nothing about this brand. This
// one is set like a type specimen: each label's initial is a giant drop cap
// with the rest of the word on its baseline (CashNavLabel `dropcap`), so the
// four initials stack into C · A · S · H down the left edge — the client's
// own navigation concept, made the whole composition. No numbers, no
// dividers, no arrows.
//
// It sits UNDER the header (z-40 vs the header's z-50), so the brand lockup
// and the morphing MenuToggle stay put — the menu opens behind them.
//
// Motion, in the hero's typesetting language: a circular wipe grows out of
// the toggle; then each initial RISES out of its own mask and the rest of
// the word slides in after it, row by row. The exit is the wipe reversed.

const EASE = [0.16, 1, 0.3, 1] as const;
// Centre of the toggle: the header's right gutter (24px) plus half the 44px
// button, and half the 80px bar height.
const ORIGIN = "calc(100% - 46px) 40px";

type MobileNavProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileNav({ id, open, onClose, pathname }: MobileNavProps) {
  const reduceMotion = useReducedMotion();

  // Lock body scroll while the overlay is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const wipe = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { clipPath: `circle(0px at ${ORIGIN})` },
        animate: { clipPath: `circle(150% at ${ORIGIN})` },
        exit: {
          clipPath: `circle(0px at ${ORIGIN})`,
          transition: { duration: 0.45, ease: EASE, delay: 0.05 },
        },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      };

  const at = (order: number) => (reduceMotion ? 0 : 0.2 + order * 0.07);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-28 lg:hidden"
          {...wipe}
        >
          {/* One soft teal light behind the initials — enough to lift the
              black, not a decoration in its own right. */}
          <div
            className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-teal-700/20 blur-[120px]"
            aria-hidden
          />

          <nav aria-label="Mobile" className="relative my-auto py-6">
            <ul className="flex flex-col gap-5">
              {navItems.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      aria-label={item.label}
                      className="group inline-block transition-transform duration-200 ease-premium active:scale-[0.98]"
                    >
                      <CashNavLabel
                        label={item.label}
                        active={active}
                        variant="dropcap"
                        slots={{
                          // The initial rises out of a mask, like the hero
                          // headline is typeset.
                          initial: (node) => (
                            <span className="block overflow-hidden pb-2.5 pt-1">
                              <motion.span
                                className="block"
                                initial={{ y: reduceMotion ? 0 : "105%" }}
                                animate={{ y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                transition={{ delay: at(index), duration: 0.8, ease: EASE }}
                              >
                                {node}
                              </motion.span>
                            </span>
                          ),
                          // …and the rest of the word follows it in.
                          rest: (node) => (
                            <motion.span
                              className="block pb-2.5"
                              initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, transition: { duration: 0.15 } }}
                              transition={{
                                delay: at(index) + (reduceMotion ? 0 : 0.18),
                                duration: 0.6,
                                ease: EASE,
                              }}
                            >
                              {node}
                            </motion.span>
                          ),
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ delay: at(navItems.length + 1), duration: 0.6, ease: EASE }}
            className="relative flex items-center justify-between gap-4 border-t border-paper/10 pt-6"
          >
            {/* Tagline only — the header lockup above already carries the
                CREServices wordmark in its approved colour split. */}
            <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-paper/45">
              {brand.tagline}
            </p>
            {/* Same compact pill as the hero's primary action. */}
            <Link
              href={primaryCta.href}
              onClick={onClose}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-teal-700 py-2 pl-5 pr-2 text-[13px] font-medium text-paper transition-[background-color,transform] duration-200 ease-premium hover:bg-teal-600 active:scale-[0.97]"
            >
              {primaryCta.label}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-paper/15">
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
