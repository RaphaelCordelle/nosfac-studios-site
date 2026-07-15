"use client";

import * as React from "react";
import NextLink from "next/link";
import { CheckCircle2 } from "lucide-react";
import { REASON_META, type ContactReason } from "@/domain/contact";

const CONTACT_REFERENCE_KEY = "nosfac-contact-reference";

interface StoredReference {
  reference: string;
  reason: ContactReason;
  projectSlug?: string;
}

/**
 * Confirmation page — docs/MASTER_SPECIFICATION.md section 7.9.
 * A direct navigation to this URL (no sessionStorage entry) must never reveal any
 * previous request; it falls back to a generic message instead.
 */
export default function ContactSuccessPage() {
  const [data, setData] = React.useState<StoredReference | null | undefined>(undefined);
  // Guards the destructive sessionStorage read against React StrictMode's dev-only
  // double effect invocation (the ref survives it; a second run would otherwise read
  // back null after the first run's removeItem and clobber the real value).
  const consumedRef = React.useRef(false);

  // Reading sessionStorage only after mount (one-time, not a sync loop) avoids a
  // server/client hydration mismatch — section 7.9 requires a direct navigation with
  // no stored reference to show the generic message rather than any previous request.
  /* eslint-disable react-hooks/set-state-in-effect */
  React.useEffect(() => {
    if (consumedRef.current) return;
    consumedRef.current = true;

    const raw = window.sessionStorage.getItem(CONTACT_REFERENCE_KEY);
    window.sessionStorage.removeItem(CONTACT_REFERENCE_KEY);
    if (!raw) {
      setData(null);
      return;
    }
    try {
      setData(JSON.parse(raw) as StoredReference);
    } catch {
      setData(null);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (data === undefined) return null;

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-16 text-center">
      <CheckCircle2 className="size-10 text-success-500" aria-hidden />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
        Votre message a bien été envoyé.
      </h1>
      <p className="mt-2 text-foreground-muted">Nous le lirons dès que possible.</p>

      {data ? (
        <div className="mt-6 rounded-2xl border border-border-subtle p-4 text-sm text-foreground-muted">
          <p>Motif : {REASON_META[data.reason].label}</p>
          <p>Référence : {data.reference}</p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {data?.projectSlug ? (
          <NextLink
            href={`/projects/${data.projectSlug}`}
            className="flex h-11 items-center rounded-full border border-border-subtle px-5 text-sm font-medium hover:border-brand-500"
          >
            Retour au projet
          </NextLink>
        ) : null}
        <NextLink
          href="/"
          className="flex h-11 items-center rounded-full bg-brand-500 px-5 text-sm font-medium text-white"
        >
          Retour à l’accueil
        </NextLink>
      </div>
    </div>
  );
}
