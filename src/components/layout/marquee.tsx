/**
 * Marquee — horizontal infinite scrolling row.
 * Pauses on hover (CSS). Respects prefers-reduced-motion via tokens.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: React.ReactNode;
  /** Multiplier if you need to repeat manually. Default: renders content twice for seamless loop. */
  className?: string;
  ariaLabel?: string;
}

export function Marquee({ children, className, ariaLabel = "Défilement" }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      role="marquee"
      aria-label={ariaLabel}
    >
      <div className="animate-marquee flex shrink-0 gap-12 pr-12" aria-hidden={false}>
        {children}
      </div>
      <div className="animate-marquee flex shrink-0 gap-12 pr-12" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
