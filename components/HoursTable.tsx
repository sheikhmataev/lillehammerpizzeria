"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, DAY_NO } from "@/lib/hours";

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

/* Opening hours are the most-searched thing on any restaurant site, so they
   sit in the first screen rather than in a footer. The live row is marked,
   which is also what makes the page feel awake. */
export function HoursTable() {
  const { day, minutes, mounted } = useHeat();

  return (
    <table className="led w-full border-collapse" style={{ color: "var(--fg)" }}>
      <caption className="led pb-3 text-left" style={{ color: "var(--fg)" }}>
        Åpningstider
      </caption>
      <tbody>
        {HOURS.map((w, i) => {
          const today = mounted && i === day;
          const live = today && minutes >= w.open && minutes < w.close;
          return (
            <tr
              key={i}
              style={{
                color: today ? "var(--fg-strong)" : "var(--fg)",
                borderTop: "1px solid var(--edge)",
              }}
            >
              <th scope="row" className="py-2 text-left font-normal">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block size-1"
                    style={{
                      background: live ? "var(--accent)" : "transparent",
                    }}
                    aria-hidden
                  />
                  {DAY_NO[i]}
                </span>
              </th>
              <td className="py-2 text-right tabular-nums">
                {hhmm(w.open)} <span style={{ opacity: 0.5 }}>til</span>{" "}
                {hhmm(w.close)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
