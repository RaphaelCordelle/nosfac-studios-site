import * as React from "react";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LinkProps extends React.ComponentProps<typeof NextLink> {
  /** Visually and semantically marks a link that leaves the site. */
  external?: boolean;
  variant?: "inline" | "standalone";
}

/**
 * Navigation link — docs/MASTER_SPECIFICATION.md section 25.
 * Distinguishes internal navigation from external destinations; external links always
 * expose their nature to assistive technology, not just via a hover icon.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, external, variant = "inline", children, ...props }, ref) => {
    const sharedClass =
      variant === "inline"
        ? "underline decoration-1 underline-offset-4 hover:decoration-2 transition-[text-decoration-thickness] duration-(--duration-fast)"
        : "inline-flex items-center gap-1 font-medium text-brand-500 hover:text-brand-300";

    if (external) {
      return (
        <a
          ref={ref}
          href={typeof props.href === "string" ? props.href : String(props.href)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(sharedClass, className)}
        >
          {children}
          <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      );
    }

    return (
      <NextLink ref={ref} className={cn(sharedClass, className)} {...props}>
        {children}
      </NextLink>
    );
  },
);
Link.displayName = "Link";
