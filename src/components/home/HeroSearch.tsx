"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { HeroDropdown } from "@/components/home/HeroDropdown";
import { useHasMounted } from "@/hooks/useHasMounted";

const PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "penthouse", label: "Penthouse" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "estate", label: "Estate" },
];

const PRICE_RANGE_OPTIONS = [
  { value: "0-2000000", label: "Under R 2M" },
  { value: "2000000-5000000", label: "R 2M – R 5M" },
  { value: "5000000-10000000", label: "R 5M – R 10M" },
  { value: "10000000-20000000", label: "R 10M – R 20M" },
  { value: "20000000+", label: "R 20M+" },
];

function FilterIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-hero-text/80"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-hero-text/80"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function HeroSearch() {
  const mounted = useHasMounted();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFiltersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filtersOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (propertyType) params.set("type", propertyType);
    if (priceRange) params.set("price", priceRange);

    const query = params.toString();
    router.push(query ? `/gallery?${query}` : "/gallery");
  }

  if (!mounted) {
    return (
      <div
        className="mt-6 h-[8.75rem] max-w-2xl animate-pulse rounded-xl bg-white/10 sm:mt-8 sm:h-14"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mt-6 w-full overflow-visible transition-all duration-300 ease-in-out sm:mt-8 ${
        filtersOpen ? "max-w-4xl" : "max-w-2xl"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="hero-search-bar"
        role="search"
        aria-label="Search properties"
      >
        <div className="hero-search-row">
          <svg
            className="h-5 w-5 shrink-0 text-hero-text/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="hero-search-divider" aria-hidden="true" />

          <label htmlFor="hero-location" className="sr-only">
            Location
          </label>
          <input
            id="hero-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Camps Bay, Sandton, Umhlanga..."
            suppressHydrationWarning
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/45 focus:outline-none sm:text-[0.9375rem]"
          />
        </div>

        {filtersOpen ? (
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
            <span className="hero-search-divider" aria-hidden="true" />

            <HeroDropdown
              id="hero-type"
              label="Property Type"
              value={propertyType}
              options={PROPERTY_TYPE_OPTIONS}
              onChange={setPropertyType}
              icon={<HouseIcon />}
            />

            <span className="hero-search-divider" aria-hidden="true" />

            <HeroDropdown
              id="hero-price"
              label="Price Range"
              value={priceRange}
              options={PRICE_RANGE_OPTIONS}
              onChange={setPriceRange}
              icon={<PriceIcon />}
            />
          </div>
        ) : null}

        <div className="hero-search-actions">
          {!filtersOpen ? (
            <button
              type="button"
              className="btn-filter"
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersOpen}
              aria-label="Filter properties"
            >
              <FilterIcon />
            </button>
          ) : (
            <button
              type="button"
              className="btn-filter sm:hidden"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
            >
              <FilterIcon />
            </button>
          )}

          <button type="submit" className="btn-search">
            <SearchIcon />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
