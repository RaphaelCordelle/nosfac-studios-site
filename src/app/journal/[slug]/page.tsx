import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getPublicArticles } from "@/lib/content/articles";
import { CATEGORY_LABELS } from "@/domain/article";
import { formatDate } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";

export function generateStaticParams() {
  return getPublicArticles().map((article) => ({ slug: article.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const { seo } = article.frontmatter;
  return {
    title: seo.title,
    description: seo.description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/journal/${article.frontmatter.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, source, readingTimeMinutes } = article;

  return (
    <article className="mx-auto max-w-[720px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: frontmatter.title,
          description: frontmatter.summary,
          author: { "@type": frontmatter.author === "Nosfac Studios" ? "Organization" : "Person", name: frontmatter.author },
          datePublished: frontmatter.publishedAt,
          dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
          url: `${SITE.url}/journal/${frontmatter.slug}`,
        }}
      />
      <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-foreground-muted">
        <NextLink href="/journal" className="hover:text-foreground">
          Journal
        </NextLink>
        <span aria-hidden> / </span>
        <span aria-current="page">{frontmatter.title}</span>
      </nav>

      <p className="text-sm font-medium text-brand-500">
        {CATEGORY_LABELS[frontmatter.category]} · {formatDate(frontmatter.publishedAt)} ·{" "}
        {readingTimeMinutes} min de lecture
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{frontmatter.title}</h1>
      <p className="mt-4 text-lg text-foreground-muted">{frontmatter.summary}</p>

      {frontmatter.updatedAt ? (
        <p className="mt-4 rounded-xl border border-border-subtle bg-surface-elevated p-3 text-sm text-foreground-muted">
          Mis à jour le {formatDate(frontmatter.updatedAt)}
          {frontmatter.updateReason ? ` pour refléter ${frontmatter.updateReason}.` : "."}
        </p>
      ) : null}

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
