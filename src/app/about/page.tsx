import type { Metadata } from "next";
import NextLink from "next/link";
import { getPublicProjects } from "@/lib/content/projects";
import { SITE } from "@/config/site";
import { STATUS_LABELS } from "@/domain/project";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedHeading } from "@/components/motion/animated-heading";

export const metadata: Metadata = {
  title: "À propos",
  description: "Le positionnement, l'origine du nom et la méthode de travail de Nosfac Studios.",
};

const METHOD_STEPS = [
  {
    num: "01",
    title: "Concevoir",
    body: "Partir d'une règle ou d'une mécanique simple et compréhensible avant d'ajouter de la complexité.",
  },
  {
    num: "02",
    title: "Construire",
    body: "Développer des prototypes jouables plutôt que des maquettes figées.",
  },
  {
    num: "03",
    title: "Tester",
    body: "Vérifier les décisions en jeu réel, avec des retours concrets plutôt que des suppositions.",
  },
  {
    num: "04",
    title: "Corriger",
    body: "Documenter les itérations dans le journal, y compris les changements de direction.",
  },
];

export default function AboutPage() {
  const projects = getPublicProjects();

  const timeline = [...projects]
    .filter((p) => p.startedAt)
    .sort((a, b) => new Date(a.startedAt!).getTime() - new Date(b.startedAt!).getTime());

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-10 h-[420px] w-[420px] rounded-full bg-accent-500/8 blur-[100px]"
        />
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
          <div className="mb-8 flex items-center gap-2 font-mono text-[11px] tracking-wider text-foreground-subtle uppercase md:mb-12">
            <span>Studio</span>
            <span className="text-foreground-subtle/40" aria-hidden>·</span>
            <span>Approche</span>
          </div>

          <div className="max-w-4xl">
            <AnimatedHeading
              as="h1"
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              Un studio construit
            </AnimatedHeading>
            <h1
              aria-hidden
              className="mt-1 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              projet après <span className="font-display italic text-accent-500">projet</span>.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
              {SITE.name}{" "}est un studio indépendant de jeux et de logiciels qui privilégie la
              construction patiente, la qualité d&apos;exécution et l&apos;apprentissage continu.
            </p>
          </div>
        </div>
      </section>

      {/* Origine + Positionnement grid */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                Origine
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                Le nom, le sens
              </h2>
            </Reveal>
            <Reveal className="md:col-span-7" delay={0.1}>
              <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
                {SITE.originStory}
              </p>
              <p className="mt-6 text-base leading-relaxed text-foreground-muted md:text-lg">
                Le studio existe pour construire des jeux et outils que nous voudrions utiliser
                nous-mêmes — clairs à comprendre, exigeants à maîtriser, pensés pour durer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="border-t border-border-subtle bg-surface-sunken/20">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <header className="mb-14 max-w-3xl">
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                Méthode
              </span>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
                Une progression <span className="font-display italic text-accent-500">honnête</span> avant tout.
              </h2>
            </header>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {METHOD_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="border-t border-border-strong/40 pt-6">
                  <span className="font-mono text-[13px] tracking-wider text-accent-500">
                    {step.num}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted md:text-base">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline (only when real dates exist) */}
      {timeline.length > 0 && (
        <section className="border-t border-border-subtle">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
            <Reveal>
              <header className="mb-12 max-w-3xl">
                <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                  Chronologie
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                  Les jalons du studio
                </h2>
              </header>
            </Reveal>

            <ol className="grid gap-6 md:grid-cols-3">
              {timeline.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.08}>
                  <li className="group border-l-2 border-accent-500/30 pl-5 transition-colors duration-(--duration-standard) hover:border-accent-500">
                    <p className="font-mono text-[11px] tracking-wider text-foreground-subtle uppercase">
                      {new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
                        new Date(project.startedAt!),
                      )}
                    </p>
                    <NextLink
                      href={`/projects/${project.slug}`}
                      className="mt-2 block text-xl font-semibold tracking-tight transition-colors duration-(--duration-fast) group-hover:text-accent-500"
                    >
                      {project.name}
                    </NextLink>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {STATUS_LABELS[project.status].label}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <Reveal className="md:col-span-5">
              <span className="font-mono text-[11px] tracking-widest text-foreground-subtle uppercase">
                Stack
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                Technologies
              </h2>
            </Reveal>
            <Reveal className="md:col-span-7" delay={0.1}>
              <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
                Les technologies utilisées sont indiquées sur chaque page projet lorsqu&apos;elles
                sont pertinentes, plutôt qu&apos;affichées ici comme un mur de logos.
              </p>
              <NextLink
                href="/projects"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-500"
              >
                <span className="link-editorial">Explorer les projets</span>
                <span aria-hidden>→</span>
              </NextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl">
                Contact <span className="font-display italic text-accent-500">professionnel</span> ?
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <NextLink
                  href="/projects"
                  className="inline-flex h-12 items-center rounded-full border border-border-strong/60 px-6 text-[14px] font-medium transition-colors duration-(--duration-fast) hover:border-accent-500 hover:text-accent-500"
                >
                  Voir les projets
                </NextLink>
                <NextLink
                  href="/support/contact?reason=business"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-ink-950 transition-all duration-(--duration-standard) ease-(--ease-expressive) hover:bg-accent-400 hover:shadow-[0_10px_40px_-8px_var(--accent-500)]"
                >
                  <span>Nous écrire</span>
                  <span
                    aria-hidden
                    className="translate-x-0 transition-transform duration-(--duration-standard) group-hover:translate-x-1"
                  >
                    →
                  </span>
                </NextLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
