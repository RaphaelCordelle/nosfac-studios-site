import NextLink from "next/link";
import { cn } from "@/lib/utils";

export interface FilterChipProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

/**
 * Filter control implemented as a plain link (query string state) — works with the
 * browser back button and with JavaScript disabled (section 7.2 acceptance criteria).
 */
export function FilterChip({ href, active, children }: FilterChipProps) {
  return (
    <NextLink
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-(--duration-fast)",
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-border-subtle text-foreground-muted hover:border-brand-500 hover:text-foreground",
      )}
    >
      {children}
    </NextLink>
  );
}
