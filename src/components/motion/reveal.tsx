"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { revealTransition } from "@/lib/motion/tokens";

/**
 * Scroll-triggered entrance for sections below the first viewport — section 6.2 "Section au scroll".
 * Reduces to a plain opacity fade (or nothing) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reducedMotion ? { duration: 0 } : { ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
