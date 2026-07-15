import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** docs/MASTER_SPECIFICATION.md section 13.3 / 26 (T-029 through T-036). */
const CRITICAL_PAGES = ["/", "/projects", "/projects/knowout", "/about", "/support/faq", "/support/contact"];

test.describe("Audit accessibilité automatisé (axe)", () => {
  for (const path of CRITICAL_PAGES) {
    test(`aucune violation critique/sérieuse sur ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      const blocking = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }
});
