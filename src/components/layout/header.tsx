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
 * Header — Sobre, presque monochrome.
 * Pas de dot cyan pulsant sur l'état actif. Pas de bouton pilule turquoise.
 * Border-bottom fine visible dès le départ, comme la banda d'un journal.
 */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-5 md:h-16 md:px-8">
        <NextLink
          href="/"
          className="group flex min-h-11 items-center gap-2.5"
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
                      "relative flex h-10 items-center px-3 text-[14px] transition-colors duration-(--duration-fast)",
                      active
                        ? "text-foreground font-medium"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-[13px] h-px bg-foreground md:-bottom-[15px]"
                      />
                    )}
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
            className="hidden h-10 items-center text-[14px] font-medium text-foreground link-underline md:inline-flex"
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
