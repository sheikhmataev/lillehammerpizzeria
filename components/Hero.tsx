"use client";

import { useRef } from "react";
import { useHeat } from "@/components/HeatProvider";
import { useEntrance } from "@/lib/use-entrance";
import { Motif } from "@/components/Motif";
import { HOURS, DAY_NO } from "@/lib/hours";
import { asset } from "@/lib/asset";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/** A wipe, not a fade: the line is painted on rather than dissolved in. */
const WIPE = {
  hidden: { clipPath: "inset(0% 0% 105% 0%)", y: 8 },
  shown: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
};

export function Hero() {
  const { heat, day, minutes, toOpen, mounted } = useHeat();
  const reduce = useReducedMotion();
  const play = useEntrance();
  const animate = play && !reduce;
  const open = heat === "warm";

  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);

  const nextDay = toOpen !== null && minutes + toOpen >= 1440 ? (day + 1) % 7 : day;
  const line = open
    ? `Åpent til ${hhmm(HOURS[day].close)} i kveld.`
    : `Åpner ${DAY_NO[nextDay]} ${hhmm(HOURS[nextDay].open)}.`;

  /* One rehearsed entrance in one place. Every step below is part of the same
     sequence, which is why the delays are written here rather than scattered
     through the markup. */
  const step = (delay: number) => ({
    initial: animate ? WIPE.hidden : false,
    animate: WIPE.shown,
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section
      ref={section}
      id="top"
      className="on-red relative isolate overflow-hidden md:min-h-svh"
    >
      {/* Paper grain, multiplied, so the red reads as painted rather than
          filled. Barely visible on its own; it is what stops a flat red
          looking like a CSS background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] mix-blend-multiply"
        style={{
          backgroundImage: `url(${asset("/paper.webp")})`,
          backgroundSize: "460px 460px",
        }}
      />

      <div className="mx-auto grid max-w-[100rem] items-stretch gap-0 px-0 md:min-h-svh md:grid-cols-[1.12fr_0.88fr]">
        <div
          key={animate ? "in" : "static"}
          className="order-2 flex flex-col justify-center gap-7 px-4 pb-14 pt-10 md:order-1 md:px-10 md:py-28"
        >
          <motion.p
            {...step(0)}
            className="sign flex items-center gap-3 text-sm md:text-base"
            style={{ color: "var(--fg-strong)" }}
          >
            {/* the two short rules under the name on the painted sign */}
            <span
              aria-hidden
              className="block h-[3px] w-8 shrink-0"
              style={{ background: "var(--fg-strong)" }}
            />
            Lillehammer Restaurant &amp; Bar
          </motion.p>

          <motion.h1 {...step(0.1)} className="display-xl" style={{ color: "var(--fg-strong)" }}>
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>Grillen</span>
              <Motif
                name="flame"
                animated={open && !reduce}
                size="0.92em"
                className="translate-y-[0.04em]"
              />
            </span>
            <span className="block">{open ? "er på" : "hviler"}</span>
          </motion.h1>

          <motion.p
            {...step(0.28)}
            className={`max-w-[36ch] text-xl md:text-2xl ${mounted ? "" : "opacity-0"}`}
            style={{ color: "var(--fg-strong)" }}
          >
            {line} Tyrkisk grill, pizza fra steinovnen og bar til stengetid.
          </motion.p>

          <motion.div {...step(0.4)} className="flex flex-wrap items-center gap-3">
            <a
              href={asset("/meny/")}
              className="sign-wide px-7 py-4 text-base transition-transform duration-200 ease-out hover:-translate-y-0.5"
              style={{ background: "var(--color-chalk)", color: "var(--color-red-dark)" }}
            >
              Se menyen
            </a>
            <a
              href="#finn-oss"
              className="sign-wide px-7 py-4 text-base transition-colors duration-200 ease-out hover:bg-[var(--fg-strong)] hover:text-[var(--color-red-dark)]"
              style={{ border: "2px solid var(--fg-strong)", color: "var(--fg-strong)" }}
            >
              Finn oss
            </a>
          </motion.div>
        </div>

        {/* One photograph, cropped tall and pulled into the palette, so the
            hero is red first and photographic second. Overscaled by 12% so the
            scroll parallax never exposes an edge. */}
        <motion.div
          key={animate ? "photo-in" : "photo-static"}
          className="relative order-1 min-h-[42svh] overflow-hidden md:order-2 md:min-h-svh"
          initial={animate ? { clipPath: "inset(0% 0% 100% 0%)" } : false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
        >
          <motion.img
            src={asset("/photos/dsc02046@800.webp")}
            srcSet={`${asset("/photos/dsc02046@800.webp")} 800w, ${asset("/photos/dsc02046.webp")} 1600w`}
            sizes="(min-width: 768px) 42vw, 100vw"
            alt="Fullt lokale en fredag kveld, varme lamper over bardisken."
            className="absolute inset-x-0 w-full object-cover"
            style={{ top: "-6%", height: "112%", y: reduce ? 0 : photoY }}
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
