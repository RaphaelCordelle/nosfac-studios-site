import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { env } from "@/lib/env";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" updatedAt="13 juillet 2026">
      <h2>État actuel</h2>
      <p>
        {env.ANALYTICS_ENABLED
          ? "Un outil de mesure d’audience respectueux de la vie privée est actif sur ce site."
          : "Ce site n’utilise actuellement aucun cookie non essentiel ni outil d’analytics."}
      </p>

      <h2>Ce qui est stocké localement</h2>
      <p>
        Votre préférence de thème (clair, sombre ou système) est enregistrée dans le stockage local de
        votre navigateur (localStorage), pas dans un cookie. Elle sert uniquement à votre confort de
        lecture et n’est jamais transmise au serveur.
      </p>

      <h2>Si des traceurs non essentiels sont ajoutés</h2>
      <p>
        Cette page sera mise à jour avant toute activation, avec un centre de préférences permettant
        d’accepter ou de refuser chaque catégorie de traceur aussi simplement.
      </p>
    </LegalPage>
  );
}
