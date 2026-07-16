import NextLink from "next/link";
import { FOOTER_SECTIONS } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Logo } from "@/components/layout/logo";

/**
 * Footer — Warm, chaleureux, avec logo, description et 3 colonnes claires.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border-subtle bg-cream-100/50">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-[14px] leading-[1.65] text-foreground-muted">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium link-underline"
              data-testid="footer-email"
            >
              {SITE.contactEmail}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-foreground-subtle">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <NextLink
                        href={item.href}
                        className="text-[14px] text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-[12px] text-foreground-subtle md:flex-row md:items-center">
          <p>© {year} Nosfac Studios · Studio indépendant français</p>
          <p>Hébergé chez Vercel · Réalisé avec attention</p>
        </div>
      </div>
    </footer>
  );
}
