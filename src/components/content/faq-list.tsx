"use client";

import * as React from "react";
import NextLink from "next/link";
import type { FaqEntry } from "@/domain/faq";
import { CATEGORY_LABELS } from "@/domain/faq";
import { cn } from "@/lib/utils";

/**
 * FAQ search + list — docs/MASTER_SPECIFICATION.md section 7.7.
 * Rendered with native <details>/<summary> so every answer is present and expandable
 * in the initial HTML, with or without JavaScript (acceptance criterion, section 7.7).
 * The search input is a progressive enhancement: with JS disabled it simply does
 * nothing and the full list remains browsable.
 */
export function FaqList({ entries }: { entries: FaqEntry[] }) {
  const [query, setQuery] = React.useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filtered =
    normalizedQuery.length < 2
      ? entries
      : entries.filter(
          (entry) =>
            entry.question.toLowerCase().includes(normalizedQuery) ||
            entry.answer.toLowerCase().includes(normalizedQuery),
        );

  const grouped = filtered.reduce<Record<string, FaqEntry[]>>((acc, entry) => {
    (acc[entry.category] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <div>
      <label htmlFor="faq-search" className="sr-only">
        Rechercher une question
      </label>
      <input
        id="faq-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher une question"
        className="h-12 w-full rounded-full border border-border-subtle bg-surface px-5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
      />

      <p role="status" className="sr-only">
        {normalizedQuery.length >= 2 ? `${filtered.length} résultat(s) trouvé(s).` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border-subtle p-8 text-center">
          <p className="font-medium">Aucun résultat pour cette recherche.</p>
          <NextLink
            href="/support/contact"
            className="mt-3 inline-block text-sm font-medium text-brand-500 hover:text-brand-300"
          >
            Choisissez le bon motif de contact →
          </NextLink>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-sm font-semibold tracking-wide text-foreground-muted uppercase">
                {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
              </h2>
              <div className="mt-3 divide-y divide-border-subtle border-t border-border-subtle">
                {items.map((entry) => (
                  <details key={entry.id} id={entry.id} className="group py-4">
                    <summary
                      className={cn(
                        "flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium",
                        "focus-visible:outline-2 focus-visible:outline-brand-500",
                      )}
                    >
                      {entry.question}
                      <span aria-hidden className="shrink-0 transition-transform duration-(--duration-standard) group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-foreground-muted">{entry.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
