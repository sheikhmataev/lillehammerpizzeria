"use client";

import { useHeat } from "@/components/HeatProvider";
import { useEntrance } from "@/lib/use-entrance";
import { Motif } from "@/components/Motif";
import { HOURS, DAY_NO } from "@/lib/hours";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

export function Hero() {
  const { heat, day, minutes, toOpen, mounted } = useHeat();
  const reduce = useReducedMotion();
  const play = useEntrance();
  const open = heat === "warm";

  const nextDay = toOpen !== null && minutes + toOpen >= 1440 ? (day + 1) % 7 : day;
  const line = open
    ? `Åpent til ${hhmm(HOURS[day].close)} i kveld.`
    : `Åpner ${DAY_NO[nextDay]} ${hhmm(HOURS[nextDay].open)}.`;

  return (
    <section className="on-red relative isolate overflow-hidden md:min-h-svh">
      {/* Paper grain, multiplied, so the red reads as painted rather than
          filled. Barely visible on its own; it is what stops a flat #A8 red
          looking like a CSS background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: "url(/paper.webp)", backgroundSize: "460px 460px" }}
      />

      <div className="mx-auto grid max-w-[100rem] items-stretch gap-0 px-0 md:min-h-svh md:grid-cols-[1.12fr_0.88fr]">
        <div className="order-2 flex flex-col justify-center gap-7 px-4 pb-14 pt-10 md:order-1 md:px-10 md:py-28">
          <h1 className="display-xl" style={{ color: "var(--fg-strong)" }}>
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>{open ? "Grillen" : "Grillen"}</span>
              <Motif
                name="flame"
                animated={open && !reduce}
                size="0.92em"
                className="translate-y-[0.04em]"
              />
            </span>
            <span className="block">{open ? "er på" : "hviler"}</span>
          </h1>

          <p
            className={`max-w-[36ch] text-xl md:text-2xl ${mounted ? "" : "opacity-0"}`}
            style={{ color: "var(--fg-strong)" }}
          >
            {line} Tyrkisk grill, pizza fra steinovnen og bar til stengetid.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/meny/"
              className="sign-wide px-7 py-4 text-base"
              style={{ background: "var(--color-chalk)", color: "var(--color-red-dark)" }}
            >
              Se menyen
            </a>
            <a
              href="#finn-oss"
              className="sign-wide px-7 py-4 text-base"
              style={{ border: "2px solid var(--fg-strong)", color: "var(--fg-strong)" }}
            >
              Finn oss
            </a>
          </div>

        </div>

        {/* One photograph, cropped tall and pulled into the palette, so the
            hero is red first and photographic second. */}
        <motion.div
          key={play && !reduce ? "in" : "static"}
          className="relative order-1 min-h-[42svh] md:order-2 md:min-h-svh"
          initial={play && !reduce ? { clipPath: "inset(0% 0% 100% 0%)" } : false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img
            src="/photos/dsc02046@800.webp"
            srcSet="/photos/dsc02046@800.webp 800w, /photos/dsc02046.webp 1600w"
            sizes="(min-width: 768px) 42vw, 100vw"
            alt="Fullt lokale en fredag kveld, varme lamper over bardisken."
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: "var(--color-red-deep)", opacity: 0.42 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
