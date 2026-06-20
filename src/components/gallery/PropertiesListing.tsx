"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/home/PropertyCard";
import { PropertyListCard } from "@/components/gallery/PropertyListCard";
import { PropertyToolbar } from "@/components/gallery/PropertyToolbar";
import { ALL_PROPERTIES } from "@/lib/data/properties";
import {
  DEFAULT_FILTERS,
  filterAndSortProperties,
  type PropertyFilters,
  type SortOption,
  type ViewMode,
} from "@/lib/gallery/filters";

export function PropertiesListing() {
  const searchParams = useSearchParams();
  const locationSlug = searchParams.get("location");

  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<ViewMode>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(
    () => filterAndSortProperties(ALL_PROPERTIES, filters, sort, locationSlug),
    [filters, sort, locationSlug],
  );

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <>
      <p className="text-sm text-muted">
        {results.length} of {ALL_PROPERTIES.length} homes match your criteria.
      </p>

      <div className="mt-5">
        <PropertyToolbar
          filters={filters}
          sort={sort}
          view={view}
          filtersOpen={filtersOpen}
          onFiltersChange={setFilters}
          onSortChange={setSort}
          onViewChange={setView}
          onToggleFilters={() => setFiltersOpen((open) => !open)}
          onResetFilters={resetFilters}
        />
      </div>

      <div className="gallery-results-area">
        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border/40 bg-white px-6 py-14 text-center shadow-card">
            <p className="font-serif text-2xl text-foreground">No properties found</p>
            <p className="mt-3 text-sm text-muted">
              Try adjusting your search or reset the filters.
            </p>
          </div>
        ) : view === "grid" ? (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {results.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-5">
            {results.map((property) => (
              <li key={property.id}>
                <PropertyListCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
