import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/content/legal-page-layout";
import { PUBLIC_BRAND_NAME, LAST_UPDATED } from "@/config/legal";
import { env } from "@/lib/env";

export const metadata: Metadata = { title: "Cookies et traceurs" };

export default function CookiesPage() {
  const analyticsEnabled = env.ANALYTICS_ENABLED;

  return (
    <LegalPageLayout title="Cookies et traceurs" updatedAt={LAST_UPDATED.cookies}>
      <h2>État actuel</h2>
      {analyticsEnabled ? (
        <p>
          Un outil de mesure d&apos;audience respectueux de la vie privée est activé sur ce site. Cette section sera
          mise à jour avec les détails de l&apos;outil utilisé et les choix disponibles.
        </p>
      ) : (
        <p>
          Ce site n&apos;utilise actuellement <strong>aucun cookie non essentiel ni outil d&apos;analytics</strong>. Aucune
          donnée de navigation n&apos;est collectée par {PUBLIC_BRAND_NAME}{" "}à des fins de mesure d&apos;audience ou de
          publicité.
        </p>
      )}

      <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d&apos;un site web. Il permet
        au site de se souvenir de vos actions et préférences (langue, thème, connexion, etc.) pendant une certaine
        période.
      </p>

      <h2>Ce qui est stocké localement</h2>
      <p>
        Votre préférence de thème (clair, sombre ou système) est enregistrée dans le <strong>stockage local de votre
        navigateur</strong> (localStorage), pas dans un cookie. Cette préférence :
      </p>
      <ul>
        <li>Sert uniquement à votre confort de lecture</li>
        <li>N&apos;est <strong>jamais transmise au serveur</strong></li>
        <li>Reste dans votre navigateur jusqu&apos;à ce que vous la supprimiez</li>
        <li>Ne nécessite pas de consentement (stockage purement local, aucun tracé)</li>
      </ul>
      <p>
        Vous pouvez supprimer cette préférence à tout moment en effaçant les données de votre navigateur ou en
        utilisant le sélecteur de thème du site.
      </p>

      <h2>Cookies techniques (essentiels)</h2>
      <p>
        Ce site n&apos;utilise actuellement aucun cookie technique essentiel. Si des cookies deviennent nécessaires au
        fonctionnement du site (par exemple, pour gérer une session sécurisée), ils seront documentés ici avec leur
        finalité et leur durée.
      </p>

      <h2>Cookies de mesure d&apos;audience</h2>
      {analyticsEnabled ? (
        <p>
          Un outil de mesure d&apos;audience est actuellement utilisé. Les détails de l&apos;outil, des données collectées et
          du mécanisme de consentement seront documentés ici.
        </p>
      ) : (
        <p>
          Ce site n&apos;utilise actuellement <strong>aucun outil d&apos;analytics</strong> tel que Google Analytics,
          Plausible, Matomo ou autre. Aucune donnée de navigation, aucun clic, aucune page vue ne sont suivis par{" "}
          {PUBLIC_BRAND_NAME}.
        </p>
      )}

      <h2>Cookies publicitaires</h2>
      <p>
        Ce site n&apos;utilise <strong>aucun cookie publicitaire</strong>. Aucune donnée n&apos;est collectée à des fins de
        publicité ciblée ou de retargeting.
      </p>

      <h2>Cookies de réseaux sociaux</h2>
      <p>
        Ce site n&apos;intègre actuellement aucun bouton de partage ou widget de réseau social susceptible de déposer
        des cookies tiers.
      </p>

      <h2>Si des traceurs non essentiels sont ajoutés à l&apos;avenir</h2>
      <p>
        Avant toute activation de cookies ou traceurs non essentiels (analytics, publicité, réseaux sociaux), cette
        page sera mise à jour et un centre de préférences sera mis en place pour vous permettre de :
      </p>
      <ul>
        <li>Accepter ou refuser chaque catégorie de traceur</li>
        <li>Modifier votre choix à tout moment</li>
        <li>Retirer votre consentement aussi facilement que vous l&apos;avez donné</li>
      </ul>
      <p>
        Aucun traceur non essentiel ne sera déposé avant votre consentement explicite, conformément aux
        recommandations de la CNIL.
      </p>

      <h2>Gérer vos cookies</h2>
      <p>
        Vous pouvez à tout moment gérer ou supprimer les cookies via les paramètres de votre navigateur. Voici les
        liens vers les pages d&apos;aide des principaux navigateurs :
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Attention : La suppression de tous les cookies peut affecter votre expérience de navigation sur certains
        sites.
      </p>

      <h2>Plus d&apos;informations</h2>
      <p>
        Pour en savoir plus sur les cookies et la protection de votre vie privée en ligne, consultez le site de la
        CNIL :{" "}
        <a
          href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          www.cnil.fr/fr/cookies-et-autres-traceurs
        </a>
      </p>
    </LegalPageLayout>
  );
}
