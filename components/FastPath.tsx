"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, humanGap } from "@/lib/hours";
import { LINKS } from "@/lib/links";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/**
 * Real traffic is someone outside in the cold at 19.40 with one hand free.
 * Whatever the page is doing, the status, the menu and the phone stay one
 * thumb away.
 */
export function FastPath() {
  const { heat, toClose, toOpen, day, minutes, mounted } = useHeat();

  const left =
    heat === "warm"
      ? toClose !== null && toClose <= 60
        ? `Stenger om ${humanGap(toClose)}`
        : `Åpent til ${hhmm(HOURS[day].close)}`
      : toOpen !== null && toOpen <= 120
        ? `Åpner om ${humanGap(toOpen)}`
        : `Åpner ${hhmm((minutes + (toOpen ?? 0)) % 1440)}`;

  return (
    <nav
      aria-label="Snarveier"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto_auto] items-stretch sm:hidden"
      style={{
        background: "var(--color-ink)",
        borderTop: "1px solid var(--color-soot)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <span className="tag flex items-center gap-2 px-3 py-4" style={{ color: "oklch(0.87 0.014 34)" }}>
        <span
          className="ember-dot inline-block size-1.5"
          style={{ background: "var(--color-red)" }}
          aria-hidden
        />
        <span className={mounted ? "" : "opacity-0"}>{left}</span>
      </span>

      <a
        href="/meny/"
        className="tag flex items-center px-5"
        style={{ borderLeft: "1px solid var(--color-soot)", color: "var(--color-chalk)" }}
      >
        Meny
      </a>
      <a
        href={LINKS.phone}
        className="tag flex items-center px-5"
        style={{ background: "var(--color-red)", color: "var(--color-chalk)" }}
      >
        Ring
      </a>
    </nav>
  );
}
