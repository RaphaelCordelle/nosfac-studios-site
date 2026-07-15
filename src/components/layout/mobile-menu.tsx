"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { CONTACT_NAV, type NavItem } from "@/config/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation panel — docs/MASTER_SPECIFICATION.md section 4.3.
 * Built on Radix Dialog: focus trap, Escape-to-close and focus restoration to the
 * trigger button all come from the primitive, satisfying the section's a11y requirements.
 */
export function MobileMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-surface/95 backdrop-blur md:hidden" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col p-6 md:hidden">
          <DialogPrimitive.Title className="sr-only">Menu de navigation</DialogPrimitive.Title>
          <div className="flex items-center justify-between">
            <Logo />
            <DialogPrimitive.Close className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-500">
              <X className="size-5" aria-hidden />
              <span className="sr-only">Fermer le menu</span>
            </DialogPrimitive.Close>
          </div>

          <nav aria-label="Navigation mobile" className="mt-12 flex flex-1 flex-col gap-2">
            {nav.map((item, index) => (
              <NextLink
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-border-subtle py-4 text-2xl font-medium",
                  pathname.startsWith(item.href) && "text-brand-500",
                )}
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                {item.label}
              </NextLink>
            ))}
          </nav>

          <div className="flex items-center justify-between border-t border-border-subtle pt-6">
            <ThemeToggle />
          </div>

          <NextLink
            href={CONTACT_NAV.href}
            onClick={close}
            className="mt-4 flex h-13 w-full items-center justify-center rounded-full bg-brand-500 text-base font-medium text-white"
          >
            {CONTACT_NAV.label}
          </NextLink>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
