import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArticleFrontmatterSchema, type ArticleFrontmatter } from "@/domain/article";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");
const WORDS_PER_MINUTE = 200;

export interface ArticleContent {
  frontmatter: ArticleFrontmatter;
  source: string;
  readingTimeMinutes: number;
}

function readArticleFile(filename: string): ArticleContent {
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const result = ArticleFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      `Contenu article invalide dans ${filename}: ${result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  return { frontmatter: result.data, source: content, readingTimeMinutes };
}

function listArticleFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getPublicArticles(): ArticleContent[] {
  const isProduction = process.env.NODE_ENV === "production";
  const now = Date.now();
  return listArticleFiles()
    .map(readArticleFile)
    .filter((article) => {
      if (isProduction && article.frontmatter.visibility !== "public") return false;
      if (new Date(article.frontmatter.publishedAt).getTime() > now) return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
    );
}

export function getArticleBySlug(slug: string): ArticleContent | null {
  return getPublicArticles().find((article) => article.frontmatter.slug === slug) ?? null;
}

export function getFeaturedArticle(): ArticleContent | undefined {
  return getPublicArticles().find((article) => article.frontmatter.featured);
}
