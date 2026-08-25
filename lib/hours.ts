/**
 * The clock is the concept. Everything visual on this site keys off the
 * real time in Lillehammer, so the site is never "generically evening" —
 * it is whatever the room actually is right now.
 *
 * Runs identically on the build machine and in the browser because it
 * always resolves the wall clock in Europe/Oslo, never the visitor's zone.
 */

export const TZ = "Europe/Oslo";

/** Index 0 = Sunday, matching Date.getDay(). Minutes from midnight. */
type Window = { open: number; close: number };

export const HOURS: Window[] = [
  { open: 13 * 60, close: 22 * 60 }, // Sun
  { open: 15 * 60, close: 22 * 60 }, // Mon
  { open: 15 * 60, close: 22 * 60 }, // Tue
  { open: 15 * 60, close: 22 * 60 }, // Wed
  { open: 15 * 60, close: 22 * 60 }, // Thu
  { open: 15 * 60, close: 23 * 60 }, // Fri
  { open: 15 * 60, close: 23 * 60 }, // Sat
];

export const DAY_NO = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];
export const DAY_EN = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export type Heat = "cold" | "warm";
export type Urgency = "none" | "soon" | "last";

export type Status = {
  heat: Heat;
  urgency: Urgency;
  /** Wall clock in Lillehammer, e.g. "21:47" */
  clock: string;
  day: number;
  minutes: number;
  /** Minutes until the kitchen closes. Null when closed. */
  toClose: number | null;
  /** Minutes until the doors open. Null when open. */
  toOpen: number | null;
};

/** Wall-clock parts for Lillehammer, wherever the caller happens to be. */
export function osloParts(now: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAY_EN.indexOf(get("weekday").toLowerCase().slice(0, 3));
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return { day: day < 0 ? 0 : day, hour, minute, minutes: hour * 60 + minute };
}

export function statusAt(now: Date = new Date()): Status {
  const { day, hour, minute, minutes } = osloParts(now);
  const today = HOURS[day];
  const clock = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  if (minutes >= today.open && minutes < today.close) {
    const toClose = today.close - minutes;
    return {
      heat: "warm",
      urgency: toClose <= 60 ? "last" : "none",
      clock,
      day,
      minutes,
      toClose,
      toOpen: null,
    };
  }

  // Closed. They open every day, so the next window is either later today
  // or first thing tomorrow.
  const toOpen =
    minutes < today.open
      ? today.open - minutes
      : 1440 - minutes + HOURS[(day + 1) % 7].open;

  return {
    heat: "cold",
    urgency: toOpen <= 90 ? "soon" : "none",
    clock,
    day,
    minutes,
    toClose: null,
    toOpen,
  };
}

/** "1 t 20 min" / "20 min" — used in the live status line. */
export function humanGap(mins: number, lang: "no" | "en" = "no"): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const hUnit = lang === "no" ? "t" : "h";
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} ${hUnit}`;
  return `${h} ${hUnit} ${m} min`;
}
