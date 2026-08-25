"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useHeat } from "@/components/HeatProvider";
import { StatusLine } from "@/components/StatusLine";
import { HoursTable } from "@/components/HoursTable";
import { useEntrance } from "@/lib/use-entrance";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The wordmark does not fade in. Archivo's width axis is animated instead,
   so the letters physically inflate from condensed to expanded. It reads as
   drawn for this mark and cannot be mistaken for a generic scroll reveal. */
function Inflate({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const play = useEntrance();
  const animated = play && !reduce;

  return (
    <span className="flex" aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={`${animated ? "a" : "s"}-${ch}-${i}`}
          aria-hidden
          className="inline-block"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          initial={animated ? { fontStretch: "62%" } : false}
          animate={{ fontStretch: "112%" }}
          transition={{ duration: 1.15, delay: delay + i * 0.045, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Magnetic({
  children,
  href,
  filled = false,
}: {
  children: React.ReactNode;
  href: string;
  filled?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 26, mass: 0.5 });

  return (
    <motion.a
      href={href}
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
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="led inline-flex items-center justify-center px-7 py-4"
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const { clock, mounted } = useHeat();
  const reduce = useReducedMotion();
  const play = useEntrance();
  const hatch = play && !reduce;

  return (
    <section className="relative grid min-h-[100svh] grid-cols-1 md:grid-cols-12">
      {/* The room. A hatch opening, not a fade. */}
      <div className="relative order-1 h-[52svh] overflow-hidden md:order-none md:col-span-7 md:h-auto md:min-h-[100svh]">
        <motion.div
          key={hatch ? "hatch" : "static"}
          className="absolute inset-0"
          initial={hatch ? { clipPath: "inset(50% 0% 50% 0%)" } : false}
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

        {/* Live clock, set in the expanded width so it reads as a sign. */}
        <div
          className="absolute right-0 top-0 px-5 py-4 tabular-nums"
          style={{
            background: "color-mix(in oklab, var(--surface) 72%, transparent)",
            borderLeft: "1px solid var(--edge)",
            borderBottom: "1px solid var(--edge)",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            className="type-expanded block text-4xl md:text-5xl"
            style={{ color: "var(--fg-strong)" }}
          >
            {mounted ? clock : " "}
          </span>
          <span className="led mt-1 block" style={{ color: "var(--fg)" }}>
            Lillehammer
          </span>
        </div>

        <div
          className="hairline-t absolute inset-x-0 bottom-0 px-5 py-3.5"
          style={{
            background: "color-mix(in oklab, var(--surface) 78%, transparent)",
            backdropFilter: "blur(2px)",
          }}
        >
          <StatusLine />
        </div>
      </div>

      {/* The docket. Ranged left, never centred. */}
      <div
        className="relative order-2 flex flex-col gap-6 px-5 pb-28 pt-6 md:order-none md:col-span-5 md:px-8 md:pb-8 md:pt-6"
        style={{ borderLeft: "1px solid var(--edge)", containerType: "inline-size" }}
      >
        <div className="led flex justify-between" style={{ color: "var(--fg)" }}>
          <span>Estd 2003</span>
          <span>Storgata 61</span>
        </div>

        <h1
          style={{
            color: "var(--fg-strong)",
            lineHeight: 0.84,
            letterSpacing: "-0.02em",
            fontSize: "clamp(2.75rem, 17.5cqw, 9rem)",
            textTransform: "uppercase",
          }}
        >
          <Inflate text="Lille" />
          <Inflate text="hammer" delay={0.12} />
          <span
            className="led mt-4 block"
            style={{ color: "var(--accent)", letterSpacing: "0.3em" }}
          >
            Restaurant &amp; Bar
          </span>
        </h1>

        <div className="mt-auto max-w-[24rem] pt-6">
          <HoursTable />
        </div>

        <div className="flex flex-col gap-7">
          <p
            className="max-w-[34ch] text-lg leading-snug md:text-xl"
            style={{ color: "var(--fg-strong)" }}
          >
            Tyrkisk hjemmelaget.
            <br />
            Pizza fra ovnen.
            <br />
            Bar til stengetid.
          </p>

          <div className="flex flex-wrap gap-3">
            <Magnetic href="#bestill" filled>
              Bestill bord
            </Magnetic>
            <Magnetic href="#takeaway">Takeaway</Magnetic>
          </div>

          <dl
            className="led grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 pt-2"
            style={{ color: "var(--fg)" }}
          >
            <dt>Adresse</dt>
            <dd style={{ color: "var(--fg-strong)" }}>
              Storgata 61, 2609 Lillehammer
            </dd>
            <dt>Inngang</dt>
            <dd style={{ color: "var(--fg-strong)" }}>Fra bakgården</dd>
            <dt>Telefon</dt>
            <dd>
              <a href="tel:+4761259060" style={{ color: "var(--fg-strong)" }}>
                61 25 90 60
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
