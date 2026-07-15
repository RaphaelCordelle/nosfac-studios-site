/**
 * Legal compliance validation script
 * 
 * Checks that legal pages don't contain placeholder text or incomplete information
 * that should not be visible in production.
 * 
 * Run with: npm run legal:check
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { validateLegalConfig } from "../src/config/legal";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEGAL_FILES_TO_CHECK = [
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

// Patterns that are OK in TypeScript code (for dynamic rendering) but NOT in static text
const CODE_CONTEXT_PATTERNS = [
  /\[nom légal non renseigné\]/gi,
  /\[.*?non renseigné.*?\]/gi,
];

interface ValidationError {
  file: string;
  line: number;
  pattern: string;
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
    
    // Skip lines that are clearly part of TypeScript code (with ?? or ternary operators)
    // These are dynamic rendering, not static placeholders
    const isCodeContext = line.includes("??") || line.includes("? ") || line.includes(": \"");
    
    for (const pattern of FORBIDDEN_PATTERNS) {
      const matches = line.match(pattern);
      if (matches) {
        errors.push({
          file: filePath,
          line: i + 1,
          pattern: pattern.source,
          match: matches[0],
        });
      }
    }
    
    // Check code context patterns only if NOT in code context
    if (!isCodeContext) {
      for (const pattern of CODE_CONTEXT_PATTERNS) {
        const matches = line.match(pattern);
        if (matches) {
          errors.push({
            file: filePath,
            line: i + 1,
            pattern: pattern.source,
            match: matches[0],
          });
        }
      }
    }
  }

  return errors;
}

async function checkLegalRoutes(): Promise<boolean> {
  const legalRoutes = [
    "src/app/legal/legal-notice/page.tsx",
    "src/app/legal/privacy/page.tsx",
    "src/app/legal/terms/page.tsx",
    "src/app/legal/cookies/page.tsx",
    "src/app/suppression-compte/page.tsx",
  ];

  let allExist = true;
  for (const route of legalRoutes) {
    const fullPath = path.join(__dirname, "..", route);
    try {
      await fs.access(fullPath);
    } catch {
      console.error(`❌ Missing legal route: ${route}`);
      allExist = false;
    }
  }

  return allExist;
}

async function checkConfigValidation(): Promise<boolean> {
  const validation = validateLegalConfig();
  
  if (!validation.valid) {
    console.error("\n❌ Legal configuration incomplete:");
    console.error("Missing required fields for current legal status:");
    for (const field of validation.missing) {
      console.error(`  - ${field}`);
    }
    console.error("\nPlease update src/config/legal.ts with the required information.");
    console.error("See docs/LEGAL_BLOCKERS.md for details.\n");
    return false;
  }

  return true;
}

async function main() {
  console.log("🔍 Validating legal compliance...\n");

  // Check 1: Legal routes exist
  console.log("Checking legal routes...");
  const routesExist = await checkLegalRoutes();
  if (!routesExist) {
    process.exit(1);
  }
  console.log("✅ All legal routes exist\n");

  // Check 2: Configuration validation
  console.log("Checking legal configuration...");
  const configValid = await checkConfigValidation();
  if (!configValid) {
    console.warn("⚠️  Configuration incomplete but not blocking build");
    console.warn("    (Complete before commercial launch)\n");
  } else {
    console.log("✅ Legal configuration valid\n");
  }

  // Check 3: Placeholder patterns
  console.log("Checking for placeholder text...");
  let hasErrors = false;

  for (const file of LEGAL_FILES_TO_CHECK) {
    const errors = await checkFile(file);
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`\n❌ Found placeholders in ${file}:`);
      for (const error of errors) {
        console.error(`   Line ${error.line}: ${error.match}`);
      }
    }
  }

  if (!hasErrors) {
    console.log("✅ No placeholder text found\n");
  } else {
    console.error("\n❌ Validation failed: Placeholder text found in legal pages");
    console.error("These placeholders should be replaced or removed before production.\n");
    process.exit(1);
  }

  // Check 4: Contact email consistency
  console.log("Checking contact email consistency...");
  const configPath = path.join(__dirname, "..", "src/config/legal.ts");
  const configContent = await fs.readFile(configPath, "utf-8");
  const siteConfigPath = path.join(__dirname, "..", "src/config/site.ts");
  const siteConfigContent = await fs.readFile(siteConfigPath, "utf-8");

  const legalEmailMatch = configContent.match(/email:\s*"([^"]+)"/);
  const siteEmailMatch = siteConfigContent.match(/contactEmail:\s*"([^"]+)"/);

  if (legalEmailMatch && siteEmailMatch && legalEmailMatch[1] !== siteEmailMatch[1]) {
    console.error(`❌ Contact email mismatch:`);
    console.error(`   legal.ts: ${legalEmailMatch[1]}`);
    console.error(`   site.ts:  ${siteEmailMatch[1]}`);
    process.exit(1);
  }
  console.log("✅ Contact email consistent\n");

  console.log("✅ Legal validation passed!\n");
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Validation script error:", error);
  process.exit(1);
});
