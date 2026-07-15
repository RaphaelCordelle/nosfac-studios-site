"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_NAV, type NavItem } from "@/config/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

/**
 * Global header — docs/MASTER_SPECIFICATION.md section 4.3.
 * Transparent at the top; gains a surface + border after 48-72px of scroll;
 * compacts its height on scroll-down and restores immediately on scroll-up.
 * Never changes position during keyboard navigation (no listener runs on focus).
 */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > lastScrollY.current && y > 120) {
        setCompact(true);
      } else if (y < lastScrollY.current) {
        setCompact(false);
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[height,background-color,border-color] duration-(--duration-standard) ease-(--ease-standard)",
        compact ? "h-15" : "h-16 md:h-18",
        scrolled
          ? "border-b border-border-subtle bg-surface/90 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-8">
        <NextLink href="/" className="flex min-h-11 items-center">
          <Logo />
        </NextLink>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <NextLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {item.label}
              </NextLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:flex" />
          <NextLink
            href={CONTACT_NAV.href}
            className="hidden h-11 items-center rounded-full bg-brand-500 px-5 text-sm font-medium text-white transition-colors duration-(--duration-fast) hover:bg-brand-300 md:flex"
          >
            {CONTACT_NAV.label}
          </NextLink>
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  );
}
