/**
 * EmailProvider adapter — docs/MASTER_SPECIFICATION.md section 11.1 (ADR-004).
 * The contact route depends only on this interface, never on a concrete vendor,
 * so switching providers never requires touching the form or the route handler.
 */
export interface OutgoingEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export interface EmailSendResult {
  ok: boolean;
  /** Provider-side id when available, for support correlation — never logged with message content. */
  providerId?: string;
  error?: string;
}

export interface EmailProvider {
  send(email: OutgoingEmail): Promise<EmailSendResult>;
}
