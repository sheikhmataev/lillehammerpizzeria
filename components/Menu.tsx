"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MENU, DISH_COUNT, type Dish, type Section } from "@/content/menu";

const norm = (s: string) =>
  s.toLowerCase().replace(/[øö]/g, "o").replace(/[æä]/g, "a").replace(/å/g, "a");

function matches(dish: Dish, q: string) {
  if (!q) return true;
  const hay = norm(`${dish.no ?? ""} ${dish.name} ${dish.desc ?? ""}`);
  return norm(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

function Price({ dish }: { dish: Dish }) {
  if (dish.sizes) {
    return (
      <span className="flex shrink-0 gap-4 tabular-nums">
        {dish.sizes.map((s) => (
          <span key={s.label} className="w-14 text-right">
            {s.price}
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className="w-14 shrink-0 text-right tabular-nums">{dish.price}</span>
  );
}

function Row({ dish }: { dish: Dish }) {
  return (
    <li
      className="grid grid-cols-[2.75rem_1fr] gap-x-3 py-3"
      style={{ borderTop: "1px solid var(--edge)" }}
    >
      <span
        className="led pt-[3px] tabular-nums"
        style={{ color: dish.no ? "var(--accent)" : "transparent" }}
      >
        {dish.no ?? "—"}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className="type-condensed text-[1.35rem] md:text-2xl"
            style={{ color: "var(--fg-strong)" }}
          >
            {dish.name}
            {dish.spicy && (
              <span
                className="led ml-2 align-middle"
                style={{ color: "var(--accent)" }}
                title="Sterk"
              >
                sterk
              </span>
            )}
            {dish.vegan && (
              <span
                className="led ml-2 align-middle"
                style={{ color: "var(--color-sage)" }}
              >
                vegan
              </span>
            )}
          </h3>
          <span className="led" style={{ color: "var(--fg-strong)" }}>
            <Price dish={dish} />
          </span>
        </div>

        {dish.desc && (
          <p className="mt-1 max-w-[52ch] text-[0.92rem] leading-snug">
            {dish.desc}
          </p>
        )}

        {dish.allergens && (
          <p className="led mt-1.5" style={{ color: "var(--fg)", opacity: 0.62 }}>
            {dish.allergens.join(" · ")}
          </p>
        )}
      </div>
    </li>
  );
}

function Block({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-24 pt-14 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-1">
        <h2
          className="type-expanded text-3xl md:text-4xl"
          style={{ color: "var(--fg-strong)" }}
        >
          {section.title}
        </h2>
        {section.sizeHeadings && (
          <span className="led flex gap-4" style={{ color: "var(--fg)" }}>
            {section.sizeHeadings.map((h) => (
              <span key={h} className="w-14 text-right">
                {h}
              </span>
            ))}
          </span>
        )}
      </div>

      {section.note && (
        <p
          className="max-w-[64ch] pb-3 text-[0.86rem] leading-snug"
          style={{ color: "var(--fg)", opacity: 0.72 }}
        >
          {section.note}
        </p>
      )}

      <ul>
        {section.dishes.map((d) => (
          <Row key={`${section.id}-${d.no ?? d.name}`} dish={d} />
        ))}
      </ul>

      {section.extras && (
        <dl
          className="led mt-5 grid grid-cols-[1fr_auto] gap-x-8 gap-y-1.5 p-4"
          style={{ border: "1px solid var(--edge)", color: "var(--fg)" }}
        >
          {section.extras.map((e) => (
            <div key={e.label} className="contents">
              <dt>{e.label}</dt>
              <dd className="text-right tabular-nums" style={{ color: "var(--fg-strong)" }}>
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
      MENU.map((s) => ({ ...s, dishes: s.dishes.filter((d) => matches(d, q)) }))
        .filter((s) => s.dishes.length > 0),
    [q],
  );

  const shown = sections.reduce((n, s) => n + s.dishes.length, 0);

  return (
    <div id="meny" className="px-5 pb-24 pt-6 md:px-8 md:pt-14">
      <div
        className="sticky top-0 z-30 -mx-5 mb-8 flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3 md:-mx-8 md:px-8"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--edge)",
        }}
      >
        <label className="flex min-w-[13rem] flex-1 items-center gap-3">
          <span className="led shrink-0" style={{ color: "var(--fg)" }}>
            Søk
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="kebab, 25, vegan"
            className="led w-full bg-transparent py-1 outline-none"
            style={{
              color: "var(--fg-strong)",
              borderBottom: "1px solid var(--edge)",
            }}
          />
        </label>

        <span className="led tabular-nums" style={{ color: "var(--fg)" }}>
          {shown} av {DISH_COUNT}
        </span>

        <nav
          className="led -mb-1 flex w-full gap-5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
          aria-label="Kategorier"
        >
          {MENU.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 whitespace-nowrap"
              style={{ color: "var(--fg)" }}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {sections.length === 0 ? (
        <p className="led py-16" style={{ color: "var(--fg)" }}>
          Ingenting het det. Prøv «kebab» eller et nummer.
        </p>
      ) : (
        <div className="md:columns-2 md:gap-x-14">
          {sections.map((s) => (
            <div key={s.id} className="break-inside-avoid-column">
              <Block section={s} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
