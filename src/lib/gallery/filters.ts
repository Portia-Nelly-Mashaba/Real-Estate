import { FEATURED_AREAS } from "@/lib/data/areas";
import { ALL_PROPERTIES } from "@/lib/data/properties";

export type SortOption = "newest" | "price-asc" | "price-desc";
export type ViewMode = "grid" | "list";

export interface PropertyFilters {
  search: string;
  type: string;
  minBeds: string;
  minBaths: string;
  minPrice: number;
  maxPrice: number;
}

const listingPrices = ALL_PROPERTIES.map((property) => property.price);
const cheapestListing = Math.min(...listingPrices);
const priciestListing = Math.max(...listingPrices);

export const PRICE_FILTER_FLOOR = 5_000_000;
export const PRICE_FILTER_CEILING = Math.ceil(priciestListing / 1_000_000) * 1_000_000;
export const PRICE_FILTER_STEP = 1_000_000;

export const DEFAULT_FILTERS: PropertyFilters = {
  search: "",
  type: "any",
  minBeds: "any",
  minBaths: "any",
  minPrice: PRICE_FILTER_FLOOR,
  maxPrice: PRICE_FILTER_CEILING,
};

export const HERO_PRICE_RANGE_OPTIONS = [
  { value: "", label: "Any price" },
  { value: `0-${10_000_000}`, label: "Under R 10M" },
  { value: `${10_000_000}-${25_000_000}`, label: "R 10M – R 25M" },
  { value: `${25_000_000}-${50_000_000}`, label: "R 25M – R 50M" },
  { value: `${50_000_000}+`, label: "R 50M+" },
] as const;

export function normalizePropertyTypeFilter(value: string): string {
  if (!value || value === "any") return "any";

  const normalized = value.trim().toLowerCase();
  const match = ALL_PROPERTIES.find(
    (property) => property.type.toLowerCase() === normalized,
  );

  return match?.type ?? value;
}

export function parsePriceFilterParam(
  param: string | null,
): Pick<PropertyFilters, "minPrice" | "maxPrice"> | null {
  if (!param) return null;

  if (param.endsWith("+")) {
    const minPrice = Number(param.slice(0, -1));
    if (Number.isNaN(minPrice)) return null;
    return { minPrice, maxPrice: PRICE_FILTER_CEILING };
  }

  const [minRaw, maxRaw] = param.split("-");
  const minPrice = Number(minRaw);
  const maxPrice = Number(maxRaw);

  if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) return null;

  return { minPrice, maxPrice };
}

export function resolveHeroLocationQuery(input: string): {
  locationSlug?: string;
  searchText?: string;
} {
  const query = input.trim().toLowerCase();
  if (!query) return {};

  const area = FEATURED_AREAS.find((entry) => {
    const matches = [
      entry.id,
      entry.name.toLowerCase(),
      entry.title.toLowerCase(),
      entry.region.toLowerCase(),
    ];

    return matches.some(
      (candidate) =>
        candidate === query ||
        candidate.includes(query) ||
        query.includes(entry.name.toLowerCase()),
    );
  });

  if (area) {
    return { locationSlug: area.id };
  }

  return { searchText: input.trim() };
}

export function buildFiltersFromSearchParams(
  searchParams: URLSearchParams,
): Partial<PropertyFilters> {
  const next: Partial<PropertyFilters> = {};
  const typeParam = searchParams.get("type");
  const searchParam = searchParams.get("search");

  if (typeParam) {
    next.type = normalizePropertyTypeFilter(typeParam);
  }

  if (searchParam) {
    next.search = searchParam;
  }

  const priceFilter = parsePriceFilterParam(searchParams.get("price"));
  if (priceFilter) {
    next.minPrice = priceFilter.minPrice;
    next.maxPrice = priceFilter.maxPrice;
  }

  return next;
}

export function filterAndSortProperties(
  properties: typeof ALL_PROPERTIES,
  filters: PropertyFilters,
  sort: SortOption,
  locationSlug?: string | null,
  propertySlug?: string | null,
) {
  const query = filters.search.trim().toLowerCase();
  const typeFilter = normalizePropertyTypeFilter(filters.type);

  let results = properties.filter((property) => {
    if (propertySlug && property.id !== propertySlug) {
      return false;
    }

    if (locationSlug && property.regionSlug !== locationSlug) {
      return false;
    }

    if (typeFilter !== "any" && property.type !== typeFilter) {
      return false;
    }

    if (filters.minBeds !== "any" && property.beds < Number(filters.minBeds)) {
      return false;
    }

    if (filters.minBaths !== "any" && property.baths < Number(filters.minBaths)) {
      return false;
    }

    if (property.price < filters.minPrice || property.price > filters.maxPrice) {
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

export const PRICE_RANGE_SUMMARY = {
  cheapestListing,
  priciestListing,
};
