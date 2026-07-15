"use client";

import type { ContactFormValues } from "@/domain/contact";
import type { ContactReason } from "@/domain/contact";

export interface FieldProps {
  values: Partial<ContactFormValues>;
  onChange: (patch: Partial<ContactFormValues>) => void;
}

function TextField({
  id,
  label,
  hint,
  value,
  onChange,
  required,
  multiline,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
}) {
  const Comp = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? <span aria-hidden className="text-danger-500"> *</span> : null}
      </label>
      {hint ? <p className="mt-1 text-xs text-foreground-muted">{hint}</p> : null}
      <Comp
        id={id}
        name={id}
        required={required}
        rows={multiline ? 4 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-500"
      />
    </div>
  );
}

/** Fields specific to each contact reason — docs/MASTER_SPECIFICATION.md section 7.8. */
export function ReasonFields({ reason, values, onChange }: FieldProps & { reason: ContactReason }) {
  const set = (patch: Partial<ContactFormValues>) => onChange(patch);

  switch (reason) {
    case "bug":
      return (
        <>
          <TextField id="version" label="Version" value={values.version ?? ""} onChange={(v) => set({ version: v })} />
          <TextField id="platform" label="Plateforme" value={values.platform ?? ""} onChange={(v) => set({ platform: v })} />
          <TextField id="steps" label="Étapes de reproduction" required multiline value={values.steps ?? ""} onChange={(v) => set({ steps: v })} />
          <TextField id="expected" label="Résultat attendu" required multiline value={values.expected ?? ""} onChange={(v) => set({ expected: v })} />
          <TextField id="actual" label="Résultat obtenu" required multiline value={values.actual ?? ""} onChange={(v) => set({ actual: v })} />
          <TextField id="frequency" label="Fréquence" value={values.frequency ?? ""} onChange={(v) => set({ frequency: v })} />
        </>
      );
    case "support":
      return (
        <>
          <TextField id="accountRef" label="Identifiant de compte (anonymisé)" value={values.accountRef ?? ""} onChange={(v) => set({ accountRef: v })} />
          <TextField id="platform" label="Plateforme" required value={values.platform ?? ""} onChange={(v) => set({ platform: v })} />
        </>
      );
    case "idea":
      return (
        <>
          <TextField id="problem" label="Quel problème observez-vous ?" required multiline value={values.problem ?? ""} onChange={(v) => set({ problem: v })} />
          <TextField id="proposal" label="Votre proposition" required multiline value={values.proposal ?? ""} onChange={(v) => set({ proposal: v })} />
          <TextField id="benefit" label="Bénéfice attendu" multiline value={values.benefit ?? ""} onChange={(v) => set({ benefit: v })} />
        </>
      );
    case "feedback":
      return <TextField id="message" label="Votre avis" required multiline value={values.message ?? ""} onChange={(v) => set({ message: v })} />;
    case "business":
      return (
        <>
          <TextField id="organization" label="Organisation" required value={values.organization ?? ""} onChange={(v) => set({ organization: v })} />
          <TextField id="role" label="Votre rôle" required value={values.role ?? ""} onChange={(v) => set({ role: v })} />
          <TextField id="proposal" label="Proposition" required multiline value={values.proposal ?? ""} onChange={(v) => set({ proposal: v })} />
          <TextField id="timeline" label="Calendrier" value={values.timeline ?? ""} onChange={(v) => set({ timeline: v })} />
          <TextField id="budget" label="Budget (optionnel)" value={values.budget ?? ""} onChange={(v) => set({ budget: v })} />
        </>
      );
    case "creator":
      return (
        <>
          <TextField id="channel" label="Chaîne / média" required value={values.channel ?? ""} onChange={(v) => set({ channel: v })} />
          <TextField id="link" label="Lien" required value={values.link ?? ""} onChange={(v) => set({ link: v })} />
          <TextField id="audience" label="Audience (optionnel)" value={values.audience ?? ""} onChange={(v) => set({ audience: v })} />
          <TextField id="need" label="Besoin" required multiline value={values.need ?? ""} onChange={(v) => set({ need: v })} />
          <TextField id="deadline" label="Échéance" value={values.deadline ?? ""} onChange={(v) => set({ deadline: v })} />
        </>
      );
    case "press":
      return (
        <>
          <TextField id="media" label="Média" required value={values.media ?? ""} onChange={(v) => set({ media: v })} />
          <TextField id="angle" label="Angle de l’article" required multiline value={values.angle ?? ""} onChange={(v) => set({ angle: v })} />
          <TextField id="deadline" label="Échéance" required value={values.deadline ?? ""} onChange={(v) => set({ deadline: v })} />
          <TextField id="assetsNeeded" label="Assets nécessaires" value={values.assetsNeeded ?? ""} onChange={(v) => set({ assetsNeeded: v })} />
        </>
      );
    case "legal":
      return (
        <>
          <TextField id="organization" label="Organisation" required value={values.organization ?? ""} onChange={(v) => set({ organization: v })} />
          <TextField id="jurisdiction" label="Juridiction" required value={values.jurisdiction ?? ""} onChange={(v) => set({ jurisdiction: v })} />
          <TextField id="subject" label="Objet de la demande" required multiline value={values.subject ?? ""} onChange={(v) => set({ subject: v })} />
          <TextField id="reference" label="Référence" value={values.reference ?? ""} onChange={(v) => set({ reference: v })} />
        </>
      );
    case "career":
      return (
        <>
          <TextField id="profile" label="Votre profil" required value={values.profile ?? ""} onChange={(v) => set({ profile: v })} />
          <TextField id="proposal" label="Votre proposition" required multiline value={values.proposal ?? ""} onChange={(v) => set({ proposal: v })} />
          <TextField id="portfolioLink" label="Portfolio" value={values.portfolioLink ?? ""} onChange={(v) => set({ portfolioLink: v })} />
          <TextField id="availability" label="Disponibilité" value={values.availability ?? ""} onChange={(v) => set({ availability: v })} />
        </>
      );
    case "technical":
      return (
        <>
          <TextField id="context" label="Contexte" required multiline value={values.context ?? ""} onChange={(v) => set({ context: v })} />
          <TextField id="environment" label="Environnement" value={values.environment ?? ""} onChange={(v) => set({ environment: v })} />
          <TextField id="logs" label="Logs non sensibles" multiline value={values.logs ?? ""} onChange={(v) => set({ logs: v })} />
        </>
      );
    case "general":
    default:
      return (
        <>
          <TextField id="subject" label="Sujet" required value={values.subject ?? ""} onChange={(v) => set({ subject: v })} />
          <TextField id="message" label="Message" required multiline value={values.message ?? ""} onChange={(v) => set({ message: v })} />
        </>
      );
  }
}
