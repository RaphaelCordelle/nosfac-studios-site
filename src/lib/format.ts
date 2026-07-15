/** Locale-aware formatting helpers — docs/MASTER_SPECIFICATION.md section 13.3 ("dates localisées"). */
export function formatDate(iso: string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}
