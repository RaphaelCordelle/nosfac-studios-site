"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { REASON_META, type ContactFormValues, type ContactReason } from "@/domain/contact";
import { ReasonFields } from "@/components/forms/reason-fields";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { cn } from "@/lib/utils";

const CONTACT_DRAFT_KEY = "nosfac-contact-draft";
const CONTACT_REFERENCE_KEY = "nosfac-contact-reference";

export interface ContactFormProps {
  initialReason?: ContactReason;
  initialProjectSlug?: string;
  turnstileSiteKey?: string;
}

type SubmitState = { status: "idle" | "submitting" | "error"; message?: string } | { status: "success" };

export function ContactForm({ initialReason, initialProjectSlug, turnstileSiteKey }: ContactFormProps) {
  const router = useRouter();
  const [reason, setReason] = React.useState<ContactReason | undefined>(initialReason);
  const [values, setValues] = React.useState<Partial<ContactFormValues>>({
    projectSlug: initialProjectSlug,
  });
  const [consent, setConsent] = React.useState(false);
  const [state, setState] = React.useState<SubmitState>({ status: "idle" });
  // Timestamp is captured on mount, not during render, so it stays a pure function of props/state.
  const formStartedAt = React.useRef(0);
  React.useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  function updateValues(patch: Partial<ContactFormValues>) {
    setValues((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reason) return;

    setState({ status: "submitting" });

    const payload = {
      ...values,
      reason,
      consent: true as const,
      honeypot: "",
      formStartedAt: formStartedAt.current,
      sourceUrl: window.location.href,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok: boolean; reference?: string; message?: string; code?: string } = await response.json();

      if (data.ok && data.reference) {
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
        window.sessionStorage.setItem(
          CONTACT_REFERENCE_KEY,
          JSON.stringify({ reference: data.reference, reason, projectSlug: values.projectSlug }),
        );
        setState({ status: "success" });
        router.push("/support/contact/success");
        return;
      }

      // Section 10.4 / 20.3: keep the entered text, offer the email fallback.
      window.sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify({ reason, values }));
      setState({
        status: "error",
        message: data.message ?? "Vérifiez les champs indiqués. Votre message n’a pas été envoyé.",
      });
    } catch {
      window.sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify({ reason, values }));
      setState({
        status: "error",
        message: "L’envoi est temporairement indisponible. Votre texte reste dans cette page.",
      });
    }
  }

  if (!reason) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.entries(REASON_META) as [ContactReason, (typeof REASON_META)[ContactReason]][]).map(
          ([key, meta]) => (
            <button
              key={key}
              type="button"
              onClick={() => setReason(key)}
              className="flex flex-col items-start gap-1 rounded-2xl border border-border-subtle p-5 text-left transition-colors duration-(--duration-standard) hover:border-brand-500"
            >
              <span className="font-medium">{meta.label}</span>
              <span className="text-sm text-foreground-muted">{meta.description}</span>
            </button>
          ),
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex max-w-[800px] flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-brand-500">{REASON_META[reason].label}</p>
        <button
          type="button"
          onClick={() => setReason(undefined)}
          className="text-sm text-foreground-muted underline decoration-1 underline-offset-4 hover:text-foreground"
        >
          Changer de motif
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nom<span aria-hidden className="text-danger-500"> *</span>
          </label>
          <input
            id="name"
            name="name"
            required
            value={values.name ?? ""}
            onChange={(e) => updateValues({ name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail<span aria-hidden className="text-danger-500"> *</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email ?? ""}
            onChange={(e) => updateValues({ email: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
          />
        </div>
      </div>

      <ReasonFields reason={reason} values={values} onChange={updateValues} />

      {/* Honeypot — hidden from sighted and keyboard users, section 10.3. */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="company-website">Ne pas remplir</label>
        <input id="company-website" name="company-website" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
      ) : (
        <p className="text-xs text-foreground-muted">
          Vérification anti-bot non configurée dans cet environnement.
        </p>
      )}

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          J’accepte que ces informations soient utilisées pour traiter ma demande, conformément à la{" "}
          <a href="/legal/privacy" className="underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {state.status === "error" ? <Callout variant="danger">{state.message}</Callout> : null}

      <div className="flex items-center gap-4">
        <Button type="submit" loading={state.status === "submitting"} disabled={!consent}>
          Envoyer
        </Button>
        <a href="mailto:nosfac.studios@gmail.com" className={cn("text-sm text-foreground-muted underline")}>
          Le formulaire ne fonctionne pas ? Écrivez à nosfac.studios@gmail.com
        </a>
      </div>
    </form>
  );
}
