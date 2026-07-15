import { cn } from "@/lib/utils";

/** Loading placeholder. Shimmer is disabled entirely under reduced motion (section 6.2). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-surface-elevated motion-reduce:animate-none",
        className,
      )}
      aria-hidden
    />
  );
}
