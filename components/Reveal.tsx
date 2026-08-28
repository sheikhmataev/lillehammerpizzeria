"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEntrance } from "@/lib/use-entrance";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A reveal that can never hide anything. `initial={false}` is the resting
 * state, so a background tab, a reduced-motion setting or a headless render
 * all produce the finished markup; the animation opts in only once the
 * document is actually visible.
 *
 * Deliberately not applied to every section. It is here for the rows and
 * blocks where the order of arrival carries meaning, not as page grammar.
 */
export function Reveal({
  children,
  index = 0,
  y = 14,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  /** Position in a list; caps at 10 so a long list never crawls in. */
  index?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const play = useEntrance();
  const animate = play && !reduce;
  const Tag = motion[as];

  return (
    <Tag
      key={animate ? "in" : "static"}
      className={className}
      initial={animate ? { opacity: 0, y } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.62,
        ease: EASE,
        delay: Math.min(index, 10) * 0.055,
      }}
    >
      {children}
    </Tag>
  );
}
