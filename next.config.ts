import type { NextConfig } from "next";
import redirectsData from "./content/redirects.json";

/**
 * Security headers — docs/MASTER_SPECIFICATION.md section 14.2.
 * CSP starts in report-only mode until the exact set of required script/style sources
 * is confirmed in production (Turnstile, fonts), per the section's guidance.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

interface RedirectEntry {
  source: string;
  destination: string;
  permanent: boolean;
}

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return redirectsData as RedirectEntry[];
  },
};

export default nextConfig;
