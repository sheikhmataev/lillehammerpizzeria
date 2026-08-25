"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, humanGap } from "@/lib/hours";

/**
 * Restaurant traffic is people standing in the cold at 19:40 deciding
 * where to eat. Whatever the page is doing cinematically, hours, booking
 * and the phone stay one thumb away. The art direction never wins over this.
 */
const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

export function FastPath() {
  const { heat, toClose, toOpen, day, minutes, mounted } = useHeat();

  const left =
    heat === "warm"
      ? toClose !== null && toClose <= 60
        ? `Stenger om ${humanGap(toClose)}`
        : `Åpent til ${String(Math.floor(HOURS[day].close / 60)).padStart(2, "0")}.00`
      : toOpen !== null && toOpen <= 90
        ? `Åpner om ${humanGap(toOpen)}`
        : `Åpner ${hhmm((minutes + (toOpen ?? 0)) % 1440)}`;

  return (
    <nav
      aria-label="Snarveier"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto_auto] items-stretch md:hidden"
      style={{
        background: "var(--surface-2)",
        borderTop: "1px solid var(--edge)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <span
        className="led flex items-center gap-2 px-4 py-4"
        style={{ color: "var(--fg)" }}
      >
        <span
          className="inline-block size-1.5 pilot-light"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <span className={mounted ? "" : "opacity-0"}>{left}</span>
      </span>

      <a
        href="#bestill"
        className="led hairline-r flex items-center px-5"
        style={{ borderLeft: "1px solid var(--edge)", color: "var(--fg-strong)" }}
      >
        Bord
      </a>
      <a
        href="tel:+4761259060"
        className="led flex items-center px-5"
        style={{ background: "var(--accent)", color: "var(--surface)" }}
      >
        Ring
      </a>
    </nav>
  );
}
