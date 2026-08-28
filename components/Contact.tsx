"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, DAY_NO } from "@/lib/hours";
import { LINKS } from "@/lib/links";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/** The only place the full week is written out. Everywhere else says what is
    true right now. */
export function Contact() {
  const { day, minutes, mounted } = useHeat();

  return (
    <section id="finn-oss" className="on-ink scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[76rem]">
        <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
          Finn oss
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <p className="text-2xl leading-snug" style={{ color: "var(--fg-strong)" }}>
              Storgata 61
              <br />
              2609 Lillehammer
            </p>
            <p className="mt-3">Inngangen er fra bakgården, ikke fra gågata.</p>
            <a
              href={LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="tag mt-5 inline-block px-5 py-3"
              style={{ border: "1.5px solid var(--fg-strong)", color: "var(--fg-strong)" }}
            >
              Åpne i kart
            </a>
          </div>

          <div>
            <a
              href={LINKS.phone}
              className="figure-num block text-4xl md:text-5xl"
              style={{ color: "var(--fg-strong)" }}
            >
              {LINKS.phoneLabel}
            </a>
            <p className="mt-3 max-w-[34ch]">
              Bord, takeaway og store selskap går raskest på telefon.
            </p>
            <p className="mt-5 flex gap-5">
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="tag" style={{ color: "var(--fg-strong)" }}>
                Instagram
              </a>
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="tag" style={{ color: "var(--fg-strong)" }}>
                Facebook
              </a>
            </p>
          </div>

          <table className="w-full border-collapse self-start">
            <caption className="tag pb-3 text-left" style={{ color: "var(--fg-mute)" }}>
              Åpningstider
            </caption>
            <tbody>
              {HOURS.map((w, i) => {
                const today = mounted && i === day;
                const live = today && minutes >= w.open && minutes < w.close;
                return (
                  <tr key={i} style={{ borderTop: "1px solid var(--rule)" }}>
                    <th
                      scope="row"
                      className="tag py-2.5 text-left font-semibold"
                      style={{ color: today ? "var(--fg-strong)" : "var(--fg-mute)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block size-1.5"
                          style={{ background: live ? "var(--mark)" : "transparent" }}
                          aria-hidden
                        />
                        {DAY_NO[i]}
                      </span>
                    </th>
                    <td
                      className="figure-num py-2.5 text-right"
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
    </section>
  );
}
