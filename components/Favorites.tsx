import { FAVORITES } from "@/content/favorites";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/Reveal";

/**
 * A board, not a carousel. Nothing here has to be operated to be read: five
 * rows, every one legible on arrival, which is the point the photo stack
 * missed. The number is set at display size because that is what people say
 * out loud when they order.
 */
export function Favorites() {
  return (
    <section className="on-chalk px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[76rem]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
            Husets fem
          </h2>
          <a
            href={asset("/meny/")}
            className="tag underline underline-offset-4"
            style={{ color: "var(--mark)" }}
          >
            Hele menyen, 108 retter
          </a>
        </div>

        <ul className="mt-10">
          {FAVORITES.map((d, i) => (
            <Reveal
              as="li"
              key={d.no}
              index={i}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-t border-t-[var(--rule)] py-7 md:grid-cols-[6rem_1fr_auto] md:gap-x-8"
            >
              <span
                className="figure-num text-4xl md:text-6xl"
                style={{ color: "var(--mark)" }}
              >
                {d.no}
              </span>

              <div className="min-w-0">
                <h3
                  className="sign text-2xl md:text-4xl"
                  style={{ color: "var(--fg-strong)" }}
                >
                  {d.name}
                </h3>
                <p className="mt-2 max-w-[52ch]">{d.desc}</p>
              </div>

              <span
                className="figure-num col-start-2 text-xl md:col-start-3 md:text-2xl"
                style={{ color: "var(--fg-strong)" }}
              >
                {d.price},&ndash;
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
