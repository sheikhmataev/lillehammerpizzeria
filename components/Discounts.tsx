import { Motif } from "@/components/Motif";

const GROUPS = ["Student", "Helsevesen", "Brannvesen", "Forsvaret", "Politiet"];

/**
 * All five groups get the same number, so the number is said once and set
 * enormous instead of repeated down five identical rows.
 */
export function Discounts() {
  return (
    <section id="rabatt" className="on-red relative isolate scroll-mt-24 overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: "url(/paper.webp)", backgroundSize: "460px 460px" }}
      />
      <Motif
        name="skewer"
        size={340}
        className="pointer-events-none absolute -bottom-16 right-[-4rem] -z-10 rotate-12 opacity-[0.10]"
      />

      <div className="mx-auto grid max-w-[76rem] items-center gap-8 md:grid-cols-[auto_1fr] md:gap-16">
        <p
          className="figure-num leading-[0.8]"
          style={{ color: "var(--fg-strong)", fontSize: "clamp(6rem, 22vw, 15rem)" }}
        >
          20<span style={{ fontSize: "0.42em" }}>%</span>
        </p>

        <div className="flex flex-col gap-6">
          <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
            Til de som stiller opp
          </h2>

          <ul className="flex flex-wrap gap-2.5">
            {GROUPS.map((g) => (
              <li
                key={g}
                className="sign px-4 py-2.5 text-lg md:text-xl"
                style={{ border: "1.5px solid var(--fg-strong)", color: "var(--fg-strong)" }}
              >
                {g}
              </li>
            ))}
          </ul>

          <p className="max-w-[54ch]" style={{ color: "var(--fg-mute)" }}>
            Gjelder takeaway og spising hos oss, ikke ved utkjøring. Vis
            legitimasjon når du bestiller.
          </p>
        </div>
      </div>
    </section>
  );
}
