import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { FOOTER_CONTACT } from "@/lib/data/footer";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:3000";
}

export const DEFAULT_DESCRIPTION =
  "Luxury property sales, private viewings, and investment advisory across Cape Town, Johannesburg, Durban, and the Winelands.";

export const SITE_KEYWORDS = [
  "luxury real estate South Africa",
  "property investments",
  "Sandton property",
  "Cape Town homes",
  "book property viewing",
  "Mashaba Property Investments",
];

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const url = `${getSiteUrl()}${canonicalPath || ""}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath || "/",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_ZA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Luxury Real Estate South Africa`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Luxury Real Estate South Africa`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
};

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url: getSiteUrl(),
    email: FOOTER_CONTACT.email,
    telephone: FOOTER_CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "136 White Road, Deinfern",
      addressLocality: "Sandton",
      postalCode: "2001",
      addressCountry: "ZA",
    },
    areaServed: ["Cape Town", "Johannesburg", "Durban", "Stellenbosch"],
  };
}

export const PUBLIC_ROUTES = [
  "/",
  "/gallery",
  "/about",
  "/services",
  "/contact",
  "/booking",
  "/favorites",
  "/privacy",
  "/terms",
] as const;
