import type { Metadata } from "next";
import { LegalPage, MissingField } from "@/components/content/legal-page";
import { SITE, LEGAL_PLACEHOLDERS } from "@/config/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales" updatedAt="13 juillet 2026" incomplete>
      <h2>Éditeur du site</h2>
      <p>
        Ce site est édité par le fondateur de {SITE.name}. Les informations d’identification légale
        suivantes sont en attente de confirmation avant tout lancement commercial :
      </p>
      <ul>
        <li>Forme juridique : <MissingField label="forme juridique" /></li>
        <li>Numéro d’immatriculation (SIREN/SIRET ou équivalent) : <MissingField label="numéro d’immatriculation" /></li>
        <li>Adresse postale du siège : <MissingField label="adresse postale" /></li>
        <li>Directeur de la publication : <MissingField label="directeur de la publication" /></li>
      </ul>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ce site : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>

      <h2>Hébergement</h2>
      <p>{LEGAL_PLACEHOLDERS.hostingProvider}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le nom {SITE.name}, les identités visuelles des projets et les contenus originaux publiés sur ce
        site sont la propriété de leur auteur, sauf mention contraire.
      </p>
    </LegalPage>
  );
}
