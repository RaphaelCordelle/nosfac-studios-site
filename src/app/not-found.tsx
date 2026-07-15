import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/** 404 — docs/MASTER_SPECIFICATION.md section 7.12. Real HTTP 404 status, no soft-404. */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-center justify-center px-5 py-16 text-center">
      <p className="text-sm font-medium text-brand-500">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        Cette page n’existe pas ou a été déplacée.
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <NextLink
          href="/"
          className="flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white"
        >
          Retour à l’accueil
        </NextLink>
        <NextLink
          href="/projects"
          className="flex h-12 items-center rounded-full border border-border-subtle px-6 text-sm font-medium hover:border-brand-500"
        >
          Voir les projets
        </NextLink>
      </div>
    </div>
  );
}
