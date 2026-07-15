import NextLink from "next/link";
import { getPublicProjects, getFeaturedProject } from "@/lib/content/projects";
import { getPublicArticles } from "@/lib/content/articles";
import { SITE } from "@/config/site";
import { HeroShowcase } from "@/components/content/hero-showcase";
import { ProjectCard } from "@/components/content/project-card";
import { ArticleCard } from "@/components/content/article-card";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Marquee } from "@/components/layout/marquee";

/** Editorial vertical rule — used to separate side info blocks. */
function Rule() {
  return <span className="mx-3 text-foreground-subtle/40" aria-hidden>·</span>;
}

export default function HomePage() {
  const projects = getPublicProjects();
  const featured = getFeaturedProject() ?? projects[0];
  const secondary = projects.filter((project) => project.slug !== featured?.slug);
  const articles = getPublicArticles().slice(0, 3);

  const year = new Date().getFullYear();

  return (
    <div className="relative">
      {/* ============================================================
          HERO — Editorial layout, asymmetric, oversized display type
      ============================================================ */}
      <section
        className="relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background accent halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-accent-500/10 blur-[120px]"
        />

        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
          {/* Meta row above hero */}
          <div className="mb-8 flex items-center gap-2 font-mono text-[11px] tracking-wider text-foreground-subtle uppercase md:mb-12">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-500" />
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-500 opacity-60" />
            </span>
            <span>Studio · {year}</span>
            <Rule />
            <span>Basé en France</span>
            <Rule />
            <span className="hidden sm:inline">Indépendant</span>
          </div>

          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <AnimatedHeading
                as="h1"
                className="text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
              >
                Des jeux simples à comprendre,
              </AnimatedHeading>
              <h1
                id="hero-heading"
                className="mt-1 text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
                aria-hidden
              >
                <span className="font-display italic text-accent-500">difficiles</span> à lâcher.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
                Nosfac Studios est un studio indépendant de jeux et de logiciels. Nous construisons
                patiemment, testons en jeu, et laissons parler nos projets.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <NextLink
                  href="/projects"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-ink-950 transition-all duration-(--duration-standard) ease-(--ease-expressive) hover:bg-accent-400 hover:shadow-[0_10px_40px_-8px_var(--accent-500)]"
                  data-testid="hero-cta-projects"
                >
                  <span>Découvrir les projets</span>
                  <span
                    aria-hidden
                    className="translate-x-0 transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-1"
                  >
                    →
                  </span>
                </NextLink>
                <NextLink
                  href="/about"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground link-editorial"
                  data-testid="hero-cta-about"
                >
                  À propos du studio
                </NextLink>
              </div>
            </div>

            {/* Featured project side card */}
            {featured && (
              <div className="md:col-span-4">
                <div className="rounded-2xl border border-border-subtle bg-surface-elevated/40 p-5 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-foreground-subtle uppercase">
                      Projet phare
                    </span>
                    <ProjectStatusBadge status={featured.status} />
                  </div>
                  <div className="mt-4 -mx-1 -mt-1 overflow-hidden rounded-xl">
                    <HeroShowcase media={featured.heroMedia} accentHex={featured.accent.hex} priority />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {featured.name}
                      {featured.provisionalName && (
                        <span className="ml-1.5 font-display italic text-sm font-normal text-foreground-subtle">
                          (nom provisoire)
                        </span>
                      )}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {featured.summary}
                  </p>
                  <NextLink
                    href={`/projects/${featured.slug}`}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-500"
                    data-testid="hero-featured-link"
                  >
                    <span className="link-editorial">Voir le projet</span>
                    <span
                      aria-hidden
                      className="translate-x-0 transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </NextLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE — What we build (subtle horizontal ticker)
      ============================================================ */}
      <section className="border-y border-border-subtle bg-surface-sunken/30 py-5">
        <Marquee ariaLabel="Ce que nous construisons">
          {[
            "Jeux mobiles",
            "Applications",
            "Expérimentations",
            "Design system",
            "Multijoueur",
            "Interfaces soignées",
            "Prototypes rapides",
            "Itération continue",
          ].map((word, i) => (
            <div
              key={`${word}-${i}`}
              className="flex items-center gap-6 font-mono text-[12px] tracking-widest text-foreground-muted uppercase whitespace-nowrap"
            >
              <span>{word}</span>
              <span className="text-accent-500">◆</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ============================================================
          PROJECTS — Grid with strong hierarchy
      ============================================================ */}
      {secondary.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28" id="projects">
          <Reveal>
            <header className="mb-10 grid gap-6 md:grid-cols-12 md:items-end md:mb-14">
              <div className="md:col-span-8">
                <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                  Catalogue · {String(projects.length).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
                  Ce que nous <span className="font-display italic text-accent-500">construisons</span>
                </h2>
              </div>
              <div className="md:col-span-4 md:text-right">
                <NextLink
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground link-editorial"
                >
                  <span>Tous les projets</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-1"
                  >
                    →
                  </span>
                </NextLink>
              </div>
            </header>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {secondary.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          APPROACH — Numbered principles, editorial column layout
      ============================================================ */}
      <section className="border-y border-border-subtle bg-surface-sunken/20">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <header className="mb-14 max-w-3xl">
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                Méthode
              </span>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
                Une règle simple, testée puis <span className="font-display italic text-accent-500">approfondie</span>.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
                Nous préférons peu de projets, menés loin, plutôt qu&apos;une longue liste de démos.
                Chaque décision est vérifiée en jeu.
              </p>
            </header>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              {
                num: "01",
                title: "Concevoir",
                body:
                  "Chaque projet part d'une règle ou d'une mécanique lisible en quelques secondes. Le reste se construit autour.",
              },
              {
                num: "02",
                title: "Tester",
                body:
                  "Les intuitions se vérifient en jeu, sur les vrais appareils, avec des joueurs réels — pas seulement sur le papier.",
              },
              {
                num: "03",
                title: "Améliorer",
                body:
                  "Le journal de développement documente les itérations réelles, les décisions difficiles et les retours pris en compte.",
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="group relative flex flex-col gap-3 border-t border-border-strong/40 pt-6">
                  <span className="font-mono text-[13px] tracking-wider text-accent-500">{step.num}</span>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-muted md:text-base">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          JOURNAL — Only shown if we have real articles
      ============================================================ */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <header className="mb-10 grid gap-6 md:grid-cols-12 md:items-end md:mb-14">
              <div className="md:col-span-8">
                <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                  Journal
                </span>
                <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
                  Notes et <span className="font-display italic text-accent-500">avancées</span>
                </h2>
              </div>
              <div className="md:col-span-4 md:text-right">
                <NextLink
                  href="/journal"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground link-editorial"
                >
                  <span>Tout le journal</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-(--duration-standard) group-hover:translate-x-1"
                  >
                    →
                  </span>
                </NextLink>
              </div>
            </header>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.frontmatter.slug} delay={i * 0.08}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          FINAL CTA — Editorial, oversized, minimal
      ============================================================ */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                Contact
              </span>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Un projet, une question, une <span className="font-display italic text-accent-500">opportunité</span> ?
              </h2>
              <p className="max-w-md text-base leading-relaxed text-foreground-muted md:text-lg">
                Nous lisons chaque message. Bug, presse, partenariat, collaboration — écrivez-nous.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <NextLink
                  href="/support/contact"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-ink-950 transition-all duration-(--duration-standard) ease-(--ease-expressive) hover:bg-accent-400 hover:shadow-[0_10px_40px_-8px_var(--accent-500)]"
                  data-testid="cta-contact"
                >
                  <span>Nous écrire</span>
                  <span
                    aria-hidden
                    className="translate-x-0 transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-1"
                  >
                    →
                  </span>
                </NextLink>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-mono text-[13px] text-foreground-muted transition-colors duration-(--duration-fast) hover:text-foreground link-editorial"
                >
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
