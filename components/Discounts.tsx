const GROUPS = ["Student", "Helsevesen", "Brannvesenet", "Forsvaret", "Politiet"];

/**
 * Every group gets the same 20 percent, so the number is stated once and made
 * large rather than repeated down five identical rows.
 */
export function Discounts() {
  return (
    <section
      id="rabatt"
      className="hairline-t scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="section-title" style={{ color: "var(--fg-strong)" }}>
            Rabatt&shy;avtaler
          </h2>
          <p className="mt-4 max-w-[34ch]" style={{ color: "var(--fg)" }}>
            Vi heier på de gode hjelperne i samfunnet, og belønner dem med gode
            priser i restauranten.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span
              className="type-expanded"
              style={{
                color: "var(--accent)",
                fontSize: "clamp(4.5rem, 13vw, 11rem)",
              }}
            >
              20%
            </span>
            <span className="label pb-2" style={{ color: "var(--fg)" }}>
              til alle under
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-3 gap-y-3">
            {GROUPS.map((g) => (
              <li
                key={g}
                className="type-condensed px-4 py-2.5 text-2xl md:text-3xl"
                style={{
                  border: "1px solid var(--edge)",
                  color: "var(--fg-strong)",
                }}
              >
                {g}
              </li>
            ))}
          </ul>

          <p
            className="max-w-[56ch] text-[0.95rem]"
            style={{ color: "var(--fg-mute)" }}
          >
            <strong style={{ color: "var(--fg)" }}>NB.</strong> Rabatten gjelder
            takeaway og spising i restauranten. Den gjelder ikke ved utkjøring.
            Vis legitimasjon når du bestiller.
          </p>
        </div>
      </div>
    </section>
  );
}
