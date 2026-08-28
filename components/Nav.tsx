"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/Logo";
import { LINKS } from "@/lib/links";
import { asset } from "@/lib/asset";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Two destinations in the bar, four in the drawer. The anchors resolve on the
   home page, so from the menu page they carry the visitor back to it. */
const PRIMARY = [
  { href: "/meny/", label: "Meny" },
  { href: "/#finn-oss", label: "Finn oss" },
];

const DRAWER = [
  ...PRIMARY,
  { href: "/#om-oss", label: "Om oss" },
  { href: "/#rabatt", label: "Rabatt" },
];

/**
 * The mark, the destinations, and the phone number. Nothing else: the bar used
 * to carry a live open/closed readout, which competed with the navigation for
 * the same glance and told people the one thing they cannot act on.
 *
 * Below the sm breakpoint the destinations collapse into a drawer, so the bar
 * is the mark, the phone number and a way in. The phone number never collapses,
 * because on a phone it is the whole point.
 */
export function Nav({ pinned = false }: { pinned?: boolean }) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const solid = pinned || scrolled || open;

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: solid
          ? "var(--color-ink)"
          : /* a scrim, so the mark survives whatever photograph is behind it at
               the top of the page. To a zero-alpha copy of the same colour,
               not `transparent`: interpolating toward transparent black leaves
               a grey edge. */
            "linear-gradient(to bottom, oklch(0.19 0.015 34 / 0.72), oklch(0.19 0.015 34 / 0))",
        borderBottom: `1px solid ${solid ? "var(--color-soot)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[100rem] items-center gap-5 px-4 py-2.5 md:px-8 md:py-3">
        <a
          href={asset("/")}
          className="shrink-0 leading-none"
          aria-label="Lillehammer Restaurant & Bar, til forsiden"
        >
          <span className="block md:hidden">
            <Logo height={30} priority />
          </span>
          <span className="hidden md:block">
            <Logo height={38} priority />
          </span>
        </a>

        <nav className="ml-auto flex items-center gap-5 md:gap-7">
          {PRIMARY.map((l) => (
            <a
              key={l.href}
              href={asset(l.href)}
              className="tag hidden sm:inline"
              style={{ color: "var(--color-chalk)" }}
            >
              {l.label}
            </a>
          ))}

          <a
            href={LINKS.phone}
            className="sign-wide px-4 py-2.5 text-sm md:px-5"
            style={{ background: "var(--color-red)", color: "var(--color-chalk)" }}
          >
            Ring<span className="hidden sm:inline"> {LINKS.phoneLabel}</span>
          </a>

          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? "Lukk menyen" : "Åpne menyen"}
            className="-mr-1 flex size-10 shrink-0 flex-col items-center justify-center gap-[5px] sm:hidden"
          >
            {/* two rules that cross into an x, so the control says what it does
                in both states without a second icon */}
            <motion.span
              className="block h-[2px] w-6 origin-center"
              style={{ background: "var(--color-chalk)" }}
              animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            />
            <motion.span
              className="block h-[2px] w-6 origin-center"
              style={{ background: "var(--color-chalk)" }}
              animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="nav-drawer"
            className="overflow-hidden sm:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
            style={{ borderTop: "1px solid var(--color-soot)" }}
          >
            <nav className="px-4 pb-3 pt-1" aria-label="Sider">
              {DRAWER.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={asset(l.href)}
                  onClick={() => setOpen(false)}
                  className="sign block py-3 text-2xl"
                  style={{
                    color: "var(--color-chalk)",
                    borderBottom:
                      i < DRAWER.length - 1 ? "1px solid var(--color-soot)" : "none",
                  }}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.34,
                    ease: EASE,
                    delay: reduce ? 0 : 0.06 + i * 0.045,
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
