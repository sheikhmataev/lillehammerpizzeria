"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useHeat } from "@/components/HeatProvider";
import { asset } from "@/lib/asset";

/**
 * The gallery is a list, not a strip of thumbnails. Reading the names is the
 * browsing; the photograph is what happens when you point at one. That way
 * the whole thing is legible before any of it has loaded, and the numbers,
 * which are how people order here, do the work a row of grey rectangles
 * usually does badly.
 *
 * Every row is named for what is visibly in the photograph. None of these ten
 * has been mapped to a dish on the printed menu by the restaurant, so none
 * claims a dish number; `dish` is the field to fill in when they confirm the
 * mapping, and the row then prints "Nr. 83" next to the name.
 */
type Shot = {
  id: string;
  name: string;
  note: string;
  /** The number to say out loud, where the photograph is verifiably that dish. */
  dish?: string;
  /** Hour of the evening the shot belongs to, for the arrival pick. */
  hour: number;
};

const SHOTS: Shot[] = [
  { id: "1", name: "Grillfatet", note: "Bulgur, grillet lavash, dipper og kjøtt fra grillen", hour: 19 },
  { id: "dsc02046", name: "Fredag kveld", note: "Fullt lokale, ski-muralen på bakveggen", hour: 21 },
  { id: "lhmrpizzeria-6", name: "Steinovnen", note: "Spekeskinke, ruccola og revet parmesan", hour: 18 },
  { id: "dsc01492", name: "Fra grillen", note: "Kjøtt, halloumi, grillet mais og bulgur", hour: 20 },
  { id: "dsc02076", name: "Baren", note: "Bak disken, foran vinhyllene", hour: 22 },
  { id: "dsc02059", name: "Midt på dagen", note: "Lokalet på en hverdag, før kveldsrushet", hour: 15 },
  { id: "dsc02095", name: "Passet", note: "Tallerkener på rekke, klare til å gå ut", hour: 19 },
  { id: "dsc01578", name: "Fra havet", note: "Skalldyr i fløtesaus med asparges og sitron", hour: 18 },
  { id: "dsc01503", name: "Strimlet kjøtt", note: "Fries i kurv, aioli og tzatziki", hour: 17 },
  { id: "dsc02102", name: "Ved baren", note: "Kvelden i gang langs hele disken", hour: 23 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** How far the stage is allowed to drift with the pointer. */
const DRIFT = 26;

function pickByClock(minutes: number) {
  const hour = Math.floor(minutes / 60);
  let best = 0;
  let gap = Infinity;
  SHOTS.forEach((s, i) => {
    const d = Math.abs(s.hour - hour);
    if (d < gap) {
      gap = d;
      best = i;
    }
  });
  return best;
}

export function Pass() {
  const reduce = useReducedMotion();
  const { minutes, mounted } = useHeat();
  const [active, setActive] = useState(0);
  const previous = useRef(0);
  const section = useRef<HTMLElement>(null);

  /* Arrive on the photograph that matches the hour: the quiet room in the
     afternoon, the full bar at eleven. Set after mount so the static build
     stays stable. */
  useEffect(() => {
    if (!mounted) return;
    setActive(pickByClock(minutes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  /* Every photograph is in the markup from the start, but only the first two
     are fetched until the section is close. Once it is, the rest are upgraded
     from lazy to eager together, so pointing at a row never waits on a
     request and never shows an empty frame. */
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const el = section.current;
    if (!el || warm) return;
    if (!("IntersectionObserver" in window)) {
      setWarm(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWarm(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [warm]);

  const pointerY = useMotionValue(0);
  const driftY = useSpring(pointerY, { stiffness: 140, damping: 22, mass: 0.6 });
  const tilt = useTransform(driftY, [-DRIFT, DRIFT], [1.4, -1.4]);

  const select = (i: number) => {
    previous.current = active;
    setActive(i);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const t = (e.clientY - box.top) / box.height - 0.5;
    pointerY.set(Math.max(-1, Math.min(1, t * 2)) * DRIFT);
  };

  const down = active >= previous.current;
  const current = SHOTS[active];

  return (
    <section
      ref={section}
      id="bilder"
      className="on-ink scroll-mt-24 px-4 py-16 md:px-8 md:py-24"
      aria-label="Bilder"
      onPointerMove={onMove}
      onPointerLeave={() => pointerY.set(0)}
    >
      <div className="mx-auto grid max-w-[86rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:items-start md:gap-14">
        <div className="min-w-0">
          <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
            Fra passet
          </h2>

          <ul className="mt-8 md:mt-10">
            {SHOTS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") select(i);
                    }}
                    onClick={() => select(i)}
                    onFocus={() => select(i)}
                    aria-current={on ? "true" : undefined}
                    className="group relative flex w-full items-baseline gap-4 border-t border-t-[var(--rule)] py-3 text-left md:gap-6 md:py-3.5"
                  >
                    <span
                      className="figure-num w-8 shrink-0 text-sm transition-colors duration-300 md:text-base"
                      style={{ color: on ? "var(--color-red)" : "var(--fg-mute)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.span
                      className="sign min-w-0 flex-1 truncate text-xl md:text-[1.7rem]"
                      animate={{
                        x: on && !reduce ? 10 : 0,
                        color: on
                          ? "var(--color-chalk)"
                          : "oklch(0.6604 0.0138 34)",
                      }}
                      transition={{ duration: 0.34, ease: EASE }}
                    >
                      {s.name}
                    </motion.span>
                    <span className="sr-only">{s.note}</span>

                    {s.dish ? (
                      <span
                        className="figure-num shrink-0 text-sm transition-colors duration-300 md:text-base"
                        style={{ color: on ? "var(--color-red)" : "var(--fg-mute)" }}
                      >
                        Nr. {s.dish}
                      </span>
                    ) : null}

                    {on && !reduce ? (
                      <motion.span
                        layoutId="pass-underline"
                        className="absolute inset-x-0 bottom-0 h-[2px]"
                        style={{ background: "var(--color-red)" }}
                        transition={{ duration: 0.42, ease: EASE }}
                        aria-hidden
                      />
                    ) : null}
                  </button>

                  {/* Touch has no hover, and a stage above a ten row list puts
                      the photograph off screen by the time you reach the
                      bottom of it. On narrow viewports the photograph opens
                      under the row you touched instead. */}
                  <motion.div
                    className="overflow-hidden md:hidden"
                    initial={false}
                    animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.44, ease: EASE }}
                    aria-hidden={!on}
                  >
                    <div
                      className="relative mt-1 aspect-[4/3] w-full overflow-hidden"
                      style={{ border: "3px solid var(--color-chalk)" }}
                    >
                      <img
                        src={asset(`/photos/${s.id}@800.webp`)}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                        loading={warm || i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                    <p className="mt-2 pb-2" style={{ color: "var(--fg)" }}>
                      {s.note}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 hidden text-lg md:block" style={{ color: "var(--fg)" }}>
            {current.note}
          </p>
        </div>

        {/* The stage. Every photograph is mounted at once and revealed with a
            wipe, so switching rows never waits on a network request and never
            flashes an empty frame. */}
        <motion.div
          className="relative hidden w-full overflow-hidden md:sticky md:top-24 md:block md:aspect-[4/3]"
          style={{
            border: "3px solid var(--color-chalk)",
            y: reduce ? 0 : driftY,
            rotate: reduce ? 0 : tilt,
          }}
        >
          {SHOTS.map((s, i) => {
            const on = i === active;
            return (
              <motion.img
                key={s.id}
                src={asset(`/photos/${s.id}@800.webp`)}
                srcSet={`${asset(`/photos/${s.id}@800.webp`)} 800w, ${asset(
                  `/photos/${s.id}.webp`,
                )} 1600w`}
                sizes="(min-width: 768px) 44vw, 92vw"
                alt={on ? `${s.name}. ${s.note}.` : ""}
                aria-hidden={!on}
                className="absolute inset-0 size-full object-cover"
                style={{ zIndex: on ? 2 : 1 }}
                initial={false}
                animate={{
                  clipPath: on
                    ? "inset(0% 0% 0% 0%)"
                    : down
                      ? "inset(0% 0% 100% 0%)"
                      : "inset(100% 0% 0% 0%)",
                  opacity: on ? 1 : 0.999,
                }}
                transition={{ duration: reduce ? 0 : 0.66, ease: EASE }}
                loading={warm || i < 2 ? "eager" : "lazy"}
                fetchPriority={i < 2 ? "auto" : "low"}
                decoding="async"
                draggable={false}
              />
            );
          })}

          <div
            className="absolute bottom-0 left-0 z-10 flex items-baseline gap-3 px-3 py-2"
            style={{ background: "var(--color-ink)" }}
          >
            <span className="figure-num text-sm" style={{ color: "var(--color-red)" }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="tag" style={{ color: "var(--color-chalk)" }}>
              {current.name}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
