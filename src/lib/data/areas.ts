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
    image:
      "https://images.unsplash.com/photo-1580060839134-14ada585e4e0?w=800&q=80",
    imageAlt: "Aerial view of Cape Town with Table Mountain",
    href: "/gallery?location=cape-town",
  },
  {
    id: "sandton",
    name: "Sandton",
    title: "Sandton, Gauteng",
    region: "Johannesburg, Gauteng",
    propertyCount: 74,
    image:
      "https://images.unsplash.com/photo-1577948000114-ef513015e814?w=800&q=80",
    imageAlt: "Sandton skyline at dusk",
    href: "/gallery?location=sandton",
  },
  {
    id: "umhlanga",
    name: "Umhlanga",
    title: "Umhlanga, KwaZulu-Natal",
    region: "Durban, KwaZulu-Natal",
    propertyCount: 56,
    image:
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80",
    imageAlt: "Umhlanga coastline and lighthouse",
    href: "/gallery?location=umhlanga",
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch",
    title: "Stellenbosch, Western Cape",
    region: "Western Cape",
    propertyCount: 42,
    image:
      "https://images.unsplash.com/photo-1590076215677-8758162d0468?w=800&q=80",
    imageAlt: "Stellenbosch wine valley and mountains",
    href: "/gallery?location=stellenbosch",
  },
];
