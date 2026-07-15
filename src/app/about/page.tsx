import type { Metadata } from "next";
import NextLink from "next/link";
import { getPublicProjects } from "@/lib/content/projects";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";

export const metadata: Metadata = {
  title: "À propos",
  description: "Le positionnement, l’origine du nom et la méthode de travail de Nosfac Studios.",
};

const METHOD_STEPS = [
  {
    title: "Concevoir",
    body: "Partir d’une règle ou d’une mécanique simple et compréhensible avant d’ajouter de la complexité.",
  },
  {
    title: "Construire",
    body: "Développer des prototypes jouables plutôt que des maquettes figées.",
  },
  {
    title: "Tester",
    body: "Vérifier les décisions en jeu réel, avec des retours concrets plutôt que des suppositions.",
  },
  {
    title: "Corriger",
    body: "Documenter les itérations dans le journal de développement, y compris les changements de direction.",
  },
];

export default function AboutPage() {
  const projects = getPublicProjects();

  const timeline = [...projects]
    .filter((p) => p.startedAt)
    .sort((a, b) => new Date(a.startedAt!).getTime() - new Date(b.startedAt!).getTime());

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Un studio construit projet après projet.
        </h1>
        <p className="mt-4 text-foreground-muted">
          {SITE.name} est un studio indépendant de jeux et de logiciels qui privilégie la construction
          patiente, la qualité d’exécution et l’apprentissage continu.
        </p>
      </header>

      <section className="mt-16 max-w-2xl border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Origine du nom</h2>
        <p className="mt-3 text-foreground-muted">{SITE.originStory}</p>
      </section>

      {timeline.length > 0 ? (
        <section className="mt-16 border-t border-border-subtle pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Chronologie</h2>
          <ol className="mt-6 space-y-4 border-l border-border-subtle pl-6">
            {timeline.map((project) => (
              <li key={project.slug}>
                <p className="text-sm font-medium text-foreground-muted">
                  {new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
                    new Date(project.startedAt!),
                  )}
                </p>
                <NextLink href={`/projects/${project.slug}`} className="font-medium hover:text-brand-500">
                  {project.name} — {STATUS_LABELS[project.status].label}
                </NextLink>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="mt-16 border-t border-border-subtle pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Chronologie</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            Les dates de démarrage des projets n’ont pas encore été confirmées ; cette section s’enrichira
            automatiquement dès qu’elles le seront.
          </p>
        </section>
      )}

      <section className="mt-16 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Méthode de développement</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {METHOD_STEPS.map((step) => (
            <div key={step.title}>
              <p className="font-medium text-brand-500">{step.title}</p>
              <p className="mt-2 text-sm text-foreground-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profil fondateur : masqué par défaut — aucune donnée personnelle publiée sans validation explicite (section 7.6). */}

      <section className="mt-16 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Technologies</h2>
        <p className="mt-3 max-w-prose text-sm text-foreground-muted">
          Les technologies utilisées sont indiquées sur chaque page projet lorsqu’elles sont pertinentes,
          plutôt qu’affichées ici comme un mur de logos.
        </p>
      </section>

      <div className="mt-16 flex flex-col gap-4 border-t border-border-subtle pt-8 md:flex-row md:items-center md:justify-between">
        <NextLink
          href="/projects"
          className="flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white"
        >
          Voir les projets
        </NextLink>
        <NextLink
          href="/support/contact?reason=career"
          className="flex h-12 items-center rounded-full border border-border-subtle px-6 text-sm font-medium hover:border-brand-500"
        >
          Contact professionnel
        </NextLink>
      </div>
    </div>
  );
}
