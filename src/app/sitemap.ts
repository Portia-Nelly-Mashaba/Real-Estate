import type { MetadataRoute } from "next";
import { getSiteUrl, PUBLIC_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/gallery" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/gallery" || path === "/booking" ? 0.9 : 0.7,
  }));
}
