"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

/** 500 boundary — docs/MASTER_SPECIFICATION.md section 7.12. No stack trace shown; only a correlatable errorId. */
export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Section 16.1: server-side errors are logged with a correlatable id; the client only shows that id.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[720px] px-5 py-16">
      <ErrorState
        variant="page"
        title="Un problème temporaire est survenu."
        description="Réessayez dans un instant. Si le problème persiste, signalez-le avec l’identifiant ci-dessous."
        errorId={error.digest}
        onRetry={reset}
      />
    </div>
  );
}
