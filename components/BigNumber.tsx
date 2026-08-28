"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEntrance } from "@/lib/use-entrance";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The discount is one number said once, so it gets the one gesture in the
 * section: the digits are painted up from the baseline while the per cent
 * sign lands after them. Resting state is the finished number, so it reads
 * the same with motion off.
 */
export function BigNumber() {
  const reduce = useReducedMotion();
  const play = useEntrance();
  const animate = play && !reduce;

  return (
    <motion.p
      key={animate ? "in" : "static"}
      className="figure-num leading-[0.8]"
      style={{ color: "var(--fg-strong)", fontSize: "clamp(6rem, 22vw, 15rem)" }}
      initial={animate ? "hidden" : false}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="inline-block"
        variants={{
          hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 24 },
          shown: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
        }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        20
      </motion.span>
      <motion.span
        className="inline-block"
        style={{ fontSize: "0.42em" }}
        variants={{
          hidden: { opacity: 0, y: 14 },
          shown: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
      >
        %
      </motion.span>
    </motion.p>
  );
}
