export type PropertyType =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Villa"
  | "Penthouse";

export interface FeaturedProperty {
  id: string;
  title: string;
  location: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  areaSqm: number;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export const FEATURED_PROPERTIES: FeaturedProperty[] = [
  {
    id: "willow-estate",
    title: "Willow Estate Family Home",
    location: "Westdene, Bloemfontein",
    type: "House",
    price: 2450000,
    beds: 4,
    baths: 3,
    areaSqm: 320,
    description:
      "Spacious family home with modern finishes, landscaped garden, and open-plan living overlooking the Willows.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    imageAlt: "Modern suburban family home with lawn and patio",
    href: "/gallery?property=willow-estate",
  },
  {
    id: "atlantic-clifftop",
    title: "The Atlantic Clifftop Villa",
    location: "Camps Bay, Cape Town",
    type: "Villa",
    price: 78500000,
    beds: 6,
    baths: 7,
    areaSqm: 920,
    description:
      "An extraordinary clifftop residence with panoramic Atlantic views, infinity pool, and bespoke interior design.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    imageAlt: "Luxury villa with pool overlooking the ocean",
    href: "/gallery?property=atlantic-clifftop",
  },
  {
    id: "sandton-heights",
    title: "Sandton Heights Apartment",
    location: "Sandton, Johannesburg",
    type: "Apartment",
    price: 8900000,
    beds: 3,
    baths: 2,
    areaSqm: 185,
    description:
      "Premium apartment in the heart of Sandton with floor-to-ceiling windows, concierge, and skyline views.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    imageAlt: "Modern high-rise apartment interior with city views",
    href: "/gallery?property=sandton-heights",
  },
];

export function formatPropertyPrice(price: number): string {
  return `R ${price.toLocaleString("en-ZA").replace(/,/g, " ")}`;
}
