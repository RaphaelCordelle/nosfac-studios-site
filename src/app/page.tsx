import NextLink from "next/link";
import Image from "next/image";
import { getPublicProjects, getFeaturedProject } from "@/lib/content/projects";
import { getPublicArticles } from "@/lib/content/articles";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";

/**
 * Home page — Direction "Warm Studio Product".
 *
 * Base claire crème, sensation produit, hero engageant avec CTA visibles,
 * cartes projets vraiment structurées, chaleur visuelle sans template SaaS.
 */
export default function HomePage() {
  const projects = getPublicProjects();
  const featured = getFeaturedProject() ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured?.slug);
  const articles = getPublicArticles().slice(0, 3);

  return (
    <div>
      {/* =========================================================
          HERO — Landing page produit, avec mockup Chain intégré.
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Subtle warm gradient in the background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50"
        />

        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
            {/* Left — copy + CTAs */}
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-[12px] font-medium text-accent-700">
                <span className="size-1.5 rounded-full bg-accent-500" />
                Studio indépendant · France
              </span>

              <h1 className="mt-6 text-[clamp(2.25rem,3vw+1.25rem,3.75rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-foreground">
                Des jeux mobiles qui se comprennent
                <br className="hidden md:block" /> en quelques secondes.
              </h1>

              <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-foreground-muted">
                Nosfac Studios développe trois projets en parallèle&nbsp;: un jeu de chaînes de
                mots, un jeu de connaissances multijoueur, et un jeu musical.
                Nous construisons lentement, testons en jeu, et ne promettons que ce qui est prêt.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <NextLink
                  href="/projects"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-surface transition-all duration-(--duration-standard) ease-(--ease-expressive) hover:bg-accent-600 hover:shadow-md"
                  data-testid="hero-cta-projects"
                >
                  Découvrir les projets
                  <span
                    aria-hidden
                    className="transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </NextLink>
                <NextLink
                  href="/support/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 text-[14px] font-medium text-foreground transition-colors duration-(--duration-fast) hover:border-foreground"
                  data-testid="hero-cta-contact"
                >
                  Nous contacter
                </NextLink>
              </div>

              <div className="mt-8 flex items-center gap-6 text-[13px] text-foreground-subtle">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500" />
                  Chain en développement actif
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">Nouveaux projets à venir</span>
              </div>
            </div>

            {/* Right — Product mockup with real image */}
            {featured?.heroMedia?.type === "image" && featured.heroMedia.src && (
              <div className="md:col-span-5">
                <div className="relative">
                  {/* Soft accent halo behind product */}
                  <div
                    aria-hidden
                    className="absolute -inset-8 -z-10 rounded-full bg-accent-100/60 blur-3xl"
                  />
                  <NextLink
                    href={`/projects/${featured.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-lg card-lift"
                  >
                    <Image
                      src={featured.heroMedia.src}
                      alt={featured.heroMedia.alt}
                      width={featured.heroMedia.width ?? 800}
                      height={featured.heroMedia.height ?? 600}
                      className="h-auto w-full"
                      priority
                    />
                    <div className="flex items-center justify-between border-t border-border-subtle bg-surface-elevated px-5 py-4">
                      <div>
                        <p className="text-[13px] text-foreground-subtle">Projet principal</p>
                        <p className="text-[15px] font-medium">{featured.name}</p>
                      </div>
                      <span className="text-[13px] text-accent-600 group-hover:text-accent-700">
                        Voir →
                      </span>
                    </div>
                  </NextLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJETS — Cartes produits chaleureuses
      ========================================================= */}
      <section className="border-t border-border-subtle bg-cream-100/50">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium tracking-wider text-accent-600 uppercase">
                Projets en cours
              </p>
              <h2 className="mt-2 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.1] tracking-[-0.02em] font-semibold">
                Trois projets, trois univers
              </h2>
            </div>
            <NextLink
              href="/projects"
              className="hidden text-[14px] font-medium link-underline sm:inline-flex"
            >
              Tous les projets →
            </NextLink>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-6">
            {projects.map((project) => (
              <NextLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated card-lift"
                data-testid={`home-project-${project.slug}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                  {project.heroMedia?.type === "image" && project.heroMedia.src ? (
                    <Image
                      src={project.heroMedia.src}
                      alt={project.heroMedia.alt}
                      fill
                      className="object-cover transition-transform duration-(--duration-expressive) ease-(--ease-expressive) group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-foreground-subtle text-sm">
                      Aperçu à venir
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-2.5 py-0.5 text-foreground-muted">
                      <span
                        className={
                          "size-1.5 rounded-full " +
                          (project.status === "development" || project.status === "public-beta" || project.status === "private-beta"
                            ? "bg-accent-500"
                            : project.status === "released"
                              ? "bg-success-500"
                              : "bg-stone-400")
                        }
                      />
                      {STATUS_LABELS[project.status].label}
                    </span>
                    {project.platforms.length > 0 && (
                      <span className="text-foreground-subtle">
                        · {project.platforms.map((p) => p.label).join(", ")}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[20px] font-semibold tracking-tight text-foreground group-hover:text-accent-600 transition-colors">
                    {project.name}
                    {project.provisionalName && (
                      <span className="ml-1.5 text-[13px] font-normal text-foreground-subtle">
                        (nom provisoire)
                      </span>
                    )}
                  </h3>

                  <p className="flex-1 text-[14px] leading-[1.55] text-foreground-muted">
                    {project.summary}
                  </p>

                  <span className="mt-2 text-[13px] font-medium text-accent-600">
                    En savoir plus →
                  </span>
                </div>
              </NextLink>
            ))}
          </div>

          <div className="mt-6 flex sm:hidden">
            <NextLink
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium link-underline"
            >
              Voir tous les projets →
            </NextLink>
          </div>
        </div>
      </section>

      {/* =========================================================
          APPROCHE — 3 principes produit
      ========================================================= */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="text-[12px] font-medium tracking-wider text-accent-600 uppercase">
              Approche
            </p>
            <h2 className="mt-2 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.1] tracking-[-0.02em] font-semibold">
              Peu de projets, menés jusqu&apos;au bout.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-foreground-muted">
              Nous préférons un jeu qui existe vraiment à dix promesses jamais tenues. Chaque
              décision est testée dans le vrai jeu, pas seulement sur le papier.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Règles simples d'abord",
                desc: "Chaque projet part d'une mécanique compréhensible en quelques secondes. Le reste se construit autour, sans surcharger.",
              },
              {
                title: "Vérifié en jeu",
                desc: "Les décisions sont testées sur les vrais appareils, avec des joueurs réels. Le journal documente les itérations.",
              },
              {
                title: "Sans promesse invérifiable",
                desc: "Aucune date de sortie ni fonctionnalité n'est annoncée avant d'être stabilisée. Les statuts affichés sont les vrais statuts.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-subtle bg-surface-elevated p-6"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-50 text-[14px] font-semibold text-accent-600 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-foreground-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNAL — Only if real articles exist
      ========================================================= */}
      {articles.length > 0 && (
        <section className="border-t border-border-subtle bg-cream-100/50">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium tracking-wider text-accent-600 uppercase">
                  Journal
                </p>
                <h2 className="mt-2 text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-[1.1] tracking-[-0.02em] font-semibold">
                  Dernières avancées
                </h2>
              </div>
              <NextLink
                href="/journal"
                className="text-[14px] font-medium link-underline"
              >
                Tout le journal →
              </NextLink>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {articles.map((article) => (
                <li key={article.frontmatter.slug}>
                  <NextLink
                    href={`/journal/${article.frontmatter.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-elevated p-5 card-lift"
                  >
                    <time
                      className="tabular text-[12px] text-foreground-subtle"
                      dateTime={article.frontmatter.publishedAt}
                    >
                      {new Intl.DateTimeFormat("fr-FR", {
                        day: "2-digit", month: "short", year: "numeric",
                      }).format(new Date(article.frontmatter.publishedAt))}
                    </time>
                    <h3 className="mt-3 text-[17px] font-semibold group-hover:text-accent-600 transition-colors">
                      {article.frontmatter.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-foreground-muted">
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
          CTA — Contact, warmer than an editorial masthead
      ========================================================= */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="rounded-3xl border border-border-subtle bg-cream-100 p-8 md:p-14">
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
              <div className="md:col-span-8">
                <h2 className="text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-[1.15] tracking-[-0.02em] font-semibold">
                  Une question, un retour de test, une opportunité&nbsp;?
                </h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-foreground-muted max-w-lg">
                  Nous lisons chaque message. Presse, partenariats, candidatures, bugs&nbsp;:
                  écrivez-nous. Aucun message ne reste sans réponse.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <div className="flex flex-col gap-3 md:items-end">
                  <NextLink
                    href="/support/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-surface transition-all duration-(--duration-standard) hover:bg-accent-600 hover:shadow-md"
                    data-testid="cta-contact"
                  >
                    Formulaire de contact
                    <span
                      aria-hidden
                      className="transition-transform duration-(--duration-standard) group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </NextLink>
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    className="text-[13px] text-foreground-muted link-underline font-mono"
                  >
                    {SITE.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
