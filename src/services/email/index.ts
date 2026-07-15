import { env, emailProviderConfigured } from "@/lib/env";
import type { EmailProvider } from "./provider";
import { ConsoleEmailProvider } from "./console-provider";
import { ResendEmailProvider } from "./resend-provider";

let provider: EmailProvider | undefined;

export function getEmailProvider(): EmailProvider {
  if (!provider) {
    provider =
      emailProviderConfigured && env.RESEND_API_KEY
        ? new ResendEmailProvider(env.RESEND_API_KEY)
        : new ConsoleEmailProvider();
  }
  return provider;
}
