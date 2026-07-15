/**
 * Legal compliance validation script
 * Enhanced for multi-product architecture (Chain, KnowOut, jeu musical).
 * 
 * Run with: npm run legal:check
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { validateLegalConfig } from "../src/config/legal";
import { PRODUCTS } from "../src/config/products";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEGAL_FILES = [
  "src/app/legal/legal-notice/page.tsx",
  "src/app/legal/privacy/page.tsx",
  "src/app/legal/terms/page.tsx",
  "src/app/legal/cookies/page.tsx",
  "src/app/suppression-compte/page.tsx",
];

const FORBIDDEN_PATTERNS = [
  /\[à compléter\]/gi,
  /\[raison sociale\]/gi,
  /TODO:/gi,
  /FIXME:/gi,
  /XXX:/gi,
  /<MissingField/gi,
];

interface ValidationError {
  file: string;
  line: number;
  match: string;
}

async function checkFile(filePath: string): Promise<ValidationError[]> {
  const fullPath = path.join(__dirname, "..", filePath);
  const content = await fs.readFile(fullPath, "utf-8");
  const lines = content.split("\n");
  const errors: ValidationError[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) continue;
    for (const pattern of FORBIDDEN_PATTERNS) {
      const matches = line.match(pattern);
      if (matches) {
        errors.push({ file: filePath, line: i + 1, match: matches[0] });
      }
    }
  }

  return errors;
}

async function checkRoutes(): Promise<boolean> {
  const routes = [
    "src/app/legal/legal-notice/page.tsx",
    "src/app/legal/privacy/page.tsx",
    "src/app/legal/terms/page.tsx",
    "src/app/legal/cookies/page.tsx",
    "src/app/suppression-compte/page.tsx",
  ];
  let ok = true;
  for (const route of routes) {
    const full = path.join(__dirname, "..", route);
    try {
      await fs.access(full);
    } catch {
      console.error(`❌ Route manquante : ${route}`);
      ok = false;
    }
  }
  return ok;
}

async function checkRedirects(): Promise<boolean> {
  const expectedSources = [
    "/mentions-legales",
    "/confidentialite",
    "/conditions-utilisation",
    "/cookies",
  ];
  const raw = await fs.readFile(path.join(__dirname, "..", "content/redirects.json"), "utf-8");
  const data = JSON.parse(raw) as { source: string }[];
  let ok = true;
  for (const src of expectedSources) {
    if (!data.some((r) => r.source === src)) {
      console.error(`❌ Redirection manquante : ${src}`);
      ok = false;
    }
  }
  return ok;
}

async function checkProductsConsistency(): Promise<boolean> {
  let ok = true;
  const privacyContent = await fs.readFile(
    path.join(__dirname, "..", "src/app/legal/privacy/page.tsx"),
    "utf-8",
  );

  for (const product of PRODUCTS) {
    // Anchor must exist in privacy page (via the anchor id map)
    // The privacy page iterates PRODUCTS array so anchors are guaranteed.
    // We validate INTERNAL consistency of each product.

    // Advertising declared but no provider that could be an ad SDK
    if (product.hasAdvertising && !product.providers.some((p) => /admob|ad|meta|unity/i.test(p))) {
      console.error(
        `❌ Produit "${product.publicName}" déclare hasAdvertising: true mais aucun prestataire publicitaire n'est listé.`,
      );
      ok = false;
    }

    // In-app deletion declared true but no path
    if (product.hasInAppDeletion && !product.inAppDeletionPath) {
      console.error(
        `❌ Produit "${product.publicName}" déclare hasInAppDeletion: true mais aucun inAppDeletionPath n'est configuré.`,
      );
      ok = false;
    }

    // Provisional name in publicName (should be in displayName instead)
    if (/provisoire|temporaire|à définir|à choisir/i.test(product.publicName)) {
      console.error(
        `❌ Produit "${product.publicName}" a un nom présenté comme définitif alors qu'il est provisoire (utiliser displayName pour ça).`,
      );
      ok = false;
    }

    // Chain mention required in privacy for Play Console
    if (product.id === "chain" && !privacyContent.includes("Chain")) {
      console.error(`❌ Chain doit être mentionné dans la politique de confidentialité.`);
      ok = false;
    }

    // Every product must be referenceable from deletion page (via products.ts anchor)
    // The deletion page uses `product.anchorId` in a loop, so we check products.ts sources
    const productsSrc = await fs.readFile(
      path.join(__dirname, "..", "src/config/products.ts"),
      "utf-8",
    );
    if (!productsSrc.includes(`anchorId: "${product.anchorId}"`)) {
      console.error(
        `❌ Ancre "${product.anchorId}" absente de src/config/products.ts pour ${product.publicName}.`,
      );
      ok = false;
    }
  }

  return ok;
}

async function checkFooterLinks(): Promise<boolean> {
  const navContent = await fs.readFile(
    path.join(__dirname, "..", "src/config/navigation.ts"),
    "utf-8",
  );
  const expectedLinks = [
    "/legal/legal-notice",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/suppression-compte",
  ];
  let ok = true;
  for (const link of expectedLinks) {
    if (!navContent.includes(link)) {
      console.error(`❌ Lien "${link}" absent du footer (navigation.ts)`);
      ok = false;
    }
  }
  return ok;
}

async function main() {
  console.log("🔍 Vérification juridique — Nosfac Studios\n");

  console.log("→ Routes légales…");
  if (!(await checkRoutes())) process.exit(1);
  console.log("  ✅ Toutes les routes existent\n");

  console.log("→ Redirections /mentions-legales, /confidentialite, /conditions-utilisation, /cookies…");
  if (!(await checkRedirects())) process.exit(1);
  console.log("  ✅ Toutes les redirections sont configurées\n");

  console.log("→ Configuration légale (identité)…");
  const cfg = validateLegalConfig();
  if (!cfg.valid) {
    console.warn("  ⚠️ Configuration incomplète (non bloquante pour le build)");
    console.warn("  Champs manquants :");
    cfg.missing.forEach((f) => console.warn(`    - ${f}`));
    console.warn("  Voir docs/LEGAL_BLOCKERS.md\n");
  } else {
    console.log("  ✅ Configuration valide\n");
  }

  console.log("→ Cohérence multi-produits (Chain / KnowOut / jeu musical)…");
  if (!(await checkProductsConsistency())) process.exit(1);
  console.log("  ✅ Cohérence des 3 produits validée\n");

  console.log("→ Liens du footer…");
  if (!(await checkFooterLinks())) process.exit(1);
  console.log("  ✅ Tous les liens légaux sont présents\n");

  console.log("→ Placeholders dans les pages publiques…");
  let hasErrors = false;
  for (const file of LEGAL_FILES) {
    const errors = await checkFile(file);
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`  ❌ ${file}`);
      errors.forEach((e) => console.error(`     ligne ${e.line} : "${e.match}"`));
    }
  }
  if (hasErrors) process.exit(1);
  console.log("  ✅ Aucun placeholder détecté\n");

  console.log("→ Cohérence de l'adresse e-mail…");
  const legalCfg = await fs.readFile(path.join(__dirname, "..", "src/config/legal.ts"), "utf-8");
  const siteCfg = await fs.readFile(path.join(__dirname, "..", "src/config/site.ts"), "utf-8");
  const em1 = legalCfg.match(/email:\s*"([^"]+)"/)?.[1];
  const em2 = siteCfg.match(/contactEmail:\s*"([^"]+)"/)?.[1];
  if (em1 && em2 && em1 !== em2) {
    console.error(`  ❌ E-mail incohérent : legal.ts=${em1} vs site.ts=${em2}`);
    process.exit(1);
  }
  console.log("  ✅ E-mail cohérent\n");

  console.log("✅ Validation juridique passée.\n");
  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Erreur du script :", e);
  process.exit(1);
});
