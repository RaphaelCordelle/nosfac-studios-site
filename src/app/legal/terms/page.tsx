import type { Metadata } from "next";
import { LegalPage, MissingField } from "@/components/content/legal-page";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "Conditions d’utilisation" };

export default function TermsPage() {
  return (
    <LegalPage title="Conditions d’utilisation" updatedAt="15 juillet 2026" incomplete>
      <h2>Objet</h2>
      <p>
        Ces conditions régissent l’utilisation du site {SITE.name} ainsi que des jeux et applications
        édités par le studio, notamment Chain. En créant un compte ou en utilisant une application {SITE.name},
        vous acceptez les conditions ci-dessous.
      </p>

      <h2>Compte (Chain)</h2>
      <p>
        Chain vous permet de jouer en tant qu’invité (compte anonyme) ou de sécuriser votre compte via
        Google, Apple ou un e-mail. Vous êtes responsable de la confidentialité des moyens d’accès à votre
        compte. Un compte invité non sécurisé est définitivement perdu si vous vous déconnectez ou
        changez d’appareil sans l’avoir sécurisé au préalable.
      </p>

      <h2>Règles d’usage</h2>
      <p>Vous vous engagez à :</p>
      <ul>
        <li>Choisir un pseudonyme non injurieux, non trompeur et n’usurpant l’identité de personne.</li>
        <li>Ne pas tenter de contourner les mécanismes anti-triche ou les limites du jeu (par exemple la limite quotidienne d’essais).</li>
        <li>Ne pas exploiter de faille technique pour obtenir un avantage ou un contenu que vous n’avez pas mérité ou acheté.</li>
      </ul>
      <p>Tout manquement peut entraîner la suspension ou la suppression du compte.</p>

      <h2>Achats intégrés</h2>
      <p>
        Chain propose des achats intégrés (cœurs, malus, cosmétiques, abonnement Premium) facturés via
        Google Play. Les prix affichés dans l’application sont ceux fixés par Google Play pour votre
        région.
      </p>
      <p>
        L’abonnement Premium se renouvelle automatiquement jusqu’à résiliation ; vous pouvez le résilier à
        tout moment depuis les paramètres d’abonnement de votre compte Google Play. Les remboursements sont
        gérés selon la politique de Google Play, pas directement par l’éditeur.
      </p>

      <h2>Contenu du jeu</h2>
      <p>
        Le contenu, la marque et le design de Chain appartiennent à l’éditeur ou à ses concédants. Le
        dictionnaire de mots utilisé s’appuie en partie sur des ressources sous licence CC BY 4.0.
      </p>

      <h2>Utilisation du contenu du site</h2>
      <p>
        Les textes, images et identités visuelles de ce site sont la propriété de {SITE.name}, sauf
        mention contraire. Les journalistes et créateurs de contenu peuvent utiliser les assets du press
        kit selon les règles qui y sont indiquées.
      </p>

      <h2>Suppression de compte</h2>
      <p>
        Pour Chain, vous pouvez supprimer votre compte à tout moment depuis Profil → Centre légal →
        Supprimer mon compte. Voir la <a href="/legal/privacy">politique de confidentialité</a> pour le
        détail de ce qui est effacé.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Les applications {SITE.name} sont fournies « en l’état ». Dans la limite permise par la loi
        applicable, l’éditeur ne pourra être tenu responsable des interruptions de service, des pertes de
        progression liées à un compte invité non sécurisé, ou des dommages indirects liés à l’utilisation
        d’une application {SITE.name}.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Droit applicable et juridiction compétente : <MissingField label="droit applicable et juridiction" />
        {" "}(généralement le droit français si l’éditeur y est établi).
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ces conditions :{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
