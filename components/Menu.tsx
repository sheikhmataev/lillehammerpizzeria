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
      className="grid grid-cols-[2.9rem_1fr] gap-x-3 py-4"
      style={{ borderTop: "1px solid var(--edge-soft)" }}
    >
      <span
        className="led pt-1.5 text-[0.9rem]"
        style={{ color: dish.no ? "var(--accent)" : "transparent" }}
      >
        {dish.no ?? "—"}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className="type-condensed text-[1.4rem] md:text-[1.6rem]"
            style={{ color: "var(--fg-strong)" }}
          >
            {dish.name}
            {dish.spicy && (
              <span
                className="label ml-2 align-middle text-[0.7rem]"
                style={{ color: "var(--accent)" }}
              >
                Sterk
              </span>
            )}
            {dish.vegan && (
              <span
                className="label ml-2 align-middle text-[0.7rem]"
                style={{ color: "var(--color-sage)" }}
              >
                Vegan
              </span>
            )}
          </h3>
          <span className="led text-[0.95rem]" style={{ color: "var(--fg-strong)" }}>
            <Price dish={dish} />
          </span>
        </div>

        {dish.desc && (
          <p
            className="mt-1.5 max-w-[52ch] text-[0.98rem] leading-snug"
            style={{ color: "var(--fg)" }}
          >
            {dish.desc}
          </p>
        )}

        {dish.allergens && (
          <p
            className="label mt-2 text-[0.7rem]"
            style={{ color: "var(--fg-mute)" }}
          >
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
          className="type-expanded text-[1.9rem] md:text-[2.25rem]"
          style={{ color: "var(--fg-strong)" }}
        >
          {section.title}
        </h2>
        {section.sizeHeadings && (
          <span className="label flex gap-4 text-[0.7rem]" style={{ color: "var(--fg-mute)" }}>
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
          className="max-w-[62ch] pb-3 text-[0.95rem] leading-snug"
          style={{ color: "var(--fg-mute)" }}
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
          className="mt-6 grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 p-4 text-[0.95rem]"
          style={{ border: "1px solid var(--edge)", color: "var(--fg-mute)" }}
        >
          {section.extras.map((e) => (
            <div key={e.label} className="contents">
              <dt>{e.label}</dt>
              <dd className="led text-right text-[0.95rem]" style={{ color: "var(--fg-strong)" }}>
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
    <div id="meny" className="hairline-t scroll-mt-20 px-4 pb-20 pt-6 md:px-8 md:pt-14">
      <div
        className="sticky top-[3.6rem] z-30 -mx-4 mb-10 flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 md:-mx-8 md:px-8"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--edge-soft)",
        }}
      >
        <label className="flex min-w-[13rem] flex-1 items-center gap-3">
          <span className="label shrink-0" style={{ color: "var(--fg-mute)" }}>
            Søk
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="kebab, 25, vegan"
            className="w-full bg-transparent py-1.5 text-[1rem] outline-none"
            style={{
              color: "var(--fg-strong)",
              borderBottom: "1px solid var(--edge)",
            }}
          />
        </label>

        <span className="led" style={{ color: "var(--fg-mute)" }}>
          {shown} av {DISH_COUNT}
        </span>

        <nav
          className="label -mb-1 flex w-full gap-6 overflow-x-auto pb-1"
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

      {sections.length === 0 ? (
        <p className="label py-16" style={{ color: "var(--fg-mute)" }}>
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
