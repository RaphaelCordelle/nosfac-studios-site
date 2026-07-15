import NextLink from "next/link";
import { FOOTER_SECTIONS } from "@/config/navigation";
import { SITE } from "@/config/site";

/**
 * Footer — Colophon éditorial simple.
 * Pas de wordmark décoratif oversized. Pas de dots pulsants. Pas de gradient.
 * Structure : contact + colonnes de navigation + mention basse en petit.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border-subtle">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="text-[15px] font-medium">Nosfac Studios</p>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.6] text-foreground-muted">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-5 inline-block text-[14px] font-mono link-underline"
              data-testid="footer-email"
            >
              {SITE.contactEmail}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <NextLink
                        href={item.href}
                        className="text-[14px] text-foreground-muted hover:text-foreground link-underline"
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
          <p>© {year} Nosfac Studios. Tous droits réservés.</p>
          <p>Site français · Hébergé chez Vercel</p>
        </div>
      </div>
    </footer>
  );
}
