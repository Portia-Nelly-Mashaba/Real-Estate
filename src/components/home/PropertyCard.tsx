import Image from "next/image";
import { Bath, BedDouble, Maximize2 } from "lucide-react";
import Link from "next/link";
import { PropertyFavoriteButton } from "@/components/home/PropertyFavoriteButton";
import { BOOKING_HREF } from "@/lib/constants";
import {
  formatPropertyPrice,
  type FeaturedProperty,
} from "@/lib/data/properties";

interface PropertyCardProps {
  property: FeaturedProperty;
}

const specIconClass = "h-[1.125rem] w-[1.125rem] shrink-0 stroke-[1.5]";

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="grid h-[30rem] w-full grid-rows-2 overflow-hidden rounded-xl border border-border/50 bg-white shadow-card transition-shadow duration-200 hover:shadow-elevated">
      <div className="relative min-h-0 overflow-hidden">
        <Link href={property.href} className="group block h-full">
          <Image
            src={property.image}
            alt={property.imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <span className="property-type-badge">{property.type}</span>
        <PropertyFavoriteButton propertyTitle={property.title} />
      </div>

      <div className="flex min-h-0 flex-col px-4 py-3.5">
        <Link href={property.href} className="group/title">
          <h3 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover/title:text-accent">
            {property.title}
          </h3>
          <p className="mt-1 text-xs text-muted sm:text-sm">{property.location}</p>
        </Link>

        <p className="mt-2.5 font-display text-lg font-bold text-gold-light">
          {formatPropertyPrice(property.price)}
        </p>

        <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          <li className="flex items-center gap-2">
            <BedDouble className={specIconClass} aria-hidden="true" />
            <span className="leading-none">{property.beds}</span>
          </li>
          <li className="flex items-center gap-2">
            <Bath className={specIconClass} aria-hidden="true" />
            <span className="leading-none">{property.baths}</span>
          </li>
          <li className="flex items-center gap-2">
            <Maximize2 className={specIconClass} aria-hidden="true" />
            <span className="leading-none">{property.areaSqm} m²</span>
          </li>
        </ul>

        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
          {property.description}
        </p>

        <Link
          href={`${BOOKING_HREF}?property=${property.id}`}
          className="mt-auto inline-flex items-center gap-1 self-start pt-3 font-display text-xs font-bold text-foreground transition-colors hover:text-accent sm:text-sm"
        >
          Book a viewing
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
