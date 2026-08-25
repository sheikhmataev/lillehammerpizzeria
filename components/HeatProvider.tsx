"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { statusAt, type Status } from "@/lib/hours";

type Ctx = Status & { mounted: boolean };

/* The build machine renders the warm state: the restaurant is open for
   every hour a human is realistically looking at a restaurant site, so
   warm is the honest default and the cold state is the surprise. */
const FALLBACK: Ctx = {
  heat: "warm",
  urgency: "none",
  clock: "--:--",
  day: 5,
  minutes: 19 * 60,
  toClose: 240,
  toOpen: null,
  mounted: false,
};

const HeatCtx = createContext<Ctx>(FALLBACK);

export function useHeat() {
  return useContext(HeatCtx);
}

export function HeatProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Ctx>(FALLBACK);

  useEffect(() => {
    const tick = () => setStatus({ ...statusAt(), mounted: true });
    tick();
    const id = window.setInterval(tick, 20_000);
    const onFocus = () => tick();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    if (!status.mounted) return;
    document.documentElement.dataset.heat = status.heat;
    document.documentElement.dataset.urgency = status.urgency;
  }, [status.heat, status.urgency, status.mounted]);

  const value = useMemo(() => status, [status]);
  return <HeatCtx.Provider value={value}>{children}</HeatCtx.Provider>;
}
