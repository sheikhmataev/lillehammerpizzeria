import { asset } from "@/lib/asset";

/**
 * The drawn marks are used as CSS masks rather than inline SVG, so one file
 * recolours itself against red, ink or chalk without a second asset and
 * without shipping the path data into the HTML.
 */
export type MotifName = "flame" | "skewer" | "peel" | "hill" | "tea";

const FILE: Record<MotifName, string> = {
  flame: "/motifs/flame-2.svg",
  skewer: "/motifs/skewer.svg",
  peel: "/motifs/peel.svg",
  hill: "/motifs/hill.svg",
  tea: "/motifs/tea.svg",
};

export function Motif({
  name,
  size = 32,
  className = "",
  animated = false,
}: {
  name: MotifName;
  size?: number | string;
  className?: string;
  /** Only meaningful for the flame: cycles three drawn frames. */
  animated?: boolean;
}) {
  const url = `url("${asset(FILE[name])}")`;
  return (
    <span
      aria-hidden
      className={`motif ${animated && name === "flame" ? "flame" : ""} ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        maskImage: url,
        WebkitMaskImage: url,
      }}
    />
  );
}
