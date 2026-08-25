"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Entrance animations must never be load-bearing for visibility.
 *
 * A page opened in a background tab (cmd-click, restored session) has rAF
 * paused, so a motion entrance freezes at its `initial` frame and the element
 * stays invisible. So the resting markup is the FINAL state, and the entrance
 * is opted into only once the document is actually visible. The swap happens
 * in a layout effect, before paint, so a normal foreground load still starts
 * from the `initial` frame with no flash.
 */
export function useEntrance() {
  const [play, setPlay] = useState(false);

  useIsoLayoutEffect(() => {
    if (document.visibilityState === "visible") {
      setPlay(true);
      return;
    }
    const onVisible = () => {
      if (document.visibilityState === "visible") setPlay(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return play;
}
