"use client";

import * as React from "react";
import { CONTACT } from "@/config/legal";
import { PRODUCTS, type ProductConfig } from "@/config/products";

type Step = "picker" | "form" | "submitted";

/**
 * Account deletion page — one page, three product sections with dedicated anchors.
 * Only Chain has a real deletion procedure; KnowOut and Music Game are handled honestly
 * as "no public account yet".
 */
export default function AccountDeletionPage() {
  const [selected, setSelected] = React.useState<string>(() => {
    if (typeof window === "undefined") return "chain";
    const hash = window.location.hash.replace("#", "");
    const found = PRODUCTS.find((p) => p.anchorId === hash);
    return found ? found.id : "chain";
  });
  const [step, setStep] = React.useState<Step>("picker");

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const product = PRODUCTS.find((p) => p.id === selected)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: "support",
          projectSlug: selected,
          name: username || `Utilisateur ${product.publicName}`,
          email,
          subject: `Demande de suppression — ${product.publicName}`,
          message: `Demande de suppression de compte ${product.publicName}.\n\nAdresse e-mail associée : ${email}\nPseudonyme : ${username || "Non renseigné"}\n\nJe confirme vouloir supprimer définitivement mon compte et toutes les données associées.`,
          consent: true,
          honeypot: "",
          formStartedAt: Date.now() - 3000,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await response.json();
      if (data.ok) setStep("submitted");
      else setError(data.message || "Une erreur est survenue.");
    } catch {
      setError("Impossible d'envoyer la demande. Merci d'écrire à " + CONTACT.email);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 pt-10 pb-10 md:px-8 md:pt-14 md:pb-14">
          <div className="flex items-baseline justify-between text-[12px] text-foreground-subtle">
            <span>Suppression de compte</span>
            <span>Nosfac Studios</span>
          </div>
          <h1 className="mt-6 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.1] tracking-[-0.015em] font-medium">
            Supprimer votre compte
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
            Choisissez le projet concerné. Chaque jeu a son propre système de compte — certains
            n&apos;en proposent pas encore, d&apos;autres permettent une suppression complète et
            immédiate.
          </p>
        </div>
      </section>

      {/* Selector */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <a
                key={p.id}
                href={`#${p.anchorId}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(p.id);
                  setStep("picker");
                  history.pushState(null, "", `#${p.anchorId}`);
                }}
                className={
                  "inline-flex h-9 items-center border px-4 text-[13px] transition-colors duration-(--duration-fast) " +
                  (selected === p.id
                    ? "border-foreground bg-foreground text-brand-fg"
                    : "border-border-strong text-foreground-muted hover:text-foreground hover:border-foreground")
                }
                data-testid={`selector-${p.anchorId}`}
              >
                {p.publicName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content per product */}
      <section id={product.anchorId} className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 py-12 md:px-8 md:py-16">
          <ProductSection
            product={product}
            step={step}
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            confirmed={confirmed}
            setConfirmed={setConfirmed}
            submitting={submitting}
            error={error}
            onSubmit={handleSubmit}
          />
        </div>
      </section>

      {/* All-projects anchors — allow direct access */}
      <section>
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8 md:py-12">
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle mb-4">
            Accès direct
          </p>
          <ul className="grid gap-2 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <a href={`#${p.anchorId}`} className="text-[14px] link-underline">
                  #{p.anchorId} — {p.publicName}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-foreground-muted">
            Pour toute autre question&nbsp;:{" "}
            <a href={`mailto:${CONTACT.email}`} className="link-underline font-mono">{CONTACT.email}</a>
          </p>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------

interface SectionProps {
  product: ProductConfig;
  step: Step;
  setStep: (s: Step) => void;
  email: string;
  setEmail: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  confirmed: boolean;
  setConfirmed: (v: boolean) => void;
  submitting: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

function ProductSection(props: SectionProps) {
  const { product, step } = props;

  // Products without a public account
  if (!product.hasAccount) {
    return (
      <div>
        <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
          {product.displayName}
        </h2>
        <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
          Aucun compte utilisateur public n&apos;est actuellement disponible pour ce projet.
          Aucune donnée personnelle n&apos;est traitée à ce jour, et il n&apos;y a donc rien à
          supprimer.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
          Lorsque le projet ouvrira ses comptes, une procédure de suppression dédiée sera ajoutée
          ici, et la politique de confidentialité sera mise à jour en conséquence.
        </p>
      </div>
    );
  }

  // Products with a real account — Chain
  if (step === "submitted") {
    return (
      <div>
        <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
          Demande envoyée — {product.publicName}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.65] text-foreground">
          Votre demande de suppression a bien été enregistrée. Vous recevrez une confirmation par
          e-mail une fois votre compte supprimé. Cette opération est <strong>irréversible</strong>.
        </p>
      </div>
    );
  }

  if (step === "form") {
    return <DeletionForm {...props} />;
  }

  // Initial info step for a product with an account
  return (
    <div>
      <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        {product.displayName}
      </h2>

      <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-foreground">
        {product.deletionSummary}
      </p>

      {/* In-app deletion */}
      <h3 className="mt-10 text-[17px] font-medium">Depuis l&apos;application</h3>
      {product.hasInAppDeletion && product.inAppDeletionPath ? (
        <p className="mt-3 text-[15px] leading-[1.65] text-foreground-muted">
          {product.inAppDeletionPath}
        </p>
      ) : (
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
          La fonction de suppression directement depuis l&apos;application n&apos;est pas
          disponible dans la version actuelle de {product.publicName}. Utilisez la méthode web
          ci-dessous.
        </p>
      )}

      {/* Web method */}
      <h3 className="mt-8 text-[17px] font-medium">Sans l&apos;application (méthode web)</h3>
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
        Utilisez le formulaire ci-dessous pour demander la suppression. Nous demandons
        uniquement les informations nécessaires pour identifier votre compte.
      </p>
      <button
        type="button"
        onClick={() => props.setStep("form")}
        className="mt-5 inline-flex h-11 items-center border border-foreground bg-foreground px-5 text-[14px] font-medium text-brand-fg transition-colors duration-(--duration-fast) hover:bg-accent-600 hover:border-accent-600"
        data-testid={`deletion-request-${product.anchorId}`}
      >
        Demander la suppression de mon compte {product.publicName}
      </button>

      {/* Consequences */}
      {product.deletionConsequences.length > 0 && (
        <>
          <h3 className="mt-10 text-[17px] font-medium">Conséquences</h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-[1.65] text-foreground-muted">
            {product.deletionConsequences.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        </>
      )}

      {/* Additional notes (subscription, etc.) */}
      {product.additionalNotes && product.additionalNotes.length > 0 && (
        <>
          <h3 className="mt-8 text-[17px] font-medium">À savoir</h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-[1.65] text-foreground-muted">
            {product.additionalNotes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function DeletionForm({
  product,
  setStep,
  email,
  setEmail,
  username,
  setUsername,
  confirmed,
  setConfirmed,
  submitting,
  error,
  onSubmit,
}: SectionProps) {
  return (
    <div>
      <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        Suppression — {product.publicName}
      </h2>

      <form onSubmit={onSubmit} className="mt-8 max-w-xl">
        <div className="mb-6">
          <label htmlFor="email" className="block text-[14px] font-medium mb-2">
            Adresse e-mail du compte <span className="text-danger-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border-strong bg-surface px-3 py-2.5 text-[14px] focus:outline-none focus:border-foreground"
            placeholder="votre.email@exemple.com"
            data-testid="deletion-email-input"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="username" className="block text-[14px] font-medium mb-2">
            Pseudonyme (facultatif)
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-border-strong bg-surface px-3 py-2.5 text-[14px] focus:outline-none focus:border-foreground"
            data-testid="deletion-username-input"
          />
        </div>

        <label className="mb-6 flex items-start gap-3 text-[14px] leading-[1.5]">
          <input
            type="checkbox"
            required
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1"
            data-testid="deletion-confirmation-checkbox"
          />
          <span className="text-foreground-muted">
            Je comprends que cette action est irréversible et que toutes mes données{" "}
            {product.publicName} seront définitivement supprimées.
          </span>
        </label>

        {error && (
          <p className="mb-4 text-[13px] text-danger-500">{error}</p>
        )}

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={!confirmed || submitting}
            className="inline-flex h-11 items-center border border-danger-500 bg-danger-500 px-5 text-[14px] font-medium text-white transition-opacity disabled:opacity-40"
            data-testid="deletion-submit-button"
          >
            {submitting ? "Envoi…" : "Confirmer la suppression"}
          </button>
          <button
            type="button"
            onClick={() => setStep("picker")}
            className="text-[14px] text-foreground-muted link-underline"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
