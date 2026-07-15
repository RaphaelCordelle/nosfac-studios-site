import NextLink from "next/link";
import { getPublicProjects, getFeaturedProject } from "@/lib/content/projects";
import { getPublicArticles } from "@/lib/content/articles";
import { SITE } from "@/config/site";
import { MediaFrame } from "@/components/content/media-frame";
import { ProjectCard } from "@/components/content/project-card";
import { ArticleCard } from "@/components/content/article-card";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { Reveal } from "@/components/motion/reveal";

export default function HomePage() {
  const projects = getPublicProjects();
  const featured = getFeaturedProject() ?? projects[0];
  const secondary = projects.filter((project) => project.slug !== featured?.slug);
  const articles = getPublicArticles().slice(0, 3);

  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      {/* Hero — never animated: must be legible on first paint (section 23.1). */}
      <section className="grid gap-10 pt-12 pb-16 md:grid-cols-12 md:items-center md:pt-20 md:pb-24">
        <div className="md:col-span-5">
          <p className="text-sm font-medium text-brand-500">{SITE.tagline}</p>
          <h1 className="mt-4 text-4xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
            {SITE.headline}
          </h1>
          <p className="mt-6 max-w-prose text-base text-foreground-muted md:text-lg">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NextLink
              href="/projects"
              className="flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white transition-colors duration-(--duration-fast) hover:bg-brand-300"
            >
              Découvrir nos projets
            </NextLink>
            <NextLink
              href="/support/contact"
              className="flex h-12 items-center rounded-full border border-border-subtle px-6 text-sm font-medium transition-colors duration-(--duration-fast) hover:border-brand-500"
            >
              Nous contacter
            </NextLink>
          </div>
        </div>

        {featured ? (
          <div className="md:col-span-7">
            <MediaFrame
              media={featured.heroMedia}
              accentHex={featured.accent.hex}
              respectMediaAspectRatio
              priority
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <ProjectStatusBadge status={featured.status} />
                <p className="mt-1 font-medium">{featured.name}</p>
              </div>
              <NextLink
                href={`/projects/${featured.slug}`}
                className="text-sm font-medium text-brand-500 hover:text-brand-300"
              >
                Voir le projet →
              </NextLink>
            </div>
          </div>
        ) : null}
      </section>

      {/* Sélection de projets */}
      {projects.length > 0 ? (
        <Reveal className="py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ce que nous construisons</h2>
            <NextLink href="/projects" className="text-sm font-medium text-brand-500 hover:text-brand-300">
              Tous les projets →
            </NextLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {secondary.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Méthode */}
      <Reveal className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Notre méthode</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Concevoir",
              body: "Chaque projet part d’une règle ou d’une mécanique simple, testée avant d’être étendue.",
            },
            {
              title: "Tester",
              body: "Les décisions de conception sont vérifiées en jeu, pas seulement sur le papier.",
            },
            {
              title: "Améliorer",
              body: "Le journal de développement documente les itérations réelles, pas une démo figée.",
            },
          ].map((step) => (
            <div key={step.title}>
              <p className="text-sm font-medium text-brand-500">{step.title}</p>
              <p className="mt-2 text-sm text-foreground-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Journal — masqué si aucun article publié (section 7.1 acceptance criteria). */}
      {articles.length > 0 ? (
        <Reveal className="py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Journal</h2>
            <NextLink href="/journal" className="text-sm font-medium text-brand-500 hover:text-brand-300">
              Tout le journal →
            </NextLink>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.frontmatter.slug} article={article} />
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* CTA final */}
      <Reveal className="flex flex-col items-start gap-4 border-t border-border-subtle py-16 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-xl font-medium tracking-tight">
          Un projet à proposer, une question ou une opportunité ?
        </p>
        <NextLink
          href="/support/contact"
          className="flex h-12 shrink-0 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white transition-colors duration-(--duration-fast) hover:bg-brand-300"
        >
          Nous contacter
        </NextLink>
      </Reveal>
    </div>
  );
}
