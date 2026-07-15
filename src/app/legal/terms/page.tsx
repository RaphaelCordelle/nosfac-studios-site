import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/content/legal-page-layout";
import { PUBLIC_BRAND_NAME, CONTACT, LAST_UPDATED } from "@/config/legal";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function TermsPage() {
  return (
    <LegalPageLayout title="Conditions d'utilisation" updatedAt={LAST_UPDATED.terms}>
      <h2>Objet</h2>
      <p>
        Ces conditions régissent l&apos;utilisation du site web {PUBLIC_BRAND_NAME} ainsi que des jeux et applications
        édités par le studio, notamment Chain. En créant un compte ou en utilisant une application {PUBLIC_BRAND_NAME},
        vous acceptez les conditions ci-dessous.
      </p>

      <h2>Accès au site et aux services</h2>
      <p>
        L&apos;accès au site {PUBLIC_BRAND_NAME} est gratuit et ouvert à tous. Certaines fonctionnalités des
        applications peuvent nécessiter la création d&apos;un compte ou faire l&apos;objet d&apos;achats intégrés.
      </p>
      <p>
        Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du site ou des services,
        temporairement ou définitivement, avec ou sans préavis, pour des raisons de maintenance, de sécurité ou
        d&apos;amélioration.
      </p>

      <h2>Compte Chain</h2>
      <p>
        Chain vous permet de jouer en tant qu&apos;invité (compte anonyme temporaire) ou de sécuriser votre compte via
        Google, Apple ou une adresse e-mail.
      </p>
      <p>
        <strong>Responsabilité</strong> : Vous êtes responsable de la confidentialité des moyens d&apos;accès à votre
        compte. Un compte invité non sécurisé est <strong>définitivement perdu</strong> si vous vous déconnectez
        ou changez d&apos;appareil sans l&apos;avoir préalablement lié à un fournisseur d&apos;authentification (Google, Apple
        ou e-mail).
      </p>
      <p>
        <strong>Sécurité</strong> : Vous vous engagez à ne jamais partager vos identifiants de connexion et à
        signaler immédiatement toute utilisation non autorisée de votre compte.
      </p>

      <h2>Règles d&apos;usage</h2>
      <p>En utilisant {PUBLIC_BRAND_NAME} et Chain, vous vous engagez à :</p>
      <ul>
        <li>
          <strong>Choisir un pseudonyme approprié</strong> : Non injurieux, non trompeur, n&apos;usurpant l&apos;identité de
          personne et respectueux des autres utilisateurs
        </li>
        <li>
          <strong>Ne pas tricher</strong> : Ne pas tenter de contourner les mécanismes anti-triche, les limites du
          jeu (comme la limite quotidienne d&apos;essais du défi quotidien) ou d&apos;exploiter des failles techniques
        </li>
        <li>
          <strong>Ne pas obtenir de contenu illégitimement</strong> : Ne pas utiliser de moyens détournés pour
          obtenir un avantage, du contenu premium ou des objets que vous n&apos;avez pas mérités ou achetés
          légitimement
        </li>
        <li>
          <strong>Ne pas nuire au service</strong> : Ne pas perturber le fonctionnement des services, surcharger les
          serveurs ou porter atteinte à l&apos;expérience des autres utilisateurs
        </li>
        <li>
          <strong>Respecter les lois</strong> : Ne pas utiliser les services à des fins illégales ou non autorisées
        </li>
      </ul>
      <p>
        <strong>Sanctions</strong> : Tout manquement à ces règles peut entraîner la suspension temporaire ou la
        suppression définitive de votre compte, sans préavis et sans remboursement des achats effectués. En cas de
        fraude avérée, nous nous réservons le droit de prendre toutes les mesures légales appropriées.
      </p>

      <h2>Achats intégrés</h2>
      <p>
        Chain propose des achats intégrés (cœurs, malus, cosmétiques, abonnement Premium) facturés via Google
        Play. Les prix affichés dans l&apos;application sont ceux fixés par Google Play pour votre région et incluent
        les taxes applicables.
      </p>

      <h3>Abonnement Premium</h3>
      <p>
        L&apos;abonnement Premium se renouvelle automatiquement jusqu&apos;à résiliation. Vous pouvez le résilier à tout
        moment depuis les paramètres d&apos;abonnement de votre compte Google Play. La résiliation prendra effet à la
        fin de la période de facturation en cours.
      </p>
      <p>
        <strong>Important</strong> : Supprimer votre compte Chain n&apos;annule pas automatiquement votre abonnement
        Google Play. Vous devez résilier l&apos;abonnement séparément via le Play Store.
      </p>

      <h3>Remboursements</h3>
      <p>
        Les achats effectués via Google Play sont soumis à la politique de remboursement de Google Play. Les
        demandes de remboursement doivent être effectuées directement auprès de Google Play, conformément à leurs
        conditions.
      </p>
      <p>
        Conformément à la législation européenne, vous disposez d&apos;un droit de rétractation de 14 jours pour les
        achats de contenu numérique, sauf si vous avez commencé à utiliser le contenu acheté après avoir donné votre
        accord express et renoncé à votre droit de rétractation.
      </p>

      <h3>Monnaie virtuelle</h3>
      <p>
        Les cœurs, malus et autres objets virtuels achetés ou gagnés dans Chain n&apos;ont <strong>aucune valeur
        monétaire en dehors du jeu</strong>. Ils ne peuvent pas être échangés contre de l&apos;argent réel, transférés à
        un autre joueur ou utilisés en dehors de Chain.
      </p>

      <h2>Propriété intellectuelle</h2>

      <h3>Contenu de Chain</h3>
      <p>
        Le nom Chain, le design, les graphismes, les interfaces, les mécaniques de jeu, les algorithmes et tous les
        autres éléments composant Chain sont la propriété de {PUBLIC_BRAND_NAME} ou font l&apos;objet d&apos;une
        autorisation d&apos;utilisation.
      </p>
      <p>
        Le dictionnaire de mots utilisé dans Chain s&apos;appuie en partie sur des ressources linguistiques sous licence
        libre (notamment CC BY 4.0). Les crédits complets sont disponibles dans l&apos;application.
      </p>

      <h3>Contenu du site</h3>
      <p>
        Les textes, images, logos et identités visuelles de ce site sont la propriété de {PUBLIC_BRAND_NAME}, sauf
        mention contraire. Toute reproduction, représentation ou utilisation sans autorisation préalable est
        interdite.
      </p>
      <p>
        <strong>Exception presse et créateurs</strong> : Les journalistes et créateurs de contenu peuvent utiliser
        les assets du press kit selon les règles qui y sont indiquées.
      </p>

      <h3>Votre contenu</h3>
      <p>
        Si Chain propose des fonctionnalités permettant de partager du contenu (pseudonyme, avatar, résultats
        publics), vous conservez la propriété de ce contenu mais accordez à {PUBLIC_BRAND_NAME} une licence
        mondiale, non exclusive et gratuite pour l&apos;utiliser, l&apos;afficher et le distribuer dans le cadre du
        fonctionnement du jeu.
      </p>

      <h2>Suppression de compte</h2>
      <p>
        Vous pouvez supprimer votre compte Chain à tout moment, directement depuis l&apos;application (Profil → Centre
        légal → Supprimer mon compte) ou via notre{" "}
        <a href="/suppression-compte" className="underline">
          page de suppression de compte
        </a>
        .
      </p>
      <p>
        La suppression est <strong>immédiate et irréversible</strong>. Consultez la{" "}
        <a href="/legal/privacy" className="underline">
          politique de confidentialité
        </a>{" "}
        pour le détail de ce qui est effacé.
      </p>

      <h2>Évolution du jeu et du site</h2>
      <p>
        {PUBLIC_BRAND_NAME} se réserve le droit de modifier, ajouter ou supprimer des fonctionnalités, du contenu ou
        des mécaniques de jeu à tout moment, afin d&apos;améliorer l&apos;expérience, corriger des bugs, assurer
        l&apos;équilibre du jeu ou pour des raisons techniques ou légales.
      </p>
      <p>
        Les modifications significatives affectant des fonctionnalités payantes feront l&apos;objet d&apos;une information
        préalable dans la mesure du possible.
      </p>

      <h2>Disponibilité et maintenance</h2>
      <p>
        Nous nous efforçons de maintenir Chain et le site web accessibles 24h/24 et 7j/7. Toutefois, des
        interruptions peuvent survenir pour des raisons de maintenance, de mise à jour, de sécurité ou en cas de
        circonstances indépendantes de notre volonté (panne serveur, attaque informatique, etc.).
      </p>
      <p>
        Nous ne garantissons pas une disponibilité permanente et ne pourrons être tenus responsables des
        interruptions temporaires de service.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Les services {PUBLIC_BRAND_NAME} sont fournis «&nbsp;en l&apos;état&nbsp;». Dans la limite permise par la loi
        applicable, {PUBLIC_BRAND_NAME} ne pourra être tenu responsable :
      </p>
      <ul>
        <li>Des interruptions de service, bugs ou dysfonctionnements</li>
        <li>De la perte de progression liée à un compte invité non sécurisé</li>
        <li>Des dommages indirects, accessoires ou conséquents liés à l&apos;utilisation ou à l&apos;impossibilité d&apos;utiliser les services</li>
        <li>Du comportement d&apos;autres utilisateurs</li>
        <li>De la perte de données en cas de problème technique</li>
      </ul>
      <p>
        Cette limitation de responsabilité ne s&apos;applique pas aux dommages corporels, aux fautes intentionnelles ou
        aux garanties légales obligatoires dont vous bénéficiez en tant que consommateur.
      </p>

      <h2>Modification des conditions</h2>
      <p>
        Nous pouvons modifier ces conditions à tout moment. Les modifications importantes seront signalées par un
        moyen approprié (notification dans l&apos;application, e-mail si vous avez un compte avec adresse e-mail, ou
        mention sur le site).
      </p>
      <p>
        La poursuite de l&apos;utilisation des services après notification des modifications vaut acceptation des
        nouvelles conditions.
      </p>

      <h2>Droit applicable et juridiction</h2>
      <p>
        Ces conditions sont régies par le droit français. En cas de litige et à défaut d&apos;accord amiable, le litige
        sera porté devant les tribunaux français compétents, sous réserve des règles impératives de protection
        des consommateurs applicables dans le pays de résidence de l&apos;utilisateur.
      </p>
      <p>
        Conformément à la réglementation européenne, vous pouvez également recourir à une plateforme de résolution
        des litiges en ligne :{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ec.europa.eu/consumers/odr
        </a>
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ces conditions d&apos;utilisation :{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>
      </p>
    </LegalPageLayout>
  );
}
