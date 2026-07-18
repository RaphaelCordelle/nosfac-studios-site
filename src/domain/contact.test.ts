import { describe, expect, it } from "vitest";
import { ContactFormSchema, REQUIRED_FIELDS_BY_REASON } from "./contact";

describe("ContactFormSchema", () => {
  const base = {
    reason: "general" as const,
    name: "Ada Lovelace",
    email: "ada@example.com",
    consent: true as const,
    formStartedAt: Date.now() - 5000,
  };

  it("accepts a minimal valid general request", () => {
    const result = ContactFormSchema.safeParse({ ...base, subject: "Question", message: "Bonjour" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = ContactFormSchema.safeParse({ ...base, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects consent !== true", () => {
    const result = ContactFormSchema.safeParse({ ...base, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a honeypot value", () => {
    const result = ContactFormSchema.safeParse({ ...base, honeypot: "spam" });
    expect(result.success).toBe(false);
  });

  it("declares required fields for every reason", () => {
    for (const fields of Object.values(REQUIRED_FIELDS_BY_REASON)) {
      expect(Array.isArray(fields)).toBe(true);
    }
  });

  it("accepts a privacy request that identifies the account and requested deletion", () => {
    const result = ContactFormSchema.safeParse({
      ...base,
      reason: "privacy",
      projectSlug: "chain",
      accountRef: "player-42",
      subject: "Suppression partielle de données",
      message: "Supprimer mon historique de parties et conserver mon compte.",
    });

    expect(result.success).toBe(true);
    expect(REQUIRED_FIELDS_BY_REASON.privacy).toEqual([
      "projectSlug",
      "accountRef",
      "subject",
      "message",
    ]);
  });
});
