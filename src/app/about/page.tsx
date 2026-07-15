import type { Metadata } from "next";
import NextLink from "next/link";
import { getPublicProjects } from "@/lib/content/projects";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";

export const metadata: Metadata = {
  title: "À propos",
  description: "Le positionnement, l'origine du nom et la méthode de travail de Nosfac Studios.",
};

export default function AboutPage() {
  const projects = getPublicProjects();
  const timeline = [...projects]
    .filter((p) => p.startedAt)
    .sort((a, b) => new Date(a.startedAt!).getTime() - new Date(b.startedAt!).getTime());

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-14 md:px-8 md:pt-14 md:pb-20">
          <div className="flex items-baseline justify-between gap-6 text-[12px] text-foreground-subtle">
            <span>À propos</span>
            <span>Nosfac Studios</span>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-8">
            <h1 className="md:col-span-8 text-[clamp(2rem,3vw+1rem,3rem)] leading-[1.05] tracking-[-0.02em] font-medium">
              Un studio indépendant, construit projet après projet.
            </h1>
            <p className="md:col-span-4 md:pt-3 text-[15px] leading-[1.6] text-foreground-muted">
              {SITE.name} édite des jeux et des applications en autonomie, sans investisseur
              extérieur, à un rythme volontairement lent.
            </p>
          </div>
        </div>
      </section>

      {/* Origine */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Origine du nom
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-[17px] leading-[1.65] text-foreground max-w-2xl">
                {SITE.originStory}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="mb-10 flex items-baseline justify-between border-b border-border-subtle pb-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
              Méthode de travail
            </p>
          </div>

          <dl className="divide-y divide-border-subtle">
            {[
              {
                term: "Concevoir",
                desc: "Partir d'une règle ou d'une mécanique simple, compréhensible sans tutoriel.",
              },
              {
                term: "Construire",
                desc: "Développer un prototype jouable avant tout maquettage figé. Le prototype décide.",
              },
              {
                term: "Tester",
                desc: "Vérifier chaque décision en jeu réel, sur les vrais appareils, avec des joueurs qui ne connaissent pas déjà le projet.",
              },
              {
                term: "Corriger",
                desc: "Documenter les itérations, y compris les changements de direction. Rien n'est officiel tant que ce n'est pas testé.",
              },
            ].map((step) => (
              <div key={step.term} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <dt className="text-[17px] font-medium md:col-span-3">{step.term}</dt>
                <dd className="text-[15px] leading-[1.65] text-foreground-muted md:col-span-9">
                  {step.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Chronologie */}
      {timeline.length > 0 && (
        <section className="border-b border-border-subtle">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b border-border-subtle pb-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                Chronologie
              </p>
              <span className="tabular text-[11px] text-foreground-subtle">
                {String(timeline.length).padStart(2, "0")} jalons
              </span>
            </div>
            <ul className="divide-y divide-border-subtle">
              {timeline.map((project) => (
                <li key={project.slug}>
                  <NextLink
                    href={`/projects/${project.slug}`}
                    className="grid gap-2 py-5 md:grid-cols-12 md:gap-8 hover:text-accent-600 transition-colors"
                  >
                    <time
                      className="tabular text-[13px] text-foreground-subtle md:col-span-2"
                      dateTime={project.startedAt!}
                    >
                      {new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
                        new Date(project.startedAt!),
                      )}
                    </time>
                    <div className="md:col-span-10">
                      <p className="text-[17px] font-medium">
                        {project.name} <span className="text-foreground-subtle font-normal">— {STATUS_LABELS[project.status].label}</span>
                      </p>
                    </div>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Colophon */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <p className="md:col-span-4 text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
              Contact professionnel
            </p>
            <div className="md:col-span-8">
              <p className="text-[15px] leading-[1.6] text-foreground-muted max-w-md">
                Pour les demandes de presse, partenariats ou candidatures spontanées, utilisez
                le formulaire de contact ou écrivez directement à l&apos;adresse du studio.
              </p>
              <div className="mt-4 flex items-baseline gap-6">
                <NextLink
                  href="/support/contact?reason=business"
                  className="inline-flex items-baseline gap-2 border-b border-foreground pb-0.5 text-[15px] font-medium hover:text-accent-600 hover:border-accent-600 transition-colors"
                >
                  Formulaire
                  <span aria-hidden className="text-[13px]">→</span>
                </NextLink>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="text-[14px] text-foreground-muted link-underline font-mono"
                >
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
