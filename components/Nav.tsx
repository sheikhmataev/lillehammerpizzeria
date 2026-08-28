"use client";

import { useEffect, useState } from "react";
import { useHeat } from "@/components/HeatProvider";
import { HOURS, humanGap } from "@/lib/hours";
import { LINKS } from "@/lib/links";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/**
 * Three destinations, not five. The old bar mixed sections, a status readout
 * and a call to action at the same weight, which is why it was unreadable.
 * Here the wordmark is set in type rather than repeating the logo, the links
 * are the only navigation, and the phone number is the one thing that looks
 * like a button.
 */
export function Nav({ pinned = false }: { pinned?: boolean }) {
  const { heat, day, toClose, toOpen, mounted } = useHeat();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = heat === "warm";
  const status = open
    ? toClose !== null && toClose <= 60
      ? `Stenger om ${humanGap(toClose)}`
      : `Åpent til ${hhmm(HOURS[day].close)}`
    : toOpen !== null && toOpen <= 120
      ? `Åpner om ${humanGap(toOpen)}`
      : "Stengt nå";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background:
          pinned || scrolled
            ? "var(--color-ink)"
            : /* a scrim, so the wordmark survives whatever photograph is
                 behind it at the top of the page */
              "linear-gradient(to bottom, oklch(0.19 0.015 34 / 0.72), transparent)",
        borderBottom: `1px solid ${pinned || scrolled ? "var(--color-soot)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[100rem] items-center gap-5 px-4 py-3 md:px-8 md:py-4">
        <a
          href="/"
          className="sign shrink-0 text-lg md:text-xl"
          style={{ color: "var(--color-chalk)" }}
        >
          Lillehammer
        </a>

        <span
          className="hidden items-center gap-2 sm:flex"
          style={{ color: open ? "var(--color-chalk)" : "oklch(0.66 0.014 34)" }}
        >
          <span
            className="ember-dot inline-block size-2"
            style={{ background: open ? "var(--color-red)" : "oklch(0.5 0.01 34)" }}
            aria-hidden
          />
          <span className={`tag ${mounted ? "" : "opacity-0"}`}>{status}</span>
        </span>

        <nav className="ml-auto flex items-center gap-5 md:gap-7">
          <a
            href="/meny/"
            className="tag hidden sm:inline"
            style={{ color: "var(--color-chalk)" }}
          >
            Meny
          </a>
          <a
            href="/#finn-oss"
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
