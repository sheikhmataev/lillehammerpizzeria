import { GOOGLE, LINKS } from "@/lib/links";

const CELLS = 20;

/**
 * Social proof without inventing a single testimonial. The rating and the
 * count are the restaurant's real Google figures, the bar is a dot matrix
 * rather than five stars, and the link goes straight to the reviews so the
 * claim is checkable in one tap.
 *
 * Deliberately NOT emitted as schema.org aggregateRating: a business rating
 * itself on its own site is self-serving markup and is not eligible for rich
 * results, so it stays a visual fact rather than a structured-data claim.
 */
export function Rating() {
  const filled = Math.round((GOOGLE.rating / 5) * CELLS);

  return (
    <a
      href={LINKS.maps}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-5 md:px-8"
    >
      <span
        className="type-expanded text-3xl tabular-nums md:text-4xl"
        style={{ color: "var(--fg-strong)" }}
      >
        {GOOGLE.rating.toString().replace(".", ",")}
      </span>

      <span className="flex items-center gap-[3px]" aria-hidden>
        {Array.from({ length: CELLS }, (_, i) => (
          <span
            key={i}
            className="block h-4 w-[5px]"
            style={{
              background: i < filled ? "var(--accent)" : "var(--edge)",
            }}
          />
        ))}
      </span>

      <span className="label" style={{ color: "var(--fg)" }}>
        {GOOGLE.count} anmeldelser på Google
      </span>

      <span
        className="label ml-auto"
        style={{ color: "var(--fg-strong)" }}
      >
        Les dem <span className="group-hover:pl-1 inline-block transition-[padding]">&rarr;</span>
      </span>
    </a>
  );
}
