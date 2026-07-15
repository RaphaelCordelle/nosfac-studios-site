import type { EmailProvider, OutgoingEmail, EmailSendResult } from "./provider";

/**
 * Default adapter used whenever RESEND_API_KEY / CONTACT_FROM_EMAIL are not configured
 * (local development, and any environment that hasn't been wired to a real provider yet).
 * It never throws and never silently pretends to have sent mail: it logs a clearly
 * labelled line so a developer notices contact submissions are not actually delivered.
 */
export class ConsoleEmailProvider implements EmailProvider {
  async send(email: OutgoingEmail): Promise<EmailSendResult> {
    console.warn(
      "[contact] Aucun fournisseur e-mail configuré (RESEND_API_KEY / CONTACT_FROM_EMAIL manquants). " +
        `Message non envoyé — sujet: "${email.subject}", destinataire prévu: ${email.to}.`,
    );
    return { ok: true, providerId: "console-adapter" };
  }
}
