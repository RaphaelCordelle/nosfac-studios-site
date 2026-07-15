/**
 * Motion tokens mirrored from src/styles/tokens.css for use with the `motion` library,
 * where durations need to be numbers (seconds) rather than CSS time strings.
 * docs/MASTER_SPECIFICATION.md section 6.1.
 */
export const motionDuration = {
  instant: 0.08,
  fast: 0.14,
  standard: 0.22,
  expressive: 0.36,
  slow: 0.52,
} as const;

export const motionEase = {
  standard: [0.2, 0.8, 0.2, 1] as const,
  expressive: [0.16, 1, 0.3, 1] as const,
};

export const staggerStep = 0.045;

/** Section 6.2: entrance used by sections/cards revealing on scroll. */
export const revealTransition = {
  duration: motionDuration.expressive,
  ease: motionEase.expressive,
};

export const revealFromBelow = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
