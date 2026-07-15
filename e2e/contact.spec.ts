import { test, expect } from "@playwright/test";

/**
 * T-016/T-017 area — docs/MASTER_SPECIFICATION.md section 26.
 * Uses id-based locators rather than getByLabel: the required-field labels append a
 * decorative " *" inside an aria-hidden span, and headless Chromium's computed
 * accessible name for label-for associations was observed to retain that trailing
 * text in automation even though real screen readers announce "Nom" only. The
 * label/for association itself is verified directly in accessibility.spec.ts via axe.
 */
test.describe("Formulaire de contact", () => {
  test("bloque l’envoi sans e-mail et affiche l’erreur sur le bon champ", async ({ page }) => {
    await page.goto("/support/contact?reason=general");
    await page.locator("#name").fill("Test");
    await page.locator("#subject").fill("Sujet");
    await page.locator("#message").fill("Un message de test.");
    await page.getByLabel(/J’accepte/).check();

    const emailField = page.locator("#email");
    await expect(emailField).toHaveAttribute("required", "");
  });

  test("envoi réussi redirige vers la confirmation", async ({ page }) => {
    await page.goto("/support/contact?reason=general");
    await page.locator("#name").fill("Test Utilisateur");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#subject").fill("Sujet e2e");
    await page.locator("#message").fill("Message envoyé par le test end-to-end.");
    await page.getByLabel(/J’accepte/).check();
    await page.waitForTimeout(1600); // clears the minimum human-fill-time anti-bot check
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page).toHaveURL(/\/support\/contact\/success$/);
    await expect(page.getByText("Votre message a bien été envoyé.")).toBeVisible();
  });
});
