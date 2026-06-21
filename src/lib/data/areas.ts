import { ALL_PROPERTIES } from "@/lib/data/properties";

export interface Area {
  id: string;
  name: string;
  title: string;
  region: string;
  image: string;
  imageAlt: string;
  href: string;
}

export const FEATURED_AREAS: Area[] = [
  {
    id: "cape-town",
    name: "Cape Town",
    title: "Cape Town, Western Cape",
    region: "Western Cape",
    image: "/images/areas/cape-town.jpg",
    imageAlt: "Aerial view of Cape Town with Table Mountain",
    href: "/gallery?location=cape-town",
  },
  {
    id: "sandton",
    name: "Sandton",
    title: "Sandton, Gauteng",
    region: "Johannesburg, Gauteng",
    image: "/images/areas/sandton.jpg",
    imageAlt: "Sandton skyline at dusk",
    href: "/gallery?location=sandton",
  },
  {
    id: "umhlanga",
    name: "Umhlanga",
    title: "Umhlanga, KwaZulu-Natal",
    region: "Durban, KwaZulu-Natal",
    image: "/images/areas/umhlanga.jpg",
    imageAlt: "Umhlanga coastline and lighthouse",
    href: "/gallery?location=umhlanga",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch",
    title: "Stellenbosch, Western Cape",
    region: "Western Cape",
    image: "/images/areas/stellenbosch.jpg",
    imageAlt: "Stellenbosch wine valley and mountains",
    href: "/gallery?location=stellenbosch",
  },
];

export function getListingCountForArea(areaId: string): number {
  return ALL_PROPERTIES.filter((property) => property.regionSlug === areaId).length;
}
