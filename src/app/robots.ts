import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/** docs/MASTER_SPECIFICATION.md section 13.1: allow public content, block API routes and confirmation pages. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/support/contact/success"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
