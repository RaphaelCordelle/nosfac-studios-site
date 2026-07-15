import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/content/legal-page-layout";
import {
  LEGAL_STATUS,
  PUBLIC_BRAND_NAME,
  LEGAL_IDENTITY,
  CONTACT,
  PROCESSORS,
  RETENTION_PERIODS,
  AGE_POLICY,
  LAST_UPDATED,
} from "@/config/legal";

export const metadata: Metadata = { title: "Politique de confidentialité" };

function ResponsibleSection() {
  if (LEGAL_STATUS === "individual-non-professional") {
    return (
      <p>
        Le responsable du traitement des données présentées dans cette politique est le fondateur de{" "}
        {PUBLIC_BRAND_NAME}, agissant sous ce nom d&apos;usage. Pour toute question relative à cette politique ou à vos
        données :{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>
        .
      </p>
    );
  }

  return (
    <p>
      Le responsable du traitement des données présentées dans cette politique est{" "}
      {LEGAL_IDENTITY.legalName ?? PUBLIC_BRAND_NAME}, agissant sous le nom {PUBLIC_BRAND_NAME}.
      {LEGAL_IDENTITY.postalAddress && <> Siège : {LEGAL_IDENTITY.postalAddress}.</>}{" "}
      Pour toute question :{" "}
      <a href={`mailto:${CONTACT.email}`} className="underline">
        {CONTACT.email}
      </a>
      .
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Politique de confidentialité" updatedAt={LAST_UPDATED.privacy}>
      <p>
        Cette politique décrit comment {PUBLIC_BRAND_NAME} collecte, utilise et protège vos données personnelles.
        Elle couvre le site web {PUBLIC_BRAND_NAME}{" "}ainsi que l&apos;application Chain. Elle est rédigée pour être
        compréhensible par tous ; pour toute précision technique, contactez-nous.
      </p>

      <h2>Responsable du traitement</h2>
      <ResponsibleSection />

      <h2>Périmètre</h2>
      <p>Cette politique couvre :</p>
      <ul>
        <li>
          <strong>Le site web {PUBLIC_BRAND_NAME}</strong> (formulaire de contact, préférence de thème)
        </li>
        <li>
          <strong>L&apos;application Chain</strong> (Android, iOS à venir) lorsque les traitements sont actifs
        </li>
      </ul>
      <p>
        Les autres projets présentés sur le site (KnowOut, jeu musical) ne font pas encore l&apos;objet d&apos;un service
        public impliquant un compte joueur. Leur politique sera précisée avant leur mise à disposition.
      </p>

      <h2>Données collectées par le site web</h2>

      <h3>Formulaire de contact et support</h3>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Base légale</th>
            <th>Obligatoire / Facultatif</th>
            <th>Durée de conservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nom</td>
            <td>Répondre à votre demande</td>
            <td>Mesures précontractuelles / Intérêt légitime</td>
            <td>Obligatoire</td>
            <td>{RETENTION_PERIODS.contactMessages}</td>
          </tr>
          <tr>
            <td>Adresse e-mail</td>
            <td>Répondre à votre demande</td>
            <td>Mesures précontractuelles / Intérêt légitime</td>
            <td>Obligatoire</td>
            <td>{RETENTION_PERIODS.contactMessages}</td>
          </tr>
          <tr>
            <td>Message et champs contextuels</td>
            <td>Traiter votre demande (bug, business, support, etc.)</td>
            <td>Mesures précontractuelles / Intérêt légitime</td>
            <td>Obligatoire</td>
            <td>{RETENTION_PERIODS.contactMessages}</td>
          </tr>
          <tr>
            <td>Adresse IP (hachée)</td>
            <td>Limitation anti-spam</td>
            <td>Intérêt légitime (sécurité)</td>
            <td>Automatique</td>
            <td>{RETENTION_PERIODS.rateLimitRecords}</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Destinataires</strong> : Les demandes sont envoyées par email à {CONTACT.email} via{" "}
        {PROCESSORS.email.name} ({PROCESSORS.email.purpose}). La vérification anti-bot est assurée par{" "}
        {PROCESSORS.antiBot.name}.
      </p>

      <h3>Préférence de thème</h3>
      <p>
        Votre préférence de thème (clair, sombre ou système) est enregistrée <strong>uniquement dans votre navigateur</strong>{" "}
        (localStorage), pas dans un cookie. Elle sert exclusivement à votre confort de lecture et n&apos;est{" "}
        <strong>jamais transmise au serveur</strong>. Vous pouvez la supprimer à tout moment en effaçant les données de
        votre navigateur.
      </p>

      <h3>Analytics et cookies</h3>
      <p>
        Le site n&apos;utilise actuellement <strong>aucun cookie non essentiel ni outil d&apos;analytics</strong>. Consultez la{" "}
        <a href="/legal/cookies" className="underline">
          politique cookies
        </a>{" "}
        pour plus de détails.
      </p>

      <h2>Données collectées par Chain</h2>

      <h3>Compte utilisateur</h3>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Base légale</th>
            <th>Obligatoire / Facultatif</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Identifiant compte interne</td>
            <td>Identification unique</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire</td>
            <td>{RETENTION_PERIODS.chainAccounts}</td>
          </tr>
          <tr>
            <td>Adresse e-mail</td>
            <td>Authentification, récupération du compte</td>
            <td>Exécution du contrat</td>
            <td>Facultatif (possibilité de jouer en invité)</td>
            <td>{RETENTION_PERIODS.chainAccounts}</td>
          </tr>
          <tr>
            <td>Fournisseur de connexion (Google/Apple/e-mail)</td>
            <td>Gestion de l&apos;authentification</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire si vous liez votre compte</td>
            <td>{RETENTION_PERIODS.chainAccounts}</td>
          </tr>
          <tr>
            <td>Mot de passe (si connexion e-mail)</td>
            <td>Authentification</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire si connexion e-mail</td>
            <td>{RETENTION_PERIODS.chainAccounts}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Important</strong> : Les mots de passe sont hashés par Supabase et ne sont <strong>jamais accessibles en clair</strong>{" "}
        par {PUBLIC_BRAND_NAME}.
      </p>

      <h3>Profil et progression</h3>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Base légale</th>
            <th>Obligatoire / Facultatif</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pseudonyme</td>
            <td>Affichage dans le jeu, classements</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire</td>
          </tr>
          <tr>
            <td>Avatar</td>
            <td>Personnalisation</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire (choix par défaut)</td>
          </tr>
          <tr>
            <td>Niveau, progression, statistiques</td>
            <td>Fonctionnement du jeu</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire</td>
          </tr>
          <tr>
            <td>Records personnels, classement</td>
            <td>Affichage records, classements</td>
            <td>Exécution du contrat</td>
            <td>Obligatoire</td>
          </tr>
          <tr>
            <td>Paramètres du jeu</td>
            <td>Préférences joueur</td>
            <td>Exécution du contrat</td>
            <td>Facultatif</td>
          </tr>
        </tbody>
      </table>

      <h3>Gameplay et lutte contre la triche</h3>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Résultats de parties</td>
            <td>Calcul des scores, classements</td>
            <td>Exécution du contrat</td>
          </tr>
          <tr>
            <td>Historique des parties récentes</td>
            <td>Affichage de votre historique</td>
            <td>Exécution du contrat</td>
          </tr>
          <tr>
            <td>Tentatives du défi quotidien</td>
            <td>Limitation quotidienne, prévention de la triche</td>
            <td>Exécution du contrat + Intérêt légitime</td>
          </tr>
          <tr>
            <td>Signalements et événements suspects</td>
            <td>Prévention de la fraude et des abus</td>
            <td>Intérêt légitime</td>
          </tr>
        </tbody>
      </table>

      <h3>Achats intégrés</h3>
      <p>
        <strong>Chain ne collecte JAMAIS vos informations bancaires</strong>. Les paiements sont traités exclusivement
        par Google Play. Chain reçoit uniquement :
      </p>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Base légale</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reçu / token d&apos;achat Google Play</td>
            <td>Vérification de l&apos;achat, attribution du contenu acheté</td>
            <td>Exécution du contrat</td>
            <td>Jusqu&apos;à 10 ans (obligation comptable potentielle)</td>
          </tr>
          <tr>
            <td>Historique des achats (produit, date)</td>
            <td>Suivi achats, support, prévention fraude</td>
            <td>Exécution du contrat + Obligation légale</td>
            <td>Jusqu&apos;à 10 ans (obligation comptable potentielle)</td>
          </tr>
        </tbody>
      </table>

      <h3>Visibilité publique et fonctionnalités sociales</h3>
      <p>
        Si vous activez la visibilité publique de votre profil ou partagez un lien (parrainage, résultat de partie),
        les informations que vous avez choisi de partager (pseudonyme, avatar, niveau, meilleurs scores) sont{" "}
        <strong>visibles par toute personne disposant du lien</strong>. Vous pouvez désactiver cela à tout moment dans
        Profil → Visibilité du profil.
      </p>

      <h2>Sous-traitants et destinataires</h2>
      <p>Vos données peuvent être transmises aux prestataires suivants :</p>
      <ul>
        {PROCESSORS.hosting.active && (
          <li>
            <strong>{PROCESSORS.hosting.name}</strong> — {PROCESSORS.hosting.purpose}
          </li>
        )}
        {PROCESSORS.email.active && (
          <li>
            <strong>{PROCESSORS.email.name}</strong> — {PROCESSORS.email.purpose}
          </li>
        )}
        {PROCESSORS.antiBot.active && (
          <li>
            <strong>{PROCESSORS.antiBot.name}</strong> — {PROCESSORS.antiBot.purpose}
          </li>
        )}
        {PROCESSORS.chainBackend.active && (
          <li>
            <strong>{PROCESSORS.chainBackend.name}</strong> — {PROCESSORS.chainBackend.purpose}
          </li>
        )}
        {PROCESSORS.chainPayments.active && (
          <li>
            <strong>{PROCESSORS.chainPayments.name}</strong> — {PROCESSORS.chainPayments.purpose}. Google Play traite les
            paiements ; nous ne voyons jamais votre moyen de paiement.
          </li>
        )}
        {PROCESSORS.chainAttribution.active && (
          <li>
            <strong>{PROCESSORS.chainAttribution.name}</strong> — {PROCESSORS.chainAttribution.purpose}
          </li>
        )}
      </ul>

      <h2>Transferts hors de l&apos;Espace économique européen</h2>
      <p>
        Certains de nos prestataires (Vercel, Resend, Cloudflare, Google) peuvent traiter vos données en dehors de
        l&apos;Union européenne, notamment aux États-Unis. Ces transferts sont encadrés par les mécanismes juridiques
        prévus par le RGPD (clauses contractuelles types, décisions d&apos;adéquation) selon les engagements de chaque
        prestataire. Pour plus d&apos;informations sur les garanties appliquées, contactez-nous.
      </p>

      <h2>Durées de conservation</h2>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demandes de contact</td>
            <td>{RETENTION_PERIODS.contactMessages}</td>
          </tr>
          <tr>
            <td>Limitation anti-spam (IP hachée)</td>
            <td>{RETENTION_PERIODS.rateLimitRecords}</td>
          </tr>
          <tr>
            <td>Comptes Chain (compte actif)</td>
            <td>{RETENTION_PERIODS.chainAccounts}</td>
          </tr>
          <tr>
            <td>Données Chain après suppression de compte</td>
            <td>{RETENTION_PERIODS.chainAccountAfterDeletion}</td>
          </tr>
          <tr>
            <td>Logs techniques (Supabase, Vercel)</td>
            <td>{RETENTION_PERIODS.technicalLogs}</td>
          </tr>
        </tbody>
      </table>

      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>
          <strong>Droit d&apos;accès</strong> : Obtenir une copie de vos données personnelles
        </li>
        <li>
          <strong>Droit de rectification</strong> : Corriger vos données inexactes ou incomplètes
        </li>
        <li>
          <strong>Droit à l&apos;effacement</strong> : Demander la suppression de vos données (sous certaines conditions)
        </li>
        <li>
          <strong>Droit à la limitation</strong> : Limiter le traitement de vos données
        </li>
        <li>
          <strong>Droit d&apos;opposition</strong> : Vous opposer à certains traitements
        </li>
        <li>
          <strong>Droit à la portabilité</strong> : Récupérer vos données dans un format structuré
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> : Lorsqu&apos;un traitement est fondé sur votre consentement
        </li>
        <li>
          <strong>Droit de réclamation</strong> : Introduire une réclamation auprès de la CNIL
        </li>
      </ul>
      <p>
        Pour exercer ces droits, contactez{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>{" "}
        ou utilisez les outils intégrés à l&apos;application Chain (voir section suivante). Une preuve d&apos;identité peut
        être demandée en cas de doute légitime sur votre identité.
      </p>
      <p>
        Pour introduire une réclamation auprès de la CNIL :{" "}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="underline">
          www.cnil.fr/fr/plaintes
        </a>
      </p>

      <h2 id="supprimer-mon-compte">Supprimer votre compte Chain</h2>
      <p>
        Vous pouvez supprimer votre compte Chain et toutes les données associées à tout moment. La suppression est{" "}
        <strong>immédiate et irréversible</strong>.
      </p>
      <p>
        <strong>Depuis l&apos;application</strong> : Profil → Centre légal → Supprimer mon compte
      </p>
      <p>
        <strong>Sans l&apos;application</strong> : Si vous n&apos;avez plus accès à l&apos;application, vous pouvez demander la
        suppression via notre{" "}
        <a href="/suppression-compte" className="underline">
          page de suppression de compte
        </a>{" "}
        ou en écrivant à{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>
        .
      </p>
      <p>
        <strong>Important</strong> : Supprimer votre compte Chain n&apos;annule pas automatiquement un abonnement Google Play.
        Vous devez résilier votre abonnement séparément depuis le Play Store si vous ne souhaitez pas qu&apos;il se
        renouvelle.
      </p>

      <h2>Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données, notamment :
      </p>
      <ul>
        <li>Connexions chiffrées (HTTPS, TLS)</li>
        <li>Contrôle d&apos;accès strict (Row Level Security sur Supabase)</li>
        <li>Validation serveur et limitation de fréquence</li>
        <li>Hachage des mots de passe</li>
        <li>Journalisation de sécurité</li>
      </ul>
      <p>
        <strong>Important</strong> : Les données que vous choisissez de rendre publiques (profil public, liens partagés)
        sont visibles par toute personne disposant du lien. Vous contrôlez cette visibilité dans les paramètres de
        Chain.
      </p>

      <h2>Mineurs</h2>
      {AGE_POLICY.minimumAge ? (
        <p>
          Chain est destiné aux utilisateurs âgés d&apos;au moins {AGE_POLICY.minimumAge} ans. Si vous avez moins de{" "}
          {AGE_POLICY.minimumAge} ans, vous ne devez pas utiliser Chain sans l&apos;autorisation et la supervision de vos
          parents ou tuteurs légaux.
        </p>
      ) : (
        <p>
          La politique vis-à-vis des mineurs sera précisée en cohérence avec la classification IARC et le public
          cible déclaré dans la Play Console avant le lancement commercial.
        </p>
      )}

      <h2>Modifications de cette politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique pour refléter des changements dans nos pratiques ou pour des raisons
        légales. La date de dernière mise à jour est indiquée en haut de cette page. En cas de changement
        significatif concernant Chain, les joueurs concernés en seront informés dans l&apos;application.
      </p>
    </LegalPageLayout>
  );
}
