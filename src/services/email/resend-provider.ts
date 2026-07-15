import { Resend } from "resend";
import type { EmailProvider, OutgoingEmail, EmailSendResult } from "./provider";

/** Production adapter — activates only once RESEND_API_KEY and CONTACT_FROM_EMAIL are set (section 11.1). */
export class ResendEmailProvider implements EmailProvider {
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(email: OutgoingEmail): Promise<EmailSendResult> {
    try {
      const result = await this.client.emails.send({
        to: email.to,
        from: email.from,
        subject: email.subject,
        text: email.text,
        replyTo: email.replyTo,
      });

      if (result.error) {
        return { ok: false, error: result.error.message };
      }

      return { ok: true, providerId: result.data?.id };
    } catch {
      return { ok: false, error: "EMAIL_PROVIDER_UNAVAILABLE" };
    }
  }
}
