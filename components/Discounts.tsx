import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { BigNumber } from "@/components/BigNumber";
import { asset } from "@/lib/asset";

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
        style={{ backgroundImage: `url(${asset("/paper.webp")})`, backgroundSize: "460px 460px" }}
      />
      <Motif
        name="skewer"
        size={340}
        className="pointer-events-none absolute -bottom-16 right-[-4rem] -z-10 rotate-12 opacity-[0.10]"
      />

      <div className="mx-auto grid max-w-[76rem] items-center gap-8 md:grid-cols-[auto_1fr] md:gap-16">
        <BigNumber />

        <div className="flex flex-col gap-6">
          <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
            Til de som stiller opp
          </h2>

          <ul className="flex flex-wrap gap-2.5">
            {GROUPS.map((g, i) => (
              <Reveal
                as="li"
                key={g}
                index={i}
                y={10}
                className="sign border-[1.5px] border-[var(--fg-strong)] px-4 py-2.5 text-lg text-[var(--fg-strong)] md:text-xl"
              >
                {g}
              </Reveal>
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
