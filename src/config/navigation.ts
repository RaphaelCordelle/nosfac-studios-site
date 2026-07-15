export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation — docs/MASTER_SPECIFICATION.md section 4.2. Order matters on mobile.
 * Journal is omitted entirely when no article is published yet.
 */
export function getPrimaryNav(hasJournalContent: boolean): NavItem[] {
  return [
    { label: "Projets", href: "/projects" },
    ...(hasJournalContent ? [{ label: "Journal", href: "/journal" }] : []),
    { label: "À propos", href: "/about" },
    { label: "Support", href: "/support/faq" },
  ];
}

export const CONTACT_NAV: NavItem = { label: "Nous contacter", href: "/support/contact" };

export const FOOTER_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "Projets", href: "/projects" },
      { label: "Journal", href: "/journal" },
      { label: "À propos", href: "/about" },
      { label: "Press kit", href: "/press" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "FAQ", href: "/support/faq" },
      { label: "Nous contacter", href: "/support/contact" },
    ],
  },
  {
    title: "Légal",
    items: [
      { label: "Mentions légales", href: "/legal/legal-notice" },
      { label: "Confidentialité", href: "/legal/privacy" },
      { label: "Conditions d’utilisation", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];
