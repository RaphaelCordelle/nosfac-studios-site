"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

/**
 * Motion provider — enables the mini `motion/react-m` bundle used everywhere in the app.
 * Without this, `<m.div>` won't animate (initial state stays visible/hidden).
 * 
 * MotionConfig also globally respects prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
