import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bath, BedDouble, Calendar, MapPin, Maximize2 } from "lucide-react";
import { PropertyCard } from "@/components/home/PropertyCard";
import { PropertyFavoriteButton } from "@/components/home/PropertyFavoriteButton";
import { PropertyInteriorGallery } from "@/components/property/PropertyInteriorGallery";
import { BOOKING_HREF } from "@/lib/constants";
import {
  formatListedDate,
  formatPropertyPrice,
  getRelatedProperties,
  type PropertyListing,
} from "@/lib/data/properties";

interface PropertyDetailProps {
  property: PropertyListing;
}

const specItems = [
  { key: "beds", label: "Bedrooms", icon: BedDouble, getValue: (p: PropertyListing) => p.beds },
  { key: "baths", label: "Bathrooms", icon: Bath, getValue: (p: PropertyListing) => p.baths },
  {
    key: "area",
    label: "Floor area",
    icon: Maximize2,
    getValue: (p: PropertyListing) => `${p.areaSqm} m²`,
  },
] as const;

export function PropertyDetail({ property }: PropertyDetailProps) {
  const relatedProperties = getRelatedProperties(property.id);
  const regionName = property.region.split(",")[0];

  return (
    <article>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to properties
            </Link>
          </li>
        </ol>
      </nav>

      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-border/40 shadow-[0_8px_32px_rgba(26,26,26,0.08)] sm:aspect-[21/9]">
        <Image
          src={property.image}
          alt={property.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="property-type-badge">{property.type}</span>
        <PropertyFavoriteButton
          propertyId={property.id}
          propertyTitle={property.title}
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-7">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-gold-light">
            {property.status}
          </p>
          <h1 className="mt-2 max-w-3xl font-serif text-[1.75rem] font-medium leading-tight tracking-tight text-hero-text sm:text-[2.25rem] lg:text-[2.5rem]">
            {property.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-hero-text/85 sm:text-base">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {property.location}
          </p>
        </div>
      </div>

      <PropertyInteriorGallery
        images={property.galleryImages}
        propertyTitle={property.title}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-12">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/30 pb-6">
            <div>
              <p className="text-label font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                Asking price
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold text-gold-light sm:text-3xl">
                {formatPropertyPrice(property.price)}
              </p>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted sm:text-sm">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Listed {formatListedDate(property.listedAt)}
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {specItems.map(({ key, label, icon: Icon, getValue }) => (
              <div
                key={key}
                className="rounded-2xl border border-border/50 bg-white px-3 py-4 text-center shadow-[0_4px_20px_rgba(26,26,26,0.05)] sm:px-4 sm:py-5"
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border/30 bg-brown-light text-accent">
                    <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
                  </div>
                  <p className="mt-3 font-serif text-lg font-medium text-foreground sm:text-xl">
                    {getValue(property)}
                  </p>
                  <p className="mt-1 text-[0.6875rem] font-display uppercase tracking-[0.12em] text-muted">
                    {label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-2xl border border-border/50 bg-white p-6 shadow-[0_4px_20px_rgba(26,26,26,0.06)] sm:p-8">
            <h2 className="font-serif text-xl font-medium text-foreground sm:text-2xl">
              About this property
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-foreground sm:text-[1.0625rem]">
              {property.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {property.longDescription}
            </p>
          </div>

          <p className="mt-6 text-sm text-muted">
            <span className="font-medium text-foreground">Region:</span>{" "}
            {property.region}
            {" · "}
            <Link
              href={`/gallery?location=${property.regionSlug}`}
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View more in {regionName}
            </Link>
          </p>
        </div>

        <aside className="contact-form-card lg:sticky lg:top-28">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            Private viewing
          </p>
          <p className="mt-2 font-serif text-xl font-medium text-foreground sm:text-2xl">
            Interested in this home?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Book a private viewing or speak to our team about this listing.
          </p>

          <div className="mt-6 rounded-xl border border-border/30 bg-brown-light px-4 py-3.5">
            <p className="text-xs font-display uppercase tracking-[0.12em] text-muted">
              {property.type} · {property.location}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-gold-light">
              {formatPropertyPrice(property.price)}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`${BOOKING_HREF}?property=${property.id}`}
              className="btn-hero-browse w-full justify-center"
            >
              Book a viewing
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/contact" className="btn-secondary w-full justify-center">
              Contact us
            </Link>
            <Link
              href={`/gallery?location=${property.regionSlug}`}
              className="text-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              More in {regionName}
            </Link>
          </div>
        </aside>
      </div>

      {relatedProperties.length > 0 ? (
        <section
          className="mt-16 border-t border-border/30 pt-12 sm:mt-20"
          aria-labelledby="related-properties-heading"
        >
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            You may also like
          </p>
          <h2
            id="related-properties-heading"
            className="mt-2 font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-2xl"
          >
            Similar properties
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((related) => (
              <li key={related.id}>
                <PropertyCard property={related} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
