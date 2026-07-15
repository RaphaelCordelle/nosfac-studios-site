/**
 * Shared layout for all legal pages
 * Provides consistent structure without showing "incomplete" warnings in production
 */

export function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[780px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Dernière mise à jour : {new Date(updatedAt).toLocaleDateString("fr-FR", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        })}
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_table]:text-sm [&_td]:p-3 [&_th]:p-3 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}
