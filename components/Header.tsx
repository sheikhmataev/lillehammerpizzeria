"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { useHeat } from "@/components/HeatProvider";
import { HOURS, humanGap } from "@/lib/hours";

const NAV = [
  { href: "#meny", label: "Meny" },
  { href: "#bilder", label: "Bilder" },
  { href: "#rabatt", label: "Rabatt" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#kontakt", label: "Kontakt" },
];

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

export function Header() {
  const { heat, day, toClose, toOpen, mounted } = useHeat();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const status =
    heat === "warm"
      ? toClose !== null && toClose <= 60
        ? `Stenger om ${humanGap(toClose)}`
        : `Åpent til ${hhmm(HOURS[day].close)}`
      : toOpen !== null && toOpen <= 90
        ? `Åpner om ${humanGap(toOpen)}`
        : "Stengt nå";

  return (
    <header
      className="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 md:gap-8 md:px-8"
      style={{
        background: lifted ? "var(--surface)" : "transparent",
        borderBottom: `1px solid ${lifted ? "var(--edge-soft)" : "transparent"}`,
      }}
    >
      <a href="#top" aria-label="Til toppen" className="shrink-0">
        <Logo height={34} priority />
      </a>

      <nav className="label ml-auto hidden gap-7 lg:flex" style={{ color: "var(--fg)" }}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="hover:text-[var(--fg-strong)]">
            {n.label}
          </a>
        ))}
      </nav>

      <span
        className="label ml-auto hidden items-center gap-2 lg:ml-0 lg:flex"
        style={{ color: "var(--fg-mute)" }}
      >
        <span
          className="inline-block size-1.5 pilot-light"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <span className={mounted ? "" : "opacity-0"}>{status}</span>
      </span>

      <a
        href="#bestill"
        className="label ml-auto shrink-0 px-4 py-2.5 lg:ml-0 md:px-5"
        style={{ background: "var(--accent)", color: "var(--surface)" }}
      >
        Bestill bord
      </a>
    </header>
  );
}
