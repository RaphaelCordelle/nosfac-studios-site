import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/content/projects";
import { SITE } from "@/config/site";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Press kit",
  description: "Informations officielles réutilisables par la presse et les créateurs de contenu.",
};

const BOILERPLATE_50 =
  "Nosfac Studios est un studio indépendant qui développe des jeux et applications avec une attention portée au rythme, à la clarté et à la qualité d’exécution.";

export default function PressPage() {
  const projects = getPublicProjects();

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12 md:px-8 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Press kit</h1>
        <p className="mt-4 text-foreground-muted">
          Ces fichiers peuvent être utilisés dans un contexte éditorial lié à {SITE.name} et ses projets.
        </p>
      </header>

      <section className="mt-10 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Présentation (50 mots)</h2>
        <p className="mt-3 text-foreground-muted">{BOILERPLATE_50}</p>
      </section>

      <section className="mt-10 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Logos et assets</h2>
        <EmptyState
          className="mt-4"
          title="Kit indisponible pour le moment."
          description="Aucun logo final ni capture haute résolution approuvée n’a encore été fourni. Cette section sera activée dès que des assets propres existeront."
        />
      </section>

      <section className="mt-10 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Projets</h2>
        <ul className="mt-4 space-y-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <a href={`/projects/${project.slug}`} className="font-medium hover:text-brand-500">
                {project.name}
              </a>{" "}
              <span className="text-sm text-foreground-muted">— {project.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Contact presse</h2>
        <a
          href="/support/contact?reason=press"
          className="mt-3 inline-flex h-11 items-center rounded-full bg-brand-500 px-5 text-sm font-medium text-white"
        >
          Contacter pour la presse
        </a>
      </section>
    </div>
  );
}
