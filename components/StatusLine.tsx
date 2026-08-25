"use client";

import { useHeat } from "@/components/HeatProvider";
import { HOURS, DAY_NO, humanGap } from "@/lib/hours";

const hhmm = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}.${String(mins % 60).padStart(2, "0")}`;

/** One honest sentence about the room, right now. No manufactured urgency. */
export function statusCopy(
  heat: string,
  urgency: string,
  day: number,
  toClose: number | null,
  toOpen: number | null,
) {
  if (heat === "warm") {
    const closes = hhmm(HOURS[day].close);
    return urgency === "last" && toClose !== null
      ? `Siste time. Kjøkkenet stenger om ${humanGap(toClose)}`
      : `Åpent nå. Kjøkkenet stenger ${closes}`;
  }
  if (urgency === "soon" && toOpen !== null) {
    return `Vi åpner om ${humanGap(toOpen)}`;
  }
  const next = (day + (new Date().getHours() * 60 < HOURS[day].open ? 0 : 1)) % 7;
  return `Stengt nå. Åpner ${DAY_NO[next]} ${hhmm(HOURS[next].open)}`;
}

export function StatusLine({ className = "" }: { className?: string }) {
  const { heat, urgency, day, toClose, toOpen, mounted } = useHeat();

  return (
    <p
      className={`led flex items-center gap-2.5 ${className}`}
      style={{ color: "var(--fg-strong)" }}
      aria-live="polite"
    >
      <span
        className="inline-block size-1.5 shrink-0 pilot-light"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <span className={mounted ? "" : "opacity-0"}>
        {statusCopy(heat, urgency, day, toClose, toOpen)}
      </span>
    </p>
  );
}
