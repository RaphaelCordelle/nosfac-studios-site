import type { Metadata } from "next";
import Script from "next/script";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactReasonSchema } from "@/domain/contact";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Contactez Nosfac Studios",
  description: "Choisissez le motif pour que votre message arrive avec le bon contexte.",
  robots: { index: false, follow: true },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; project?: string }>;
}) {
  const { reason, project } = await searchParams;
  const parsedReason = ContactReasonSchema.safeParse(reason);

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12 md:px-8 md:py-16">
      {env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      ) : null}

      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contactez Nosfac Studios</h1>
        <p className="mt-4 text-foreground-muted">
          Choisissez le motif pour que votre message arrive avec le bon contexte. Aucun délai de réponse
          n’est garanti.
        </p>
      </header>

      <div className="mt-10">
        <ContactForm
          initialReason={parsedReason.success ? parsedReason.data : undefined}
          initialProjectSlug={project}
          turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
      </div>
    </div>
  );
}
