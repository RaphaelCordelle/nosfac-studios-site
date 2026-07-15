import NextLink from "next/link";
import type { ArticleContent } from "@/lib/content/articles";
import { CATEGORY_LABELS } from "@/domain/article";
import { MediaFrame } from "@/components/content/media-frame";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: ArticleContent }) {
  const { frontmatter } = article;
  return (
    <article className="group relative flex flex-col gap-3 rounded-2xl border border-border-subtle p-4 transition-colors duration-(--duration-standard) hover:border-brand-500/60">
      <MediaFrame media={frontmatter.cover} ratioClassName="aspect-[3/2]" />
      <p className="text-xs font-medium text-foreground-muted">
        {CATEGORY_LABELS[frontmatter.category]} · {formatDate(frontmatter.publishedAt)} ·{" "}
        {article.readingTimeMinutes} min
      </p>
      <h3 className="font-semibold tracking-tight">
        <NextLink href={`/journal/${frontmatter.slug}`} className="after:absolute after:inset-0">
          {frontmatter.title}
        </NextLink>
      </h3>
      <p className="text-sm text-foreground-muted">{frontmatter.summary}</p>
    </article>
  );
}
