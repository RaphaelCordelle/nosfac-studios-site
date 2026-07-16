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
 * Header — Fond clair chaleureux, plus warm que le style éditorial.
 * L'état actif est mis en valeur par un fond léger accent-50 + texte accent,
 * plus engageant qu'un simple filet.
 */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 8); }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-(--duration-standard)",
        scrolled
          ? "border-b border-border-subtle bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:h-16 md:px-8">
        <NextLink
          href="/"
          className="flex min-h-11 items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="Nosfac Studios — Accueil"
        >
          <Logo />
        </NextLink>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-9 items-center rounded-full px-3.5 text-[14px] transition-colors duration-(--duration-fast)",
                      active
                        ? "bg-accent-50 text-accent-700 font-medium"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:flex" />
          <NextLink
            href={CONTACT_NAV.href}
            className="hidden h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-surface transition-colors duration-(--duration-fast) hover:bg-accent-600 md:inline-flex"
            data-testid="header-contact-button"
          >
            {CONTACT_NAV.label}
          </NextLink>
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  );
}
