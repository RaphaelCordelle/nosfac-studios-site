import NextLink from "next/link";
import { FOOTER_SECTIONS } from "@/config/navigation";
import { SITE } from "@/config/site";

/**
 * Footer — Refonte "Precision Editorial".
 * 
 * Structure:
 *  - Oversized wordmark as decorative anchor
 *  - Structured navigation columns
 *  - Contact / meta info row at the bottom
 *  - Uses monospace labels for editorial rhythm
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-border-subtle bg-surface-sunken/30">
      {/* Accent line at the very top */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div
          aria-hidden
          className="mx-auto -mt-px h-px w-32 bg-gradient-to-r from-transparent via-accent-500 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 md:px-8 md:pt-20 md:pb-12">
        {/* Top row : navigation columns + brand */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
              Studio indépendant
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              {SITE.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {SITE.description}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="group inline-flex items-baseline gap-2 self-start font-mono text-[13px] text-foreground transition-colors duration-(--duration-fast) hover:text-accent-500"
                data-testid="footer-email"
              >
                <span className="text-accent-500">↳</span>
                <span className="link-editorial">{SITE.contactEmail}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="font-mono text-[10px] tracking-widest text-foreground-subtle uppercase">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <NextLink
                        href={item.href}
                        className="text-[14px] text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground link-editorial"
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

        {/* Oversized decorative wordmark */}
        <div
          aria-hidden
          className="mt-20 mb-8 select-none overflow-hidden text-center md:mt-24"
        >
          <p className="text-[clamp(3rem,15vw,12rem)] font-semibold leading-none tracking-[-0.04em] text-foreground/[0.04]">
            NOSFAC
            <span className="font-display italic text-accent-500/20">STUDIOS</span>
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border-subtle pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] tracking-wider text-foreground-subtle">
            © {year} {SITE.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-wider text-foreground-subtle uppercase">
            <span>Français</span>
            <span className="text-foreground-subtle/40" aria-hidden>·</span>
            <span>Anglais à venir</span>
            <span className="text-foreground-subtle/40" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-accent-500" />
                <span className="absolute inset-0 animate-ping rounded-full bg-accent-500 opacity-60" />
              </span>
              <span>Actif</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
