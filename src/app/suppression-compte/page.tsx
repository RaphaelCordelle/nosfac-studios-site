"use client";

import * as React from "react";
import { PUBLIC_BRAND_NAME, CONTACT } from "@/config/legal";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";

export default function AccountDeletionPage() {
  const [step, setStep] = React.useState<"initial" | "form" | "submitted">("initial");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

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
          projectSlug: "chain",
          name: username || "Utilisateur Chain",
          email: email,
          subject: "Demande de suppression de compte Chain",
          message: `Demande de suppression de compte Chain.\n\nAdresse e-mail associée au compte : ${email}\nPseudonyme : ${username || "Non renseigné"}\n\nJe confirme vouloir supprimer définitivement mon compte et toutes les données associées.`,
          consent: true,
          honeypot: "",
          formStartedAt: Date.now() - 3000,
          sourceUrl: window.location.href,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setStep("submitted");
      } else {
        setError(
          data.message || "Une erreur est survenue. Veuillez réessayer ou nous contacter directement par e-mail.",
        );
      }
    } catch {
      setError("Impossible d'envoyer la demande. Veuillez réessayer ou nous contacter par e-mail.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "submitted") {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Demande envoyée</h1>
        <Callout variant="success" className="mt-6">
          Votre demande de suppression de compte a bien été envoyée. Nous la traiterons dans les meilleurs délais.
        </Callout>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <p>
            Vous recevrez une confirmation par e-mail une fois votre compte supprimé. Cette opération est{" "}
            <strong>irréversible</strong>.
          </p>
          <p>
            Si vous avez un abonnement Premium actif, pensez à le résilier séparément depuis le Google Play Store.
          </p>
        </div>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Supprimer mon compte Chain</h1>
        <p className="mt-4 text-foreground-muted">
          Utilisez ce formulaire si vous n&apos;avez plus accès à l&apos;application Chain.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Adresse e-mail associée au compte <span className="text-danger-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
              placeholder="votre.email@exemple.com"
              data-testid="deletion-email-input"
            />
            <p className="mt-1 text-xs text-foreground-muted">
              L&apos;adresse e-mail que vous avez utilisée pour lier votre compte Chain (Google, Apple ou e-mail).
            </p>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Pseudonyme (facultatif)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
              placeholder="Votre pseudonyme dans Chain"
              data-testid="deletion-username-input"
            />
            <p className="mt-1 text-xs text-foreground-muted">
              Votre pseudonyme nous aidera à identifier plus rapidement votre compte.
            </p>
          </div>

          <Callout variant="warning" title="Attention : opération irréversible">
            La suppression de votre compte Chain est <strong>définitive et irréversible</strong>. Toutes vos données
            (progression, statistiques, achats, records) seront effacées et ne pourront pas être récupérées.
          </Callout>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              required
              checked={confirmation}
              onChange={(e) => setConfirmation(e.target.checked)}
              className="mt-0.5"
              data-testid="deletion-confirmation-checkbox"
            />
            <span>
              Je comprends que cette action est irréversible et que toutes mes données Chain seront définitivement
              supprimées.
            </span>
          </label>

          {error && <Callout variant="danger">{error}</Callout>}

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              loading={submitting}
              disabled={!confirmation}
              variant="danger"
              data-testid="deletion-submit-button"
            >
              Confirmer la suppression
            </Button>
            <button
              type="button"
              onClick={() => setStep("initial")}
              className="text-sm text-foreground-muted underline hover:text-foreground"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[780px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Supprimer votre compte Chain</h1>
      <p className="mt-4 text-lg text-foreground-muted">
        Vous pouvez supprimer votre compte Chain et toutes les données associées à tout moment. La suppression est
        immédiate et irréversible.
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <h2>Depuis l&apos;application Chain</h2>
        <p>
          Si vous avez accès à l&apos;application, la méthode la plus rapide est de supprimer votre compte directement
          depuis l&apos;application :
        </p>
        <ol>
          <li>Ouvrez Chain sur votre appareil</li>
          <li>
            Allez dans <strong>Profil</strong>
          </li>
          <li>
            Sélectionnez <strong>Centre légal</strong>
          </li>
          <li>
            Appuyez sur <strong>Supprimer mon compte</strong>
          </li>
          <li>Confirmez votre choix</li>
        </ol>
        <p>Votre compte sera supprimé immédiatement et définitivement.</p>

        <h2>Sans l&apos;application (méthode web)</h2>
        <p>
          Si vous n&apos;avez plus accès à l&apos;application (app désinstallée, appareil perdu, compte inaccessible), vous
          pouvez demander la suppression via ce formulaire web :
        </p>
        <div className="not-prose my-6">
          <Button onClick={() => setStep("form")} size="lg" data-testid="deletion-request-button">
            Demander la suppression de mon compte Chain
          </Button>
        </div>

        <h2>Ce qui sera supprimé</h2>
        <p>La suppression de votre compte Chain entraîne l&apos;effacement immédiat de :</p>
        <ul>
          <li>Votre identifiant et vos données de connexion</li>
          <li>Votre pseudonyme, avatar et profil</li>
          <li>Votre progression, niveau et statistiques</li>
          <li>Vos records personnels et historique de parties</li>
          <li>Vos paramètres et préférences</li>
          <li>Vos données sociales (amis, liens de parrainage, profil public)</li>
        </ul>

        <h2>Ce qui peut être conservé temporairement</h2>
        <p>Certaines données peuvent subsister temporairement pour des raisons techniques ou légales :</p>
        <ul>
          <li>
            <strong>Historique d&apos;achats</strong> : Les reçus d&apos;achat sont conservés jusqu&apos;à 10 ans pour respecter
            les obligations comptables françaises
          </li>
          <li>
            <strong>Sauvegardes techniques</strong> : Vos données peuvent subsister temporairement dans les sauvegardes
            système avant leur suppression automatique
          </li>
          <li>
            <strong>Données de sécurité</strong> : En cas de fraude avérée ou d&apos;enquête en cours, certaines données
            anonymisées peuvent être conservées
          </li>
        </ul>

        <h2>Abonnement Google Play</h2>
        <Callout variant="warning">
          <strong>Important</strong> : Supprimer votre compte Chain n&apos;annule <strong>pas automatiquement</strong>{" "}
          votre abonnement Premium géré par Google Play.
        </Callout>
        <p>Si vous avez un abonnement Premium actif, vous devez le résilier séparément :</p>
        <ol>
          <li>Ouvrez l&apos;application Google Play Store sur votre appareil Android</li>
          <li>Appuyez sur votre photo de profil en haut à droite</li>
          <li>
            Sélectionnez <strong>Paiements et abonnements</strong> → <strong>Abonnements</strong>
          </li>
          <li>Trouvez Chain dans la liste</li>
          <li>
            Appuyez sur <strong>Résilier l&apos;abonnement</strong>
          </li>
        </ol>

        <h2>Conséquences de la suppression</h2>
        <ul>
          <li>
            <strong>Irréversible</strong> : Vous ne pourrez pas récupérer votre compte, votre progression ou vos
            achats
          </li>
          <li>
            <strong>Nouveau compte</strong> : Si vous recréez un compte Chain plus tard, vous repartirez de zéro
          </li>
          <li>
            <strong>Achats</strong> : Les objets et contenus achetés seront perdus sans remboursement
          </li>
          <li>
            <strong>Classements</strong> : Vos scores disparaîtront des classements publics
          </li>
        </ul>

        <h2>Contact</h2>
        <p>
          Pour toute question sur la suppression de compte :{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline">
            {CONTACT.email}
          </a>
        </p>

        <h2>Plus d&apos;informations</h2>
        <p>
          Consultez notre{" "}
          <a href="/legal/privacy" className="underline">
            politique de confidentialité
          </a>{" "}
          pour plus de détails sur le traitement de vos données. Éditeur : {PUBLIC_BRAND_NAME}.
        </p>
      </div>
    </div>
  );
}
