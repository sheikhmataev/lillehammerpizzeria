"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useHeat } from "@/components/HeatProvider";
import { useEntrance } from "@/lib/use-entrance";
import { Logo } from "@/components/Logo";
import { HOURS, humanGap } from "@/lib/hours";
import { LINKS, ORDERING_LIVE } from "@/lib/links";

const EASE = [0.16, 1, 0.3, 1] as const;

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

function Magnetic({
  children,
  href,
  filled = false,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  filled?: boolean;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 26, mass: 0.5 });

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        x: reduce ? 0 : sx,
        y: reduce ? 0 : sy,
        background: filled ? "var(--accent)" : "transparent",
        color: filled ? "var(--surface)" : "var(--fg-strong)",
        border: "1px solid var(--edge)",
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.16);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.26);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="label inline-flex items-center justify-center px-7 py-4"
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const { clock, heat, day, toClose, toOpen, mounted } = useHeat();
  const reduce = useReducedMotion();
  const play = useEntrance();
  const open = play && !reduce;

  /* Only what is true right now. The full week lives once, in Finn oss. */
  const status =
    heat === "warm"
      ? toClose !== null && toClose <= 60
        ? `Siste time. Kjøkkenet stenger om ${humanGap(toClose)}`
        : `Åpent nå. Kjøkkenet stenger ${hhmm(HOURS[day].close)}`
      : toOpen !== null
        ? `Stengt nå. Åpner om ${humanGap(toOpen)}`
        : "Stengt nå";

  return (
    <section
      id="top"
      className="relative grid grid-cols-1 md:min-h-[calc(100svh-4rem)] md:grid-cols-12"
    >
      <div className="relative order-1 h-[38svh] overflow-hidden md:order-none md:col-span-7 md:h-auto">
        <motion.div
          key={open ? "hatch" : "static"}
          className="absolute inset-0"
          initial={open ? { clipPath: "inset(50% 0% 50% 0%)" } : false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <img
            src="/photos/dsc02046@800.webp"
            srcSet="/photos/dsc02046@800.webp 800w, /photos/dsc02046.webp 1600w"
            sizes="(min-width: 768px) 58vw, 100vw"
            alt="Lokalet en fredag kveld, med fjellbildet på veggen og lampene tent."
            className="breathing size-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        <div
          className="absolute right-0 top-0 px-5 py-3"
          style={{
            background: "color-mix(in oklab, var(--surface) 74%, transparent)",
            borderLeft: "1px solid var(--edge)",
            borderBottom: "1px solid var(--edge)",
            backdropFilter: "blur(3px)",
          }}
        >
          <span
            className="type-expanded block text-4xl tabular-nums md:text-5xl"
            style={{ color: "var(--fg-strong)" }}
          >
            {mounted ? clock : " "}
          </span>
          <span className="label mt-1 block" style={{ color: "var(--fg-mute)" }}>
            Lillehammer nå
          </span>
        </div>

        <p
          className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-5 py-4"
          style={{
            background: "color-mix(in oklab, var(--surface) 80%, transparent)",
            borderTop: "1px solid var(--edge)",
            backdropFilter: "blur(3px)",
            color: "var(--fg-strong)",
          }}
          aria-live="polite"
        >
          <span
            className="inline-block size-2 shrink-0 pilot-light"
            style={{ background: "var(--accent)" }}
            aria-hidden
          />
          <span className={`label ${mounted ? "" : "opacity-0"}`}>{status}</span>
        </p>
      </div>

      <div
        className="relative order-2 flex flex-col justify-center gap-6 px-4 pb-24 pt-8 md:order-none md:col-span-5 md:gap-8 md:px-10 md:py-12"
        style={{ borderLeft: "1px solid var(--edge-soft)" }}
      >
        {/* The mark opens like the hatch on the photograph: same language,
            no fade, no drifting text. */}
        <motion.div
          key={open ? "mark" : "mark-static"}
          initial={open ? { clipPath: "inset(50% 0% 50% 0%)" } : false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay: open ? 0.15 : 0, ease: EASE }}
        >
          <h1>
            <Logo fluid className="max-w-[19rem] md:max-w-[30rem]" priority />
          </h1>
        </motion.div>

        <p
          className="text-[1.4rem] leading-tight md:text-3xl"
          style={{ color: "var(--fg-strong)" }}
        >
          Tyrkisk hjemmelaget.
          <br />
          Pizza fra ovnen.
          <br />
          Bar til stengetid.
        </p>

        <div className="flex flex-wrap gap-3">
          <Magnetic
            href={ORDERING_LIVE ? LINKS.bookTable : "#bestill"}
            external={ORDERING_LIVE}
            filled
          >
            Bestill bord
          </Magnetic>
          <Magnetic href="#meny">Se menyen</Magnetic>
        </div>

        <p style={{ color: "var(--fg-mute)" }}>
          Storgata 61, inngang fra bakgården.
        </p>
      </div>
    </section>
  );
}
