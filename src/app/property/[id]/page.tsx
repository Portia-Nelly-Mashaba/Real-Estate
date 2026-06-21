import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/property/PropertyDetail";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  ALL_PROPERTIES,
  formatPropertyPrice,
  getPropertyById,
} from "@/lib/data/properties";
import { createPageMetadata, getSiteUrl } from "@/lib/seo";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_PROPERTIES.map((property) => ({ id: property.id }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return createPageMetadata({
      title: "Property not found",
      path: `/property/${id}`,
    });
  }

  return {
    ...createPageMetadata({
      title: property.title,
      description: `${property.description} ${property.location}. ${formatPropertyPrice(property.price)}.`,
      path: `/property/${property.id}`,
    }),
    openGraph: {
      title: property.title,
      description: property.description,
      url: `${getSiteUrl()}/property/${property.id}`,
      images: [{ url: property.image, alt: property.imageAlt }],
    },
  };
}

function getPropertyJsonLd(property: NonNullable<ReturnType<typeof getPropertyById>>) {
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.longDescription,
    image: [
      `${getSiteUrl()}${property.image}`,
      ...property.galleryImages.map((photo) =>
        photo.src.startsWith("http") ? photo.src : `${getSiteUrl()}${photo.src}`,
      ),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: property.region,
      addressCountry: "ZA",
    },
    numberOfRooms: property.beds,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaSqm,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const propertyJsonLd = getPropertyJsonLd(property);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
          />
          <PropertyDetail property={property} />
        </section>
      </main>
      <div className="gallery-footer-shade" aria-hidden="true" />
      <Footer />
    </>
  );
}
