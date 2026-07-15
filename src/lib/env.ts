import { z } from "zod";

/**
 * Centralized, validated access to environment variables — docs/MASTER_SPECIFICATION.md
 * section 21.1. Secrets never carry the NEXT_PUBLIC_ prefix. Every variable is optional
 * at the schema level because the site must build and run in Development without any
 * third-party service configured; adapters fall back to safe no-op/console behavior
 * when a variable is missing (see src/services/*).
 */

const EnvSchema = z.object({
  SITE_URL: z.string().url().default("http://localhost:3000"),
  CONTACT_TO_EMAIL: z.string().email().default("nosfac.studios@gmail.com"),
  CONTACT_FROM_EMAIL: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  ANALYTICS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

function loadEnv() {
  const parsed = EnvSchema.safeParse({
    SITE_URL: process.env.SITE_URL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED,
  });

  if (!parsed.success) {
    throw new Error(`Variables d'environnement invalides: ${parsed.error.message}`);
  }

  return parsed.data;
}

export const env = loadEnv();

export const emailProviderConfigured = Boolean(env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL);
export const turnstileConfigured = Boolean(
  env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
);
