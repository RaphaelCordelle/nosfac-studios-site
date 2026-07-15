import { SkipLink } from "@/components/layout/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OfflineBanner } from "@/components/layout/offline-banner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getPrimaryNav } from "@/config/navigation";
import { getPublicArticles } from "@/lib/content/articles";

export function AppShell({ children }: { children: React.ReactNode }) {
  const nav = getPrimaryNav(getPublicArticles().length > 0);

  return (
    <MotionProvider>
      <SkipLink />
      <OfflineBanner />
      <Header nav={nav} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </MotionProvider>
  );
}
