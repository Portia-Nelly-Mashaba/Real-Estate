export type PropertyType =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Villa"
  | "Penthouse";

export type PropertyStatus = "For Sale";

export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  region: string;
  regionSlug: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  beds: number;
  baths: number;
  areaSqm: number;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  listedAt: string;
}

export const ALL_PROPERTIES: PropertyListing[] = [
  {
    id: "hyde-park-townhouse",
    title: "Hyde Park Garden Townhouse",
    location: "Hyde Park, Johannesburg",
    region: "Johannesburg, Gauteng",
    regionSlug: "sandton",
    type: "Townhouse",
    status: "For Sale",
    price: 18_750_000,
    beds: 4,
    baths: 4,
    areaSqm: 410,
    description: "An architect's escape in the heart of Hyde Park.",
    image: "/images/properties/hyde-park.jpg",
    imageAlt: "Elegant townhouse garden and facade in Hyde Park",
    href: "/gallery?property=hyde-park-townhouse",
    listedAt: "2026-03-01",
  },
  {
    id: "camps-bay-penthouse",
    title: "Camps Bay Ocean Penthouse",
    location: "Camps Bay, Cape Town",
    region: "Western Cape",
    regionSlug: "cape-town",
    type: "Penthouse",
    status: "For Sale",
    price: 42_500_000,
    beds: 4,
    baths: 4,
    areaSqm: 380,
    description:
      "Floor-to-ceiling glass, Atlantic views, and private rooftop entertaining.",
    image: "/images/properties/camps-bay-penthouse.jpg",
    imageAlt: "Luxury penthouse with ocean views in Camps Bay",
    href: "/gallery?property=camps-bay-penthouse",
    listedAt: "2026-02-18",
  },
  {
    id: "umhlanga-apartment",
    title: "Umhlanga Ridge Apartment",
    location: "Umhlanga, Durban",
    region: "KwaZulu-Natal",
    regionSlug: "umhlanga",
    type: "Apartment",
    status: "For Sale",
    price: 6_850_000,
    beds: 3,
    baths: 2,
    areaSqm: 165,
    description:
      "Contemporary coastal living with lagoon views and resort amenities.",
    image: "/images/properties/umhlanga.jpg",
    imageAlt: "Modern apartment interior with coastal views",
    href: "/gallery?property=umhlanga-apartment",
    listedAt: "2026-02-10",
  },
  {
    id: "atlantic-clifftop",
    title: "The Atlantic Clifftop Villa",
    location: "Camps Bay, Cape Town",
    region: "Western Cape",
    regionSlug: "cape-town",
    type: "Villa",
    status: "For Sale",
    price: 78_500_000,
    beds: 6,
    baths: 7,
    areaSqm: 920,
    description:
      "An extraordinary clifftop residence with panoramic Atlantic views and infinity pool.",
    image: "/images/properties/clifftop-villa.jpg",
    imageAlt: "Luxury villa with pool overlooking the ocean",
    href: "/gallery?property=atlantic-clifftop",
    listedAt: "2026-01-22",
  },
  {
    id: "stellenbosch-estate",
    title: "Stellenbosch Wine Estate",
    location: "Stellenbosch, Western Cape",
    region: "Western Cape",
    regionSlug: "stellenbosch",
    type: "House",
    status: "For Sale",
    price: 24_900_000,
    beds: 5,
    baths: 4,
    areaSqm: 540,
    description:
      "Cape Dutch elegance among vineyards with mountain views and guest cottage.",
    image: "/images/properties/stellenbosch.jpg",
    imageAlt: "Wine estate home in Stellenbosch valley",
    href: "/gallery?property=stellenbosch-estate",
    listedAt: "2026-01-08",
  },
  {
    id: "sandton-heights",
    title: "Sandton Heights Apartment",
    location: "Sandton, Johannesburg",
    region: "Johannesburg, Gauteng",
    regionSlug: "sandton",
    type: "Apartment",
    status: "For Sale",
    price: 8_900_000,
    beds: 3,
    baths: 2,
    areaSqm: 185,
    description:
      "Premium apartment in the heart of Sandton with concierge and skyline views.",
    image: "/images/properties/sandton.jpg",
    imageAlt: "Modern high-rise apartment interior with city views",
    href: "/gallery?property=sandton-heights",
    listedAt: "2025-12-15",
  },
];

/** Homepage featured strip — first three listings */
export const FEATURED_PROPERTIES = ALL_PROPERTIES.slice(0, 3);

export type FeaturedProperty = PropertyListing;

export function formatPropertyPrice(price: number): string {
  return `R ${price.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

export const PROPERTY_TYPE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Villa", label: "Villa" },
  { value: "Penthouse", label: "Penthouse" },
] as const;

export const BED_BATH_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;
