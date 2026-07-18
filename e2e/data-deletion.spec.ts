import { test, expect } from "@playwright/test";

test.describe("Suppression des données Chain", () => {
  test("permet de choisir des données à supprimer sans fermer le compte", async ({ page }) => {
    await page.goto("/suppression-compte#chain");

    await expect(page.getByRole("heading", { name: "Gérer ou supprimer vos données" })).toBeVisible();
    await page.getByTestId("data-deletion-request-chain").click();

    await expect(page.getByRole("heading", { name: "Choisir les données à supprimer" })).toBeVisible();
    await page.getByTestId("deletion-email-input").fill("joueur@example.com");
    await page.getByTestId("deletion-account-reference-input").fill("joueur-chain");
    await page.getByTestId("data-scope-game-history").check();
    await page.getByTestId("deletion-confirmation-checkbox").check();

    await expect(page.getByTestId("deletion-submit-button")).toBeEnabled();
    await expect(page.getByText(/tout en conservant mon compte Chain/i)).toBeVisible();
  });

  test("conserve un parcours distinct pour la suppression complète du compte", async ({ page }) => {
    await page.goto("/suppression-compte#chain");
    await page.getByTestId("deletion-request-chain").click();

    await expect(page.getByRole("heading", { name: "Supprimer mon compte" })).toBeVisible();
    await expect(page.getByText(/suppression définitive de mon compte Chain/i)).toBeVisible();
  });
});
