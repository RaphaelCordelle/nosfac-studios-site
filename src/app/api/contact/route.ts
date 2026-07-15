import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import {
  ContactFormSchema,
  REASON_META,
  REQUIRED_FIELDS_BY_REASON,
  MIN_FORM_FILL_MS,
  type ContactFormValues,
} from "@/domain/contact";
import { env } from "@/lib/env";
import { hashIp, isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/services/anti-bot/turnstile";
import { getEmailProvider } from "@/services/email";

export const runtime = "nodejs";

/** Strips characters that could be used for header/log injection — section 27 threat model. */
function sanitizeForHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildSubject(values: ContactFormValues): string {
  const meta = REASON_META[values.reason];
  const projectPart = values.projectSlug ? `[${values.projectSlug}]` : "";
  const topic = values.subject || values.organization || values.channel || values.media || values.reason;
  return sanitizeForHeader(`${meta.subjectPrefix}${projectPart} ${topic}`).slice(0, 180);
}

function buildBody(values: ContactFormValues, requestUrl: string): string {
  const lines: string[] = [
    `Motif: ${REASON_META[values.reason].label}`,
    `Nom: ${values.name}`,
    `E-mail: ${values.email}`,
  ];
  if (values.projectSlug) lines.push(`Projet: ${values.projectSlug}`);

  const fieldOrder: (keyof ContactFormValues)[] = [
    "version",
    "platform",
    "steps",
    "expected",
    "actual",
    "frequency",
    "accountRef",
    "problem",
    "proposal",
    "benefit",
    "organization",
    "role",
    "timeline",
    "budget",
    "channel",
    "link",
    "audience",
    "need",
    "deadline",
    "media",
    "angle",
    "assetsNeeded",
    "jurisdiction",
    "subject",
    "reference",
    "profile",
    "portfolioLink",
    "availability",
    "context",
    "environment",
    "logs",
    "message",
  ];

  for (const field of fieldOrder) {
    const value = values[field];
    if (typeof value === "string" && value.trim().length > 0) {
      lines.push(`${field}: ${value}`);
    }
  }

  lines.push("", `Page source: ${values.sourceUrl ?? requestUrl}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(env.SITE_URL).origin;

  // Section 27: refuse cross-origin submissions even though the client already checks.
  if (origin && origin !== expectedOrigin) {
    return NextResponse.json({ ok: false, code: "FORBIDDEN" }, { status: 403 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
  const rateLimitKey = hashIp(clientIp);

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { ok: false, code: "RATE_LIMIT", message: "Trop de tentatives récentes. Réessayez plus tard." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_BODY" }, { status: 400 });
  }

  const parsed = ContactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "VALIDATION", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 400 },
    );
  }

  const values = parsed.data;

  // Honeypot: a real user never fills this hidden field.
  if (values.honeypot && values.honeypot.length > 0) {
    return NextResponse.json({ ok: false, code: "BOT_DETECTED" }, { status: 400 });
  }

  // Minimum fill time: forms submitted faster than a human can plausibly type are suspect.
  if (Date.now() - values.formStartedAt < MIN_FORM_FILL_MS) {
    return NextResponse.json({ ok: false, code: "BOT_DETECTED" }, { status: 400 });
  }

  const turnstile = await verifyTurnstile(values.turnstileToken, clientIp);
  if (!turnstile.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "TURNSTILE_FAILED",
        message: "La vérification de sécurité n’a pas abouti. Réessayez ou écrivez à nosfac.studios@gmail.com.",
      },
      { status: 400 },
    );
  }

  const requiredFields = REQUIRED_FIELDS_BY_REASON[values.reason];
  const missing = requiredFields.filter((field) => {
    const value = values[field];
    return typeof value !== "string" || value.trim().length === 0;
  });
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, code: "VALIDATION", issues: missing.map((field) => ({ path: [field], message: "Ce champ est nécessaire pour traiter votre demande." })) },
      { status: 400 },
    );
  }

  const provider = getEmailProvider();
  const result = await provider.send({
    to: env.CONTACT_TO_EMAIL,
    from: env.CONTACT_FROM_EMAIL ?? `no-reply@${expectedOrigin.replace(/^https?:\/\//, "")}`,
    replyTo: values.email,
    subject: buildSubject(values),
    text: buildBody(values, request.url),
  });

  if (!result.ok) {
    // Section 16: log a correlatable error without message content, email, or tokens.
    console.error(`[contact] send failed requestId=${requestId} reason=${values.reason}`);
    return NextResponse.json(
      {
        ok: false,
        code: "EMAIL_PROVIDER",
        message: "L’envoi est temporairement indisponible. Votre texte reste dans cette page ; vous pouvez réessayer ou utiliser l’adresse e-mail affichée.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: requestId });
}
