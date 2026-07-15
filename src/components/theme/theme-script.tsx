/** Sets data-theme before first paint to avoid a light/dark flash (section 4.2 — "mémorise le choix"). */
const THEME_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("nosfac-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
