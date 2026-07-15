import NextLink from "next/link";
import { FOOTER_SECTIONS } from "@/config/navigation";
import { SITE } from "@/config/site";

/** Full footer — docs/MASTER_SPECIFICATION.md section 25.24. Contact stays reachable here, header and project pages, never as a popup. */
export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <p className="text-sm font-semibold">{SITE.name}</p>
            <p className="mt-2 max-w-xs text-sm text-foreground-muted">{SITE.tagline}</p>
            <NextLink
              href={`mailto:${SITE.contactEmail}`}
              className="mt-4 inline-block text-sm text-foreground-muted underline decoration-1 underline-offset-4 hover:text-foreground"
            >
              {SITE.contactEmail}
            </NextLink>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-medium">{section.title}</p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground"
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-6 text-xs text-foreground-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>Français — version anglaise à venir.</p>
        </div>
      </div>
    </footer>
  );
}
