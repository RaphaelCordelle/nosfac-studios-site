import type { Metadata } from "next";
import NextLink from "next/link";
import { getPublicProjects } from "@/lib/content/projects";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";
import { MethodList } from "@/components/motion/method-list";

export const metadata: Metadata = {
  title: "À propos",
  description: "Positionnement, origine du nom et méthode de travail de Nosfac Studios.",
};

export default function AboutPage() {
  const projects = getPublicProjects();
  const timeline = [...projects]
    .filter((p) => p.startedAt)
    .sort((a, b) => new Date(a.startedAt!).getTime() - new Date(b.startedAt!).getTime());

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-[12px] font-medium text-accent-700">
            À propos du studio
          </span>
          <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-10">
            <h1 className="md:col-span-8 text-[clamp(2rem,3vw+1rem,3rem)] leading-[1.05] tracking-[-0.02em] font-semibold">
              Un studio indépendant français, construit projet après projet.
            </h1>
            <p className="md:col-span-4 md:pt-2 text-[16px] leading-[1.65] text-foreground-muted">
              {SITE.name} édite des jeux et applications en autonomie, sans investisseur, à un
              rythme volontairement lent.
            </p>
          </div>
        </div>
      </section>

      {/* Origine */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-600">
                Origine du nom
              </p>
              <h2 className="mt-2 text-[22px] font-semibold tracking-tight">Nosfac</h2>
            </div>
            <p className="md:col-span-8 text-[17px] leading-[1.65] text-foreground max-w-2xl">
              {SITE.originStory}
            </p>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-600">
              Méthode de travail
            </p>
            <h2 className="mt-2 text-[clamp(1.75rem,2vw+1rem,2.25rem)] leading-[1.1] tracking-[-0.02em] font-semibold">
              Concevoir, construire, tester, corriger.
            </h2>
          </div>

          <MethodList
            steps={[
              { term: "Concevoir", desc: "Partir d'une règle simple, compréhensible sans tutoriel." },
              { term: "Construire", desc: "Prototyper avant de maquetter. Le prototype décide." },
              { term: "Tester", desc: "Vérifier chaque décision dans le vrai jeu, avec des joueurs qui n'ont pas conçu le jeu." },
              { term: "Corriger", desc: "Documenter les itérations, y compris les changements de direction." },
            ]}
          />
        </div>
      </section>

      {/* Chronologie */}
      {timeline.length > 0 && (
        <section className="border-t border-border-subtle">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <div className="mb-8">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-600">
                Chronologie
              </p>
              <h2 className="mt-2 text-[22px] font-semibold tracking-tight">Jalons du studio</h2>
            </div>
            <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface-elevated overflow-hidden">
              {timeline.map((project) => (
                <li key={project.slug}>
                  <NextLink
                    href={`/projects/${project.slug}`}
                    className="group grid gap-2 px-5 py-4 md:grid-cols-12 md:gap-6 hover:bg-cream-100/50 transition-colors"
                  >
                    <time
                      className="tabular text-[13px] text-foreground-subtle md:col-span-3"
                      dateTime={project.startedAt!}
                    >
                      {new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(project.startedAt!))}
                    </time>
                    <p className="md:col-span-9 text-[15px]">
                      <span className="font-semibold group-hover:text-accent-600 transition-colors">
                        {project.name}
                      </span>
                      <span className="ml-2 text-foreground-muted">— {STATUS_LABELS[project.status].label}</span>
                    </p>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="rounded-3xl border border-border-subtle bg-cream-100 p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
              <div className="md:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-600">
                  Contact professionnel
                </p>
                <h2 className="mt-2 text-[22px] font-semibold tracking-tight md:text-[26px]">
                  Presse, partenariats, candidatures spontanées.
                </h2>
              </div>
              <div className="md:col-span-4 md:text-right">
                <NextLink
                  href="/support/contact?reason=business"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[14px] font-medium text-surface hover:bg-accent-600 transition-colors"
                >
                  Nous écrire →
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
