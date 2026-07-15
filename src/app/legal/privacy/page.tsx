import type { Metadata } from "next";
import { LegalPage, MissingField } from "@/components/content/legal-page";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt="15 juillet 2026" incomplete>
      <p>
        Cette politique couvre le site {SITE.name} et l’ensemble des jeux et applications édités par le
        studio. Elle est rédigée pour être compréhensible sans jargon ; le détail technique complet reste
        disponible sur demande à <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>

      <h2>Qui sommes-nous</h2>
      <p>
        {SITE.name} est édité par <MissingField label="raison sociale" />, dont le siège est
        <> </>
        <MissingField label="adresse" />, immatriculé sous le numéro
        <> </>
        <MissingField label="SIREN/SIRET ou équivalent" />. Pour toute question relative à cette
        politique ou à vos données : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>

      <h2>Ce que collecte le site (formulaire de contact)</h2>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Conservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Message de contact (nom, e-mail, contenu)</td>
            <td>Répondre à votre demande et la suivre</td>
            <td>12 mois maximum, réévalué régulièrement</td>
          </tr>
          <tr>
            <td>Pièce jointe éventuelle</td>
            <td>Diagnostic ou traitement de la demande</td>
            <td>30 jours, suppression automatique</td>
          </tr>
          <tr>
            <td>Adresse IP</td>
            <td>Limitation du spam (anti-abus)</td>
            <td>Non stockée durablement ; hachée si nécessaire</td>
          </tr>
          <tr>
            <td>Préférence de thème</td>
            <td>Confort de lecture</td>
            <td>Stockée localement dans votre navigateur, jusqu’à suppression</td>
          </tr>
        </tbody>
      </table>
      <p>
        Le site n’utilise aucun cookie non essentiel ni outil d’analytics (voir la{" "}
        <a href="/legal/cookies">politique cookies</a>).
      </p>

      <h2>Ce que collectent nos jeux</h2>

      <h3>Chain</h3>
      <p>Chain (mobile, iOS/Android) collecte les catégories de données suivantes :</p>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Exemples</th>
            <th>Pourquoi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Compte</td>
            <td>Identifiant, e-mail si vous liez un compte, méthode de connexion (Google/Apple/e-mail)</td>
            <td>Créer et sécuriser votre compte</td>
          </tr>
          <tr>
            <td>Profil de jeu</td>
            <td>Pseudonyme, avatar, niveau, statistiques, meilleurs scores</td>
            <td>Faire fonctionner le jeu et les classements</td>
          </tr>
          <tr>
            <td>Partie / gameplay</td>
            <td>Résultats de vos parties, tentatives du défi quotidien</td>
            <td>Calculer les scores, empêcher la triche</td>
          </tr>
          <tr>
            <td>Social</td>
            <td>Liste d’amis, liens de parrainage</td>
            <td>Fonctions sociales que vous activez</td>
          </tr>
          <tr>
            <td>Achats</td>
            <td>Historique de vos achats intégrés (reçu, produit, date)</td>
            <td>Vous attribuer ce que vous avez acheté, prévenir la fraude</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Chain ne collecte jamais</strong> votre numéro de carte bancaire (géré exclusivement par
        Google Play), votre position géographique précise, ni votre liste de contacts.
      </p>
      <p>
        Si vous rendez votre profil public ou partagez un lien (parrainage, résultat de partie), les
        informations que vous avez choisi de partager (pseudonyme, avatar, niveau, meilleurs scores) sont
        visibles par toute personne disposant du lien — vous pouvez désactiver cela à tout moment dans
        Profil → Visibilité du profil.
      </p>
      <p>Sous-traitants utilisés par Chain :</p>
      <ul>
        <li><strong>Supabase</strong> — hébergement de la base de données et de l’authentification.</li>
        <li><strong>Google Play</strong> — traitement des paiements des achats intégrés ; nous ne voyons jamais votre moyen de paiement.</li>
        <li><strong>Google Play Install Referrer</strong> — mesure de l’origine d’installation (par exemple un lien de parrainage).</li>
      </ul>
      <p>
        Vos données de jeu sont conservées tant que votre compte Chain existe. Après suppression de votre
        compte, elles sont effacées immédiatement et automatiquement (voir « Supprimer votre compte »
        ci-dessous) ; durée de conservation résiduelle sur d’éventuels journaux techniques d’infrastructure :
        {" "}
        <MissingField label="durée de rétention des logs techniques" />.
      </p>

      <h3>KnowOut et jeu musical (nom provisoire)</h3>
      <p>
        Ces projets sont en développement. Aucune collecte de données joueur n’est active pour le moment ;
        cette section sera complétée avec le même niveau de détail avant toute mise à disposition publique
        impliquant un compte ou des données personnelles.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de
        limitation et de portabilité de vos données, ainsi que du droit de vous opposer à certains
        traitements. Pour les exercer, contactez{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> ou utilisez les outils intégrés à
        l’application concernée (section suivante).
      </p>

      <h2>Supprimer votre compte</h2>
      <p>
        Pour Chain, vous pouvez supprimer votre compte et toutes les données associées à tout moment,
        directement dans l’application : <strong>Profil → Centre légal → Supprimer mon compte</strong>. La
        suppression est immédiate et irréversible.
      </p>
      <p>
        Note : un achat actif comme un abonnement reste géré par Google Play et doit être résilié
        séparément depuis le Play Store si vous ne souhaitez pas qu’il se renouvelle — supprimer votre
        compte Chain n’annule pas automatiquement un abonnement Google Play.
      </p>

      <h2>Sécurité</h2>
      <p>
        Les données de Chain sont hébergées chez Supabase avec un contrôle d’accès strict (row-level
        security) : aucune donnée d’un autre joueur ne vous est accessible en dehors de ce que ce joueur a
        choisi de rendre public. Les demandes envoyées via le formulaire de contact du site sont validées
        côté serveur, protégées par une vérification anti-bot et une limitation de fréquence, et ne sont
        jamais exposées publiquement.
      </p>

      <h2>Mineurs</h2>
      <p>
        Âge minimum recommandé et politique vis-à-vis des mineurs : <MissingField label="âge minimum recommandé" />.
      </p>

      <h2>Modifications de cette politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique. La date de dernière mise à jour est indiquée en haut de
        cette page. En cas de changement significatif concernant un jeu précis, les joueurs concernés en
        seront informés dans l’application.
      </p>
    </LegalPage>
  );
}
