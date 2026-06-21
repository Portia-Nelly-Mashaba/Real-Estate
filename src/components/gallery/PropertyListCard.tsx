import Image from "next/image";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import Link from "next/link";
import { PropertyFavoriteButton } from "@/components/home/PropertyFavoriteButton";
import { BOOKING_HREF } from "@/lib/constants";
import {
  formatPropertyPrice,
  type PropertyListing,
} from "@/lib/data/properties";

interface PropertyListCardProps {
  property: PropertyListing;
}

const specIconClass = "h-4 w-4 shrink-0 stroke-[1.5] text-muted";

export function PropertyListCard({ property }: PropertyListCardProps) {
  return (
    <article className="gallery-list-card">
      <div className="gallery-list-card-image relative">
        <Link href={property.href} className="group block h-full">
          <Image
            src={property.image}
            alt={property.imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </Link>
        <span className="property-type-badge">{property.type}</span>
        <PropertyFavoriteButton
          propertyId={property.id}
          propertyTitle={property.title}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <Link href={property.href} className="group/title">
          <h2 className="font-serif text-xl font-medium leading-snug text-foreground transition-colors group-hover/title:text-accent sm:text-2xl">
            {property.title}
          </h2>
        </Link>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {property.location}
        </p>

        <p className="mt-3 font-display text-lg font-bold text-gold-light sm:text-xl">
          {formatPropertyPrice(property.price)}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {property.description}
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          <li className="flex items-center gap-2">
            <BedDouble className={specIconClass} aria-hidden="true" />
            {property.beds}
          </li>
          <li className="flex items-center gap-2">
            <Bath className={specIconClass} aria-hidden="true" />
            {property.baths}
          </li>
          <li className="flex items-center gap-2">
            <Maximize2 className={specIconClass} aria-hidden="true" />
            {property.areaSqm} m²
          </li>
        </ul>

        <Link
          href={`${BOOKING_HREF}?property=${property.id}`}
          className="mt-auto inline-flex items-center gap-1 self-start pt-5 font-display text-sm font-bold text-foreground transition-colors hover:text-accent"
        >
          Book a viewing
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
