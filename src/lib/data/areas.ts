export interface Area {
  id: string;
  name: string;
  title: string;
  region: string;
  propertyCount: number;
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
    propertyCount: 128,
    image: "/images/areas/cape-town.jpg",
    imageAlt: "Aerial view of Cape Town with Table Mountain",
    href: "/gallery?location=cape-town",
  },
  {
    id: "sandton",
    name: "Sandton",
    title: "Sandton, Gauteng",
    region: "Johannesburg, Gauteng",
    propertyCount: 74,
    image: "/images/areas/sandton.jpg",
    imageAlt: "Sandton skyline at dusk",
    href: "/gallery?location=sandton",
  },
  {
    id: "umhlanga",
    name: "Umhlanga",
    title: "Umhlanga, KwaZulu-Natal",
    region: "Durban, KwaZulu-Natal",
    propertyCount: 56,
    image: "/images/areas/umhlanga.jpg",
    imageAlt: "Umhlanga coastline and lighthouse",
    href: "/gallery?location=umhlanga",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch",
    title: "Stellenbosch, Western Cape",
    region: "Western Cape",
    propertyCount: 42,
    image: "/images/areas/stellenbosch.jpg",
    imageAlt: "Stellenbosch wine valley and mountains",
    href: "/gallery?location=stellenbosch",
  },
];
