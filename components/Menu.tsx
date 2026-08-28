"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MENU, DISH_COUNT, type Dish, type Section } from "@/content/menu";
import { Motif, type MotifName } from "@/components/Motif";

/** A drawn mark per category, so the eye can find a section without reading. */
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

const norm = (s: string) =>
  s.toLowerCase().replace(/[øö]/g, "o").replace(/[æä]/g, "a").replace(/å/g, "a");

function matches(dish: Dish, q: string) {
  if (!q) return true;
  const hay = norm(`${dish.no ?? ""} ${dish.name} ${dish.desc ?? ""}`);
  return norm(q).split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
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

function Row({ dish }: { dish: Dish }) {
  return (
    <li
      className="grid grid-cols-[3rem_1fr] gap-x-4 py-5"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <span
        className="figure-num pt-0.5 text-2xl"
        style={{ color: dish.no ? "var(--mark)" : "transparent" }}
      >
        {dish.no ?? "0"}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-5">
          <h3
            className="sign text-[1.5rem] md:text-[1.75rem]"
            style={{ color: "var(--fg-strong)" }}
          >
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
    </li>
  );
}

function Block({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      className="relative scroll-mt-32 break-inside-avoid-column pt-14 first:pt-0"
    >
      {/* The drawn marks only read at size, so they are watermarks behind the
          heading rather than little icons beside it. */}
      <Motif
        name={SECTION_MOTIF[section.id] ?? "tea"}
        size={132}
        className="pointer-events-none absolute right-0 top-8 opacity-[0.09]"
      />
      <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
          {section.title}
        </h2>
        {section.sizeHeadings && (
          <span className="tag flex gap-5" style={{ color: "var(--fg-mute)" }}>
            {section.sizeHeadings.map((h) => (
              <span key={h} className="w-14 text-right">
                {h}
              </span>
            ))}
          </span>
        )}
      </div>

      {section.note && (
        <p className="mt-3 max-w-[62ch] leading-snug" style={{ color: "var(--fg-mute)" }}>
          {section.note}
        </p>
      )}

      <ul className="mt-4">
        {section.dishes.map((d) => (
          <Row key={`${section.id}-${d.no ?? d.name}`} dish={d} />
        ))}
      </ul>

      {section.extras && (
        <dl
          className="mt-6 grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 p-5"
          style={{ border: "1px solid var(--rule)", color: "var(--fg-mute)" }}
        >
          {section.extras.map((e) => (
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
  );
}

export function Menu() {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query);

  const sections = useMemo(
    () =>
      MENU.map((s) => ({ ...s, dishes: s.dishes.filter((d) => matches(d, q)) })).filter(
        (s) => s.dishes.length > 0,
      ),
    [q],
  );
  const shown = sections.reduce((n, s) => n + s.dishes.length, 0);

  return (
    <div className="on-chalk min-h-screen">
      <header className="px-4 pb-8 pt-28 md:px-8 md:pt-36">
        <div className="mx-auto max-w-[76rem]">
          <h1 className="display-xl" style={{ color: "var(--fg-strong)" }}>
            Menyen
          </h1>
          <p className="mt-4 max-w-[46ch] text-xl">
            Alt vi lager, med nummer og pris. Søk på navn, ingrediens eller
            nummeret du pleier å bestille.
          </p>
        </div>
      </header>

      <div
        className="sticky top-0 z-30"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--rule)" }}
      >
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:px-8">
          <label className="flex min-w-[14rem] flex-1 items-baseline gap-3">
            <span className="tag shrink-0" style={{ color: "var(--fg-mute)" }}>
              Søk
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="kebab, 25, vegan"
              className="w-full bg-transparent py-1.5 text-lg outline-none"
              style={{ color: "var(--fg-strong)", borderBottom: "1px solid var(--rule)" }}
            />
          </label>
          <span className="figure-num" style={{ color: "var(--fg-mute)" }}>
            {shown} / {DISH_COUNT}
          </span>
          <nav
            className="tag flex w-full gap-6 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
            aria-label="Kategorier"
          >
            {MENU.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 whitespace-nowrap"
                style={{ color: "var(--fg-mute)" }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[76rem] px-4 pb-28 pt-10 md:px-8">
        {sections.length === 0 ? (
          <p className="py-20 text-xl">
            Ingenting het det. Prøv «kebab», «vegan» eller et nummer.
          </p>
        ) : (
          <div className="md:columns-2 md:gap-x-16">
            {sections.map((s) => (
              <Block key={s.id} section={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
