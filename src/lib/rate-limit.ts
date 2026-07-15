import { createHash } from "node:crypto";
import { RATE_LIMIT_MAX_ATTEMPTS, RATE_LIMIT_WINDOW_MS } from "@/domain/contact";

/**
 * In-memory rate limiter — docs/MASTER_SPECIFICATION.md section 10.3.
 * Deliberately simple for a single-instance deployment (Vercel serverless functions are
 * not guaranteed to share memory across invocations, so this is a best-effort first line
 * of defense, not the sole protection — Turnstile and the honeypot cover the gap). If
 * traffic grows, replace with a durable store (e.g. Upstash Redis) behind this same signature.
 */
const attempts = new Map<string, number[]>();

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const existing = (attempts.get(key) ?? []).filter((t) => t > windowStart);

  if (existing.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    attempts.set(key, existing);
    return true;
  }

  existing.push(now);
  attempts.set(key, existing);
  return false;
}
