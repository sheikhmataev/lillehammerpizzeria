"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, DAY_NO } from "@/lib/hours";
import { LINKS, ORDERING_LIVE } from "@/lib/links";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/**
 * The one place opening hours live in full. Everywhere else on the page shows
 * only what is true right now, so the same table is never repeated.
 */
export function Contact() {
  const { day, minutes, mounted } = useHeat();

  return (
    <section
      id="kontakt"
      className="hairline-t scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
    >
      <h2 className="section-title" style={{ color: "var(--fg-strong)" }}>
        Finn oss
      </h2>

      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="label" style={{ color: "var(--fg-mute)" }}>
              Adresse
            </h3>
            <p className="mt-2 text-xl leading-snug" style={{ color: "var(--fg-strong)" }}>
              Storgata 61
              <br />
              2609 Lillehammer
            </p>
            <p className="mt-2" style={{ color: "var(--fg)" }}>
              Inngang fra bakgården, ikke fra gågata.
            </p>
            <a
              href={LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-4 inline-block px-4 py-2.5"
              style={{ border: "1px solid var(--edge)", color: "var(--fg-strong)" }}
            >
              Åpne i kart
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="label" style={{ color: "var(--fg-mute)" }}>
              Ring oss
            </h3>
            <a
              href={LINKS.phone}
              className="type-expanded mt-2 block text-3xl md:text-4xl"
              style={{ color: "var(--fg-strong)" }}
            >
              {LINKS.phoneLabel}
            </a>
            <p className="mt-2" style={{ color: "var(--fg)" }}>
              Bord, takeaway og store selskap. Telefonen er den raskeste veien
              inn.
            </p>
          </div>

          <div>
            <h3 className="label" style={{ color: "var(--fg-mute)" }}>
              Følg oss
            </h3>
            <p className="mt-2 flex gap-5">
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-strong)" }}>
                Instagram
              </a>
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-strong)" }}>
                Facebook
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="label" style={{ color: "var(--fg-mute)" }}>
            Åpningstider
          </h3>
          <table className="mt-2 w-full border-collapse">
            <tbody>
              {HOURS.map((w, i) => {
                const today = mounted && i === day;
                const live = today && minutes >= w.open && minutes < w.close;
                return (
                  <tr key={i} style={{ borderTop: "1px solid var(--edge-soft)" }}>
                    <th
                      scope="row"
                      className="label py-2.5 text-left font-medium"
                      style={{ color: today ? "var(--fg-strong)" : "var(--fg-mute)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block size-1.5"
                          style={{ background: live ? "var(--accent)" : "transparent" }}
                          aria-hidden
                        />
                        {DAY_NO[i]}
                      </span>
                    </th>
                    <td
                      className="led py-2.5 text-right"
                      style={{ color: today ? "var(--fg-strong)" : "var(--fg)" }}
                    >
                      {hhmm(w.open)}&ndash;{hhmm(w.close)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="bestill"
        className="mt-14 scroll-mt-20 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8"
        style={{ border: "1px solid var(--edge)" }}
      >
        <div>
          <h3 className="type-condensed text-2xl md:text-3xl" style={{ color: "var(--fg-strong)" }}>
            Bestill bord eller takeaway
          </h3>
          <p className="mt-2 max-w-[46ch]" style={{ color: "var(--fg)" }}>
            {ORDERING_LIVE
              ? "Bord bookes på nett. Takeaway bestilles og betales før du henter."
              : "Nettbestilling kommer. Inntil da tar vi bordet og takeawayen på telefon."}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          {ORDERING_LIVE ? (
            <>
              <a
                href={LINKS.bookTable}
                target="_blank"
                rel="noopener noreferrer"
                className="label px-6 py-3.5"
                style={{ background: "var(--accent)", color: "var(--surface)" }}
              >
                Bord
              </a>
              <a
                href={LINKS.takeaway}
                target="_blank"
                rel="noopener noreferrer"
                className="label px-6 py-3.5"
                style={{ border: "1px solid var(--edge)", color: "var(--fg-strong)" }}
              >
                Takeaway
              </a>
            </>
          ) : (
            <a
              href={LINKS.phone}
              className="label px-6 py-3.5"
              style={{ background: "var(--accent)", color: "var(--surface)" }}
            >
              Ring {LINKS.phoneLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
