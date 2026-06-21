import type { MetadataRoute } from "next";
import { ALL_PROPERTIES } from "@/lib/data/properties";
import { getSiteUrl, PUBLIC_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes = PUBLIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency:
      path === "/" || path === "/gallery"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      path === "/"
        ? 1
        : path === "/gallery" || path === "/booking"
          ? 0.9
          : 0.7,
  }));

  const propertyRoutes = ALL_PROPERTIES.map((property) => ({
    url: `${siteUrl}/property/${property.id}`,
    lastModified: new Date(property.listedAt),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
