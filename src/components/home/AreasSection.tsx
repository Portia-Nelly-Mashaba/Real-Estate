import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/home/PropertyCard";
import { FEATURED_AREAS } from "@/lib/data/areas";
import { FEATURED_PROPERTIES } from "@/lib/data/properties";

function ChevronRightIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function SectionHeader({
  label,
  title,
  href,
  linkText,
}: {
  label: string;
  title: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
          {label}
        </p>
        <h2 className="mt-2 font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
          {title}
        </h2>
      </div>

      <Link
        href={href}
        className="mb-1 inline-flex shrink-0 items-center gap-1.5 font-sans text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {linkText}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}

export function AreasSection() {
  return (
    <section className="snap-start bg-brown-light py-16 sm:py-20 lg:py-24">
      <div className="page-container">
        <SectionHeader
          label="Explore South Africa"
          title="Cities & popular areas"
          href="/gallery"
          linkText="View all areas"
        />

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {FEATURED_AREAS.map((area) => (
            <li key={area.id}>
              <Link
                href={area.href}
                className="group flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-border/50 bg-white shadow-card transition-shadow duration-200 hover:shadow-elevated sm:min-h-[24rem] lg:min-h-[26rem]"
              >
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-sm font-semibold text-foreground sm:text-base">
                      {area.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted sm:text-sm">
                      {area.propertyCount} active properties
                    </p>
                  </div>

                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground/50 transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
                    aria-hidden="true"
                  >
                    <ChevronRightIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-24">
          <SectionHeader
            label="Featured Collection"
            title="Currently represented"
            href="/gallery"
            linkText="View entire collection"
          />

          <p className="mt-4 text-sm text-muted">
            Showing {FEATURED_PROPERTIES.length} properties
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {FEATURED_PROPERTIES.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
