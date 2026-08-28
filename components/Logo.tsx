/**
 * The real lockup, lifted at vector resolution out of the 2026 print menu
 * and keyed onto transparency, so it is the restaurant's actual mark rather
 * than a typographic impression of it.
 */
export function Logo({
  height = 44,
  className = "",
  priority = false,
  fluid = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
  /** Let the container drive the width instead of pinning the height. */
  fluid?: boolean;
}) {
  const width = Math.round(height * 2.2231);
  return (
    <img
      src="/logo@600.webp"
      srcSet="/logo@600.webp 600w, /logo.webp 1200w"
      sizes={fluid ? "(min-width: 768px) 30rem, 80vw" : `${width}px`}
      alt="Lillehammer Restaurant & Bar, etablert 2003"
      width={width}
      height={height}
      className={className}
      style={
        fluid
          ? { width: "100%", height: "auto", filter: "none" }
          : { height, width: "auto", filter: "none" }
      }
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
