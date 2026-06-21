export type PropertyType =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Freestanding"
  | "Penthouse";

export type PropertyStatus = "For Sale";

export interface PropertyImage {
  src: string;
  alt: string;
}

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
  longDescription: string;
  image: string;
  imageAlt: string;
  galleryImages: PropertyImage[];
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
    description: "Four-bed townhouse with pool and garden on a quiet Hyde Park street.",
    longDescription:
      "410 m² on a cul-de-sac off Jan Smuts Avenue. Open-plan living opens to a pool terrace, with a separate staff suite and double garage. Hyde Park Corner and Sandton are a short drive away.",
    image: "/images/properties/hyde-park.jpg",
    imageAlt: "Elegant townhouse garden and facade in Hyde Park",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        alt: "Open-plan living area with garden views in Hyde Park townhouse",
      },
      {
        src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        alt: "Designer kitchen with stone countertops and integrated appliances",
      },
      {
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
        alt: "Primary bedroom suite with warm timber finishes",
      },
    ],
    href: "/property/hyde-park-townhouse",
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
    description: "Penthouse with Atlantic views and a private rooftop terrace.",
    longDescription:
      "380 m² on the upper floors of a secure Victoria Road building. Three parking bays, concierge, and a rooftop that catches the sunset. Camps Bay beach and restaurants are within walking distance.",
    image: "/images/properties/camps-bay-penthouse.jpg",
    imageAlt: "Luxury penthouse with ocean views in Camps Bay",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
        alt: "Penthouse lounge with floor-to-ceiling glass and Atlantic views",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        alt: "Gourmet kitchen opening onto the Camps Bay penthouse terrace",
      },
      {
        src: "/images/properties/interiors/camps-bay-bedroom.jpg",
        alt: "Master suite with ocean-facing balcony in Camps Bay",
      },
    ],
    href: "/property/camps-bay-penthouse",
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
    description: "Three-bed apartment near Umhlanga Ridge with lagoon outlook.",
    longDescription:
      "165 m² in a secure complex with gym and 24-hour access control. Two covered parking bays, open-plan living, and a short drive to Gateway and the beachfront promenade.",
    image: "/images/properties/umhlanga.jpg",
    imageAlt: "Modern apartment interior with coastal views",
    galleryImages: [
      {
        src: "/images/properties/interiors/umhlanga-living.jpg",
        alt: "Bright coastal apartment living room with lagoon outlook",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        alt: "Contemporary kitchen in Umhlanga Ridge apartment",
      },
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        alt: "Guest bedroom with neutral coastal styling",
      },
    ],
    href: "/property/umhlanga-apartment",
    listedAt: "2026-02-10",
  },
  {
    id: "atlantic-clifftop",
    title: "The Atlantic Clifftop Home",
    location: "Camps Bay, Cape Town",
    region: "Western Cape",
    regionSlug: "cape-town",
    type: "Freestanding",
    status: "For Sale",
    price: 78_500_000,
    beds: 6,
    baths: 7,
    areaSqm: 920,
    description: "Six-bed clifftop home with pool and wine cellar in Camps Bay.",
    longDescription:
      "920 m² on one of Camps Bay's steeper plots. Double-volume living faces the Atlantic, with staff quarters, cinema room, and an infinity pool. Three garages and full perimeter security.",
    image: "/images/properties/clifftop-villa.jpg",
    imageAlt: "Luxury freestanding home with pool overlooking the ocean",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        alt: "Double-volume living space with clifftop views",
      },
      {
        src: "/images/properties/interiors/clifftop-wine.jpg",
        alt: "Wine cellar and tasting room in Atlantic Clifftop Home",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
        alt: "En-suite bathroom with freestanding tub and ocean outlook",
      },
    ],
    href: "/property/atlantic-clifftop",
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
    description: "Cape Dutch home among vineyards with guest cottage and mountain views.",
    longDescription:
      "540 m² main house plus a separate guest cottage on a borehole-fed erf. Entertaining terraces look over the vines towards the Stellenbosch mountains. Stellenbosch town is a ten-minute drive.",
    image: "/images/properties/stellenbosch.jpg",
    imageAlt: "Wine estate home in Stellenbosch valley",
    galleryImages: [
      {
        src: "/images/properties/interiors/stellenbosch-living.jpg",
        alt: "Cape Dutch living room with vineyard views in Stellenbosch",
      },
      {
        src: "/images/properties/interiors/stellenbosch-kitchen.jpg",
        alt: "Farmhouse kitchen with exposed beams and stone finishes",
      },
      {
        src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
        alt: "Guest cottage bedroom on Stellenbosch wine estate",
      },
    ],
    href: "/property/stellenbosch-estate",
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
    description: "Three-bed apartment in Sandton with concierge and skyline views.",
    longDescription:
      "185 m² in a central Sandton tower. Concierge, gym, and two basement parking bays. Living areas face north over the skyline, with easy access to Sandton City and the Gautrain.",
    image: "/images/properties/sandton.jpg",
    imageAlt: "Modern high-rise apartment interior with city views",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
        alt: "Sandton Heights lounge with floor-to-ceiling skyline views",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-554f4db459a3?w=800&q=80",
        alt: "Open-plan dining and kitchen in Sandton Heights apartment",
      },
      {
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
        alt: "Primary bedroom with Sandton city skyline at night",
      },
    ],
    href: "/property/sandton-heights",
    listedAt: "2025-12-15",
  },
];

// first 3 listings on home
export const FEATURED_PROPERTIES = ALL_PROPERTIES.slice(0, 3);

export type FeaturedProperty = PropertyListing;

export function formatPropertyPrice(price: number): string {
  return `R ${price.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}

export function getPropertyHref(id: string): string {
  return `/property/${id}`;
}

export function getPropertyById(id: string): PropertyListing | undefined {
  return ALL_PROPERTIES.find((property) => property.id === id);
}

export function getRelatedProperties(
  id: string,
  limit = 3
): PropertyListing[] {
  const current = getPropertyById(id);
  const others = ALL_PROPERTIES.filter((property) => property.id !== id);

  if (!current) {
    return others.slice(0, limit);
  }

  const sameRegion = others.filter(
    (property) => property.regionSlug === current.regionSlug
  );

  return (sameRegion.length >= limit ? sameRegion : others).slice(0, limit);
}

export function formatListedDate(dateKey: string): string {
  return new Date(dateKey).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const PROPERTY_TYPE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Freestanding", label: "Freestanding" },
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
