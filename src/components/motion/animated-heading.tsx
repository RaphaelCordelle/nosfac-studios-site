import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Animated heading — reveals words with a staggered vertical rise using pure CSS
 * animations. No JS lifecycle: works in SSR, respects prefers-reduced-motion via
 * the tokens.css media query (durations become 0ms), and never leaves the text
 * hidden if animations fail.
 */
export function AnimatedHeading({
  as: Tag = "h1",
  children,
  className,
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  /** Base delay in ms before the first word appears */
  delay?: number;
}) {
  const words = children.split(" ");

  return (
    <Tag className={cn("[--reveal-dur:600ms]", className)} aria-label={children}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            aria-hidden
            className="inline-block will-change-transform motion-safe:[animation:word-rise_var(--reveal-dur)_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: `${delay + i * 60}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? <span aria-hidden>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
