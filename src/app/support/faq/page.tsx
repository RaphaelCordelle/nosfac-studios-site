import type { Metadata } from "next";
import NextLink from "next/link";
import { getAllFaqEntries } from "@/lib/content/faq";
import { FaqList } from "@/components/content/faq-list";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Support et FAQ",
  description: "Trouvez une réponse rapide ou contactez le support Nosfac Studios.",
};

export default function FaqPage() {
  const entries = getAllFaqEntries();

  return (
    <div className="mx-auto max-w-[860px] px-5 py-12 md:px-8 md:py-16">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Comment pouvons-nous vous aider ?
        </h1>
      </header>

      <div className="mt-8">
        {entries.length === 0 ? (
          <EmptyState
            title="Aucune question fréquente n’est encore publiée."
            description="Le support s’enrichira au fil des retours des joueurs."
          />
        ) : (
          <FaqList entries={entries} />
        )}
      </div>

      <section className="mt-16 rounded-2xl border border-border-subtle p-8 text-center">
        <p className="font-medium">Vous n’avez pas trouvé la réponse ?</p>
        <p className="mt-2 text-sm text-foreground-muted">
          Choisissez le bon motif de contact pour que votre message arrive avec le bon contexte.
        </p>
        <NextLink
          href="/support/contact"
          className="mt-4 inline-flex h-11 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white"
        >
          Trouver une réponse
        </NextLink>
      </section>
    </div>
  );
}
