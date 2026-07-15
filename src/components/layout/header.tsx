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
 * Global header — Refonte "Precision Editorial".
 * Transparent at top, subtle glass surface after scroll, thin border, monospace labels for
 * secondary nav elements. Active state uses a small animated dot in accent colour.
 */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-(--duration-standard) ease-(--ease-standard)",
        scrolled
          ? "border-b border-border-subtle/70 bg-surface/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        <NextLink
          href="/"
          className="group flex min-h-11 items-center gap-2.5 transition-opacity duration-(--duration-fast) hover:opacity-80"
          aria-label="Nosfac Studios — Accueil"
        >
          <Logo />
        </NextLink>

        <nav aria-label="Navigation principale" className="hidden items-center md:flex">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex h-10 items-center gap-1.5 rounded-full px-4 text-[13.5px] font-medium transition-colors duration-(--duration-fast)",
                      active
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_var(--accent-500)]"
                      />
                    )}
                    <span>{item.label}</span>
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle className="hidden md:flex" />
          <NextLink
            href={CONTACT_NAV.href}
            className="group hidden h-10 items-center gap-2 rounded-full border border-border-strong/60 bg-transparent px-4 text-[13px] font-medium text-foreground transition-all duration-(--duration-fast) hover:border-accent-500 hover:bg-accent-500 hover:text-brand-fg md:flex"
            data-testid="header-contact-button"
          >
            <span>{CONTACT_NAV.label}</span>
            <span
              aria-hidden
              className="translate-x-0 transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-0.5"
            >
              →
            </span>
          </NextLink>
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  );
}
