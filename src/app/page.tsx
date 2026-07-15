import NextLink from "next/link";
import Image from "next/image";
import { getPublicProjects, getFeaturedProject } from "@/lib/content/projects";
import { getPublicArticles } from "@/lib/content/articles";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";

/**
 * Home page — Composition "Journal éditorial".
 *
 * Objectifs anti-cliché :
 *  - Pas de hero géant sur plusieurs lignes.
 *  - Pas de mot italique décoratif.
 *  - Pas de bouton pilule turquoise.
 *  - Pas de mockup téléphone flottant.
 *  - Presque monochrome. L'accent n'apparaît qu'une seule fois par section.
 *  - Layout en colonnes fines avec filets, pensé comme la Une d'un magazine.
 */
export default function HomePage() {
  const projects = getPublicProjects();
  const featured = getFeaturedProject() ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured?.slug);
  const articles = getPublicArticles().slice(0, 2);

  const currentDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div>
      {/* =========================================================
          MASTHEAD — Comme la Une d'un journal.
          Date + numéro d'édition + issue. Titre modéré.
      ========================================================= */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-16 md:px-8 md:pt-14 md:pb-24">
          {/* Meta line — sober, no dots pulsating */}
          <div className="flex items-baseline justify-between gap-6 text-[12px] text-foreground-subtle">
            <span className="tabular">{currentDate}</span>
            <span className="hidden sm:inline">Studio indépendant · France</span>
            <span className="tabular">N° {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <h1 className="text-[clamp(2rem,3vw+1rem,3.5rem)] leading-[1.05] tracking-[-0.02em] font-medium">
                Nosfac Studios construit des jeux à règles courtes,
                <br />
                <span className="text-foreground-muted">testés en jeu avant d&apos;être finis.</span>
              </h1>

              <p className="mt-8 max-w-xl text-[17px] leading-[1.6] text-foreground-muted">
                Studio indépendant basé en France. Trois projets en cours&nbsp;:
                un jeu mobile de chaînes de mots, un jeu de connaissances multijoueur,
                et un jeu musical dont le nom n&apos;est pas encore choisi.
              </p>

              <div className="mt-10 flex items-baseline gap-8">
                <NextLink
                  href="/projects"
                  className="inline-flex items-baseline gap-2 border-b border-foreground pb-0.5 text-[15px] font-medium hover:text-accent-600 hover:border-accent-600 transition-colors duration-(--duration-fast)"
                  data-testid="hero-cta-projects"
                >
                  Voir les projets
                  <span aria-hidden className="text-[13px]">→</span>
                </NextLink>
                <NextLink
                  href="/about"
                  className="text-[15px] text-foreground-muted hover:text-foreground link-underline"
                >
                  À propos du studio
                </NextLink>
              </div>
            </div>

            {/* Right column — table of contents style */}
            <aside className="md:col-span-4 md:pl-6 md:border-l border-border-subtle">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Dans ce numéro
              </p>
              <ol className="mt-4 space-y-3 text-[14px]">
                {projects.map((project, i) => (
                  <li key={project.slug} className="flex items-baseline gap-3">
                    <span className="tabular text-foreground-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <NextLink
                        href={`/projects/${project.slug}`}
                        className="link-underline font-medium"
                      >
                        {project.name}
                      </NextLink>
                      <span className="ml-2 text-foreground-subtle">
                        · {STATUS_LABELS[project.status].label.toLowerCase()}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED PROJECT — Article éditorial dédié.
          Composition asymétrique, capture réelle intégrée.
      ========================================================= */}
      {featured && (
        <section className="border-b border-border-subtle">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <div className="mb-8 flex items-baseline justify-between border-b border-border-subtle pb-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Projet principal
              </p>
              <span className="tabular text-[11px] text-foreground-subtle">01 / {String(projects.length).padStart(2, "0")}</span>
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                {featured.heroMedia?.type === "image" && featured.heroMedia.src && (
                  <div className="relative overflow-hidden bg-surface-elevated">
                    <Image
                      src={featured.heroMedia.src}
                      alt={featured.heroMedia.alt}
                      width={featured.heroMedia.width ?? 1200}
                      height={featured.heroMedia.height ?? 800}
                      className="h-auto w-full"
                      priority
                    />
                  </div>
                )}
                {(!featured.heroMedia || featured.heroMedia.type !== "image" || !featured.heroMedia.src) && (
                  <div className="aspect-[4/3] bg-surface-elevated" aria-hidden />
                )}
              </div>

              <div className="md:col-span-5 md:pt-4">
                <p className="text-[12px] text-foreground-subtle tabular">
                  {STATUS_LABELS[featured.status].label}
                  {featured.platforms.length > 0 && (
                    <> · {featured.platforms.map((p) => p.label).join(", ")}</>
                  )}
                </p>
                <h2 className="mt-3 text-[32px] leading-[1.1] tracking-[-0.02em] font-medium md:text-[40px]">
                  {featured.name}
                </h2>
                <p className="mt-5 text-[17px] leading-[1.6] text-foreground-muted max-w-md">
                  {featured.summary}
                </p>

                <div className="mt-8 border-t border-border-subtle pt-5">
                  <NextLink
                    href={`/projects/${featured.slug}`}
                    className="inline-flex items-baseline gap-2 text-[15px] font-medium link-underline"
                    data-testid="hero-featured-link"
                  >
                    Lire la fiche projet
                    <span aria-hidden>→</span>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          OTHER PROJECTS — Sommaire dense, presque textuel.
          Deux colonnes, pas de mockups répétés.
      ========================================================= */}
      {others.length > 0 && (
        <section className="border-b border-border-subtle">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <div className="mb-10 flex items-baseline justify-between border-b border-border-subtle pb-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Autres projets
              </p>
              <span className="tabular text-[11px] text-foreground-subtle">
                {String(others.length).padStart(2, "0")} en cours
              </span>
            </div>

            <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
              {others.map((project, i) => (
                <article key={project.slug} className="group">
                  <p className="tabular text-[11px] text-foreground-subtle">
                    {String(i + 2).padStart(2, "0")} · {STATUS_LABELS[project.status].label}
                    {project.platforms.length > 0 && (
                      <> · {project.platforms.map((p) => p.label).join(", ")}</>
                    )}
                  </p>
                  <h3 className="mt-3 text-[26px] leading-[1.1] tracking-[-0.015em] font-medium">
                    <NextLink
                      href={`/projects/${project.slug}`}
                      className="hover:text-accent-600 transition-colors duration-(--duration-fast)"
                    >
                      {project.name}
                    </NextLink>
                    {project.provisionalName && (
                      <span className="ml-2 text-[15px] font-normal text-foreground-subtle">
                        (nom provisoire)
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-foreground-muted max-w-md">
                    {project.summary}
                  </p>
                  <NextLink
                    href={`/projects/${project.slug}`}
                    className="mt-4 inline-flex items-baseline gap-1.5 text-[14px] link-underline"
                  >
                    Fiche projet
                    <span aria-hidden>→</span>
                  </NextLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          APPROACH — 4 lignes courtes, format éditorial.
          Pas de numérotage 01/02/03 tape-à-l'oeil.
      ========================================================= */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 border-b border-border-subtle pb-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
              Approche
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <h2 className="md:col-span-5 text-[32px] leading-[1.1] tracking-[-0.02em] font-medium md:text-[40px]">
              Peu de projets, menés jusqu&apos;au bout.
            </h2>

            <dl className="md:col-span-7 divide-y divide-border-subtle">
              {[
                {
                  term: "Règles simples d'abord",
                  desc: "Chaque projet part d'une règle lisible en quelques secondes. Le reste se construit autour, sans surcharge inutile.",
                },
                {
                  term: "Vérifié en jeu",
                  desc: "Les décisions sont testées sur les vrais appareils, avec des joueurs réels. Le journal de développement documente les itérations.",
                },
                {
                  term: "Sans promesse invérifiable",
                  desc: "Nous n'annonçons ni date de sortie ni fonctionnalité tant qu'elle n'est pas stabilisée. Les statuts affichés sont les vrais statuts.",
                },
              ].map((item) => (
                <div key={item.term} className="grid gap-2 py-5 md:grid-cols-4 md:gap-6">
                  <dt className="text-[15px] font-medium md:col-span-1">{item.term}</dt>
                  <dd className="text-[15px] leading-[1.6] text-foreground-muted md:col-span-3">
                    {item.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNAL — Only if real articles exist.
      ========================================================= */}
      {articles.length > 0 && (
        <section className="border-b border-border-subtle">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b border-border-subtle pb-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Dernières notes
              </p>
              <NextLink
                href="/journal"
                className="text-[13px] text-foreground-muted link-underline"
              >
                Tout le journal
              </NextLink>
            </div>

            <ul className="divide-y divide-border-subtle">
              {articles.map((article) => (
                <li key={article.frontmatter.slug}>
                  <NextLink
                    href={`/journal/${article.frontmatter.slug}`}
                    className="group grid gap-2 py-5 md:grid-cols-12 md:gap-6"
                  >
                    <time
                      className="tabular text-[13px] text-foreground-subtle md:col-span-2"
                      dateTime={article.frontmatter.publishedAt}
                    >
                      {new Intl.DateTimeFormat("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(article.frontmatter.publishedAt))}
                    </time>
                    <h3 className="text-[17px] font-medium md:col-span-6 group-hover:text-accent-600 transition-colors">
                      {article.frontmatter.title}
                    </h3>
                    <p className="text-[15px] text-foreground-muted md:col-span-4">
                      {article.frontmatter.summary}
                    </p>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* =========================================================
          COLOPHON — Contact simple, pas de CTA gigantesque.
      ========================================================= */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Contact
              </p>
              <h2 className="mt-3 text-[28px] leading-[1.15] tracking-[-0.015em] font-medium md:text-[32px]">
                Presse, partenariats, retours de test&nbsp;: écrivez-nous.
              </h2>
            </div>
            <div className="md:col-span-7 md:pl-6 md:border-l border-border-subtle md:pt-1">
              <p className="text-[15px] leading-[1.6] text-foreground-muted max-w-md">
                Nous lisons chaque message. Aucun délai n&apos;est garanti, mais les demandes
                sérieuses reçoivent toujours une réponse.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                <NextLink
                  href="/support/contact"
                  className="inline-flex items-baseline gap-2 border-b border-foreground pb-0.5 text-[15px] font-medium hover:text-accent-600 hover:border-accent-600 transition-colors"
                  data-testid="cta-contact"
                >
                  Formulaire de contact
                  <span aria-hidden className="text-[13px]">→</span>
                </NextLink>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="text-[14px] text-foreground-muted link-underline font-mono"
                >
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
