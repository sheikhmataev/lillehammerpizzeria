"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { MENU, DISH_COUNT, type Dish, type Section } from "@/content/menu";
import { Motif, type MotifName } from "@/components/Motif";
import { useEntrance } from "@/lib/use-entrance";

const SECTION_MOTIF: Record<string, MotifName> = {
  pizza: "peel",
  italiensk: "peel",
  innbakt: "peel",
  tyrkisk: "skewer",
  kjott: "flame",
  burger: "flame",
  pasta: "tea",
  fisk: "tea",
  vegetar: "tea",
  salat: "tea",
  forrett: "tea",
  barn: "hill",
  dessert: "tea",
  kaffe: "tea",
  mineralvann: "tea",
};

const EASE = [0.16, 1, 0.3, 1] as const;

const norm = (s: string) =>
  s.toLowerCase().replace(/[øö]/g, "o").replace(/[æä]/g, "a").replace(/å/g, "a");

function matches(dish: Dish, q: string) {
  if (!q) return true;
  const hay = norm(`${dish.no ?? ""} ${dish.name} ${dish.desc ?? ""}`);
  return norm(q).split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
}

/**
 * People here order by number, and the numbers are grouped: pizza is the 1s
 * and 2s, the Turkish plates are the 80s, burgers are the 140s and 150s.
 * Printing each category's range in the rail teaches that system instead of
 * hiding it, so a regular can jump straight to the right block.
 */
function numberRange(s: Section): string | null {
  const nos = s.dishes.map((d) => d.no).filter(Boolean) as string[];
  if (nos.length === 0) return null;
  const numeric = nos.filter((n) => /^\d+$/.test(n)).map(Number);
  if (numeric.length !== nos.length) return nos.join(" ");
  const lo = Math.min(...numeric);
  const hi = Math.max(...numeric);
  return lo === hi ? `${lo}` : `${lo}–${hi}`;
}

function Price({ dish }: { dish: Dish }) {
  if (dish.sizes) {
    return (
      <span className="flex shrink-0 gap-5">
        {dish.sizes.map((s) => (
          <span key={s.label} className="w-14 text-right">
            {s.price}
          </span>
        ))}
      </span>
    );
  }
  return <span className="w-14 shrink-0 text-right">{dish.price}</span>;
}

function Row({
  dish,
  index,
  animate,
}: {
  dish: Dish;
  index: number;
  animate: boolean;
}) {
  return (
    <motion.li
      className="grid grid-cols-[3rem_1fr] gap-x-4 py-5"
      style={{ borderTop: "1px solid var(--rule)" }}
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: Math.min(index, 12) * 0.022,
        ease: EASE,
      }}
    >
      <span
        className="figure-num pt-0.5 text-2xl"
        style={{ color: dish.no ? "var(--mark)" : "transparent" }}
      >
        {dish.no ?? "0"}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-5">
          <h3 className="sign text-[1.5rem] md:text-[1.75rem]" style={{ color: "var(--fg-strong)" }}>
            {dish.name}
            {dish.spicy && (
              <span className="tag ml-2.5 align-middle" style={{ color: "var(--mark)" }}>
                Sterk
              </span>
            )}
            {dish.vegan && (
              <span className="tag ml-2.5 align-middle" style={{ color: "var(--fg-mute)" }}>
                Vegan
              </span>
            )}
          </h3>
          <span
            className="figure-num shrink-0 text-lg md:text-xl"
            style={{ color: "var(--fg-strong)" }}
          >
            <Price dish={dish} />
          </span>
        </div>

        {dish.desc && <p className="mt-1.5 max-w-[54ch] leading-snug">{dish.desc}</p>}

        {dish.allergens && (
          <p className="tag mt-2.5" style={{ color: "var(--fg-mute)" }}>
            {dish.allergens.join(" · ")}
          </p>
        )}
      </div>
    </motion.li>
  );
}

function SizeHeadings({ section }: { section: Section }) {
  if (!section.sizeHeadings) return null;
  return (
    <span className="tag flex gap-5" style={{ color: "var(--fg-mute)" }}>
      {section.sizeHeadings.map((h) => (
        <span key={h} className="w-14 text-right">
          {h}
        </span>
      ))}
    </span>
  );
}

export function Menu() {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query);
  const [active, setActive] = useState(MENU[0].id);
  const reduce = useReducedMotion();
  const play = useEntrance();
  const animate = play && !reduce;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chipRow = useRef<HTMLDivElement | null>(null);

  /* Deep links still work: /meny/#tyrkisk opens that category. */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && MENU.some((s) => s.id === id)) setActive(id);
  }, []);

  const select = useCallback((id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  }, []);

  /* Keep the active chip in view on mobile, otherwise the selection can sit
     off-screen after a jump from a deep link. */
  useEffect(() => {
    const el = chipRow.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const hits = useMemo(
    () =>
      MENU.map((s) => ({ ...s, dishes: s.dishes.filter((d) => matches(d, q)) })),
    [q],
  );
  const searching = q.trim().length > 0;
  const results = hits.filter((s) => s.dishes.length > 0);
  const total = results.reduce((n, s) => n + s.dishes.length, 0);
  const current = hits.find((s) => s.id === active) ?? hits[0];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = MENU.findIndex((s) => s.id === active);
    const step =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : e.key === "Home"
            ? -i
            : e.key === "End"
              ? MENU.length - 1 - i
              : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + MENU.length) % MENU.length;
    select(MENU[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div id="top" className="on-chalk min-h-screen">
      <header className="px-4 pb-6 pt-28 md:px-8 md:pt-36">
        <div className="mx-auto max-w-[80rem]">
          <h1 className="display-xl" style={{ color: "var(--fg-strong)" }}>
            Menyen
          </h1>
          <p className="mt-4 max-w-[44ch] text-lg">
            Velg en kategori, eller søk hvis du vet hva du vil ha. Numrene er de
            samme som på papirmenyen.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-0 px-4 pb-28 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-12 md:px-8">
        {/* Categories. A rail on desktop, a chip row on mobile. Both are the
            same tablist, so the keyboard behaviour is identical. */}
        <div
          className="sticky top-[3.5rem] z-20 -mx-4 h-fit min-w-0 px-4 md:top-24 md:mx-0 md:px-0"
          style={{ background: "var(--bg)" }}
        >
          <label className="flex items-baseline gap-3 pb-1 pt-3">
            <span className="sr-only">Søk i menyen</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Søk rett eller nummer"
              className="w-full bg-transparent pb-2 text-lg outline-none"
              style={{ color: "var(--fg-strong)", borderBottom: "2px solid var(--rule)" }}
            />
            {searching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="tag shrink-0"
                style={{ color: "var(--mark)" }}
              >
                Tøm
              </button>
            )}
          </label>

          <div
            ref={chipRow}
            role="tablist"
            aria-label="Kategorier"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex min-w-0 gap-1 overflow-x-auto py-3 md:flex-col md:overflow-visible"
            style={{ scrollbarWidth: "none" }}
          >
          {MENU.map((s, i) => {
            const on = s.id === active && !searching;
            const hitCount = hits[i].dishes.length;
            const dimmed = searching && hitCount === 0;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={on}
                aria-controls={`panel-${s.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => {
                  setQuery("");
                  select(s.id);
                }}
                aria-label={`${s.title}, ${searching ? `${hitCount} treff` : (numberRange(s) ?? `${s.dishes.length} retter`)}`}
                className="relative shrink-0 whitespace-nowrap px-3 py-2.5 text-left md:px-4"
                style={{ opacity: dimmed ? 0.35 : 1 }}
              >
                {on && (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute inset-0 -z-10"
                    style={{ background: "var(--color-red-deep)" }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                  />
                )}
                <span
                  className="sign block text-base md:text-lg"
                  style={{ color: on ? "var(--color-chalk)" : "var(--fg-strong)" }}
                >
                  {s.title}
                </span>
                <span
                  className="figure-num hidden text-sm md:block"
                  style={{ color: on ? "oklch(0.86 0.05 28.4)" : "var(--fg-mute)" }}
                >
                  {searching ? `${hitCount} treff` : (numberRange(s) ?? `${s.dishes.length} stk`)}
                </span>
              </button>
            );
          })}
          </div>
        </div>

        {searching ? (
          <div className="min-w-0 pt-6 md:pt-0">
            <p className="tag pb-2" style={{ color: "var(--fg-mute)" }} aria-live="polite">
              {total} av {DISH_COUNT} retter
            </p>
            {results.length === 0 ? (
              <p className="max-w-[40ch] py-16 text-xl">
                Ingenting het det. Prøv «kebab», «vegan» eller et nummer, for
                eksempel 25.
              </p>
            ) : (
              results.map((s) => (
                <section key={s.id} className="pt-10 first:pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h2 className="sign text-2xl" style={{ color: "var(--fg-strong)" }}>
                      {s.title}
                    </h2>
                    <SizeHeadings section={s} />
                  </div>
                  <ul className="mt-3">
                    {s.dishes.map((d, i) => (
                      <Row key={d.no ?? d.name} dish={d} index={i} animate={false} />
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        ) : (
          <section
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            tabIndex={-1}
            className="relative min-w-0 pt-6 md:pt-0"
          >
            <Motif
              name={SECTION_MOTIF[current.id] ?? "tea"}
              size={200}
              className="pointer-events-none absolute -top-6 right-0 opacity-[0.08]"
            />

            <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
                {current.title}
              </h2>
              <SizeHeadings section={current} />
            </div>

            {current.note && (
              <p className="relative mt-3 max-w-[62ch] leading-snug" style={{ color: "var(--fg-mute)" }}>
                {current.note}
              </p>
            )}

            <ul className="relative mt-5">
              {current.dishes.map((d, i) => (
                <Row key={d.no ?? d.name} dish={d} index={i} animate={animate} />
              ))}
            </ul>

            {current.extras && (
              <dl
                className="mt-8 grid max-w-[34rem] grid-cols-[1fr_auto] gap-x-8 gap-y-2 p-5"
                style={{ border: "1px solid var(--rule)", color: "var(--fg-mute)" }}
              >
                {current.extras.map((e) => (
                  <div key={e.label} className="contents">
                    <dt>{e.label}</dt>
                    <dd className="figure-num text-right" style={{ color: "var(--fg-strong)" }}>
                      {e.price}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
