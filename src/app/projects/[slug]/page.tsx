import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugsForStaticParams, getProjectBySlug, getPublicProjects } from "@/lib/content/projects";
import { getFaqEntriesForProject } from "@/lib/content/faq";
import { MediaFrame } from "@/components/content/media-frame";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { Tag } from "@/components/ui/tag";
import { Callout } from "@/components/ui/callout";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";

export function generateStaticParams() {
  return getAllProjectSlugsForStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getProjectBySlug(slug);
  if (!content) return {};
  const { seo, name } = content.frontmatter;
  return {
    title: seo.title,
    description: seo.description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: seo.title, description: seo.description, type: "website" },
    alternates: { canonical: `/projects/${content.frontmatter.slug}` },
    other: { "og:site_name": SITE.name, "project-name": name },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getProjectBySlug(slug);
  if (!content) notFound();

  const { frontmatter, source } = content;

  // Old slug requested via alias: redirect canonically would be handled by next.config redirects
  // once a rename actually happens (section 11.4 — slugs are stable, renames add a redirect).

  const faqs = getFaqEntriesForProject(frontmatter.slug).filter((f) => frontmatter.faqIds.includes(f.id));
  const activeLinks = frontmatter.links.filter((link) => link.active);
  const primaryLink = activeLinks.find((link) => link.type === "store" || link.type === "website");

  const otherProjects = getPublicProjects().filter((p) => p.slug !== frontmatter.slug);

  const structuredType = frontmatter.type === "game" ? "VideoGame" : "SoftwareApplication";

  return (
    <article className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": structuredType,
          name: frontmatter.name,
          description: frontmatter.summary,
          url: `${SITE.url}/projects/${frontmatter.slug}`,
          applicationCategory: structuredType === "VideoGame" ? undefined : "Game",
          creator: { "@type": "Organization", name: SITE.name },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Projets", item: `${SITE.url}/projects` },
            {
              "@type": "ListItem",
              position: 2,
              name: frontmatter.name,
              item: `${SITE.url}/projects/${frontmatter.slug}`,
            },
          ],
        }}
      />
      <nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-foreground-muted">
        <NextLink href="/projects" className="hover:text-foreground">
          Projets
        </NextLink>
        <span aria-hidden> / </span>
        <span aria-current="page">{frontmatter.name}</span>
      </nav>

      {/* Hero */}
      <section className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5 md:order-2">
          <MediaFrame
            media={frontmatter.heroMedia}
            accentHex={frontmatter.accent.hex}
            respectMediaAspectRatio
            priority
          />
        </div>
        <div className="md:col-span-7 md:order-1">
          <ProjectStatusBadge status={frontmatter.status} />
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            {frontmatter.name}
            {frontmatter.provisionalName ? (
              <span className="ml-3 align-middle text-sm font-normal text-foreground-muted">
                (nom provisoire)
              </span>
            ) : null}
          </h1>
          <p className="mt-4 max-w-prose text-lg text-foreground-muted">{frontmatter.summary}</p>

          {frontmatter.platforms.filter((p) => p.confirmed).length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontmatter.platforms
                .filter((p) => p.confirmed)
                .map((platform) => (
                  <Tag key={platform.id}>{platform.label}</Tag>
                ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryLink && frontmatter.status === "released" ? (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white"
              >
                {primaryLink.label}
              </a>
            ) : (
              <NextLink
                href={`/journal?project=${frontmatter.slug}`}
                className="flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white"
              >
                Suivre le projet
              </NextLink>
            )}
            <NextLink
              href={`/support/contact?reason=bug&project=${frontmatter.slug}`}
              className="flex h-12 items-center rounded-full border border-border-subtle px-6 text-sm font-medium hover:border-brand-500"
            >
              Signaler un problème
            </NextLink>
          </div>
        </div>
      </section>

      {/* Résumé */}
      <section className="mt-16 grid gap-4 border-t border-border-subtle pt-8 text-sm md:grid-cols-4">
        <div>
          <p className="font-medium text-foreground-muted">Type</p>
          <p className="mt-1 capitalize">{frontmatter.type}</p>
        </div>
        <div>
          <p className="font-medium text-foreground-muted">Rôle de Nosfac Studios</p>
          <p className="mt-1">{frontmatter.role.join(", ") || "—"}</p>
        </div>
        <div>
          <p className="font-medium text-foreground-muted">Dernière mise à jour</p>
          <p className="mt-1">
            {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(frontmatter.updatedAt))}
          </p>
        </div>
        {frontmatter.technologies.length > 0 ? (
          <div>
            <p className="font-medium text-foreground-muted">Technologies</p>
            <p className="mt-1">{frontmatter.technologies.join(", ")}</p>
          </div>
        ) : null}
      </section>

      {/* Fonctionnalités */}
      {frontmatter.features.length > 0 ? (
        <section className="mt-16 border-t border-border-subtle pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Fonctionnalités</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {frontmatter.features.map((feature) => (
              <div key={feature.title}>
                <p className="font-medium">{feature.title}</p>
                <p className="mt-1 text-sm text-foreground-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Corps MDX (concept, storytelling, études de cas) */}
      <section className="prose prose-neutral dark:prose-invert mt-16 max-w-[720px] border-t border-border-subtle pt-8">
        <MDXRemote source={source} />
      </section>

      {/* FAQ liée */}
      {faqs.length > 0 ? (
        <section className="mt-16 border-t border-border-subtle pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="font-medium">{faq.question}</dt>
                <dd className="mt-1 text-sm text-foreground-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <Callout variant="info" className="mt-16">
        Un problème avec ce projet ?{" "}
        <NextLink href={`/support/contact?reason=bug&project=${frontmatter.slug}`} className="underline">
          Signalez-le
        </NextLink>{" "}
        avec le contexte déjà rempli.
      </Callout>

      {otherProjects.length > 0 ? (
        <section className="mt-16 border-t border-border-subtle pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Autres projets</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {otherProjects.map((p) => (
              <NextLink
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-full border border-border-subtle px-5 py-2 text-sm font-medium hover:border-brand-500"
              >
                {p.name}
              </NextLink>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
