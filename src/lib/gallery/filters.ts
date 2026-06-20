import type { PropertyListing } from "@/lib/data/properties";

export type SortOption = "newest" | "price-asc" | "price-desc";
export type ViewMode = "grid" | "list";

export interface PropertyFilters {
  search: string;
  type: string;
  minBeds: string;
  minBaths: string;
  maxPrice: number;
}

export const DEFAULT_FILTERS: PropertyFilters = {
  search: "",
  type: "any",
  minBeds: "any",
  minBaths: "any",
  maxPrice: 100_000_000,
};

export const MAX_PROPERTY_PRICE = 100_000_000;

export function filterAndSortProperties(
  properties: PropertyListing[],
  filters: PropertyFilters,
  sort: SortOption,
  locationSlug?: string | null,
  propertySlug?: string | null,
): PropertyListing[] {
  const query = filters.search.trim().toLowerCase();

  let results = properties.filter((property) => {
    if (propertySlug && property.id !== propertySlug) {
      return false;
    }

    if (locationSlug) {
      const regionMatch = property.regionSlug === locationSlug;
      if (!regionMatch) return false;
    }

    if (filters.type !== "any" && property.type !== filters.type) {
      return false;
    }

    if (filters.minBeds !== "any" && property.beds < Number(filters.minBeds)) {
      return false;
    }

    if (filters.minBaths !== "any" && property.baths < Number(filters.minBaths)) {
      return false;
    }

    if (property.price > filters.maxPrice) {
      return false;
    }

    if (!query) return true;

    const haystack = [
      property.title,
      property.location,
      property.region,
      property.type,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  results = [...results].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
  });

  return results;
}
