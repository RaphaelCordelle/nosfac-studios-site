"use client";

import * as React from "react";
import { CONTACT } from "@/config/legal";
import { PRODUCTS, type ProductConfig } from "@/config/products";

type Step = "picker" | "form" | "submitted";
type RequestKind = "data" | "account";

const DATA_SCOPES = [
  {
    id: "game-history",
    label: "Historique de parties",
    description: "Parties récentes, résultats et chaînes enregistrées.",
  },
  {
    id: "statistics",
    label: "Statistiques et records",
    description:
      "Statistiques détaillées, records personnels et données de classement associées.",
  },
  {
    id: "social",
    label: "Données sociales",
    description: "Amis, invitations, parrainages et défis envoyés ou reçus.",
  },
  {
    id: "preferences",
    label: "Préférences et personnalisation",
    description:
      "Préférences facultatives, centres d’intérêt et personnalisation du profil.",
  },
  {
    id: "usage",
    label: "Données d’usage facultatives",
    description:
      "Progression du tutoriel et événements d’utilisation non indispensables au compte.",
  },
] as const;

export default function AccountDeletionPage() {
  const [selected, setSelected] = React.useState<string>(() => {
    if (typeof window === "undefined") return "chain";
    const hash = window.location.hash.replace("#", "");
    return PRODUCTS.find((product) => product.anchorId === hash)?.id ?? "chain";
  });
  const [step, setStep] = React.useState<Step>("picker");
  const [requestKind, setRequestKind] = React.useState<RequestKind>("data");
  const [email, setEmail] = React.useState("");
  const [accountRef, setAccountRef] = React.useState("");
  const [selectedScopes, setSelectedScopes] = React.useState<string[]>([]);
  const [details, setDetails] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formStartedAt, setFormStartedAt] = React.useState(0);

  const product = PRODUCTS.find((item) => item.id === selected)!;

  function openForm(kind: RequestKind) {
    setRequestKind(kind);
    setSelectedScopes([]);
    setDetails("");
    setConfirmed(false);
    setError("");
    setFormStartedAt(Date.now());
    setStep("form");
  }

  function resetForProduct(productId: string, anchorId: string) {
    setSelected(productId);
    setStep("picker");
    setConfirmed(false);
    setError("");
    history.pushState(null, "", `#${anchorId}`);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (requestKind === "data" && selectedScopes.length === 0) {
      setError("Sélectionnez au moins une catégorie de données à supprimer.");
      return;
    }

    const scopeLabels = DATA_SCOPES.filter((scope) =>
      selectedScopes.includes(scope.id),
    ).map((scope) => scope.label);
    const isAccountDeletion = requestKind === "account";
    const subject = isAccountDeletion
      ? `Suppression complète du compte — ${product.publicName}`
      : `Suppression de données sans suppression du compte — ${product.publicName}`;
    const message = isAccountDeletion
      ? [
          `Je demande la suppression définitive de mon compte ${product.publicName} et des données qui lui sont associées.`,
          details.trim() ? `Précisions : ${details.trim()}` : "",
        ]
          .filter(Boolean)
          .join("\n\n")
      : [
          `Je demande la suppression des données suivantes tout en conservant mon compte ${product.publicName} actif :`,
          ...scopeLabels.map((label) => `- ${label}`),
          details.trim() ? `\nPrécisions : ${details.trim()}` : "",
        ]
          .filter(Boolean)
          .join("\n");

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: "privacy",
          projectSlug: selected,
          name: accountRef,
          email,
          accountRef,
          subject,
          message,
          consent: true,
          honeypot: "",
          formStartedAt,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await response.json();
      if (data.ok) setStep("submitted");
      else
        setError(
          data.message ||
            "Une erreur est survenue. Vérifiez les informations saisies.",
        );
    } catch {
      setError(`Impossible d’envoyer la demande. Écrivez à ${CONTACT.email}.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 pt-10 pb-10 md:px-8 md:pt-14 md:pb-14">
          <div className="flex items-baseline justify-between text-[12px] text-foreground-subtle">
            <span>Confidentialité et suppression</span>
            <span>Nosfac Studios</span>
          </div>
          <h1 className="mt-6 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.1] tracking-[-0.015em] font-medium">
            Gérer ou supprimer vos données
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
            Demandez la suppression de certaines données sans fermer votre
            compte, ou la suppression complète de votre compte. Cette page est
            accessible même sans l’application.
          </p>
        </div>
      </section>

      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((item) => (
              <a
                key={item.id}
                href={`#${item.anchorId}`}
                onClick={(event) => {
                  event.preventDefault();
                  resetForProduct(item.id, item.anchorId);
                }}
                className={
                  "inline-flex h-9 items-center border px-4 text-[13px] transition-colors duration-(--duration-fast) " +
                  (selected === item.id
                    ? "border-foreground bg-foreground text-brand-fg"
                    : "border-border-strong text-foreground-muted hover:text-foreground hover:border-foreground")
                }
                data-testid={`selector-${item.anchorId}`}
              >
                {item.publicName}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id={product.anchorId} className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1000px] px-5 py-12 md:px-8 md:py-16">
          {!product.hasAccount ? (
            <NoAccountSection product={product} />
          ) : step === "submitted" ? (
            <SubmittedSection product={product} requestKind={requestKind} />
          ) : step === "form" ? (
            <DeletionForm
              product={product}
              requestKind={requestKind}
              email={email}
              setEmail={setEmail}
              accountRef={accountRef}
              setAccountRef={setAccountRef}
              selectedScopes={selectedScopes}
              setSelectedScopes={setSelectedScopes}
              details={details}
              setDetails={setDetails}
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              submitting={submitting}
              error={error}
              onSubmit={handleSubmit}
              onCancel={() => setStep("picker")}
            />
          ) : (
            <RequestPicker product={product} onChoose={openForm} />
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8 md:py-12">
          <p className="text-[13px] leading-[1.6] text-foreground-muted">
            Nous pouvons demander une vérification raisonnable afin d’éviter la
            suppression des données d’une autre personne. Pour toute
            question&nbsp;:{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-underline font-mono"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

function NoAccountSection({ product }: { product: ProductConfig }) {
  return (
    <div>
      <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        {product.displayName}
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
        Aucun compte utilisateur public n’est actuellement disponible pour ce
        projet. Si vous avez néanmoins transmis des informations au studio,
        contactez-nous à l’adresse indiquée sur cette page pour exercer vos
        droits.
      </p>
    </div>
  );
}

function SubmittedSection({
  product,
  requestKind,
}: {
  product: ProductConfig;
  requestKind: RequestKind;
}) {
  const isAccountDeletion = requestKind === "account";
  return (
    <div role="status">
      <p className="text-[12px] uppercase tracking-[0.14em] text-accent-600">
        Demande enregistrée
      </p>
      <h2 className="mt-3 text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        {isAccountDeletion ? "Suppression du compte" : "Suppression de données"}{" "}
        — {product.publicName}
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-foreground">
        Votre demande a bien été envoyée. Nous vérifierons que vous êtes
        titulaire du compte avant de la traiter, puis nous vous confirmerons le
        résultat par e-mail.
      </p>
      {!isAccountDeletion && (
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
          Votre demande précise que le compte doit rester actif. Seules les
          catégories choisies seront concernées, sous réserve des données
          indispensables au service ou légalement requises.
        </p>
      )}
    </div>
  );
}

function RequestPicker({
  product,
  onChoose,
}: {
  product: ProductConfig;
  onChoose: (kind: RequestKind) => void;
}) {
  return (
    <div>
      <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        {product.displayName}
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-foreground">
        {product.deletionSummary}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onChoose("data")}
          className="group border border-border-strong bg-surface p-6 text-left transition-colors hover:border-accent-600"
          data-testid={`data-deletion-request-${product.anchorId}`}
        >
          <span className="text-[11px] uppercase tracking-[0.14em] text-accent-600">
            Garder le compte
          </span>
          <strong className="mt-3 block text-[18px] font-medium">
            Supprimer certaines données
          </strong>
          <span className="mt-2 block text-[14px] leading-[1.55] text-foreground-muted">
            Choisissez précisément les catégories à effacer. Votre accès au jeu
            est conservé.
          </span>
          <span className="mt-5 inline-block text-[13px] font-medium link-underline">
            Choisir les données
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChoose("account")}
          className="group border border-border-strong bg-surface p-6 text-left transition-colors hover:border-danger-500"
          data-testid={`deletion-request-${product.anchorId}`}
        >
          <span className="text-[11px] uppercase tracking-[0.14em] text-danger-500">
            Action définitive
          </span>
          <strong className="mt-3 block text-[18px] font-medium">
            Supprimer le compte complet
          </strong>
          <span className="mt-2 block text-[14px] leading-[1.55] text-foreground-muted">
            Le profil, la progression et toutes les données associées seront
            supprimés.
          </span>
          <span className="mt-5 inline-block text-[13px] font-medium link-underline">
            Continuer
          </span>
        </button>
      </div>

      <h3 className="mt-10 text-[17px] font-medium">Depuis l’application</h3>
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted">
        {product.hasInAppDeletion && product.inAppDeletionPath
          ? product.inAppDeletionPath
          : `Utilisez cette page web pour envoyer votre demande concernant ${product.publicName}.`}
      </p>

      {product.additionalNotes?.length ? (
        <>
          <h3 className="mt-8 text-[17px] font-medium">À savoir</h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-[1.65] text-foreground-muted">
            {product.additionalNotes.map((note) => (
              <li key={note}>— {note}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

interface DeletionFormProps {
  product: ProductConfig;
  requestKind: RequestKind;
  email: string;
  setEmail: (value: string) => void;
  accountRef: string;
  setAccountRef: (value: string) => void;
  selectedScopes: string[];
  setSelectedScopes: (value: string[]) => void;
  details: string;
  setDetails: (value: string) => void;
  confirmed: boolean;
  setConfirmed: (value: boolean) => void;
  submitting: boolean;
  error: string;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

function DeletionForm(props: DeletionFormProps) {
  const isAccountDeletion = props.requestKind === "account";

  function toggleScope(scopeId: string) {
    props.setSelectedScopes(
      props.selectedScopes.includes(scopeId)
        ? props.selectedScopes.filter((id) => id !== scopeId)
        : [...props.selectedScopes, scopeId],
    );
  }

  return (
    <div>
      <p
        className={`text-[12px] uppercase tracking-[0.14em] ${isAccountDeletion ? "text-danger-500" : "text-accent-600"}`}
      >
        {isAccountDeletion ? "Suppression complète" : "Suppression ciblée"}
      </p>
      <h2 className="mt-3 text-[28px] leading-[1.1] tracking-[-0.015em] font-medium">
        {isAccountDeletion
          ? "Supprimer mon compte"
          : "Choisir les données à supprimer"}
      </h2>

      <form onSubmit={props.onSubmit} className="mt-8 max-w-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="deletion-email"
              className="block text-[14px] font-medium mb-2"
            >
              Adresse e-mail de contact{" "}
              <span className="text-danger-500">*</span>
            </label>
            <input
              id="deletion-email"
              type="email"
              required
              autoComplete="email"
              value={props.email}
              onChange={(event) => props.setEmail(event.target.value)}
              className="w-full border border-border-strong bg-surface px-3 py-2.5 text-[14px] focus:outline-none focus:border-foreground"
              placeholder="votre.email@exemple.com"
              data-testid="deletion-email-input"
            />
          </div>
          <div>
            <label
              htmlFor="account-reference"
              className="block text-[14px] font-medium mb-2"
            >
              Identifiant ou pseudonyme{" "}
              <span className="text-danger-500">*</span>
            </label>
            <input
              id="account-reference"
              type="text"
              required
              value={props.accountRef}
              onChange={(event) => props.setAccountRef(event.target.value)}
              className="w-full border border-border-strong bg-surface px-3 py-2.5 text-[14px] focus:outline-none focus:border-foreground"
              placeholder="Pseudo ou identifiant invité"
              data-testid="deletion-account-reference-input"
            />
          </div>
        </div>

        {!isAccountDeletion && (
          <fieldset className="mt-8">
            <legend className="text-[15px] font-medium">
              Données à supprimer <span className="text-danger-500">*</span>
            </legend>
            <p className="mt-1 text-[13px] text-foreground-muted">
              Vous pouvez sélectionner plusieurs catégories.
            </p>
            <div className="mt-4 grid gap-3">
              {DATA_SCOPES.map((scope) => (
                <label
                  key={scope.id}
                  className="flex cursor-pointer items-start gap-3 border border-border-subtle bg-surface p-4"
                >
                  <input
                    type="checkbox"
                    checked={props.selectedScopes.includes(scope.id)}
                    onChange={() => toggleScope(scope.id)}
                    className="mt-1"
                    data-testid={`data-scope-${scope.id}`}
                  />
                  <span>
                    <strong className="block text-[14px] font-medium">
                      {scope.label}
                    </strong>
                    <span className="mt-1 block text-[13px] leading-[1.5] text-foreground-muted">
                      {scope.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-7">
          <label
            htmlFor="deletion-details"
            className="block text-[14px] font-medium mb-2"
          >
            Précisions (facultatif)
          </label>
          <textarea
            id="deletion-details"
            rows={4}
            maxLength={2000}
            value={props.details}
            onChange={(event) => props.setDetails(event.target.value)}
            className="w-full border border-border-strong bg-surface px-3 py-2.5 text-[14px] focus:outline-none focus:border-foreground"
            placeholder="Ajoutez toute information utile pour retrouver les données concernées."
          />
        </div>

        <label className="mt-6 flex items-start gap-3 text-[14px] leading-[1.5]">
          <input
            type="checkbox"
            required
            checked={props.confirmed}
            onChange={(event) => props.setConfirmed(event.target.checked)}
            className="mt-1"
            data-testid="deletion-confirmation-checkbox"
          />
          <span className="text-foreground-muted">
            {isAccountDeletion
              ? `Je confirme demander la suppression définitive de mon compte ${props.product.publicName} et comprends que la progression ne pourra pas être restaurée.`
              : `Je confirme demander la suppression des catégories sélectionnées tout en conservant mon compte ${props.product.publicName}.`}
          </span>
        </label>

        {props.error && (
          <p role="alert" className="mt-5 text-[13px] text-danger-500">
            {props.error}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-6">
          <button
            type="submit"
            disabled={!props.confirmed || props.submitting}
            className={`inline-flex h-11 items-center border px-5 text-[14px] font-medium text-white transition-opacity disabled:opacity-40 ${isAccountDeletion ? "border-danger-500 bg-danger-500" : "border-accent-600 bg-accent-600"}`}
            data-testid="deletion-submit-button"
          >
            {props.submitting ? "Envoi…" : "Envoyer la demande"}
          </button>
          <button
            type="button"
            onClick={props.onCancel}
            className="text-[14px] text-foreground-muted link-underline"
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
