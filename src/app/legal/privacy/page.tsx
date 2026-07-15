import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/content/legal-page-layout";
import {
  LEGAL_STATUS,
  PUBLIC_BRAND_NAME,
  LEGAL_IDENTITY,
  CONTACT,
  RETENTION_PERIODS,
  LAST_UPDATED,
} from "@/config/legal";
import { PRODUCTS, type ProductConfig } from "@/config/products";

export const metadata: Metadata = { title: "Politique de confidentialité" };

/** Section rendered for a product that has NO active service (KnowOut, Music Game currently) */
function InDevelopmentNotice({ product }: { product: ProductConfig }) {
  return (
    <p>
      {product.displayName} est actuellement en développement. Les informations relatives à ses
      traitements de données seront finalisées et publiées avant toute mise à disposition publique
      impliquant un compte ou des données personnelles.
    </p>
  );
}

/** Section rendered for a product with active data processing (Chain currently) */
function ProductDataSection({ product }: { product: ProductConfig }) {
  if (product.dataCategories.length === 0) {
    return <InDevelopmentNotice product={product} />;
  }

  return (
    <>
      <p>
        <strong>Statut&nbsp;:</strong> {product.status === "in-development" ? "En développement, build de test" : product.status}
        <br />
        <strong>Plateformes&nbsp;:</strong> {product.platforms.join(", ") || "à confirmer"}
        <br />
        <strong>Compte utilisateur&nbsp;:</strong>{" "}
        {product.hasAccount ? "Oui (via Supabase Auth)" : "Non"}
        <br />
        <strong>Achats intégrés&nbsp;:</strong>{" "}
        {product.hasInAppPurchases ? "Oui, via Google Play Billing" : "Non pour le moment"}
        <br />
        <strong>Publicités&nbsp;:</strong>{" "}
        {product.hasAdvertising ? "Oui" : "Non pour le moment"}
      </p>

      <p><strong>Prestataires utilisés par ce projet&nbsp;:</strong> {product.providers.join(", ")}</p>

      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Exemple</th>
            <th>Finalité</th>
            <th>Base légale</th>
            <th>Obligatoire</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          {product.dataCategories.map((row) => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.examples}</td>
              <td>{row.purpose}</td>
              <td>{row.legalBasis}</td>
              <td>{row.required ? "Oui" : "Facultatif"}</td>
              <td>{row.retention ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-foreground-subtle">
        Dernière vérification&nbsp;: {new Date(product.verificationDate).toLocaleDateString("fr-FR")}
      </p>
    </>
  );
}

function ResponsibleSection() {
  if (LEGAL_STATUS === "individual-non-professional") {
    return (
      <p>
        Le responsable du traitement des données présentées dans cette politique est le fondateur de{" "}
        {PUBLIC_BRAND_NAME}, agissant sous ce nom d&apos;usage. Contact&nbsp;:{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>
        .
      </p>
    );
  }
  return (
    <p>
      Le responsable du traitement est {LEGAL_IDENTITY.legalName ?? PUBLIC_BRAND_NAME}, agissant sous le nom {PUBLIC_BRAND_NAME}.
      Contact&nbsp;:{" "}
      <a href={`mailto:${CONTACT.email}`} className="underline">
        {CONTACT.email}
      </a>
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Politique de confidentialité" updatedAt={LAST_UPDATED.privacy}>
      <p>
        Cette politique décrit comment {PUBLIC_BRAND_NAME}{" "}collecte et traite les données
        personnelles sur son site web et dans ses applications. Elle est unique pour l&apos;ensemble
        du studio, mais contient une section distincte pour chaque projet, car les traitements ne
        sont pas identiques d&apos;un jeu à l&apos;autre.
      </p>

      {/* Table of contents */}
      <h2>Sommaire</h2>
      <ol>
        <li><a href="#responsable" className="underline">Responsable du traitement</a></li>
        <li><a href="#perimetre" className="underline">Périmètre</a></li>
        <li><a href="#site" className="underline">Site Nosfac Studios</a></li>
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <a href={`#${p.anchorId}`} className="underline">{p.displayName}</a>
          </li>
        ))}
        <li><a href="#prestataires" className="underline">Prestataires et destinataires</a></li>
        <li><a href="#transferts" className="underline">Transferts hors EEE</a></li>
        <li><a href="#conservation" className="underline">Durées de conservation</a></li>
        <li><a href="#securite" className="underline">Sécurité</a></li>
        <li><a href="#mineurs" className="underline">Mineurs</a></li>
        <li><a href="#droits" className="underline">Vos droits</a></li>
        <li><a href="#suppression" className="underline">Suppression des comptes</a></li>
        <li><a href="#modifications" className="underline">Modifications de la politique</a></li>
      </ol>

      <h2 id="responsable">1. Responsable du traitement</h2>
      <ResponsibleSection />

      <h2 id="perimetre">2. Périmètre</h2>
      <p>
        Cette politique couvre le site web {PUBLIC_BRAND_NAME} et chacun des projets publiés ou en
        développement. Chaque section spécifique à un projet indique explicitement l&apos;état
        actuel des traitements. Les projets non publiés ne collectent pas de données publiques
        tant qu&apos;ils ne sont pas mis à disposition.
      </p>

      {/* SITE section */}
      <h2 id="site">3. Site Nosfac Studios</h2>
      <p>
        Le site utilise deux traitements&nbsp;: le formulaire de contact et le stockage local de
        la préférence de thème.
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
            <td>Nom, e-mail, message (formulaire)</td>
            <td>Traiter la demande envoyée</td>
            <td>Mesures précontractuelles / Intérêt légitime</td>
            <td>{RETENTION_PERIODS.contactMessages}</td>
          </tr>
          <tr>
            <td>Adresse IP (hachée)</td>
            <td>Limitation anti-spam</td>
            <td>Intérêt légitime (sécurité)</td>
            <td>{RETENTION_PERIODS.rateLimitRecords}</td>
          </tr>
          <tr>
            <td>Préférence de thème (localStorage)</td>
            <td>Confort de lecture</td>
            <td>Consentement implicite (stockage local, jamais transmis au serveur)</td>
            <td>Jusqu&apos;à suppression par l&apos;utilisateur</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Prestataires du site&nbsp;:</strong> Vercel (hébergement), Resend (envoi des
        messages du formulaire, si activé), Cloudflare Turnstile (anti-bot, si activé). Aucun
        outil d&apos;analytics n&apos;est actuellement utilisé.
      </p>

      {/* Per-project sections */}
      {PRODUCTS.map((product, i) => (
        <section key={product.id}>
          <h2 id={product.anchorId}>{i + 4}. {product.displayName}</h2>
          <ProductDataSection product={product} />
        </section>
      ))}

      <h2 id="prestataires">{4 + PRODUCTS.length}. Prestataires et destinataires</h2>
      <table>
        <thead>
          <tr>
            <th>Prestataire</th>
            <th>Service concerné</th>
            <th>Rôle</th>
            <th>Données potentielles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel Inc.</td>
            <td>Site {PUBLIC_BRAND_NAME}</td>
            <td>Hébergement, CDN</td>
            <td>Logs techniques de connexion</td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Formulaire du site (si activé)</td>
            <td>Envoi des e-mails</td>
            <td>Nom, e-mail, contenu du message</td>
          </tr>
          <tr>
            <td>Cloudflare</td>
            <td>Formulaire du site (Turnstile, si activé)</td>
            <td>Anti-bot</td>
            <td>Token temporaire, IP</td>
          </tr>
          <tr>
            <td>Supabase</td>
            <td>Chain uniquement</td>
            <td>Authentification, base de données</td>
            <td>Compte joueur, progression</td>
          </tr>
          <tr>
            <td>Google Play</td>
            <td>Chain uniquement (Android)</td>
            <td>Distribution</td>
            <td>Aucune donnée transmise par {PUBLIC_BRAND_NAME} directement</td>
          </tr>
        </tbody>
      </table>
      <p>
        Un prestataire n&apos;est cité pour un projet que s&apos;il est réellement utilisé dans la
        version courante de ce projet. L&apos;ajout d&apos;un nouveau service (analytics,
        publicité, monitoring) fera l&apos;objet d&apos;une mise à jour explicite de cette
        politique.
      </p>

      <h2 id="transferts">{5 + PRODUCTS.length}. Transferts hors de l&apos;Espace économique européen</h2>
      <p>
        Certains prestataires (Vercel, Resend, Cloudflare, Google) peuvent traiter des données
        aux États-Unis. Ces transferts sont encadrés par les mécanismes juridiques prévus par le
        RGPD (clauses contractuelles types, décisions d&apos;adéquation), selon les engagements
        publics de chaque prestataire.
      </p>

      <h2 id="conservation">{6 + PRODUCTS.length}. Durées de conservation</h2>
      <p>
        Les durées applicables varient selon le type de donnée et le projet. Les durées sont
        indiquées dans chaque tableau ci-dessus. Les durées non encore stabilisées techniquement
        seront précisées avant la mise à disposition publique du projet concerné.
      </p>

      <h2 id="securite">{7 + PRODUCTS.length}. Sécurité</h2>
      <p>
        {PUBLIC_BRAND_NAME} met en œuvre des mesures proportionnées&nbsp;: connexions chiffrées
        (HTTPS, TLS), hachage des mots de passe, contrôle d&apos;accès (Row Level Security
        Supabase pour Chain), validation serveur, limitation de fréquence, journaux de sécurité.
        Aucune sécurité n&apos;est absolue. Les données choisies comme publiques par un joueur
        (par exemple un résultat partagé) restent visibles par les personnes disposant du lien.
      </p>

      <h2 id="mineurs">{8 + PRODUCTS.length}. Mineurs</h2>
      <p>
        La politique vis-à-vis des mineurs sera précisée pour chaque projet en cohérence avec sa
        classification IARC et le public cible déclaré dans les fiches Google Play et App Store
        avant tout lancement commercial.
      </p>

      <h2 id="droits">{9 + PRODUCTS.length}. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants&nbsp;:</p>
      <ul>
        <li>Droit d&apos;accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l&apos;effacement (voir aussi la <a href="#suppression" className="underline">section suppression</a>)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit d&apos;opposition</li>
        <li>Droit à la portabilité (lorsqu&apos;il est techniquement pertinent)</li>
        <li>Droit de retirer votre consentement</li>
        <li>Droit d&apos;introduire une réclamation auprès de la CNIL&nbsp;:{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="underline">
            www.cnil.fr/fr/plaintes
          </a>
        </li>
      </ul>
      <p>
        Pour exercer ces droits, contactez{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>. Une preuve
        d&apos;identité peut être demandée en cas de doute légitime.
      </p>

      <h2 id="suppression">{10 + PRODUCTS.length}. Suppression des comptes</h2>
      <p>
        La suppression des comptes est traitée sur une page dédiée où vous pouvez choisir le
        projet concerné&nbsp;:{" "}
        <a href="/suppression-compte" className="underline">/suppression-compte</a>.
      </p>

      <h2 id="modifications">{11 + PRODUCTS.length}. Modifications de la politique</h2>
      <p>
        Cette politique peut évoluer. La date de dernière mise à jour est indiquée en haut de la
        page. Les changements significatifs concernant un projet seront signalés dans
        l&apos;application concernée.
      </p>
    </LegalPageLayout>
  );
}
