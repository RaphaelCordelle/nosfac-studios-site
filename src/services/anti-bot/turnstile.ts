import { env, turnstileConfigured } from "@/lib/env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerification {
  success: boolean;
  /** True when Turnstile isn't configured (development) — the caller decides whether to allow through. */
  skipped: boolean;
}

/**
 * Server-side Turnstile verification — docs/MASTER_SPECIFICATION.md section 10.3.
 * The client-side token alone is never treated as proof; this call is mandatory
 * whenever TURNSTILE_SECRET_KEY is configured.
 */
export async function verifyTurnstile(token: string | undefined, remoteIp: string): Promise<TurnstileVerification> {
  if (!turnstileConfigured || !env.TURNSTILE_SECRET_KEY) {
    return { success: true, skipped: true };
  }

  if (!token) {
    return { success: false, skipped: false };
  }

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: remoteIp }),
    });
    const data: unknown = await response.json();
    const success =
      typeof data === "object" && data !== null && "success" in data && (data as { success: unknown }).success === true;
    return { success, skipped: false };
  } catch {
    return { success: false, skipped: false };
  }
}
