"use client";

import { useReducedMotion } from "motion/react";

/**
 * An auto-running rail rather than a stack you have to operate. The previous
 * version asked people to work out a drag gesture before they could see a
 * second photograph; this one is already moving when you arrive, pauses when
 * you point at it, and scrolls by hand on touch. Nothing to understand.
 */
const RAIL = [
  { id: "dsc02046", alt: "Fullt lokale en fredag kveld." },
  { id: "1", alt: "Grillfat med kjøtt, bulgur, lavash og dipper på trebrett." },
  { id: "dsc02076", alt: "Bartender bak disken foran vinhyllene." },
  { id: "lhmrpizzeria-6", alt: "Pizza med spekeskinke, ruccola og parmesan." },
  { id: "dsc02059", alt: "Buffalo wings med dipp og ruccola." },
  { id: "dsc01492", alt: "Entrecôte med grillet mais, chili og søtpotetfries." },
  { id: "dsc02102", alt: "To drinker på brett med lokalet bak." },
  { id: "dsc02095", alt: "Ferdige tallerkener som venter på passet." },
  { id: "dsc01578", alt: "Gjester tett i tett langs bardisken." },
  { id: "dsc01503", alt: "Strimlet kjøtt med fries i kurv og to dipper." },
];

export function PhotoRail() {
  const reduce = useReducedMotion();
  const loop = reduce ? RAIL : [...RAIL, ...RAIL];

  return (
    <section className="on-ink overflow-hidden py-14 md:py-20" aria-label="Bilder">
      <div
        className="rail-track flex w-max gap-3 md:gap-4"
        style={
          reduce
            ? { width: "100%", overflowX: "auto", flexWrap: "nowrap" }
            : { animation: "rail 64s linear infinite" }
        }
      >
        {loop.map((p, i) => (
          <figure
            key={`${p.id}-${i}`}
            className="h-[15rem] w-[20rem] shrink-0 overflow-hidden md:h-[22rem] md:w-[30rem]"
          >
            <img
              src={`/photos/${p.id}@800.webp`}
              srcSet={`/photos/${p.id}@800.webp 800w, /photos/${p.id}.webp 1600w`}
              sizes="(min-width: 768px) 30rem, 20rem"
              alt={i < RAIL.length ? p.alt : ""}
              aria-hidden={i >= RAIL.length}
              className="size-full object-cover"
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
