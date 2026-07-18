/**
 * Products configuration — Single source of truth for the three Nosfac Studios projects.
 * 
 * Used by the centralised privacy policy and account deletion pages to render sections
 * that reflect the REAL state of each product (no invented data collection).
 * 
 * When a product evolves (feature added, provider swapped, account system enabled), update
 * ONLY this file. The privacy/deletion pages then reflect the change automatically.
 * 
 * The verificationDate is used to warn the reader when a section has not been reviewed
 * recently.
 */

export type ProductId = "chain" | "knowout" | "musicGame";

export type ProductStatus =
  | "in-development" // Not yet publicly available, no live data collection.
  | "closed-beta"    // Distributed to a closed group.
  | "public-beta"    // Available on stores under a beta label.
  | "released";      // Public release.

export interface DataCategory {
  category: string;
  examples: string;
  purpose: string;
  legalBasis: string;
  required: boolean;
  destinatairesNote?: string;
  retention?: string;
}

export interface ProductConfig {
  id: ProductId;
  publicName: string;
  displayName: string; // May include "(nom provisoire)" if provisional
  status: ProductStatus;
  platforms: string[];
  anchorId: string; // Used for /confidentialite#anchorId and /suppression-compte#anchorId

  /** Whether a public user account currently exists in the shipped version */
  hasAccount: boolean;
  /** Whether in-app account deletion is available (from the app itself) */
  hasInAppDeletion: boolean;
  /** Verified path inside the app to reach the deletion feature */
  inAppDeletionPath?: string;
  /** Whether the product currently uses in-app purchases */
  hasInAppPurchases: boolean;
  /** Whether the product currently displays advertisements */
  hasAdvertising: boolean;

  /** Providers actually used by THIS product (from the audit) */
  providers: string[];

  /**
   * Region where the primary backend / database of THIS product is hosted.
   * Free-form label (e.g., "Irlande (Supabase eu-west-1)"). null when the
   * product has no active backend yet.
   */
  backendRegion: string | null;

  /**
   * Public audience minimum age retained for launch. Marketing target, not the
   * IARC classification. null when not yet decided for this product.
   */
  targetMinimumAge: number | null;

  /** Data categories actually collected by THIS product (in the currently shipped version) */
  dataCategories: DataCategory[];

  /** Date of the last audit of this section */
  verificationDate: string;

  /** Short summary displayed on the account-deletion page */
  deletionSummary: string;

  /** Consequences of deletion, product-specific */
  deletionConsequences: string[];

  /** Additional notes to display (about subscription, external accounts, etc.) */
  additionalNotes?: string[];
}

/**
 * Chain — Jeu mobile de chaînes de mots. Actuellement en développement / build de test.
 * Audit visuel des interfaces disponibles + backend Supabase déclaré.
 */
export const CHAIN: ProductConfig = {
  id: "chain",
  publicName: "Chain",
  displayName: "Chain",
  status: "in-development",
  platforms: ["iOS", "Android"],
  anchorId: "chain",
  hasAccount: true,
  hasInAppDeletion: true,
  inAppDeletionPath: "Profil → Gestion du compte → Supprimer mon compte.",
  hasInAppPurchases: false, // Google Play Billing pas encore activé publiquement
  hasAdvertising: false, // Aucun SDK publicitaire détecté à date
  providers: ["Supabase", "Google Play (distribution uniquement pour Android)"],
  backendRegion: "Irlande (Supabase, région eu-west-1)",
  targetMinimumAge: 16,
  dataCategories: [
    {
      category: "Identifiant de compte interne",
      examples: "UUID généré par Supabase Auth",
      purpose: "Identifier de manière unique le compte joueur",
      legalBasis: "Exécution du contrat",
      required: true,
      retention: "Tant que le compte existe",
    },
    {
      category: "Adresse e-mail",
      examples: "Fournie lors de la création du compte",
      purpose: "Authentification, récupération du compte",
      legalBasis: "Exécution du contrat",
      required: false,
      destinatairesNote: "Stockée uniquement par Supabase, jamais transmise à des tiers publicitaires",
      retention: "Tant que le compte existe",
    },
    {
      category: "Pseudonyme et avatar",
      examples: "Choisis par le joueur dans l'application",
      purpose: "Affichage dans le jeu, classements internes",
      legalBasis: "Exécution du contrat",
      required: true,
      retention: "Tant que le compte existe",
    },
    {
      category: "Progression et statistiques de partie",
      examples: "Niveau, XP, records personnels, historique récent",
      purpose: "Fonctionnement du jeu (chaîne courante, records, classements)",
      legalBasis: "Exécution du contrat",
      required: true,
      retention: "Tant que le compte existe",
    },
  ],
  verificationDate: "2026-07-18",
  deletionSummary:
    "Vous pouvez demander la suppression de certaines données en conservant votre compte, ou supprimer définitivement le compte et l'ensemble des données qui lui sont associées.",
  deletionConsequences: [
    "Perte du pseudonyme, de l'avatar, du niveau et de tous les records",
    "Perte de l'historique des parties et des statistiques",
    "En cas de recréation ultérieure, la progression repart de zéro",
  ],
  additionalNotes: [
    "La suppression des données ou du compte n'annule pas automatiquement un éventuel abonnement géré par Google Play. Celui-ci doit être résilié séparément dans Google Play.",
    "Certaines informations strictement nécessaires à la sécurité, à la prévention de la fraude ou à une obligation légale peuvent être conservées pendant la durée requise.",
  ],
};

/**
 * KnowOut — Jeu de connaissances multijoueur. En développement, aucun service public actif.
 * Aucun compte n'existe encore ; la politique reflète cet état, elle sera enrichie à la sortie.
 */
export const KNOWOUT: ProductConfig = {
  id: "knowout",
  publicName: "KnowOut",
  displayName: "KnowOut",
  status: "in-development",
  platforms: ["iOS (prévu)", "Android (prévu)"],
  anchorId: "knowout",
  hasAccount: false,
  hasInAppDeletion: false,
  hasInAppPurchases: false,
  hasAdvertising: false,
  providers: [],
  backendRegion: null,
  targetMinimumAge: 16,
  dataCategories: [],
  verificationDate: "2026-07-15",
  deletionSummary:
    "Aucun compte utilisateur public n'est actuellement disponible pour KnowOut. Aucune donnée personnelle n'est traitée par ce projet à ce jour.",
  deletionConsequences: [],
};

/**
 * Jeu musical — Nom définitif non choisi. Projet en développement.
 */
export const MUSIC_GAME: ProductConfig = {
  id: "musicGame",
  publicName: "Jeu musical",
  displayName: "Jeu musical — nom en cours de définition",
  status: "in-development",
  platforms: [],
  anchorId: "jeu-musical",
  hasAccount: false,
  hasInAppDeletion: false,
  hasInAppPurchases: false,
  hasAdvertising: false,
  providers: [],
  backendRegion: null,
  targetMinimumAge: 16,
  dataCategories: [],
  verificationDate: "2026-07-15",
  deletionSummary:
    "Aucun compte utilisateur public n'est actuellement disponible pour ce projet. Aucune donnée personnelle n'est traitée à ce jour.",
  deletionConsequences: [],
};

export const PRODUCTS: ProductConfig[] = [CHAIN, KNOWOUT, MUSIC_GAME];

/**
 * Get product by id
 */
export function getProduct(id: ProductId): ProductConfig {
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) throw new Error(`Product ${id} not found`);
  return p;
}

/**
 * Get consolidated list of providers actually used across all products (deduplicated).
 */
export function getAllActiveProviders(): { name: string; usedBy: string[] }[] {
  const map = new Map<string, string[]>();
  PRODUCTS.forEach((product) => {
    product.providers.forEach((provider) => {
      const existing = map.get(provider) ?? [];
      map.set(provider, [...existing, product.publicName]);
    });
  });
  return Array.from(map.entries()).map(([name, usedBy]) => ({ name, usedBy }));
}
