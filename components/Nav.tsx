"use client";

import { useEffect, useState } from "react";
import { useHeat } from "@/components/HeatProvider";
import { Logo } from "@/components/Logo";
import { HOURS, DAY_NO, humanGap } from "@/lib/hours";
import { LINKS } from "@/lib/links";
import { asset } from "@/lib/asset";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/**
 * Three destinations, not five. The mark sits top left where a restaurant's
 * sign sits, the links are the only navigation, and the phone number is the
 * one thing that looks like a button.
 *
 * The status never says the place is shut. Closed is not information anyone
 * can act on; the next opening is, so that is what it says instead.
 */
export function Nav({ pinned = false }: { pinned?: boolean }) {
  const { heat, day, minutes, toClose, toOpen, mounted } = useHeat();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = heat === "warm";
  const nextDay = toOpen !== null && minutes + toOpen >= 1440 ? (day + 1) % 7 : day;
  const status = open
    ? toClose !== null && toClose <= 60
      ? `Stenger om ${humanGap(toClose)}`
      : `Åpent til ${hhmm(HOURS[day].close)}`
    : toOpen !== null && toOpen <= 120
      ? `Åpner om ${humanGap(toOpen)}`
      : `Åpner ${DAY_NO[nextDay]} ${hhmm(HOURS[nextDay].open)}`;

  const solid = pinned || scrolled;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: solid
          ? "var(--color-ink)"
          : /* a scrim, so the mark survives whatever photograph is behind it
               at the top of the page */
            /* to a zero-alpha copy of the same colour, not `transparent`:
               interpolating toward transparent black leaves a grey edge */
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

        <span
          className="hidden items-center gap-2 sm:flex"
          style={{ color: open ? "var(--color-chalk)" : "oklch(0.72 0.014 34)" }}
        >
          <span
            className="ember-dot inline-block size-2"
            style={{ background: open ? "var(--color-red)" : "oklch(0.55 0.01 34)" }}
            aria-hidden
          />
          <span className={`tag ${mounted ? "" : "opacity-0"}`}>{status}</span>
        </span>

        <nav className="ml-auto flex items-center gap-5 md:gap-7">
          <a
            href={asset("/meny/")}
            className="tag hidden sm:inline"
            style={{ color: "var(--color-chalk)" }}
          >
            Meny
          </a>
          <a
            href={asset("/#finn-oss")}
            className="tag hidden sm:inline"
            style={{ color: "var(--color-chalk)" }}
          >
            Finn oss
          </a>
          <a
            href={LINKS.phone}
            className="sign-wide px-4 py-2.5 text-sm md:px-5"
            style={{ background: "var(--color-red)", color: "var(--color-chalk)" }}
          >
            Ring<span className="hidden sm:inline"> {LINKS.phoneLabel}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
