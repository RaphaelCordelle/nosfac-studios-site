"use client";

import * as React from "react";

/**
 * Lightweight offline indicator (section 7.12). This does not cache pages for full
 * offline browsing — that would require a service worker, deferred until there is a
 * concrete need (section 11.2: minimal dependencies, justified additions only).
 */
export function OfflineBanner() {
  const isOffline = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);
      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    () => !navigator.onLine,
    () => false,
  );

  if (!isOffline) return null;

  return (
    <div role="status" className="bg-warning-500 px-4 py-2 text-center text-sm text-white">
      Vous semblez hors ligne. Certaines actions, comme l’envoi du formulaire de contact, resteront
      indisponibles jusqu’au retour de la connexion.
    </div>
  );
}
