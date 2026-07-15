import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/content/legal-page-layout";
import {
  LEGAL_STATUS,
  PUBLIC_BRAND_NAME,
  LEGAL_IDENTITY,
  CONTACT,
  HOSTING,
  LAST_UPDATED,
} from "@/config/legal";

export const metadata: Metadata = { title: "Mentions légales" };

function EditorSection() {
  if (LEGAL_STATUS === "individual-non-professional") {
    return (
      <>
        <h2>Éditeur du site</h2>
        <p>
          Le site {PUBLIC_BRAND_NAME}{" "}est édité à titre non professionnel par son fondateur, agissant sous le nom
          d&apos;usage {PUBLIC_BRAND_NAME}.
        </p>
        <p>
          Ce site ne représente pas une société ou une entreprise enregistrée. Il présente des projets personnels
          et expérimentaux menés de manière indépendante.
        </p>
      </>
    );
  }

  if (LEGAL_STATUS === "sole-trader") {
    return (
      <>
        <h2>Éditeur du site</h2>
        <p>
          Le site {PUBLIC_BRAND_NAME} est édité par {LEGAL_IDENTITY.legalName ?? PUBLIC_BRAND_NAME},
          entrepreneur individuel exerçant sous le nom commercial {PUBLIC_BRAND_NAME}.
        </p>
        <ul>
          {LEGAL_IDENTITY.postalAddress && <li>Adresse : {LEGAL_IDENTITY.postalAddress}</li>}
          {LEGAL_IDENTITY.siren && <li>SIREN : {LEGAL_IDENTITY.siren}</li>}
          {LEGAL_IDENTITY.siret && <li>SIRET : {LEGAL_IDENTITY.siret}</li>}
          {LEGAL_IDENTITY.rneRegistration && <li>{LEGAL_IDENTITY.rneRegistration}</li>}
          {LEGAL_IDENTITY.vatNumber && <li>TVA intracommunautaire : {LEGAL_IDENTITY.vatNumber}</li>}
        </ul>
      </>
    );
  }

  // company
  return (
    <>
      <h2>Éditeur du site</h2>
      <p>
        Le site {PUBLIC_BRAND_NAME} est édité par {LEGAL_IDENTITY.legalName ?? PUBLIC_BRAND_NAME}.
      </p>
      <ul>
        {LEGAL_IDENTITY.legalForm && <li>Forme juridique : {LEGAL_IDENTITY.legalForm}</li>}
        {LEGAL_IDENTITY.tradingName && <li>Nom commercial : {LEGAL_IDENTITY.tradingName}</li>}
        {LEGAL_IDENTITY.postalAddress && <li>Siège social : {LEGAL_IDENTITY.postalAddress}</li>}
        {LEGAL_IDENTITY.siren && <li>SIREN : {LEGAL_IDENTITY.siren}</li>}
        {LEGAL_IDENTITY.siret && <li>SIRET : {LEGAL_IDENTITY.siret}</li>}
        {LEGAL_IDENTITY.rcsRegistration && <li>{LEGAL_IDENTITY.rcsRegistration}</li>}
        {LEGAL_IDENTITY.vatNumber && <li>TVA intracommunautaire : {LEGAL_IDENTITY.vatNumber}</li>}
      </ul>
    </>
  );
}

export default function LegalNoticePage() {
  return (
    <LegalPageLayout title="Mentions légales" updatedAt={LAST_UPDATED.legalNotice}>
      <EditorSection />

      <h2>Directeur de la publication</h2>
      <p>
        {LEGAL_IDENTITY.publicationDirector
          ? LEGAL_IDENTITY.publicationDirector
          : `Le directeur de la publication est le fondateur de ${PUBLIC_BRAND_NAME}.`}
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ce site :{" "}
        <a href={`mailto:${CONTACT.email}`} className="underline">
          {CONTACT.email}
        </a>
        .
      </p>
      {LEGAL_IDENTITY.phone && (
        <p>
          Téléphone : <a href={`tel:${LEGAL_IDENTITY.phone}`}>{LEGAL_IDENTITY.phone}</a>
        </p>
      )}

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par {HOSTING.provider}, {HOSTING.address}.
      </p>
      {HOSTING.phone && <p>Téléphone hébergeur : {HOSTING.phone}</p>}

      <h2>Propriété intellectuelle</h2>
      <p>
        Le nom {PUBLIC_BRAND_NAME}, les identités visuelles des projets, ainsi que l&apos;ensemble des textes, graphismes,
        logiciels, photographies, illustrations, vidéos et autres éléments composant ce site sont la propriété de leur
        auteur ou font l&apos;objet d&apos;une autorisation d&apos;utilisation, sous réserve des droits appartenant aux
        bibliothèques tierces, prestataires et titulaires de droits.
      </p>
      <p>
        La reproduction, la représentation, la modification, la publication ou l&apos;adaptation de tout ou partie des
        éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite
        préalable.
      </p>
      <p>
        Le nom «&nbsp;{PUBLIC_BRAND_NAME}&nbsp;» constitue un nom d&apos;usage et ne fait pas l&apos;objet d&apos;un dépôt de marque à ce jour.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {PUBLIC_BRAND_NAME} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
        Toutefois, {PUBLIC_BRAND_NAME} ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
        mises à disposition sur ce site.
      </p>
      <p>
        {PUBLIC_BRAND_NAME} se réserve le droit de corriger le contenu de ce site à tout moment et sans préavis.
        {PUBLIC_BRAND_NAME} décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur
        des informations disponibles sur ce site.
      </p>
      <p>
        Le site peut contenir des liens hypertextes vers d&apos;autres sites internet. {PUBLIC_BRAND_NAME} n&apos;exerce aucun
        contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur disponibilité.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. En cas de litige et à défaut d&apos;accord amiable, le litige sera
        porté devant les tribunaux français compétents, sous réserve des règles impératives de protection des
        consommateurs applicables dans le pays de résidence de l&apos;utilisateur.
      </p>
    </LegalPageLayout>
  );
}
