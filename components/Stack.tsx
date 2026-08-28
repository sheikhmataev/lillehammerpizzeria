"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { SHOTS } from "@/content/photos";

/* Deterministic tilts. Math.random would reshuffle on every render and
   would not survive a static build. */
const TILT = [-2.4, 1.8, -1.1, 2.9, -3.2, 0.9, 2.1, -1.7];

/* Fixed per-depth offsets so the pile always reads as a pile, whatever the
   top card's own tilt happens to be. */
const DEPTH = [
  { x: 0, y: 0, r: 0, s: 1, o: 1 },
  { x: 16, y: 18, r: -3.6, s: 0.955, o: 1 },
  { x: -14, y: 34, r: 2.8, s: 0.915, o: 1 },
  { x: 6, y: 48, r: -1.4, s: 0.88, o: 0 },
];

const VISIBLE = DEPTH.length;

export function Stack() {
  const [front, setFront] = useState(0);
  const reduce = useReducedMotion();
  const n = SHOTS.length;

  const go = useCallback(
    (dir: 1 | -1) => setFront((f) => (f + dir + n) % n),
    [n],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const thrown = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 480;
    if (thrown) go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <section id="bilder" className="hairline-t scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="flex flex-col">
          <h2 className="section-title" style={{ color: "var(--fg-strong)" }}>
            Bildene
          </h2>
          <p className="mt-4 max-w-[38ch]" style={{ color: "var(--fg)" }}>
            Ingen stylist, ingen kulisser. Dette er tallerkenene som går ut og
            rommet slik det ser ut når det er fullt.
          </p>

          {/* The index doubles as navigation, so the stack is not a black box
              you can only shuffle blindly. */}
          <ol className="mt-8 hidden gap-x-8 gap-y-1 lg:grid lg:grid-cols-2">
            {SHOTS.map((s, i) => {
              const active = i === front;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setFront(i)}
                    className="flex w-full items-baseline gap-3 py-1 text-left"
                    style={{ color: active ? "var(--fg-strong)" : "var(--fg-mute)" }}
                  >
                    <span className="led shrink-0" style={{ color: active ? "var(--accent)" : "inherit" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="label">{s.caption}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Forrige bilde"
              className="label px-5 py-3"
              style={{ border: "1px solid var(--edge)", color: "var(--fg-strong)" }}
            >
              Forrige
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Neste bilde"
              className="label px-5 py-3"
              style={{ border: "1px solid var(--edge)", color: "var(--fg-strong)" }}
            >
              Neste
            </button>
            <span className="led ml-auto" style={{ color: "var(--fg-mute)" }}>
              {String(front + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* The stack itself: prints left on the table, top one draggable. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] sm:aspect-[4/3] lg:aspect-[4/5]">
          {Array.from({ length: VISIBLE }, (_, depth) => {
            const i = (front + depth) % n;
            const shot = SHOTS[i];
            const isTop = depth === 0;
            const d = DEPTH[depth];
            const tilt = isTop ? TILT[i % TILT.length] : d.r;

            return (
              <motion.figure
                key={shot.id}
                className="absolute inset-0 flex touch-pan-y flex-col"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--edge)",
                  zIndex: VISIBLE - depth,
                  cursor: isTop ? "grab" : "default",
                }}
                animate={{
                  rotate: reduce ? 0 : tilt,
                  x: reduce ? 0 : d.x,
                  y: d.y,
                  scale: d.s,
                  opacity: d.o,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.7 }}
                drag={isTop && !reduce ? "x" : false}
                dragElastic={0.18}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? onDragEnd : undefined}
                whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                aria-hidden={!isTop}
              >
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <img
                    src={`/photos/${shot.id}@800.webp`}
                    srcSet={`/photos/${shot.id}@800.webp 800w, /photos/${shot.id}.webp 1600w`}
                    sizes="(min-width: 1024px) 30rem, 92vw"
                    alt={isTop ? shot.alt : ""}
                    className="size-full object-cover"
                    draggable={false}
                    loading={depth === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <figcaption
                  className="flex items-baseline justify-between gap-4 px-4 py-3"
                  style={{ borderTop: "1px solid var(--edge)" }}
                >
                  <span className="label" style={{ color: "var(--fg-strong)" }}>
                    {shot.caption}
                  </span>
                  <span className="led" style={{ color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>

      <p className="label mt-6 lg:hidden" style={{ color: "var(--fg-mute)" }}>
        Dra kortet til siden
      </p>
    </section>
  );
}
