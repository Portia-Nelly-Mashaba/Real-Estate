import Image from "next/image";
import type { PropertyImage } from "@/lib/data/properties";

interface PropertyInteriorGalleryProps {
  images: PropertyImage[];
  propertyTitle: string;
}

export function PropertyInteriorGallery({
  images,
  propertyTitle,
}: PropertyInteriorGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="property-interior-heading" className="mt-8">
      <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
        Inside the home
      </p>
      <h2
        id="property-interior-heading"
        className="mt-2 font-serif text-xl font-medium text-foreground sm:text-2xl"
      >
        Interior gallery
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {images.map((photo, index) => (
          <li
            key={photo.src}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-white shadow-[0_4px_20px_rgba(26,26,26,0.06)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <span className="sr-only">
              {propertyTitle} interior photo {index + 1} of {images.length}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
