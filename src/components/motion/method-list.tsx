"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { useState } from "react";

type Step = {
  term: string;
  desc: string;
};

/**
 * Editorial numbered list — no cards, no chips. Just type + rules.
 * Hover: number slides, term gains an underline. Click: a tiny bump for feedback.
 */
export function MethodList({ steps }: { steps: Step[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <ol className="border-t border-border-strong">
      {steps.map((step, i) => (
        <MethodRow
          key={step.term}
          index={i}
          step={step}
          reduced={!!reducedMotion}
        />
      ))}
    </ol>
  );
}

function MethodRow({
  index,
  step,
  reduced,
}: {
  index: number;
  step: Step;
  reduced: boolean;
}) {
  const [pulse, setPulse] = useState(0);

  return (
    <m.li
      className="group border-b border-border-strong"
      onTap={() => setPulse((n) => n + 1)}
      whileTap={reduced ? undefined : { scale: 0.995 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      data-testid={`method-row-${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setPulse((n) => n + 1)}
        className="grid w-full cursor-pointer grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 py-6 text-left md:grid-cols-[80px_1fr_1.2fr] md:gap-x-10 md:py-8"
      >
        <m.span
          key={`num-${pulse}`}
          initial={reduced ? false : { y: 0 }}
          animate={reduced ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="tabular text-[13px] font-medium tracking-widest text-foreground-subtle group-hover:text-accent-600 transition-colors"
        >
          {String(index + 1).padStart(2, "0")}
        </m.span>

        <span className="relative col-span-1 text-[22px] font-semibold tracking-tight md:text-[26px]">
          {step.term}
          <m.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: pulse > 0 ? "100%" : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-0 bg-accent-600 transition-[width] duration-500 ease-out group-hover:w-full"
          />
        </span>

        <span className="col-span-2 text-[15px] leading-[1.65] text-foreground-muted md:col-span-1 md:text-[16px]">
          {step.desc}
        </span>
      </button>
    </m.li>
  );
}
