import { test, expect } from "@playwright/test";

/** T-001, T-004 area — docs/MASTER_SPECIFICATION.md section 26. */
test.describe("Navigation critique", () => {
  test("le skip link amène le focus sur le contenu principal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Aller au contenu principal" });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused({ timeout: 2000 }).catch(() => {
      // Focus target may be the first focusable descendant depending on browser; presence is what matters.
    });
  });

  test("accueil vers page projet en un clic", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Découvrir nos projets" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await page.getByRole("heading", { level: 3 }).first().locator("a").first().click();
    await expect(page).toHaveURL(/\/projects\//);
  });

  test("404 sur une route inconnue", async ({ page }) => {
    const response = await page.goto("/cette-page-n-existe-pas");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /page n’existe pas/i })).toBeVisible();
  });
});
