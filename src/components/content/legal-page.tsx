import { Callout } from "@/components/ui/callout";

export function LegalPage({
  title,
  updatedAt,
  incomplete,
  children,
}: {
  title: string;
  updatedAt: string;
  /** When true, surfaces a visible warning that this page still contains blocking placeholders. */
  incomplete?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-foreground-muted">Dernière mise à jour : {updatedAt}</p>

      {incomplete ? (
        <Callout variant="warning" title="Document incomplet" className="mt-6">
          Cette page contient des informations légales encore manquantes (marquées ci-dessous). Elles
          doivent être complétées avant tout lancement commercial (docs/MASTER_SPECIFICATION.md §7.11 et
          Annexe C).
        </Callout>
      ) : null}

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">{children}</div>
    </div>
  );
}

export function MissingField({ label }: { label: string }) {
  return (
    <span className="rounded bg-warning-500/15 px-1.5 py-0.5 text-sm font-medium text-warning-500">
      [{label} — à compléter]
    </span>
  );
}
